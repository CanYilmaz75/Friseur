import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
  runTransaction
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import type { Salon } from '../types';

export interface SalonRegistrationData {
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  umsatzId: string;
  ownerName: string;
  password: string;
}

export const registerSalon = async (data: SalonRegistrationData) => {
  try {
    // Check if UmsatzID already exists
    const salonsRef = collection(db, 'salons');
    const umsatzQuery = query(salonsRef, where('umsatzId', '==', data.umsatzId));
    const umsatzSnapshot = await getDocs(umsatzQuery);
    
    if (!umsatzSnapshot.empty) {
      throw new Error('UmsatzID already registered');
    }

    // Check if email already exists
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', data.email));
    const emailSnapshot = await getDocs(emailQuery);
    
    if (!emailSnapshot.empty) {
      throw new Error('Email already registered');
    }

    return await runTransaction(db, async (transaction) => {
      // Create owner account with business email
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.ownerName
      });

      const userRef = doc(db, 'users', userCredential.user.uid);
      const salonRef = doc(collection(db, 'salons'));

      // Create user document with owner role
      transaction.set(userRef, {
        uid: userCredential.user.uid,
        name: data.ownerName,
        email: data.email,
        role: 'owner',
        salonId: salonRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Create salon document
      transaction.set(salonRef, {
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        phone: data.phone,
        email: data.email,
        umsatzId: data.umsatzId,
        ownerId: userCredential.user.uid,
        services: [],
        stylists: [],
        rating: 5.0,
        reviewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return {
        salonId: salonRef.id,
        ownerId: userCredential.user.uid
      };
    });
  } catch (error: any) {
    console.error('Error registering salon:', error);
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please use a different email address.');
    }
    throw error;
  }
};

export const getSalonById = async (salonId: string) => {
  try {
    const salonDoc = await getDoc(doc(db, 'salons', salonId));
    if (!salonDoc.exists()) {
      throw new Error('Salon not found');
    }
    return { id: salonDoc.id, ...salonDoc.data() } as Salon;
  } catch (error) {
    console.error('Error fetching salon:', error);
    throw error;
  }
};

export const getSalonsByOwner = async (ownerId: string) => {
  try {
    const q = query(
      collection(db, 'salons'),
      where('ownerId', '==', ownerId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Salon[];
  } catch (error) {
    console.error('Error fetching owner salons:', error);
    throw error;
  }
};

export const updateSalon = async (salonId: string, updateData: Partial<Salon>) => {
  try {
    const salonRef = doc(db, 'salons', salonId);
    await updateDoc(salonRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating salon:', error);
    throw error;
  }
};