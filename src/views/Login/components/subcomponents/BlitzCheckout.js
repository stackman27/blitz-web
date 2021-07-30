import React from 'react';
import { Text, Box, Button } from '@chakra-ui/react';

function BlitzCheckout() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      width="85%"
      margin="auto"
      paddingTop="44"
      paddingBottom="20">
      <Text
        color="#0A63BC"
        fontWeight="extrabold"
        fontSize="large"
        letterSpacing={2.5}>
        BLITZ CHECKOUT
      </Text>
      <Text
        fontWeight="extrabold"
        textAlign="center"
        paddingTop="5"
        fontSize="52"
        width="60%">
        Scan, Pay, Verify and Leave. It&apos;s that simple
      </Text>
      <br />
      <Text
        width="55%"
        textAlign="center"
        fontSize="22"
        color="gray"
        fontWeight="500"
        letterSpacing={0.3}>
        Provide a fast and modern checkout service to your customers, including
        an enhanced Point of Sale system.
      </Text>
      <br />
      <Button bg="#0A63BC" color="#fff" px={10} py={6}>
        Request a Demo
      </Button>
    </Box>
  );
}

export default BlitzCheckout;
