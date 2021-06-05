import React from "react";
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
import { IoCart, IoArrowForwardCircle } from "react-icons/io5";

function VendorViewReceipt() {
  const toast = useToast();

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
            alt={itemLabel}
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
            <Image
              src="https://bit.ly/sage-adebayo"
              alt="Segun Adebayo"
              borderRadius="100"
              width="75"
              height="75"
            />
            <Box mx="2">
              <Text fontSize="22" fontWeight="bold">
                Segun Adebayo
              </Text>
              <Box display="flex" flexDir="row">
                <IoCart color="#222222" size="25" />
                <Text fontSize="18" fontWeight="500" mx={1}>
                  1 Items
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
                $3.43
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
              <RenderCheckoutItems
                itemLabel={"Taste Nirvana:Real Coconut Water with Pulp (Glass)"}
                itemImg={
                  "https://i5.walmartimages.com/asr/c28cd672-d72f-46f1-8f44-1477f930654f_1.d164bbb2fa9c9ef06337deeb491578fa.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff"
                }
                itemWeight={"1.00LT"}
                itemPrice={3.24}
              />
              <RenderCheckoutItems
                itemLabel={
                  "MANGOES SWEET & TANGY SUPERSNACKS ORGANIC DRIED FRUIT"
                }
                itemImg={
                  "https://i5.walmartimages.com/asr/90f0e452-1c6e-4f5b-ac17-438f1476d40e_3.abe7ed801568d5f66dd98f773099826f.png?odnHeight=450&odnWidth=450&odnBg=ffffff"
                }
                itemWeight={"1.1 Pounds"}
                itemPrice={2.5}
              />
            </ListItem>
          </List>
        </Box>

        <Box display="flex" justifyContent="flex-end" my="5">
          <Button
            colorScheme="green"
            size="lg"
            rightIcon={<IoArrowForwardCircle size={25} />}
            onClick={() =>
              toast({
                title: `Successfully approved`,
                status: "success",
                position: "top",
                isClosable: true,
              })
            }
          >
            Approve transaction
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default VendorViewReceipt;
