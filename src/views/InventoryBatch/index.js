import React, { useState, useEffect, useContext } from 'react';
import {
  getInventoryBatchItems,
  getMoreInventoryBatchItems,
} from '../../fb-calls/FirebaseInventoryBatch';
import { UserContext } from '../../context/UserContext';
import BatchItemsListContainer from './components';
import NoBatchItemsContainer from './components/NoBatchItemsContainer';
import Loading from '../../components/Loading';

function InventoryBatch() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [isItemsRemaining, setIsItemsRemaining] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    appliedFilterData();
  }, []);

  const appliedFilterData = () => {
    getInventoryBatchItems(currentUser.uid).then((res) => {
      setItems(res[0]);
      setIsLoading(false);
      if (res[1] < 25) {
        setIsItemsRemaining(false);
      }
    });
  };

  const getMoreInventoryBatchItemCall = () => {
    if (lastDoc) {
      setShowMoreLoading(true);
      getMoreInventoryBatchItems(currentUser.uid, lastDoc).then((res) => {
        setItems([...items, ...res[0]]);
        setLastDoc(res[2]);
        setShowMoreLoading(false);
        if (res[1] < 25) {
          setIsItemsRemaining(false);
        }
      });
    }
  };

  const stateProps = {
    items,
    showMoreLoading,
    isItemsRemaining,
  };

  const functionalProps = {
    getMoreInventoryBatchItemCall,
  };

  if (isLoading) {
    return <Loading />;
  }

  if (items.length <= 0) {
    return <NoBatchItemsContainer />;
  }

  return (
    <BatchItemsListContainer
      stateProps={stateProps}
      functionalProps={functionalProps}
    />
  );
}

export default InventoryBatch;
