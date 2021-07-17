/* eslint-disable react/prop-types */
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
// import { IoLogoApple } from "react-icons/io5";
// import { FcGoogle } from "react-icons/fc";
import BlitzVendor from './BlitzVendor';
import BlitzCustomer from './BlitzCustomer';

function TwoSides({ signIn }) {
  return (
    <Box
      display="flex"
      justifyContent="start"
      flexDir="row"
      alignItems="center"
      width="100%"
      height="150vh"
      paddingTop="28"
      paddingBottom="20">
      <Flex
        width="50%"
        height="100%"
        flexDir="column"
        background="#0A63BC"
        justifyContent="space-evenly">
        <BlitzVendor />
        {/* 
        <Flex justifyContent="center" paddingBottom="5">
          <Button
            background="#fff"
            onClick={() => signIn()}
            boxShadow="base"
            leftIcon={<FcGoogle />}
          >
            <Text color="#444444"> Sign in</Text>
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button
            background="#222222"
            onClick={() => signIn()}
            boxShadow="base"
            leftIcon={<IoLogoApple color="#fff" />}
          >
            <Text color="#fff"> Sign in</Text>
          </Button>
        </Flex> */}
      </Flex>

      <Flex
        width="50%"
        height="100%"
        flexDir="column"
        background="#fafafa"
        justifyContent="space-evenly">
        <BlitzCustomer />

        {/* <Flex justifyContent="center" paddingBottom="5">
          <Button background="#fff" boxShadow="base" leftIcon={<FcGoogle />}>
            <Text color="#444444"> Play Store</Text>
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button
            background="#222222"
            boxShadow="base"
            leftIcon={<IoLogoApple color="#fff" />}
          >
            <Text color="#fff"> App Store</Text>
          </Button>
        </Flex> */}
      </Flex>
    </Box>
  );
}

export default TwoSides;
