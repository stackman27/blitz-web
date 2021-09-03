import React from 'react';
import './WaitingReceipt.css';
import { Box, Text, Image } from '@chakra-ui/react';

function WaitingReceipt() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh">
      <div id="pulse" onClick={() => window.location.reload()}>
        <Box
          style={{
            width: '100%',
            marginTop: 60,
            fontWeight: '600',
            fontSize: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            src={'/img/blitzlogo.png'}
            fit="contain"
            width={'20%'}
            borderRadius="8"
            margin="auto"
            height={'20%'}
            background="red"
          />
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
            }}>
            Click to update
          </Text>
        </Box>
      </div>
    </Box>
  );
}

export default WaitingReceipt;
