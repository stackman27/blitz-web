/* eslint-disable react/prop-types */
import React from 'react';
import { Text, Box, Flex, Image, Button } from '@chakra-ui/react';
import { IoLogoApple } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';

function Header({ signIn }) {
  return (
    <Flex
      justifyContent={'center'}
      flexDir={'row'}
      width="100%"
      height="10%"
      position="fixed"
      top="0"
      opacity="95%"
      bgColor="#fff"
      zIndex={9}>
      <Flex
        width="85%"
        paddingBottom="5"
        paddingTop="5"
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Flex flexDir="row" justifyContent="start" alignItems="center">
          <Image
            src={'/img/blitzlogo.png'}
            fit="contain"
            width={'14%'}
            borderRadius="8"
            height={'14%'}
            background="red"
          />
          &nbsp; &nbsp; &nbsp;
          <Text
            fontSize="4xl"
            paddingBottom={2}
            color="#0A63BC"
            fontWeight="extrabold"
            fontStyle="italic"
            _hover={{ textDecoration: 'none' }}
            href={'/'}>
            Blitz
          </Text>
        </Flex>

        <Box
          display="flex"
          flexDir={'row'}
          alignItems="center"
          justifyContent="space-evenly"
          width="60%">
          <Text fontFamily="Avenir" fontWeight="500">
            About us
          </Text>
          <Text fontFamily="Avenir" fontWeight="500">
            Browse Stores
          </Text>
          <Flex justifyContent="center">
            <Button
              background="#fff"
              size="sm"
              onClick={() => signIn()}
              boxShadow="base"
              leftIcon={<FcGoogle />}>
              <Text color="#444444"> Sign in</Text>
            </Button>
            &nbsp; &nbsp; &nbsp;
            <Button
              size="sm"
              background="#222222"
              onClick={() => signIn()}
              boxShadow="base"
              leftIcon={<IoLogoApple color="#fff" />}>
              <Text color="#fff"> Sign in</Text>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Header;
