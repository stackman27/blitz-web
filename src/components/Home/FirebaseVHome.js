import firebase from "../../Firebase";

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
  await firebase
    .firestore()
    .collection("blitz_vendors")
    .doc("xMDIkMRFrTSpBD4q2mLzNaUeDUm1")
    .update({
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

export { requestPermissionNotificationWeb, getToken, logOut };
