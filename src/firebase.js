import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3JuNnJEUsHbrcjoN0MGdhmQwpIShRtAM",
  authDomain: "react-auth-6faea.firebaseapp.com",
  projectId: "react-auth-6faea",
  storageBucket: "react-auth-6faea.firebasestorage.app",
  messagingSenderId: "985975504842",
  appId: "1:985975504842:web:4ba4caa40733a96dc6d933",
  measurementId: "G-3JKVG11LMZ",
};

const app = initializeApp(firebaseConfig);
isSupported().then((ok) => ok && getAnalytics(app));

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
