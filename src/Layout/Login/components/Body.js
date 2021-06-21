import React from "react";
import { Text, Button, Flex, Box } from "@chakra-ui/react";
import TwoSides from "./subcomponents/TwoSides";
import BlitzCheckout from "./subcomponents/BlitzCheckout";

function Body({ signIn }) {
  return (
    <Flex justifyContent={"center"} flexDir={"column"} width="100%">
      <BlitzCheckout />

      <TwoSides signIn={signIn} />
    </Flex>
  );
}

export default Body;
