import React from "react";
import { Text, Button, Flex, Box, Image } from "@chakra-ui/react";

function BlitzCustomer() {
  return (
    <Box width="100%" height="90%" paddingBottom="20" paddingTop="10">
      <Text
        color="#0A63BC"
        fontWeight="extrabold"
        fontSize="large"
        textAlign="center"
        letterSpacing={2.5}
      >
        BLITZ FOR CUSTOMERS
      </Text>
      <Text
        fontWeight="extrabold"
        textAlign="center"
        paddingTop="5"
        fontSize="32"
        color="#333333"
        width="70%"
        margin="auto"
      >
        Scan items of your choice and we'll add it to your cart.
      </Text>

      <Box height="100%" width="100%" alignSelf="start" marginTop="10">
        <Image
          src={"/img/customer2.png"}
          fit="contain"
          width={"85%"}
          height={"85%"}
          background="#fafafa"
          margin="auto"
        />
      </Box>

      {/* <Text
        fontWeight="extrabold"
        textAlign="center"
        paddingTop="5"
        fontSize="52"
        color="#fff"
        width="60%"
      >
        Scan, Pay, Verify and Leave. It's that simple
      </Text> */}
    </Box>
  );
}

export default BlitzCustomer;
