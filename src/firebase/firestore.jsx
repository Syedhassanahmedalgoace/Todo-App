import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithPhoneNumber,
    RecaptchaVerifier
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCz51_cr4cmMb6lEIiuoGIHZUSje2Q6qXY",
    authDomain: "todoapp-8356a.firebaseapp.com",
    projectId: "todoapp-8356a",
    storageBucket: "todoapp-8356a.appspot.com",
    messagingSenderId: "175694701735",
    appId: "1:175694701735:web:4c14d91dfcfcf14c42e782"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithPhone = async (phoneNumber) => {
    try {
        const appVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
        }, auth);

        return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const logout = () => {
    auth.signOut();
};

export {
    auth,
    db,
    storage,
    logout,
    signInWithGoogle,
    signInWithPhone,
    app
};