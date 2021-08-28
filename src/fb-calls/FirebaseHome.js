/* eslint-disable no-unused-vars */
import firebase from '../Firebase';

async function requestPermissionNotificationWeb(vendorUid) {
  const messaging = firebase.messaging();
  await messaging
    .requestPermission()
    .then(async () => {
      const token = await messaging.getToken();
      await storeWebNotifToken(vendorUid, token);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function storeWebNotifToken(vendorUid, token) {
  await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .update({
      fcmtoken: firebase.firestore.FieldValue.arrayUnion(token),
    });
}

function getToken() {
  const tokenString = localStorage.getItem('loginToken');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

async function logOut() {
  return await firebase.auth().signOut();
}

function waitingPaymentReceipt(vendorUid, availableTags) {
  return firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('payments_completed')
    .where('nfc_id', 'in', availableTags) // maybe need to do like array contain
    .where('status', '==', 'verifying')
    .orderBy('timestamp', 'desc')
    .limit(1);
}

// AFTER PURCHASED VERIFIED
async function runPostCheckout(
  vendorUid,
  customerUid,
  receiptId,
  purchaseInfo,
) {
  const resValue = await checkIfRecieptVerified(vendorUid, receiptId).then(
    async (res) => {
      if (res) {
        purchaseInfo.status = 'verified';
        await saveDiscountAmount(vendorUid, purchaseInfo);
        await storeSalesReceiptVendor(vendorUid, receiptId, purchaseInfo);
        await storeSalesReceiptCustomer(customerUid, receiptId, purchaseInfo);
        await removeActiveUser(vendorUid, customerUid);
        await removePaymentsCustomer(customerUid);
        await removePaymentsCollCustomer(customerUid, receiptId);
        await removePaymentsCollVendor(vendorUid, receiptId);
        await userCartActiveFalse(customerUid);
      }
      return res;
    },
  );

  return resValue;
}

async function checkIfRecieptVerified(vendorUid, receiptId) {
  const ref = firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('payments_completed')
    .doc(receiptId)
    .get();

  const data = (await ref).exists;
  return data;
}

async function userCartActiveFalse(customerUid) {
  await firebase
    .firestore()
    .collection('blitz_customers')
    .doc(customerUid)
    .update({
      clearcart: false,
    });
}

async function saveDiscountAmount(vendorUid, purchaseInfo) {
  await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .update({
      discount_total: firebase.firestore.FieldValue.increment(
        purchaseInfo.purchaseInfo.promoDiscount,
      ),
    });
}

async function storeSalesReceiptVendor(vendorUid, receiptId, purchaseInfo) {
  await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('sales_receipts')
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
    .collection('blitz_customers')
    .doc(customerUid)
    .collection('purchase_receipts')
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
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('active_customers')
    .doc(customerUid)
    .delete();

  toggleUserCartActiveTrue(customerUid); // sets to true called from firebaseVendors
}

async function toggleUserCartActiveTrue(customerUid) {
  await firebase
    .firestore()
    .collection('blitz_customers')
    .doc(customerUid)
    .update({
      clearcart: true,
    });
}

// REMOVE PAYMENTS, PAYMENTS COMPLETE FROM CUSTOMER SIDE
async function removePaymentsCustomer(customerUid) {
  const ref = await firebase
    .firestore()
    .collection('blitz_customers')
    .doc(customerUid);

  const unsubscribe = ref.collection('payments').onSnapshot((snapshot) => {
    let totalCount = snapshot.size;
    snapshot.docs.forEach((doc) => {
      // Keep only one doc in payment collection to prevent buggy apple pay button
      if (totalCount <= 1) {
        unsubscribe();
      } else {
        ref.collection('payments').doc(doc.id).delete();
        totalCount -= 1;
      }
    });
  });
}

async function removePaymentsCollCustomer(customerUid, receiptId) {
  await firebase
    .firestore()
    .collection('blitz_customers')
    .doc(customerUid)
    .collection('payments_completed')
    .doc(receiptId)
    .delete();
}

// REMOVE PAYMENTS COMPLETE FROM VENDOR SIDE
async function removePaymentsCollVendor(vendorUid, receiptId) {
  await firebase
    .firestore()
    .collection('blitz_vendors')
    .doc(vendorUid)
    .collection('payments_completed')
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
};
