import firebase from "../Firebase";

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

async function signInWithGoogle() {
  return await auth.signInWithPopup(googleProvider);
}

async function checkifVendor(vendorUid) {
  const docRef = firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid);
  const doc = await docRef.get();
  if (!doc.exists) {
    return false;
  } else {
    return true;
  }
}

function saveToken(res) {
  let credential = res.credential;
  let token = credential.accessToken;
  localStorage.setItem("loginToken", JSON.stringify(token));
}

function saveUser(res) {
  localStorage.setItem("user", JSON.stringify(res));
}

export { signInWithGoogle, checkifVendor, saveToken, saveUser };
