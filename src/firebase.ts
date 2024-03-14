// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  isSupported as analyticsIsSupported,
} from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyCyuCkVW4zuwycBfRFqF06nz2Qx4vVzMJU",
  authDomain: "freee-attendance-keeper.firebaseapp.com",
  databaseURL:
    "https://freee-attendance-keeper-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "freee-attendance-keeper",
  storageBucket: "freee-attendance-keeper.appspot.com",
  messagingSenderId: "325929904206",
  appId: "1:325929904206:web:44976adffb950af63cfb1f",
  measurementId: "G-ZZG1784HS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analyticsIsSupported().then((isSupported) => {
    if (isSupported) {
      analytics = getAnalytics(app);
    }
  });
}
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { auth, database, analytics, firestore };
