import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import VendorHome from './views/index.js';

function App() {
  return (
    <ChakraProvider>
      <VendorHome />
    </ChakraProvider>
  );
}

export default App;
