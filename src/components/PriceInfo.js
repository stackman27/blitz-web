import React from 'react';
import { Text, Flex } from '@chakra-ui/react';

function PriceInfo({ purchaseInfo, labelDesc, type }) {
  return (
    <Flex flexDir="row" justifyContent="space-between" py={1}>
      <Text
        style={{
          fontFamily: 'Avenir',
          fontSize: 16,
          color: type === 'discount' ? 'green' : '#222222',
        }}>
        {labelDesc}
      </Text>
      <Text
        style={{
          fontFamily: 'Avenir',
          fontSize: 18,
          fontWeight: '500',
          color: type === 'discount' ? 'green' : '#222222',
        }}>
        {type === 'discount' && <span>-</span>}${purchaseInfo.toFixed(2)}
      </Text>
    </Flex>
  );
}

export default PriceInfo;
