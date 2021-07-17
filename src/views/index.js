import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../App.css";
import {
  requestPermissionNotificationWeb,
  getToken,
  getUser,
} from "../fb-calls/FirebaseHome";
import Header from "../layout/Header";
import HomeBody from "./Home";
import TotalSales from "./TotalSales";
import ActiveCustomers from "./ActiveCustomers";
import Inventory from "./Inventory";
import InventoryDetails from "./InventoryDetails";
import SalesDetails from "./TotalSalesDetail";
import LoginScreen from "../views/Login/LoginScreen.js";
import PendingTransactions from "../views/PendingTransactions";
import PendingTransactionsDetail from "../views/PendingTransactionsDetail";

function VendorHome() {
  const token = getToken();
  const user = getUser();
  const toast = useToast();
  let audio = new Audio("/newactivecustomer.mp3");

  useEffect(() => {
    requestPermissionNotificationWeb();
    if (token) {
      navigator.serviceWorker.addEventListener("message", (message) => {
        try {
          triggerActiveUser(
            message.data["firebase-messaging-msg-data"].notification
          );
        } catch (err) {
          console.log("Error", err);
        }
      });
    }
  }, []);

  const triggerActiveUser = (data) => {
    audio.play();
    toast({
      title: data.title,
      description: data.body,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  if (!token || !user) {
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
        <Route path="/home" component={HomeBody}>
          <HomeBody />
        </Route>
        <Route path="/active" component={ActiveCustomers}>
          <ActiveCustomers />
        </Route>
        <Route path="/sales" component={TotalSales}>
          <TotalSales />
        </Route>
        <Route path="/pending" component={TotalSales}>
          <PendingTransactions />
        </Route>
        <Route path="/pendingDetail" component={TotalSales}>
          <PendingTransactionsDetail />
        </Route>
        <Route path="/inventory" component={Inventory}>
          <Inventory />
        </Route>
        <Route path="/inventoryDetail" component={InventoryDetails}>
          <InventoryDetails />
        </Route>
        <Route path="/salesDetail" component={SalesDetails}>
          <SalesDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default VendorHome;
