import firebase from "firebase";

const PROJ_STATUS = "development";

const fbProductionConfig = {
  apiKey: process.env.REACT_APP_FB_PROD_API_KEY,
  authDomain: "react-native-stripe-cb5f9.firebaseapp.com",
  projectId: "react-native-stripe-cb5f9",
  storageBucket: "react-native-stripe-cb5f9.appspot.com",
  messagingSenderId: "961649483774",
  appId: "1:961649483774:web:620557ba67329355bceaaf",
  measurementId: "G-2DF6WW0TH8",
};

const fbDevConfig = {
  apiKey: process.env.REACT_APP_FB_DEV_API_KEY,
  authDomain: "blitz-checkout-dev.firebaseapp.com",
  projectId: "blitz-checkout-dev",
  storageBucket: "blitz-checkout-dev.appspot.com",
  messagingSenderId: "959870897469",
  appId: "1:959870897469:web:4ac0da4686f025b0d20954",
};

if (PROJ_STATUS === "production") {
  firebase.initializeApp(fbProductionConfig);
} else if (PROJ_STATUS === "development") {
  firebase.initializeApp(fbDevConfig);
} else {
  throw Error("Firebase project not found");
}

export default firebase;
