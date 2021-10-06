/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import VendorViewReceipt from '../HomeReceipt/VendorViewReceipt';
import WaitingReceipt from '../HomeWaiting/WaitingReceipt';
import { waitingPaymentReceipt } from '../../fb-calls/FirebaseHome';
import { UserContext } from '../../context/UserContext';

function HomeBody() {
  const currentUser = useContext(UserContext);
  const [purchaseInfo, setPurchaseInfo] = useState({});
  const [scannedReceipt, setScannedReceipt] = useState(false);
  /**
   * TODO: need to change timeout logic becuase it's independent to database action
   */

  useEffect(() => {
    const getTags = currentUser.nfc_ids || ['0'];
    const unsubscribe = waitingPaymentReceipt(
      currentUser.uid,
      getTags,
    ).onSnapshot((snap) => {
      snap.docChanges().forEach(function (change) {
        if (change.type === 'added') {
          if (change.doc.data()) {
            setScannedReceipt(true);
            setPurchaseInfo(change.doc.data());
            setTimeout(() => {
              setScannedReceipt(false);
            }, 30000);
          }
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
