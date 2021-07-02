import React, { useEffect, useState } from "react";
import { vendorUid } from "../../constants/Variables";
import VendorViewReceipt from "../HomeReceipt/VendorViewReceipt";
import WaitingReceipt from "../HomeWaiting/WaitingReceipt";
import { waitingPaymentReceipt } from "../../fb-api-calls/FirebaseHome";

function HomeBody() {
  const [purchaseInfo, setPurchaseInfo] = useState({});
  const [scannedReceipt, setScannedReceipt] = useState(false);

  /**
   * TODO: need to change timeout logic becuase it's independent to database action
   */
  useEffect(() => {
    const unsubscribe = waitingPaymentReceipt(vendorUid).onSnapshot((snap) => {
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
