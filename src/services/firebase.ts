import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // apiKey: "AIzaSyDCkHmuJOkDAnIRZB2FFcroXIXnAI9Qo3c",
  // authDomain: "mobile-wedding-invitatio-93f68.firebaseapp.com",
  // databaseURL: "https://mobile-wedding-invitatio-93f68-default-rtdb.firebaseio.com",
  // projectId: "mobile-wedding-invitatio-93f68",
  // storageBucket: "mobile-wedding-invitatio-93f68.firebasestorage.app",
  // messagingSenderId: "767255450043",
  // appId: "1:767255450043:web:5127711ee000123f99349e",
  // measurementId: "G-XYKTM17JMT"

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
