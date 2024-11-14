import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AppointmentData {
  clientId: string;
  stylistId: string;
  serviceId: string;
  salonId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export const createAppointment = async (appointmentData: AppointmentData) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      date: Timestamp.fromDate(appointmentData.date),
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getClientAppointments = async (clientId: string) => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('clientId', '==', clientId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching client appointments:', error);
    throw error;
  }
};

export const getStylistAppointments = async (stylistId: string) => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('stylistId', '==', stylistId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching stylist appointments:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: AppointmentData['status']
) => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId);
    await updateDoc(appointmentRef, { status });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId);
    await updateDoc(appointmentRef, { 
      status: 'cancelled',
      cancelledAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
};