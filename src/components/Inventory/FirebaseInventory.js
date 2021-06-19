import firebase from "../../Firebase";
import { vendorUid } from "../Variables";

async function getInventory(filterOption) {
  var inventory = [];
  var totalInventory = 0;
  var dbRef = null;

  if (!filterOption || filterOption === "All") {
    dbRef = firebase
      .firestore()
      .collection("blitz_vendors")
      .doc(vendorUid)
      .collection("inventory")
      .limit(25);
  } else {
    dbRef = firebase
      .firestore()
      .collection("blitz_vendors")
      .doc(vendorUid)
      .collection("inventory")
      .where("department", "==", filterOption)
      .limit(25);
  }

  await dbRef.get().then((res) => {
    res.forEach((doc) => {
      inventory.push(doc.data());
    });
    totalInventory = res.size;
  });

  return [inventory, totalInventory];
}

async function getProductDetails(bId) {
  const snapshot = await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("inventory")
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
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("inventory")
    .doc(JSON.stringify(bId))
    .update(item);
}

async function removeItem(bId) {
  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("inventory")
    .doc(JSON.stringify(bId))
    .delete();
}

export { getInventory, getProductDetails, updateInventory, removeItem };
