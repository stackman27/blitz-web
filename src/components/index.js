import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../App.css";
import Header from "./Header/index.js";
import HomeBody from "./Home/HomeBody.js";
import TotalSales from "./TotalSales/index.js";
import ActiveCustomers from "./ActiveCustomers/index.js";
import Inventory from "./Inventory/index.js";
import InventoryDetails from "./Inventory/InventoryDetails";
import SalesDetails from "./TotalSales/SalesDetails.js";
import {
  requestPermissionNotificationWeb,
  getToken,
  getUser,
} from "./Home/FirebaseVHome";
import LoginScreen from "../Layout/Login/LoginScreen.js";

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
