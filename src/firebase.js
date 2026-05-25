import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDbTWmv0KvDYy5jceeDAJmogTv3yIJiEl0",
  authDomain: "job-notification-portal.firebaseapp.com",
  projectId: "job-notification-portal",
  storageBucket: "job-notification-portal.firebasestorage.app",
  messagingSenderId: "433406270173",
  appId: "1:433406270173:web:515d527616202af78e9934",
  measurementId: "G-85EX5X5QMX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
