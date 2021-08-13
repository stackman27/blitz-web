import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

function Loading() {
  return (
    <Flex justifyContent={'center'} height="50vh" alignItems="center">
      <Spinner />
    </Flex>
  );
}

export default Loading;
