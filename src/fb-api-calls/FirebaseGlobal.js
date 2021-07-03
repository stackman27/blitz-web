import firebase from "../Firebase";

const blitz_vendor_ref = firebase.firestore().collection("blitz_vendors");

async function updatetoNFC(vendorUId) {
  await blitz_vendor_ref.doc(vendorUId).update({
    checkout_type: "nfc",
  });
}

async function updatetoQR(vendorUId) {
  await blitz_vendor_ref.doc(vendorUId).update({
    checkout_type: "qr",
  });
}

export { updatetoNFC, updatetoQR };
