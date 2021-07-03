import firebase from "firebase";

// const PROJ_STATUS = "production";

const fbProductionConfig = {
  apiKey: process.env.REACT_APP_FB_PROD_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN_PROD,
  projectId: process.env.REACT_APP_FB_PROJECT_ID_PROD,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_PROD,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_PROD,
  appId: process.env.REACT_APP_APP_ID_PROD,
};

firebase.initializeApp(fbProductionConfig);

export default firebase;
