import firebase from "firebase";

//const PROJ_STATUS = "development";

const fbDevConfig = {
  apiKey: process.env.REACT_APP_FB_DEV_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN_DEV,
  projectId: process.env.REACT_APP_FB_PROJECT_ID_DEV,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
  appId: process.env.REACT_APP_APP_ID_DEV,
};

firebase.initializeApp(fbDevConfig);

export default firebase;
