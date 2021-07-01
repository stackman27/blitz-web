import firebase from "firebase";

// const PROJ_STATUS = "development";
 
const fbDevConfig = {
  apiKey: "AIzaSyAONzUsHELgnG_hmytwN9sfJz-LQ8p1yXE",
  authDomain: "blitz-checkout-dev.firebaseapp.com",
  projectId: "blitz-checkout-dev",
  storageBucket: "blitz-checkout-dev.appspot.com",
  messagingSenderId: "959870897469",
  appId: "1:959870897469:web:4ac0da4686f025b0d20954",
};


firebase.initializeApp(fbDevConfig);

export default firebase;
