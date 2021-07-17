/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  List,
  ListItem,
  Button,
  useToast,
} from '@chakra-ui/react';
import { IoCart, IoArrowForwardCircle } from 'react-icons/io5';
import { runPostCheckout } from '../../fb-calls/FirebaseHome';

function VendorViewReceipt({ purchaseInfo }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const approvePurchase = () => {
    setIsLoading(true);
    // store the vendor information in some local storage
    runPostCheckout(
      purchaseInfo.purchaseInfo.vendorUid,
      purchaseInfo.userId,
      purchaseInfo.receiptId,
      purchaseInfo,
    ).then((res) => {
      if (res) {
        toast({
          title: 'Successfully approved',
          status: 'success',
          position: 'top',
          isClosable: true,
          duration: 2000,
        });
      } else {
        toast({
          title: 'Transaction doesnot exist',
          description:
            'The transaction is either already approved or hasnot been processed',
          status: 'error',
          position: 'top',
          isClosable: true,
          duration: 7000,
        });
      }
      setTimeout(function () {
        setIsLoading(false);
        window.location.reload();
      }, 1500);
    });
  };

  const RenderCheckoutItems = ({ item }) => (
    <Box
      display="flex"
      flex={1}
      my={10}
      justifyContent={'space-between'}
      flexDir="row"
      alignItems="flex-start">
      <Box display="flex" flexDir="row">
        <Box width="20" height="20">
          <Image
            src={item.img}
            borderRadius="100"
            fit="contain"
            background="#ddd"
            width={'100%'}
            height={'100%'}
          />
        </Box>
        <Box mx="2">
          <Text fontWeight="500" fontSize="20">
            {item.product_name}
          </Text>
          <Flex flexDir="row">
            <Text fontWeight="400">Weight: {item.size}</Text>
            &nbsp; &nbsp;
            <Text style={{ color: '#bbb' }}>|</Text>
            &nbsp; &nbsp;
            <Text fontWeight="600" color="#0A63BC">
              Count: x{item.purchaseCount}
            </Text>
          </Flex>
        </Box>
      </Box>

      <Box display="flex" flexDir="row">
        <Box mx="2">
          <Text fontSize="22" fontWeight="600" textAlign="right">
            ${item.sell_price.toFixed(2)}
          </Text>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Flex justifyContent={'center'} my="10">
      <Flex width="55%" fontFamily="Avenir" flexDirection={'column'}>
        <Box
          display="flex"
          flex={1}
          flexDir="row"
          justifyContent="space-between"
          paddingBottom="1"
          borderBottom="1px"
          borderBottomColor="gray.200">
          <Box
            display="flex"
            flexDir="row"
            justifyContent="center"
            alignItems="center">
            <Box width="16" height="16">
              <Image
                src={purchaseInfo?.userImg}
                borderRadius="100"
                fit="contain"
                background="#ddd"
                width={'100%'}
                height={'100%'}
              />
            </Box>

            <Box mx="2">
              <Text fontSize="22" fontWeight="bold">
                {purchaseInfo?.userName}
              </Text>
              <Box display="flex" flexDir="row">
                <IoCart color="#222222" size="25" />
                <Text fontSize="18" fontWeight="500" mx={1}>
                  {purchaseInfo.purchaseInfo?.cartItems.length} Items
                </Text>
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDir="row"
            justifyContent="center"
            alignItems="center">
            <Box mx="2">
              <Text
                fontSize="30"
                fontWeight="bold"
                textAlign="right"
                color="#0A63BC">
                ${purchaseInfo.purchaseInfo?.total.toFixed(2)}
              </Text>
              <Text fontSize="16" textAlign="right">
                Total with Tax + Fee
              </Text>
            </Box>
          </Box>
        </Box>

        <Box borderBottom="1px" borderBottomColor="gray.200">
          <List height="500" overflow="auto">
            <ListItem>
              {purchaseInfo.purchaseInfo?.cartItems.map((item, index) => (
                <RenderCheckoutItems key={index} item={item} />
              ))}
            </ListItem>
          </List>
        </Box>

        <Box display="flex" justifyContent="flex-end" my="5">
          <Button
            colorScheme="green"
            size="lg"
            isLoading={isLoading}
            rightIcon={<IoArrowForwardCircle size={25} />}
            onClick={() => approvePurchase()}>
            Approve transaction
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default VendorViewReceipt;
