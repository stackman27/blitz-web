import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { getProductDetails } from '../../fb-calls/FirebaseInventory';
import {
  updateBatchInventory,
  removeBatchInventory,
} from '../../fb-calls/FirebaseInventoryBatch';
import { UserContext } from '../../context/UserContext';
import InventoryBatchDetailsContainer from './components';

function InventoryBatchDetails() {
  const currentUser = useContext(UserContext);
  const { state } = useLocation();
  const history = useHistory();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState({});
  const [itemCountVal, setItemCountVal] = useState(0);
  const [batchItemAmount, setBatchItemAmount] = useState(0);

  useEffect(() => {
    return getAllData();
  }, []);

  const getAllData = () => {
    getProductDetails(currentUser.uid, state.pId).then((res) => {
      setItem(res);
      setItemCountVal(res.batch_data.count);
      setBatchItemAmount(res.batch_data.amount);
    });
  };

  const updateBatchItem = () => {
    setIsLoading(true);
    const batchData = {
      count: itemCountVal,
      amount: batchItemAmount,
    };
    updateBatchInventory(currentUser.uid, state.pId, batchData).then(() => {
      toast({
        title: 'Successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      getAllData();
      setIsLoading(false);
    });
  };

  const removeBatchItem = () => {
    removeBatchInventory(currentUser.uid, state.pId).then(() => {
      toast({
        title: 'Successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      history.goBack();
    });
  };

  const stateProps = {
    item,
    isLoading,
    itemCountVal,
    batchItemAmount,
  };

  const functionalProps = {
    removeBatchItem,
    updateBatchItem,
    setBatchItemAmount,
    setItemCountVal,
  };

  return (
    <InventoryBatchDetailsContainer
      stateProps={stateProps}
      functionalProps={functionalProps}
    />
  );
}

export default InventoryBatchDetails;
