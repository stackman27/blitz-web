import React from 'react';
import { Flex, Box, Text, Image } from '@chakra-ui/react';

function BlitzInAction() {
  return (
    <Flex
      flexDir="row"
      width="100%"
      justifyContent="space-between"
      marginTop={200}
      paddingBottom={50}>
      <Flex width="100%" margin="auto">
        <Box
          width="30%"
          marginLeft="100"
          marginTop={100}
          padding={10}
          paddingLeft={0}>
          <Text
            color="#0A63BC"
            fontWeight="extrabold"
            letterSpacing={2.5}
            fontSize={18}>
            IN LIVING COLOR
          </Text>
          <br />
          <Text fontWeight="extrabold" fontSize={40}>
            <span style={{ fontStyle: 'italic' }}>Blitz</span> in Action
          </Text>
        </Box>

        <Box
          display="flex"
          height="100%"
          width="70%"
          flexDir="row"
          overflow="hidden">
          <Image
            src={'/img/demoimg.jpeg'}
            fit="contain"
            width={'35%'}
            height={'45%'}
            padding={0}
            marginLeft={25}
            borderRadius={20}
          />
          <Image
            src={'/img/demoimg.jpeg'}
            fit="contain"
            width={'35%'}
            height={'45%'}
            padding={0}
            marginLeft={25}
            borderRadius={20}
          />
          <Image
            src={'/img/demoimg.jpeg'}
            fit="contain"
            width={'35%'}
            height={'45%'}
            padding={0}
            marginLeft={25}
            borderRadius={20}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default BlitzInAction;
