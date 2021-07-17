/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Box,
  Image,
  List,
  ListItem,
  Spinner,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getSalesReceipts } from '../../fb-calls/FirebaseSales.js';
import moment from 'moment';

function TotalSales() {
  const [isLoading, setIsLoading] = useState(true);
  const [receipts, setReceipts] = useState([]);
  const [, setNumReceipts] = useState(0);

  useEffect(() => {
    getLimitedReceipts();
  }, []);

  const getLimitedReceipts = () => {
    getSalesReceipts().then((res) => {
      setReceipts(res[0]);
      setNumReceipts(res[1]);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return (
      <Flex justifyContent={'center'} height="50vh" alignItems="center">
        <Spinner />
      </Flex>
    );
  }
  if (receipts.length <= 0) {
    return (
      <Flex justifyContent={'center'} height="50vh" alignItems="center">
        <Text fontSize={44} fontWeight="bold" color="#bbbbbb">
          No Sales Receipts
        </Text>
      </Flex>
    );
  }

  const RenderSalesReceipts = ({ item }) => (
    <Link
      to={{
        pathname: '/salesDetail',
        state: { rId: item.receiptId },
      }}>
      <Box
        display="flex"
        flex={1}
        paddingTop={5}
        paddingBottom={5}
        justifyContent={'space-between'}
        flexDir="row"
        alignItems="flex-start"
        borderBottom="1px"
        borderBottomColor="gray.100">
        <Box display="flex" flexDir="row">
          <Box width="16" height="16">
            <Image
              src={item.purchaseInfo.userImg}
              borderRadius="100"
              fit="contain"
              background="#ddd"
              width={'100%'}
              height={'100%'}
            />
          </Box>
          <Box mx="2" display="flex" justifyContent="center" flexDir="column">
            <Text fontWeight="500" fontSize="20">
              {item.purchaseInfo.userName}
            </Text>
            <Text fontSize="18" fontWeight="400">
              {moment(item.timestamp.toDate()).format('MMMM Do YYYY')}
            </Text>
          </Box>
        </Box>

        <Box display="flex" flexDir="row">
          <Box mx="2">
            <Text fontSize="22" fontWeight="600" textAlign="right">
              ${item.purchaseInfo.purchaseInfo.total.toFixed(2)}
            </Text>
            {item.purchaseInfo.purchaseInfo.discountUsed ? (
              <Text
                fontSize="18"
                fontWeight="500"
                textAlign="end"
                color="green">
                20% off Blitz
              </Text>
            ) : (
              <Text fontSize="18" fontWeight="400" textAlign="end">
                Tax + Fees
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );

  return (
    <Flex justifyContent={'center'} my="10">
      <Flex width="55%" fontFamily="Avenir" flexDirection={'column'}>
        <Box
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px"
          borderBottomColor="gray.200"
          paddingBottom="1">
          <Text fontSize={30} fontWeight="bold">
            Sales History
          </Text>
          <Box display="flex" flexDir="row" alignItems="center"></Box>
        </Box>

        <Box>
          <List>
            <ListItem>
              {receipts?.map((i, index) => (
                <RenderSalesReceipts key={index} item={i} />
              ))}
            </ListItem>
          </List>
          <Flex alignItems="center" justifyContent="center" my="50">
            <Button
              background="#eee"
              borderColor="#ddd"
              borderWidth="1px"
              size="md"
              px={'28'}
              onClick={() => getLimitedReceipts()}>
              Load More
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default TotalSales;
