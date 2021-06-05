const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.newActiveCustomer = functions.firestore
  .document("blitz_vendors/{vendorId}/active_customers/{userId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    try {
      const payload = {
        notification: {
          title: "New Active Customer",
          body: `${data.uName} started shopping in your store.`,
        },
      };
      return admin
        .messaging()
        .sendToDevice(
          `dMiYz_XQbTabTD17g7Zdd1:APA91bGMxc8OMGIouEJOEPcni9cpmQXn7dOqqcZFIfbiY9qFFIDbOURH1EWSdS7HG5BfZhdqryFZf1RHtr5urBR2OF1ktAeIREdeQcXE7CQwF-fRQ4GJ0Bzje1LedBjM_9vLPDavob31`,
          payload
        )
        .then(() => {
          console.log("Notification sent!");
          return null;
        });
    } catch (err) {
      console.log(err);
    }
  });
