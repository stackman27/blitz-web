import React from 'react';
import { Text, Flex } from '@chakra-ui/react';

function NoBatchItemsContainer() {
  return (
    <Flex justifyContent={'center'} height="50vh" alignItems="center">
      <Text fontSize={44} fontWeight="bold" color="#bbbbbb">
        No Batch Items
      </Text>
    </Flex>
  );
}

export default NoBatchItemsContainer;
