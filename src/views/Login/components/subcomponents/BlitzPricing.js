import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

function BlitzPricing() {
  return (
    <Flex
      width="100%"
      height={575}
      background={'#fafafa'}
      paddingTop={20}
      paddingBottom={20}>
      <Flex
        flexDir="column"
        width="85%"
        height="100%"
        margin="auto"
        background="#0A63BC">
        <Box width="100%" paddingTop={20}>
          <Text
            color="#fff"
            fontWeight="extrabold"
            fontSize="26px"
            textAlign="center"
            letterSpacing={2.5}>
            BLITZ PRICING
          </Text>
          <Text
            paddingTop={2}
            textAlign="center"
            letterSpacing={1.5}
            fontSize="22"
            width="60%"
            margin="auto"
            fontWeight="bold"
            color="#dedede">
            No long term contract, No hardware cost, No hidden fees
          </Text>
        </Box>
        <Flex
          flexDir="row"
          justifyContent="space-evenly"
          width="100%"
          margin="auto">
          <Flex alignItems="center" flexDir="column" color="#fff">
            <Text fontSize={38} fontWeight="bold">
              $0.00
            </Text>
            <Text fontSize={18} fontWeight="semibold">
              Hardware cost
            </Text>
          </Flex>

          <Flex alignItems="center" flexDir="column" color="#fff">
            <Text fontSize={38} fontWeight="bold">
              $0.00
            </Text>
            <Text fontSize={18} fontWeight="semibold">
              Monthly fees
            </Text>
          </Flex>

          <Flex alignItems="center" flexDir="column" color="#fff">
            <Text fontSize={38} fontWeight="bold">
              2.5%
            </Text>
            <Text fontSize={18} fontWeight="semibold">
              Per transaction
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default BlitzPricing;
