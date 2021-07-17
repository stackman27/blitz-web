import firebase from '../Firebase';
import { vendorUid } from '../constants/Variables';

async function getSalesReceipts() {
  const salesReceipts = [];
  let totalSales = 0;

  const docRef = firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('sales_receipts')
    .orderBy('timestamp', 'desc');

  // let latestDoc = (await docRef.get()).docs[0].id;

  await docRef
    .limit(10)
    .get()
    .then((res) => {
      res.forEach((doc) => {
        salesReceipts.push(doc.data());
      });
      // latestDoc = res.docs[res.docs.length - 1].id;
      totalSales = res.size;
    });

  return [salesReceipts, totalSales];
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

export { getSalesReceipts, getSalesDetails };
