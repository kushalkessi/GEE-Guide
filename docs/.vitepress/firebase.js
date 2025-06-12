import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5HFAjDT4q-cI-emJoSU1IAaJuIOIRzo0",
  authDomain: "gee-e-book.firebaseapp.com",
  projectId: "gee-e-book",
  storageBucket: "gee-e-book.appspot.com",
  messagingSenderId: "954849167303",
  appId: "1:954849167303:web:0c258933a102b86140fbe2",
  measurementId: "G-TTDMWF2FMC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export default app;
