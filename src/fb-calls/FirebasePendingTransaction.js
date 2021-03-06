import firebase from '../Firebase';

async function getPendingTransactions(vendorUid) {
  const pendingTransaction = [];
  let totalTransactions = 0;
  await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('payments_completed')
    .orderBy('timestamp', 'desc')
    .limit(25)
    .get()
    .then((res) => {
      res.forEach((doc) => {
        pendingTransaction.push(doc.data());
      });
      totalTransactions = res.size;
    });

  return [pendingTransaction, totalTransactions];
}

async function getTransactionDetails(vendorUid, rId) {
  const snapshot = await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('payments_completed')
    .doc(rId)
    .get();

  return snapshot.data();
}

export { getPendingTransactions, getTransactionDetails };
