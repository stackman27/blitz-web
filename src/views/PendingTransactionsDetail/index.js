import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  List,
  ListItem,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useHistory } from "react-router-dom";
import { IoCart, IoArrowForwardCircle } from "react-icons/io5";
import { getTransactionDetails } from "../PendingTransactions/FirebasePending";
import { runPostCheckout } from "../Home/FirebaseVHome";

function PendingTransactionsDetail() {
  const { state } = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTx, setPendingTx] = useState({});
  const toast = useToast();

  useEffect(() => {
    getTransactionDetails(state.rId).then((res) => {
      console.log(res);
      setPendingTx(res);
    });
  }, []);

  const approvePurchase = () => {
    setIsLoading(true);
    // store the vendor information in some local storage
    runPostCheckout(
      pendingTx.purchaseInfo.vendorUid,
      pendingTx.userId,
      pendingTx.receiptId,
      pendingTx
    ).then(() => {
      toast({
        title: `Successfully approved`,
        status: "success",
        position: "top",
        isClosable: true,
        duration: 2000,
      });
      setTimeout(function () {
        setIsLoading(false);
        history.push("/sales");
        window.location.reload();
      }, 1500);
    });
  };

  const RenderCheckoutItems = ({
    itemLabel,
    itemPrice,
    itemImg,
    itemWeight,
  }) => (
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
            src={itemImg}
            borderRadius="100"
            fit="contain"
            background="#ddd"
            width={"100%"}
            height={"100%"}
          />
        </Box>
        <Box mx="2">
          <Text fontWeight="500" fontSize="20">
            {itemLabel}
          </Text>
          <Text fontWeight="400">Weight: {itemWeight}</Text>
        </Box>
      </Box>

      <Box display="flex" flexDir="row">
        <Box mx="2">
          <Text fontSize="22" fontWeight="600" textAlign="right">
            ${itemPrice.toFixed(2)}
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
          paddingBottom="1"
          borderBottom="1px"
          borderBottomColor="gray.200"
        >
          <Box
            display="flex"
            flexDir="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="16" height="16">
              <Image
                src={pendingTx?.userImg}
                borderRadius="100"
                fit="contain"
                background="#ddd"
                width={"100%"}
                height={"100%"}
              />
            </Box>

            <Box mx="2">
              <Text fontSize="22" fontWeight="bold">
                {pendingTx?.userName}
              </Text>
              <Box display="flex" flexDir="row">
                <IoCart color="#222222" size="25" />
                <Text fontSize="18" fontWeight="500" mx={1}>
                  {pendingTx.purchaseInfo?.cartItems.length} Items
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
                ${pendingTx.purchaseInfo?.total.toFixed(2)}
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
              {pendingTx.purchaseInfo?.cartItems.map((item, index) => (
                <RenderCheckoutItems
                  itemLabel={item.product_name}
                  itemImg={item.img}
                  itemWeight={item.size}
                  itemPrice={item.sell_price}
                />
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
            onClick={() => approvePurchase()}
          >
            Approve transaction
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default PendingTransactionsDetail;
