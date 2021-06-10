import React, { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Box,
  Image,
  Link,
  List,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { getVendorActiveUserInfo, removeActiveUser } from "./FirebaseAC";
import { IoPersonCircle, IoCart } from "react-icons/io5";
import moment from "moment";

function ActiveCustomers() {
  const [activeUser, setactiveUser] = useState([]);
  const [remUid, setRemUid] = useState("");

  useEffect(() => {
    const unsubscribe = getVendorActiveUserInfo().onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setactiveUser(data);
    });
    return () => unsubscribe();
  }, []);

  const removeUser = () => {
    removeActiveUser(remUid);
  };

  const getTimeUserInactive = (timestamp) => {
    return moment
      .utc(new Date(timestamp.toDate()).toUTCString())
      .local()
      .startOf("seconds")
      .fromNow(true);
  };

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
            Active Customers
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <IoPersonCircle size={28} color="green" />
            <Text fontSize={22} fontWeight="600">
              &nbsp;{activeUser.filter((item) => item.active === true).length}{" "}
            </Text>
          </Box>
        </Box>

        <Box>
          <RenderUser
            activeUser={activeUser}
            getTimeUserInactive={getTimeUserInactive}
            setRemUid={setRemUid}
            removeUser={removeUser}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

function RenderUser({
  activeUser,
  getTimeUserInactive,
  setRemUid,
  removeUser,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const RenderUserItem = ({ item }) => (
    <Box
      display="flex"
      flex={1}
      py={3}
      justifyContent={"space-between"}
      flexDir="row"
      alignItems="flex-start"
    >
      <Box display="flex" flexDir="row">
        <Box width="14" height="14">
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
          <Text fontWeight="400" fontSize="18">
            {item.product_name}
          </Text>
          <Text fontWeight="400">Weight: {item.size}</Text>
        </Box>
      </Box>

      <Box display="flex" flexDir="row">
        <Box mx="2">
          <Text fontSize="18" fontWeight="500" textAlign="right">
            ${item.sell_price.toFixed(2)}
          </Text>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Accordion allowMultiple>
      {activeUser.map((i, index) => (
        <AccordionItem background={i.active ? "#fff" : "#ddd"}>
          <AccordionButton>
            <Box
              display="flex"
              flex={1}
              py={3}
              justifyContent={"space-between"}
              flexDir="row"
              alignItems="flex-start"
            >
              <Box display="flex" flexDir="row">
                <Box width="14" height="14">
                  <Image
                    src={i.uImage}
                    borderRadius="100"
                    fit="contain"
                    background="#ddd"
                    width={"100%"}
                    height={"100%"}
                  />
                </Box>

                <Box mx="2">
                  <Text
                    fontWeight="500"
                    fontSize="20"
                    color={i.active ? "green" : "gray"}
                    textAlign="left"
                  >
                    {i.active
                      ? i.uName
                      : i.uName +
                        `- Inactive for ${getTimeUserInactive(i.timestamp)}`}
                  </Text>
                  <Box
                    display="flex"
                    flexDir="row"
                    justifyContent="flex-start"
                    alignItems="baseline"
                  >
                    <Box display="flex" flexDir="row">
                      <IoCart color="#222222" size="22" />
                      <Text fontWeight="400" fontSize="17">
                        &nbsp;{i.cart.length} items
                      </Text>
                    </Box>
                    {!i.active && (
                      <Link
                        style={{
                          alignSelf: "flex-start",
                          color: "red",
                          marginLeft: 10,
                        }}
                        onClick={() => {
                          onOpen();
                          setRemUid(i.uId);
                        }}
                      >
                        Remove User
                      </Link>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box display="flex" flexDir="column" alignItems="flex-end">
                <Text fontWeight="600" fontSize="20">
                  ${i.total.toFixed(2)}
                </Text>
                <AccordionIcon />
              </Box>
            </Box>
          </AccordionButton>

          <AccordionPanel pb={4}>
            <List>
              <ListItem>
                {i.cart.length > 0 &&
                  i.cart.map((it, index) => <RenderUserItem item={it} />)}
              </ListItem>
            </List>
          </AccordionPanel>
          <ConfirmationModal
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            removeUser={removeUser}
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function ConfirmationModal({ onClose, isOpen, removeUser }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text> Are you sure you want to remove this user? </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" color="red" onClick={() => removeUser()}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ActiveCustomers;
