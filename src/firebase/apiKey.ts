import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA48EAg9xEkoulOUN7hCFtWLTlTfwxKwSI",
  authDomain: "ki-itk.firebaseapp.com",
  projectId: "ki-itk",
  storageBucket: "ki-itk.firebasestorage.app",
  messagingSenderId: "654169061103",
  appId: "1:654169061103:web:2d541bebd15d0bb0418d1a",
  measurementId: "G-HLP14K1PQH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// provider.setCustomParameters({
//   hd: "student.itk.ac.id",
// });

export { auth, provider };
