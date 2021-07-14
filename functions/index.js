const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.newActiveCustomer = functions.firestore
  .document("blitz_vendors/{vendorId}/active_customers/{userId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    try {
      const payload = {
        notification: {
          title: "New Active Customer",
          body: `${data.uName} started shopping in your store.`,
        },
      };
      await admin
        .firestore()
        .collection("blitz_vendors")
        .doc(context.params.vendorId)
        .get()
        .then((res) => {
          sendNotification(payload, res.data().web_notif_token);
        });
    } catch (err) {
      console.log(err);
    }
  });

exports.customerPaid = functions.firestore
  .document("blitz_vendors/{vendorId}/payments_completed/{receiptId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    try {
      const payload = {
        notification: {
          title: "Payment Completed",
          body: `$${data.userName} paid you 
          ${data.purchaseInfo.total.toFixed(2)}.`,
        },
      };
      await admin
        .firestore()
        .collection("blitz_vendors")
        .doc(data.purchaseInfo.vendorUid)
        .get()
        .then((res) => {
          sendNotification(payload, res.data().web_notif_token);
        });
    } catch (err) {
      console.log(err);
    }
  });

async function sendNotification(payload, deviceId) {
  return await admin
    .messaging()
    .sendToDevice(deviceId, payload)
    .then(() => {
      console.log("Notification sent!");
    });
}
