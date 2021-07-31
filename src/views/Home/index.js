/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import VendorViewReceipt from '../HomeReceipt/VendorViewReceipt';
import WaitingReceipt from '../HomeWaiting/WaitingReceipt';
import { waitingPaymentReceipt } from '../../fb-calls/FirebaseHome';
import { loggedInVendor } from '../../util/Variables';

function HomeBody() {
  const [purchaseInfo, setPurchaseInfo] = useState({});
  const [scannedReceipt, setScannedReceipt] = useState(false);
  /**
   * TODO: need to change timeout logic becuase it's independent to database action
   */

  useEffect(() => {
    const getTags = loggedInVendor.nfc_ids || ['0'];
    const unsubscribe = waitingPaymentReceipt(getTags).onSnapshot((snap) => {
      snap.forEach((doc) => {
        if (doc.data()) {
          setScannedReceipt(true);
          setPurchaseInfo(doc.data());
          setTimeout(() => {
            setScannedReceipt(false);
          }, 30000);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  return scannedReceipt ? (
    <VendorViewReceipt purchaseInfo={purchaseInfo} />
  ) : (
    <WaitingReceipt />
  );
}

export default HomeBody;
