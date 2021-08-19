import firebase from '../Firebase';

async function getInventoryBatchItems(vendorUid) {
  const inventory = [];
  let totalBatchInventory = 0;
  let dbRef = null;
  let lastDoc;

  dbRef = firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('inventory')
    .where('item_batched', '==', true)
    .limit(25);

  await dbRef.get().then((res) => {
    res.forEach((doc) => {
      inventory.push(doc.data());
    });
    lastDoc = res.docs[res.docs.length - 1];
    totalBatchInventory = res.size;
  });

  return [inventory, totalBatchInventory, lastDoc];
}

async function getMoreInventoryBatchItems(vendorUid, lastDoc) {
  const batchInventory = [];
  let totalBatchInventory = 0;
  let dbRef = null;

  dbRef = firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('inventory')
    .where('item_batched', '==', true)
    .startAfter(lastDoc)
    .limit(25);

  await dbRef.get().then((res) => {
    res.forEach((doc) => {
      batchInventory.push(doc.data());
    });
    lastDoc = res.docs[res.docs.length - 1];
    totalBatchInventory = res.size;
  });

  return [batchInventory, totalBatchInventory, lastDoc];
}

async function updateBatchInventory(vendorUid, barcodeId, batchData) {
  await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('inventory')
    .doc(JSON.stringify(barcodeId))
    .update({
      item_batched: true,
      batch_data: batchData,
    });
}

async function removeBatchInventory(vendorUid, barcodeId) {
  await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('inventory')
    .doc(JSON.stringify(barcodeId))
    .update({
      item_batched: false,
      batch_data: {},
    });
}

export {
  getInventoryBatchItems,
  getMoreInventoryBatchItems,
  updateBatchInventory,
  removeBatchInventory,
};
