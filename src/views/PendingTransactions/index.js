import React, { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Box,
  List,
  ListItem,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { getPendingTransactions } from "../../fb-calls/FirebasePendingTransaction";
import { IoReloadCircle } from "react-icons/io5";

function PendingTransactions() {
  const [isLoading, setIsLoading] = useState(true);
  const [receipts, setReceipts] = useState([]);
  const [numTransactions, setNumTransactions] = useState(0);

  useEffect(() => {
    getPendingTransactions().then((res) => {
      setReceipts(res[0]);
      setNumTransactions(res[1]);
      setIsLoading(false);
    });
  }, []);

  const RenderPendingTransactions = ({ item }) => (
    <Link
      to={{
        pathname: "/pendingDetail",
        state: { rId: item.receiptId },
      }}
    >
      <Box
        display="flex"
        flex={1}
        paddingTop={5}
        paddingBottom={5}
        justifyContent={"space-between"}
        flexDir="row"
        alignItems="flex-start"
        borderBottom="1px"
        borderBottomColor="gray.100"
      >
        <Box display="flex" flexDir="row">
          <Box width="16" height="16">
            <Image
              src={item.userImg}
              borderRadius="100"
              fit="contain"
              background="#ddd"
              width={"100%"}
              height={"100%"}
            />
          </Box>
          <Box mx="2" display="flex" justifyContent="center" flexDir="column">
            <Text fontWeight="500" fontSize="20">
              {item.userName}
            </Text>
            <Text fontSize="18" fontWeight="400">
              {moment(item.timestamp.toDate()).format("MMMM Do YYYY")}
            </Text>
          </Box>
        </Box>

        <Box display="flex" flexDir="row">
          <Box mx="2">
            <Text fontSize="22" fontWeight="600" textAlign="right">
              ${item.purchaseInfo.total.toFixed(2)}
            </Text>
            {item.purchaseInfo.discountUsed ? (
              <Text
                fontSize="18"
                fontWeight="500"
                textAlign="end"
                color="green"
              >
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

  if (isLoading) {
    return (
      <Flex justifyContent={"center"} height="50vh" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  if (receipts.length <= 0) {
    return (
      <Flex justifyContent={"center"} height="50vh" alignItems="center">
        <Text fontSize={44} fontWeight="bold" color="#bbbbbb">
          No Pending Transactions
        </Text>
      </Flex>
    );
  }

  return (
    <Flex justifyContent={"center"} my="10">
      <Flex width="55%" fontFamily="Avenir" flexDirection={"column"}>
        <Box
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px"
          borderBottomColor="gray.200"
          paddingBottom="1"
        >
          <Text fontSize={30} fontWeight="bold">
            Pending Transactions
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <IoReloadCircle size={28} color="purple" />
            <Text fontSize={22} fontWeight="600">
              &nbsp;{numTransactions}
            </Text>
          </Box>
        </Box>

        <Box>
          <List>
            <ListItem>
              {receipts.map((i, index) => (
                <RenderPendingTransactions item={i} />
              ))}
            </ListItem>
          </List>
        </Box>
      </Flex>
    </Flex>
  );
}

export default PendingTransactions;
