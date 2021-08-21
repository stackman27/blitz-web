/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '959870897469',
});

firebase.messaging();
