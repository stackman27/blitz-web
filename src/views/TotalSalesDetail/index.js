/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Text, Flex, Box, Image, List, ListItem } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { getSalesDetails } from '../../fb-calls/FirebaseSales';
import { IoCart } from 'react-icons/io5';
import { UserContext } from '../../context/UserContext';
import { purchaseItemCountTemporaryFix } from '../../util/Calculations';
import PriceInfo from '../../components/PriceInfo';

function SalesDetails() {
  const { state } = useLocation();
  const [sales, setSales] = useState({});
  const currentUser = useContext(UserContext);

  useEffect(() => {
    getSalesDetails(currentUser.uid, state.rId).then((res) => {
      setSales(res);
    });
  }, []);

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
          <Text fontWeight="500" fontSize={20}>
            {item.product_name}
          </Text>
          <Flex flexDir="row">
            <Text fontWeight="400">Weight: {item.size}</Text>
            &nbsp; &nbsp;
            <Text style={{ color: '#bbb' }}>|</Text>
            &nbsp; &nbsp;
            <Text fontWeight="600" color="#0A63BC">
              x{item.purchaseCount || 1}
            </Text>
            &nbsp; &nbsp;
            {item.contains_promotion && (
              <>
                <Text style={{ color: '#bbb' }}>|</Text>
                <Text fontWeight="600" color="#1aa260" marginLeft="3">
                  Discount: ${item.promotionItemDiscount.toFixed(2)} off
                </Text>
              </>
            )}
          </Flex>
        </Box>
      </Box>

      <Box display="flex" flexDir="row">
        <Box mx="2">
          <Text fontSize={20} fontWeight="600" textAlign="right">
            ${item.sell_price.toFixed(2)}
          </Text>
        </Box>
      </Box>
    </Box>
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
          flex={1}
          flexDir="row"
          justifyContent="space-between"
          paddingBottom="2">
          <Box
            display="flex"
            flexDir="row"
            justifyContent="center"
            alignItems="center">
            <Box width="20" height="20">
              <Image
                src={sales.purchaseInfo?.userImg}
                borderRadius="100"
                fit="contain"
                background="#ddd"
                width={'100%'}
                height={'100%'}
              />
            </Box>

            <Box mx="2">
              <Text fontSize="22" fontWeight="bold">
                {sales.purchaseInfo?.userName}
              </Text>
              <Box display="flex" flexDir="row">
                <IoCart color="#222222" size="25" />
                <Text fontSize="18" fontWeight="500" mx={1}>
                  {purchaseItemCountTemporaryFix(
                    sales.purchaseInfo?.purchaseInfo,
                  ) || sales.purchaseInfo?.purchaseInfo.cartItems.length}{' '}
                  Items
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
                ${sales.purchaseInfo?.purchaseInfo.total.toFixed(2)}
              </Text>
              <Text fontSize="16" textAlign="right">
                Total with Tax + Fee
              </Text>
            </Box>
          </Box>
        </Box>

        <Flex
          flexDir="column"
          paddingBottom="3"
          borderBottom="1px"
          borderBottomColor="gray.200"
          px={2}>
          <PriceInfo
            purchaseInfo={sales.purchaseInfo?.purchaseInfo.subTotal || 0}
            labelDesc={'Sub Total'}
            type={'taxFee'}
          />

          {sales.purchaseInfo?.purchaseInfo.salesTax > 0 && (
            <PriceInfo
              purchaseInfo={sales.purchaseInfo?.purchaseInfo.salesTax || 0}
              labelDesc={'Sales Tax'}
              type={'taxFee'}
            />
          )}

          {sales.purchaseInfo?.purchaseInfo.sugarTax > 0 && (
            <PriceInfo
              purchaseInfo={sales.purchaseInfo?.purchaseInfo.sugarTax || 0}
              labelDesc={'Sugar Tax'}
              type={'taxFee'}
            />
          )}

          <PriceInfo
            purchaseInfo={sales.purchaseInfo?.purchaseInfo.blitzFee || 0}
            labelDesc={'Blitz Fee'}
            type={'taxFee'}
          />

          {sales.purchaseInfo?.purchaseInfo.crvFee > 0 && (
            <PriceInfo
              purchaseInfo={sales.purchaseInfo?.purchaseInfo.crvFee || 0}
              labelDesc={'CRV Fee'}
              type={'taxFee'}
            />
          )}

          {sales.purchaseInfo?.purchaseInfo.batchItemDiscount > 0 && (
            <PriceInfo
              purchaseInfo={
                sales.purchaseInfo.purchaseInfo.batchItemDiscount || 0
              }
              labelDesc={'Batch Item Discounts'}
              type={'discount'}
            />
          )}

          {sales.purchaseInfo?.purchaseInfo.promoUsed && (
            <PriceInfo
              purchaseInfo={sales.purchaseInfo.purchaseInfo.promoDiscount || 0}
              labelDesc={'Promo 50% Off'}
              type={'discount'}
            />
          )}

          {sales.purchaseInfo?.purchaseInfo.bagUsed && (
            <PriceInfo
              purchaseInfo={sales.purchaseInfo.purchaseInfo.bagCount * 0.1 || 0}
              labelDesc={'Bag Amount'}
              type={'bag'}
            />
          )}
        </Flex>

        <Box borderBottom="1px" borderBottomColor="gray.200">
          <List height="500" overflow="auto">
            <ListItem>
              {sales.purchaseInfo?.purchaseInfo.cartItems.map((item, index) => (
                <RenderCheckoutItems key={index} item={item} />
              ))}
            </ListItem>
          </List>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SalesDetails;
