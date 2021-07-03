import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../App.css";
import Header from "../layout/Header";
import HomeBody from "./Home";
import TotalSales from "./TotalSales";
import ActiveCustomers from "./ActiveCustomers";
import Inventory from "./Inventory";
import InventoryDetails from "./InventoryDetails";
import SalesDetails from "./TotalSalesDetail";
import {
  requestPermissionNotificationWeb,
  getToken,
  getUser,
} from "../fb-api-calls/FirebaseHome";
import LoginScreen from "../views/Login/LoginScreen.js";

function VendorHome() {
  const token = getToken();
  const user = getUser();

  useEffect(() => {
    requestPermissionNotificationWeb();
  }, []);

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
