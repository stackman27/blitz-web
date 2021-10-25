const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec, spawn } = require('child_process');
const process = spawn('python3', ['newpython.py', 'Hello from python']);

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

main.use(cors());
main.use('/api/v1/', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// const db = admin.firestore();
// const vendorCollection = 'blitz-vendors';

exports.webApi = functions.https.onRequest(main);

app.get('/inventoryDetail', async (req, res) => {
  exec(
    'python3 ../derby_inventory_automation/automation.py',
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).send(stdout);
    },
  );
});

app.get('/inventoryDetailData', async (req, res, next) => {
  new Promise((resolve, reject) => {
    // Listen to the `data` event on `stdout`.
    process.stdout.on('data', (data) => resolve(`stdout: ${data}`));
    // Listen to the `data` event on `srderr`.
    // eslint-disable-next-line prefer-promise-reject-errors
    process.stderr.on('data', (data) => reject(`stdout: ${data}`));
  })
    .then((data) => {
      res.status(200).send(data);
      next();
    })
    .catch((err) => next(err));
});

app.use((err, req, res, next) => {
  console.log(err.message);
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});
