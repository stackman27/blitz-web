import React, { useEffect, useState } from "react";
import VendorViewReceipt from "./Receipt/VendorViewReceipt";
import WaitingReceipt from "./Waiting/WaitingReceipt";
import { waitingPaymentReceipt } from "./FirebaseVHome";

function HomeBody() {
  const [purchaseInfo, setPurchaseInfo] = useState({});
  const [scannedReceipt, setScannedReceipt] = useState(false);

  useEffect(() => {
    const unsubscribe = waitingPaymentReceipt(
      "xMDIkMRFrTSpBD4q2mLzNaUeDUm1"
    ).onSnapshot((snap) => {
      snap.forEach((doc) => {
        if (doc.data()) {
          setScannedReceipt(true);
          setPurchaseInfo(doc.data());
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
