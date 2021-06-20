import firebase from "../../Firebase";
import { vendorUid } from "../Variables";

const availableTags = ["047D5B02700000"];

async function getVendorInfo() {
  const snapshot = await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .get();
  return snapshot.data();
}

async function requestPermissionNotificationWeb() {
  const messaging = firebase.messaging();
  await messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken();
    })
    .then((token) => {
      storeWebNotifToken(token);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function storeWebNotifToken(token) {
  await firebase.firestore().collection("blitz_vendors").doc(vendorUid).update({
    web_notif_token: token,
  });
}

function getToken() {
  const tokenString = localStorage.getItem("loginToken");
  const userToken = JSON.parse(tokenString);
  return userToken;
}

async function logOut() {
  return await firebase.auth().signOut();
}

function waitingPaymentReceipt(vendorUid) {
  return firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("payments_completed")
    .where("nfc_id", "in", availableTags) // maybe need to do like array contain
    .where("status", "==", "verifying")
    .orderBy("timestamp", "desc")
    .limit(1);
}

// AFTER PURCHASED VERIFIED
async function runPostCheckout(
  vendorUid,
  customerUid,
  receiptId,
  purchaseInfo
) {
  await saveDiscountAmount(vendorUid, purchaseInfo);
  await storeSalesReceiptVendor(vendorUid, receiptId, purchaseInfo);
  await storeSalesReceiptCustomer(customerUid, receiptId, purchaseInfo);
  await removeActiveUser(vendorUid, customerUid);
  await removePaymentsCustomer(customerUid);
  await removePaymentsCollCustomer(customerUid, receiptId);
  await removePaymentsCollVendor(vendorUid, receiptId);

  // make the clear cart to false
  userCartActive_false(customerUid);
}

async function userCartActive_false(customerUid) {
  await firebase
    .firestore()
    .collection("blitz_customers")
    .doc(customerUid)
    .update({
      clearcart: false,
    });
}

async function saveDiscountAmount(vendorUid, purchaseInfo) {
  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .update({
      discount_total: firebase.firestore.FieldValue.increment(
        purchaseInfo.purchaseInfo.blitzDiscount
      ),
    });
}

async function storeSalesReceiptVendor(vendorUid, receiptId, purchaseInfo) {
  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("sales_receipts")
    .doc(receiptId)
    .set({
      receiptId: receiptId,
      purchaseInfo: purchaseInfo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

async function storeSalesReceiptCustomer(customerUid, receiptId, purchaseInfo) {
  await firebase
    .firestore()
    .collection("blitz_customers")
    .doc(customerUid)
    .collection("purchase_receipts")
    .doc(receiptId)
    .set({
      receiptId: receiptId,
      purchaseInfo: purchaseInfo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

async function removeActiveUser(vendorUid, customerUid) {
  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("active_customers")
    .doc(customerUid)
    .delete();

  toggleUserCartActive_true(customerUid); // sets to true called from firebaseVendors
}

async function toggleUserCartActive_true(customerUid) {
  await firebase
    .firestore()
    .collection("blitz_customers")
    .doc(customerUid)
    .update({
      clearcart: true,
    });
}

// REMOVE PAYMENTS, PAYMENTS COMPLETE FROM CUSTOMER SIDE
async function removePaymentsCustomer(customerUid) {
  const ref = await firebase
    .firestore()
    .collection("blitz_customers")
    .doc(customerUid);

  const unsubscribe = ref.collection("payments").onSnapshot((snapshot) => {
    let total_count = snapshot.size;
    snapshot.docs.forEach((doc) => {
      // Keep only one doc in payment collection to prevent buggy apple pay button
      if (total_count <= 1) {
        unsubscribe();
      } else {
        ref.collection("payments").doc(doc.id).delete();
        total_count -= 1;
      }
    });
  });
}

async function removePaymentsCollCustomer(customerUid, receiptId) {
  await firebase
    .firestore()
    .collection("blitz_customers")
    .doc(customerUid)
    .collection("payments_completed")
    .doc(receiptId)
    .delete();
}

// REMOVE PAYMENTS COMPLETE FROM VENDOR SIDE
async function removePaymentsCollVendor(vendorUid, receiptId) {
  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc(vendorUid)
    .collection("payments_completed")
    .doc(receiptId)
    .delete();
}
// Post checkout end

export {
  requestPermissionNotificationWeb,
  getToken,
  logOut,
  waitingPaymentReceipt,
  removeActiveUser,
  runPostCheckout,
  getVendorInfo,
};
