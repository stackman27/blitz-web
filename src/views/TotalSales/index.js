/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
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
import {
  getSalesReceipts,
  getMoreReceipts,
} from '../../fb-calls/FirebaseSales.js';
import moment from 'moment';
import { UserContext } from '../../context/UserContext';

function TotalSales() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [isItemsRemaining, setIsItemsRemaining] = useState(true);
  const [receipts, setReceipts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [, setNumReceipts] = useState(0);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    getSalesReceipts(currentUser.uid).then((res) => {
      setReceipts(res[0]);
      setNumReceipts(res[1]);
      setLastDoc(res[2]);
      setIsLoading(false);
      if (res[1] < 10) {
        setIsItemsRemaining(false);
      }
    });
  }, []);

  const getMoreReceiptsCall = () => {
    if (lastDoc) {
      setShowMoreLoading(true);
      getMoreReceipts(currentUser.uid, lastDoc).then((res) => {
        setReceipts([...receipts, ...res[0]]);
        setLastDoc(res[2]);
        setShowMoreLoading(false);
        if (res[1] < 10) {
          setIsItemsRemaining(false);
        }
      });
    }
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
              src={item.purchaseInfo?.userImg}
              borderRadius="100"
              fit="contain"
              background="#ddd"
              width={'100%'}
              height={'100%'}
            />
          </Box>
          <Box mx="2" display="flex" justifyContent="center" flexDir="column">
            <Text fontWeight="500" fontSize="20">
              {item.purchaseInfo?.userName}
            </Text>
            <Text fontSize="18" fontWeight="400">
              {moment(item.timestamp?.toDate()).format('MMMM Do YYYY')}
            </Text>
          </Box>
        </Box>

        <Box display="flex" flexDir="row">
          <Box mx="2">
            <Text fontSize="22" fontWeight="600" textAlign="right">
              ${item.purchaseInfo?.purchaseInfo.total.toFixed(2)}
            </Text>
            {item.purchaseInfo?.purchaseInfo.discountUsed ? (
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
      <Flex
        width={[
          '55%',
          '90%', // 480px upwards
          '80%', // 768px upwards
          '70%',
          '55%', // 992px upwards
        ]}
        fontFamily="Avenir"
        flexDirection={'column'}>
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
          {isItemsRemaining && (
            <Flex alignItems="center" justifyContent="center" my="50">
              <Button
                background="#eee"
                borderColor="#ddd"
                borderWidth="1px"
                size="md"
                px={'28'}
                onClick={() => getMoreReceiptsCall()}
                isLoading={showMoreLoading}>
                Load More
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default TotalSales;
