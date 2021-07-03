import React from "react";
import "./WaitingReceipt.css";
import { Box } from "@chakra-ui/react";

function WaitingReceipt() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="container.sm"
    >
      <span id="pulse"></span>
    </Box>
  );
}

export default WaitingReceipt;
