import { 
  collection, 
  query, 
  where, 
  getDocs,
  Timestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { startOfDay, endOfDay, subDays, subMonths } from 'date-fns';

export interface AnalyticsData {
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  appointmentsToday: number;
  appointmentsWeek: number;
  clientsTotal: number;
  stylistsActive: number;
  averageRating: number;
}

export const getAnalytics = async (salonId: string): Promise<AnalyticsData> => {
  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const weekStart = startOfDay(subDays(now, 7));
  const monthStart = startOfDay(subMonths(now, 1));

  // Get appointments for revenue calculations
  const appointmentsRef = collection(db, 'appointments');
  
  // Today's appointments
  const todayQuery = query(
    appointmentsRef,
    where('salonId', '==', salonId),
    where('date', '>=', Timestamp.fromDate(todayStart)),
    where('date', '<=', Timestamp.fromDate(todayEnd)),
    where('status', 'in', ['confirmed', 'completed'])
  );

  // Week's appointments
  const weekQuery = query(
    appointmentsRef,
    where('salonId', '==', salonId),
    where('date', '>=', Timestamp.fromDate(weekStart)),
    where('status', 'in', ['confirmed', 'completed'])
  );

  // Month's appointments
  const monthQuery = query(
    appointmentsRef,
    where('salonId', '==', salonId),
    where('date', '>=', Timestamp.fromDate(monthStart)),
    where('status', 'in', ['confirmed', 'completed'])
  );

  // Get active stylists
  const stylistsQuery = query(
    collection(db, 'stylists'),
    where('salonId', '==', salonId)
  );

  // Get total clients
  const clientsQuery = query(
    collection(db, 'appointments'),
    where('salonId', '==', salonId),
    orderBy('clientId')
  );

  // Get salon ratings
  const ratingsQuery = query(
    collection(db, 'reviews'),
    where('salonId', '==', salonId)
  );

  try {
    const [
      todaySnapshot,
      weekSnapshot,
      monthSnapshot,
      stylistsSnapshot,
      clientsSnapshot,
      ratingsSnapshot
    ] = await Promise.all([
      getDocs(todayQuery),
      getDocs(weekQuery),
      getDocs(monthQuery),
      getDocs(stylistsQuery),
      getDocs(clientsQuery),
      getDocs(ratingsQuery)
    ]);

    // Calculate revenues
    const calculateRevenue = (appointments: any[]) => 
      appointments.reduce((sum, app) => sum + (app.data().servicePrice || 0), 0);

    const dailyRevenue = calculateRevenue(todaySnapshot.docs);
    const weeklyRevenue = calculateRevenue(weekSnapshot.docs);
    const monthlyRevenue = calculateRevenue(monthSnapshot.docs);

    // Calculate unique clients
    const uniqueClients = new Set(
      clientsSnapshot.docs.map(doc => doc.data().clientId)
    );

    // Calculate average rating
    const ratings = ratingsSnapshot.docs.map(doc => doc.data().rating);
    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      : 0;

    return {
      dailyRevenue,
      weeklyRevenue,
      monthlyRevenue,
      appointmentsToday: todaySnapshot.size,
      appointmentsWeek: weekSnapshot.size,
      clientsTotal: uniqueClients.size,
      stylistsActive: stylistsSnapshot.size,
      averageRating
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};