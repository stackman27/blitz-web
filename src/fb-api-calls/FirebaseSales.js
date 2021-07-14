import firebase from "../Firebase";
import { vendorUid } from "../constants/Variables";

async function getSalesReceipts() {
  let sales_receipts = [];
  let totalSales = 0;
  let latestDoc = null; // stores last document

  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("sales_receipts")
    .orderBy("timestamp", "desc")
    .limit(10)
    .get()
    .then((res) => {
      res.forEach((doc) => {
        sales_receipts.push(doc.data());
      });
      latestDoc = res.docs[res.docs.length - 1];
      totalSales = res.size;
    });

  return [sales_receipts, totalSales];
}

async function getSalesDetails(rId) {
  const snapshot = await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("sales_receipts")
    .doc(rId)
    .get();

  return snapshot.data();
}

export { getSalesReceipts, getSalesDetails };
