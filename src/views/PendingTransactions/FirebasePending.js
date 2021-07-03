import firebase from "../../Firebase";
import { vendorUid } from "../Variables";

async function getPendingTransactions() {
  var pending_transactions = [];
  var totalTransactions = 0;
  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("payments_completed")
    .orderBy("timestamp", "desc")
    .limit(25)
    .get()
    .then((res) => {
      res.forEach((doc) => {
        pending_transactions.push(doc.data());
      });
      totalTransactions = res.size;
    });

  return [pending_transactions, totalTransactions];
}

async function getTransactionDetails(rId) {
  const snapshot = await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("payments_completed")
    .doc(rId)
    .get();

  return snapshot.data();
}

export { getPendingTransactions, getTransactionDetails };
