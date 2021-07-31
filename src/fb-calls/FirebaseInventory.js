import firebase from '../Firebase';
import { loggedInVendor } from '../util/Variables';

async function getInventory(filterOption) {
  const inventory = [];
  let totalInventory = 0;
  let dbRef = null;
  let lastDoc;

  if (!filterOption || filterOption === 'All') {
    dbRef = firebase
      .firestore()
      .collection('blitz_vendors')
      .doc(loggedInVendor.uid)
      .collection('inventory')
      .limit(25);
  } else {
    dbRef = firebase
      .firestore()
      .collection('blitz_vendors')
      .doc(loggedInVendor.uid)
      .collection('inventory')
      .where('department', '==', filterOption)
      .limit(25);
  }

  await dbRef.get().then((res) => {
    res.forEach((doc) => {
      inventory.push(doc.data());
    });
    lastDoc = res.docs[res.docs.length - 1];
    totalInventory = res.size;
  });

  return [inventory, totalInventory, lastDoc];
}

async function getMoreInventory(lastDoc, filterOption) {
  const inventory = [];
  let dbRef = null;

  dbRef = firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(loggedInVendor.uid)
    .collection('inventory')
    .startAfter(lastDoc)
    .limit(25);

  await dbRef.get().then((res) => {
    res.forEach((doc) => {
      inventory.push(doc.data());
    });
    lastDoc = res.docs[res.docs.length - 1];
  });

  return [inventory, lastDoc];
}

async function getProductDetails(bId) {
  const snapshot = await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(loggedInVendor.uid)
    .collection('inventory')
    .doc(JSON.stringify(bId))
    .get();

  return snapshot.data();
}

async function updateInventory(bId, item) {
  item.crv_by_05_cents = Number(item.crv_by_05_cents / 0.05);
  item.sell_price = Number(item.sell_price);
  item.sugar_tax = Number(item.sugar_tax);
  await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(loggedInVendor.uid)
    .collection('inventory')
    .doc(JSON.stringify(bId))
    .update(item);
}

async function removeItem(bId) {
  await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(loggedInVendor.uid)
    .collection('inventory')
    .doc(JSON.stringify(bId))
    .delete();
}

export {
  getInventory,
  getProductDetails,
  updateInventory,
  removeItem,
  getMoreInventory,
};
