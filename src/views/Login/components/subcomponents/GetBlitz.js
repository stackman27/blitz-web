import React from 'react';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

function GetBlitz() {
  return (
    <Flex width="100%" height="200">
      <Flex
        width="90%"
        padding="6"
        background="#fafafa"
        margin="auto"
        borderRadius="20">
        <Flex
          flexDir="row"
          justifyContent="space-between"
          width="95%"
          margin="auto">
          <Text fontWeight="bold" fontSize="x-large" color="#444444">
            Ready to use Blitz in your store?
          </Text>

          <Box>
            <Button bg="#0A63BC" color="#fff" size="md">
              Contact Blitz Sales
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default GetBlitz;
