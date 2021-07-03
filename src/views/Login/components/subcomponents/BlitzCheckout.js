import React from "react";
import { Text, Box } from "@chakra-ui/react";

function BlitzCheckout() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      width="85%"
      margin="auto"
      paddingTop="28"
      paddingBottom="20"
    >
      <Text
        color="#0A63BC"
        fontWeight="extrabold"
        fontSize="large"
        letterSpacing={2.5}
      >
        BLITZ CHECKOUT
      </Text>
      <Text
        fontWeight="extrabold"
        textAlign="center"
        paddingTop="5"
        fontSize="52"
        width="60%"
      >
        Scan, Pay, Verify and Leave. It's that simple
      </Text>
    </Box>
  );
}

export default BlitzCheckout;
