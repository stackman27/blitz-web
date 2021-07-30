/* eslint-disable react/prop-types */
import React from 'react';
import { Flex } from '@chakra-ui/react';
import TwoSides from './subcomponents/TwoSides';
import BlitzCheckout from './subcomponents/BlitzCheckout';
import Footer from './Footer';
import BlitzInAction from './subcomponents/BlitzInAction';
import BlitzAsPos from './subcomponents/BlitzAsPos';
import GetBlitz from './subcomponents/GetBlitz';

function Body({ signIn }) {
  return (
    <Flex justifyContent={'center'} flexDir={'column'} width="100%">
      <BlitzCheckout />
      <TwoSides signIn={signIn} />
      <BlitzAsPos />
      <BlitzInAction />
      <GetBlitz />
      <Footer />
    </Flex>
  );
}

export default Body;
