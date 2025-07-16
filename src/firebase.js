import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1zPdRjf8Bwrqv1jnaahKGOJYjJt-L92E",
  authDomain: "trendnest-a5867.firebaseapp.com",
  projectId: "trendnest-a5867",
  storageBucket: "trendnest-a5867.firebasestorage.app",
  messagingSenderId: "509673752324",
  appId: "1:509673752324:web:738860cdd417e526d27251"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider(); 