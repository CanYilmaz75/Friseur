import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Stylist } from '../types';

export interface StylistInput {
  name: string;
  bio: string;
  specialties: string[];
  schedule: {
    [key: string]: { // day of week
      start: string;
      end: string;
      isWorking: boolean;
    };
  };
  salonId: string;
}

export const addStylist = async (stylistData: StylistInput) => {
  try {
    // Get salon's UmsatzID
    const salonDoc = await doc(db, 'salons', stylistData.salonId);
    const salonData = (await salonDoc).get();
    const umsatzId = salonData.data()?.umsatzId;

    if (!umsatzId) {
      throw new Error('Salon not found');
    }

    const docRef = await addDoc(collection(db, 'stylists'), {
      ...stylistData,
      umsatzId,
      rating: 5.0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Update salon's stylists array
    await updateDoc(doc(db, 'salons', stylistData.salonId), {
      stylists: [...(salonData.data()?.stylists || []), docRef.id],
      updatedAt: serverTimestamp()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding stylist:', error);
    throw error;
  }
};

export const getSalonStylists = async (salonId: string) => {
  try {
    const q = query(
      collection(db, 'stylists'),
      where('salonId', '==', salonId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Stylist[];
  } catch (error) {
    console.error('Error fetching stylists:', error);
    throw error;
  }
};

export const updateStylist = async (stylistId: string, updateData: Partial<StylistInput>) => {
  try {
    const stylistRef = doc(db, 'stylists', stylistId);
    await updateDoc(stylistRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating stylist:', error);
    throw error;
  }
};

export const deleteStylist = async (stylistId: string) => {
  try {
    const stylistRef = doc(db, 'stylists', stylistId);
    const stylistDoc = await stylistRef.get();
    const salonId = stylistDoc.data()?.salonId;

    if (salonId) {
      // Remove stylist ID from salon's stylists array
      const salonRef = doc(db, 'salons', salonId);
      const salonDoc = await salonRef.get();
      const currentStylists = salonDoc.data()?.stylists || [];
      
      await updateDoc(salonRef, {
        stylists: currentStylists.filter((id: string) => id !== stylistId),
        updatedAt: serverTimestamp()
      });
    }

    await deleteDoc(stylistRef);
  } catch (error) {
    console.error('Error deleting stylist:', error);
    throw error;
  }
};