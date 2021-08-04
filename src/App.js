import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import VendorHome from './views/index.js';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <VendorHome />
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
