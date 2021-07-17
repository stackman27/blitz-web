import firebase from '../Firebase';

const blitzVendorRef = firebase.firestore().collection('blitz_vendors');

async function updatetoNFC(vendorUId) {
  await blitzVendorRef.doc(vendorUId).update({
    checkout_type: 'nfc',
  });
}

async function updatetoQR(vendorUId) {
  await blitzVendorRef.doc(vendorUId).update({
    checkout_type: 'qr',
  });
}

export { updatetoNFC, updatetoQR };
