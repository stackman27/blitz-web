import React, { useState, useEffect } from "react";
import { Text, Flex, Box, Image, List, ListItem } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getSalesDetails } from "../../fb-api-calls/FirebaseSales";
import { IoCart } from "react-icons/io5";

function SalesDetails() {
  const { state } = useLocation();
  const [sales, setSales] = useState({});

  useEffect(() => {
    getSalesDetails(state.rId).then((res) => {
      setSales(res);
    });
  }, []);

  const RenderCheckoutItems = ({ item }) => (
    <Box
      display="flex"
      flex={1}
      my={10}
      justifyContent={"space-between"}
      flexDir="row"
      alignItems="flex-start"
    >
      <Box display="flex" flexDir="row">
        <Box width="20" height="20">
          <Image
            src={item.img}
            borderRadius="100"
            fit="contain"
            background="#ddd"
            width={"100%"}
            height={"100%"}
          />
        </Box>

        <Box mx="2">
          <Text fontWeight="500" fontSize={20}>
            {item.product_name}
          </Text>
          <Flex flexDir="row">
            <Text fontWeight="400">Weight: {item.size}</Text>
            &nbsp; &nbsp;
            <Text style={{ color: "#bbb" }}>|</Text>
            &nbsp; &nbsp;
            <Text fontWeight="600" color="#0A63BC">
              Count: x{item.purchaseCount ? item.purchaseCount : 1}
            </Text>
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
    <Flex justifyContent={"center"} my="10">
      <Flex width="55%" fontFamily="Avenir" flexDirection={"column"}>
        <Box
          display="flex"
          flex={1}
          flexDir="row"
          justifyContent="space-between"
          paddingBottom="2"
        >
          <Box
            display="flex"
            flexDir="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="20" height="20">
              <Image
                src={sales.purchaseInfo?.userImg}
                borderRadius="100"
                fit="contain"
                background="#ddd"
                width={"100%"}
                height={"100%"}
              />
            </Box>

            <Box mx="2">
              <Text fontSize="22" fontWeight="bold">
                {sales.purchaseInfo && sales.purchaseInfo.userName}
              </Text>
              <Box display="flex" flexDir="row">
                <IoCart color="#222222" size="25" />
                <Text fontSize="18" fontWeight="500" mx={1}>
                  {sales.purchaseInfo &&
                    sales.purchaseInfo.purchaseInfo.cartItems.length}{" "}
                  Items
                </Text>
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDir="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box mx="2">
              <Text
                fontSize="30"
                fontWeight="bold"
                textAlign="right"
                color="#0A63BC"
              >
                $
                {sales.purchaseInfo &&
                  sales.purchaseInfo.purchaseInfo.total.toFixed(2)}
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
          px={2}
        >
          <ShowTaxesInfo
            purchaseInfo={
              sales.purchaseInfo ? sales.purchaseInfo.purchaseInfo.subTotal : 0
            }
            labelDesc={"Sub Total"}
          />

          {sales.purchaseInfo &&
            sales.purchaseInfo.purchaseInfo.salesTax > 0 && (
              <ShowTaxesInfo
                purchaseInfo={
                  sales.purchaseInfo
                    ? sales.purchaseInfo.purchaseInfo.salesTax
                    : 0
                }
                labelDesc={"Sales Tax"}
              />
            )}

          {sales.purchaseInfo &&
            sales.purchaseInfo.purchaseInfo.sugarTax > 0 && (
              <ShowTaxesInfo
                purchaseInfo={
                  sales.purchaseInfo
                    ? sales.purchaseInfo.purchaseInfo.sugarTax
                    : 0
                }
                labelDesc={"Sugar Tax"}
              />
            )}

          <ShowTaxesInfo
            purchaseInfo={
              sales.purchaseInfo ? sales.purchaseInfo.purchaseInfo.blitzFee : 0
            }
            labelDesc={"Blitz Fee"}
          />

          {sales.purchaseInfo && sales.purchaseInfo.purchaseInfo.crvFee > 0 && (
            <ShowTaxesInfo
              purchaseInfo={
                sales.purchaseInfo ? sales.purchaseInfo.purchaseInfo.crvFee : 0
              }
              labelDesc={"CRV Fee"}
            />
          )}

          {sales.purchaseInfo &&
            sales.purchaseInfo.purchaseInfo.blitzDiscount > 0 && (
              <Flex flexDir="row" justifyContent="space-between" py={1}>
                <Text
                  style={{ fontFamily: "Avenir", fontSize: 16, color: "green" }}
                >
                  Blitz 20% Off
                </Text>
                <Text
                  style={{
                    fontFamily: "Avenir",
                    fontSize: 18,
                    fontWeight: "500",
                    color: "green",
                  }}
                >
                  -$
                  {sales.purchaseInfo.purchaseInfo &&
                    sales.purchaseInfo.purchaseInfo.blitzDiscount.toFixed(2)}
                </Text>
              </Flex>
            )}
        </Flex>

        <Box borderBottom="1px" borderBottomColor="gray.200">
          <List height="500" overflow="auto">
            <ListItem>
              {sales.purchaseInfo &&
                sales.purchaseInfo.purchaseInfo.cartItems.map((item, index) => (
                  <RenderCheckoutItems item={item} />
                ))}
            </ListItem>
          </List>
        </Box>
      </Flex>
    </Flex>
  );
}

function ShowTaxesInfo({ purchaseInfo, labelDesc }) {
  return (
    <Flex flexDir="row" justifyContent="space-between" py={1}>
      <Text
        style={{
          fontFamily: "Avenir",
          fontSize: 16,
          color: "#222222",
        }}
      >
        {labelDesc}
      </Text>
      <Text
        style={{
          fontFamily: "Avenir",
          fontSize: 18,
          fontWeight: "500",
          color: "#222222",
        }}
      >
        ${purchaseInfo.toFixed(2)}
      </Text>
    </Flex>
  );
}

export default SalesDetails;
