import firebase from "../../Firebase";

async function getSalesReceipts() {
  var sales_receipts = [];
  var totalSales = 0;
  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc("xMDIkMRFrTSpBD4q2mLzNaUeDUm1")
    .collection("sales_receipts")
    .orderBy("timestamp", "desc")
    .limit(25)
    .get()
    .then((res) => {
      res.forEach((doc) => {
        sales_receipts.push(doc.data());
      });
      totalSales = res.size;
    });

  return [sales_receipts, totalSales];
}

async function getSalesDetails(rId) {
  const snapshot = await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc("xMDIkMRFrTSpBD4q2mLzNaUeDUm1")
    .collection("sales_receipts")
    .doc(rId)
    .get();

  return snapshot.data();
}

export { getSalesReceipts, getSalesDetails };
