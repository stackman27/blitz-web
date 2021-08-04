/* eslint-disable react/prop-types */
import React from 'react';
import { Flex } from '@chakra-ui/react';
import Fade from 'react-reveal/Fade';
import TwoSides from './subcomponents/TwoSides';
import BlitzCheckout from './subcomponents/BlitzCheckout';
import Footer from './Footer';
import BlitzInAction from './subcomponents/BlitzInAction';
import BlitzAsPos from './subcomponents/BlitzAsPos';
import GetBlitz from './subcomponents/GetBlitz';

function Body({ signIn }) {
  return (
    <Flex justifyContent={'center'} flexDir={'column'} width="100%">
      <Fade>
        <BlitzCheckout />
      </Fade>

      <Fade>
        <TwoSides signIn={signIn} />
      </Fade>

      <Fade>
        <BlitzAsPos />
      </Fade>

      <Fade>
        <BlitzInAction />
      </Fade>

      <GetBlitz />
      <Footer />
    </Flex>
  );
}

export default Body;
