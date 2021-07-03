import firebase from "../Firebase";
import { vendorUid } from "../constants/Variables.js";

function getVendorActiveUserInfo() {
  return firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("active_customers");
}

async function removeActiveUser(customerUid) {
  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("active_customers")
    .doc(customerUid)
    .delete();

  toggleUserCartActive_true(customerUid); // sets to true called from firebaseVendors
}

async function toggleUserCartActive_true(customerUid) {
  await firebase
    .firestore()
    .collection("blitz_customers")
    .doc(customerUid)
    .update({
      clearcart: true,
    });
}

export { getVendorActiveUserInfo, removeActiveUser };
