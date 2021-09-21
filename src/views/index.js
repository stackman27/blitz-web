import React, { useEffect, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../App.css';
import {
  requestPermissionNotificationWeb,
  getToken,
} from '../fb-calls/FirebaseHome';
import { UserContext } from '../context/UserContext';
import Header from '../layout/Header';
import HomeBody from './Home';
import TotalSales from './TotalSales';
import ActiveCustomers from './ActiveCustomers';
import Inventory from './Inventory';
import InventoryDetails from './InventoryDetails';
import SalesDetails from './TotalSalesDetail';
import LoginScreen from '../views/Login/LoginScreen.js';
import PendingTransactions from '../views/PendingTransactions';
import PendingTransactionsDetail from '../views/PendingTransactionsDetail';
import Loading from '../components/Loading';
import InventoryBatch from './InventoryBatch';
import InventoryBatchDetails from './InventoryBatchDetails';
import Analytics from './Analytics';
// import TutorialSticker from '../TutorialSticker';

function VendorHome() {
  const token = getToken();
  const currentUser = useContext(UserContext);
  const toast = useToast();
  const audio = new Audio('/newactivecustomer.mp3');

  useEffect(() => {
    if (token && currentUser?.uid) {
      requestPermissionNotificationWeb(currentUser.uid);
      navigator.serviceWorker.addEventListener('message', (message) => {
        try {
          triggerNotificationToast(
            message.data['firebase-messaging-msg-data'].notification,
          );
        } catch (err) {
          console.log('Error', err);
        }
      });
    }
  }, [currentUser]);

  const triggerNotificationToast = (data) => {
    audio.play();
    toast({
      title: data.title,
      description: data.body,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  if (token && !currentUser) {
    return <Loading />;
  }

  if (!token || !currentUser) {
    return (
      <Router>
        <Route path="/" component={LoginScreen}>
          <LoginScreen />
        </Route>
      </Router>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {/* <Route path="/tutorial_sticker" component={TutorialSticker}>
          <TutorialSticker />
        </Route> */}

        <Route path="/home" component={HomeBody}>
          <HomeBody />
        </Route>
        <Route path="/active" component={ActiveCustomers}>
          <ActiveCustomers />
        </Route>
        <Route path="/sales" component={TotalSales}>
          <TotalSales />
        </Route>
        <Route path="/analytics" component={Analytics}>
          <Analytics />
        </Route>
        <Route path="/pending" component={TotalSales}>
          <PendingTransactions />
        </Route>
        <Route path="/pendingDetail" component={PendingTransactionsDetail}>
          <PendingTransactionsDetail />
        </Route>
        <Route path="/inventory" component={Inventory}>
          <Inventory />
        </Route>
        <Route path="/inventoryDetail" component={InventoryDetails}>
          <InventoryDetails />
        </Route>
        <Route path="/inventoryBatch" component={InventoryBatch}>
          <InventoryBatch />
        </Route>
        <Route path="/inventoryBatchDetail" component={InventoryBatchDetails}>
          <InventoryBatchDetails />
        </Route>
        <Route path="/salesDetail" component={SalesDetails}>
          <SalesDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default VendorHome;
