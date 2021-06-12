import firebase from "../Firebase";

const vendorUid = JSON.parse(localStorage.getItem("vendorUId"));
const blitz_vendor_ref = firebase
  .firestore()
  .collection("blitz_vendors")
  .doc(vendorUid);

async function updatetoNFC() {
  await blitz_vendor_ref.update({
    checkout_type: "nfc",
  });
}

async function updatetoQR() {
  await blitz_vendor_ref.update({
    checkout_type: "qr",
  });
}

export { updatetoNFC, updatetoQR };
