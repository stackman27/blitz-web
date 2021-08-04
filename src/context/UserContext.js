import React, { useState, createContext, useEffect } from 'react';
import firebase from '../Firebase';
import { getVendorInfo } from '../fb-calls/FirebaseLogin';

const auth = firebase.auth();

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((res) => {
      getVendorInfo(res.uid).then((doc) => {
        setCurrentUser(doc);
      });
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
