import firebase from "../../Firebase";

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
  var credential = res.credential;
  var token = credential.accessToken;
  localStorage.setItem("vendorUId", JSON.stringify(res.user.uid));
  localStorage.setItem("loginToken", JSON.stringify(token));
}

export { signInWithGoogle, checkifVendor, saveToken };
