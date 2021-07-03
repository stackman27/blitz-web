import React from "react";
import { Text, Box, Image } from "@chakra-ui/react";

function BlitzVendor() {
  return (
    <Box width="100%" height="90%" paddingBottom="20" paddingTop="10">
      <Text
        color="lightgray"
        fontWeight="extrabold"
        fontSize="large"
        textAlign="center"
        letterSpacing={2.5}
      >
        BLITZ FOR VENDORS
      </Text>
      <Text
        fontWeight="extrabold"
        textAlign="center"
        paddingTop="5"
        fontSize="32"
        color="#fff"
        width="70%"
        margin="auto"
      >
        Manage your Sales and Inventory
      </Text>

      <Box height="100%" width="100%" alignSelf="start" marginTop="10">
        <Image
          src={"/img/vendor1.png"}
          fit="contain"
          width={"85%"}
          height={"85%"}
          background="#0A63BC"
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

export default BlitzVendor;
