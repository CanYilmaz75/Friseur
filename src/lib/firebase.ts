import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBMt6uKIotBhKXQd7ee43pmoGk1ReAgIWM",
  authDomain: "friseur-3de71.firebaseapp.com",
  projectId: "friseur-3de71",
  storageBucket: "friseur-3de71.firebasestorage.app",
  messagingSenderId: "463765812003",
  appId: "1:463765812003:web:21a7857bb040313dae1296",
  measurementId: "G-B1K24EZ30T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;