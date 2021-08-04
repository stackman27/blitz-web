import firebase from '../Firebase';

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

async function signInWithGoogle() {
  return await auth.signInWithPopup(googleProvider);
}

async function getVendorInfo(vendorUid) {
  const snapshot = await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .get();
  return snapshot.data();
}

async function checkifVendor(vendorUid) {
  const docRef = firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid);
  const doc = await docRef.get();
  if (!doc.exists) {
    return false;
  } else {
    return true;
  }
}

function saveToken(res) {
  const credential = res.credential;
  const token = credential.accessToken;
  localStorage.setItem('loginToken', JSON.stringify(token));
}

export { getVendorInfo, signInWithGoogle, checkifVendor, saveToken };
