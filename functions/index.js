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
          `dfP5zFs7sjb0Uqhiif-px5:APA91bEu4Seb36WL7JhWfayq5NINdDX1evkt3RS2rD7jgfwoboagy-8Kwmo47wi5Sr2kJYljQTGAETwllCubqeCOC3wyGeAncsZOft_r5iGehf8IGzVqn-Gqtt2GOlXkr6mvk9-tdR2y`,
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
