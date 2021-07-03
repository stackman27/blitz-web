import React, { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Box,
  Image,
  List,
  Stack,
  ListItem,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoPricetag, IoLayers } from "react-icons/io5";
import { getInventory } from "../../fb-api-calls/FirebaseInventory";
import FilterOptions from "./components/FilterOptions";

function Inventory() {
  const [items, setItems] = useState([]);
  const [numItems, setNumItems] = useState(0);

  useEffect(() => {
    appliedFilterData();
  }, []);

  const appliedFilterData = (filterValue) => {
    getInventory(filterValue).then((res) => {
      setItems(res[0]);
      setNumItems(res[1]);
    });
  };

  const RenderInventoryItems = ({ item }) => (
    <Link
      to={{
        pathname: "/inventoryDetail",
        state: { pId: Number(item.upc) },
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
        borderBottomColor="lightgray"
      >
        <Box display="flex" flexDir="row">
          <Image
            src={
              item.img
                ? item.img
                : "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"
            }
            borderRadius="100"
            width="75"
            height="75"
          />
          <Box mx="2">
            <Text fontWeight="500" fontSize="20">
              {item.product_name}
            </Text>
            <Box>
              <Text fontWeight="400">Weight: {item.size}</Text>
              <Stack direction="row" my={2}>
                {item.department && (
                  <Flex
                    flexDir="row"
                    bgColor="#2C528C10"
                    alignItems="center"
                    justifyContent="center"
                    px={1}
                  >
                    <IoPricetag size={12} color="gray" />
                    <Badge px={2}>{item.department}</Badge>
                  </Flex>
                )}
                {item.has_crv && (
                  <Badge bgColor="#1aa26030" px={2}>
                    CRV
                  </Badge>
                )}
                {item.has_sugar_tax && (
                  <Badge bgColor="#DD514430" px={2}>
                    Sugar Tax
                  </Badge>
                )}
                {item.has_sales_tax && (
                  <Badge bgColor="#FFCD4630" px={2}>
                    Sales Tax
                  </Badge>
                )}
              </Stack>
            </Box>
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
    </Link>
  );

  return (
    <Flex justifyContent={"center"} my="10">
      <Flex width="60%" fontFamily="Avenir" flexDirection={"column"}>
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
            Inventory
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <IoLayers size={25} />
            <Text fontSize={28} fontWeight="500">
              &nbsp; {numItems} items
            </Text>
          </Box>
        </Box>

        <FilterOptions dataFilter={appliedFilterData} />

        <Box>
          <List>
            <ListItem>
              {items.map((i, index) => (
                <RenderInventoryItems item={i} />
              ))}
            </ListItem>
          </List>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Inventory;