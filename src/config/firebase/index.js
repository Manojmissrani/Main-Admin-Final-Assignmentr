// import { initializeApp } from "firebase/app";
// // import getAnalytics from "firebase/app"
// const firebaseConfig = {
//   apiKey: "AIzaSyAYyZf_fBuhc8psgw0N62X3Ae3vWzh4EEg",
//   authDomain: "react-final-assignment-a0145.firebaseapp.com",
//   projectId: "react-final-assignment-a0145",
//   storageBucket: "react-final-assignment-a0145.appspot.com",
//   messagingSenderId: "721564081536",
//   appId: "1:721564081536:web:50c2faa0baf377e8caf565",
//   measurementId: "G-1NCHTX3VES"
// };

// const app = initializeApp(firebaseConfig);

import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAwrDNHMYX4Vig0X2enw6T8bd_j_BLG-5M",
  authDomain: "reactapp-fe611.firebaseapp.com",
  databaseURL: "https://reactapp-fe611-default-rtdb.firebaseio.com",
  projectId: "reactapp-fe611",
  storageBucket: "reactapp-fe611.appspot.com",
  messagingSenderId: "422302899242",
  appId: "1:422302899242:web:d9b629a421e37f3723f753"
};
const app = initializeApp(firebaseConfig);
const db= getFirestore(app)
export default app
// const analytics = getAnalytics(app);