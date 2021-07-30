import firebase from '../Firebase';
import { vendorUid } from '../util/Variables';

async function getSalesReceipts() {
  const salesReceipts = [];
  let totalSales = 0;
  let lastDoc;

  const docRef = firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('sales_receipts')
    .orderBy('timestamp', 'desc');

  await docRef
    .limit(10)
    .get()
    .then((res) => {
      res.forEach((doc) => {
        salesReceipts.push(doc.data());
      });
      totalSales = res.size;
      lastDoc = res.docs[res.docs.length - 1];
    });

  return [salesReceipts, totalSales, lastDoc];
}

async function getMoreReceipts(lastDoc) {
  const salesReceipts = [];
  const docRef = firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('sales_receipts')
    .orderBy('timestamp', 'desc');

  await docRef
    .startAfter(lastDoc)
    .limit(10)
    .get()
    .then((res) => {
      res.forEach((doc) => {
        salesReceipts.push(doc.data());
      });
      lastDoc = res.docs[res.docs.length - 1];
    });

  return [salesReceipts, lastDoc];
}

async function getSalesDetails(rId) {
  const snapshot = await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('sales_receipts')
    .doc(rId)
    .get();

  return snapshot.data();
}

export { getSalesReceipts, getSalesDetails, getMoreReceipts };
