/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  Flex,
  Box,
  Image,
  List,
  Stack,
  ListItem,
  Spinner,
  Badge,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoPricetag, IoLayers } from 'react-icons/io5';
import {
  getInventory,
  getMoreInventory,
} from '../../fb-calls/FirebaseInventory';
import FilterOptions from './components/FilterOptions';
import { UserContext } from '../../context/UserContext';

function Inventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [, setNumItems] = useState(0);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    appliedFilterData();
  }, []);

  const appliedFilterData = (filterValue) => {
    getInventory(currentUser.uid, filterValue).then((res) => {
      setItems(res[0]);
      setNumItems(res[1]);
      setLastDoc(res[2]);
      setIsLoading(false);
    });
  };

  const getMoreInventoryCall = () => {
    if (lastDoc) {
      setShowMoreLoading(true);
      getMoreInventory(currentUser.uid, lastDoc).then((res) => {
        setItems([...items, ...res[0]]);
        setLastDoc(res[1]);
        setShowMoreLoading(false);
      });
    }
  };

  const RenderInventoryItems = ({ item }) => (
    <Link
      to={{
        pathname: '/inventoryDetail',
        state: { pId: Number(item.upc) },
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
        borderBottomColor="lightgray">
        <Box display="flex" flexDir="row">
          <Image
            src={
              item.img
                ? item.img
                : 'https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png'
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
                    px={1}>
                    <IoPricetag size={12} color="gray" />
                    <Badge px={2}>{item.department}</Badge>
                  </Flex>
                )}
                {item.has_crv && (
                  <Badge bgColor="#FFCD4630" px={2}>
                    CRV
                  </Badge>
                )}
                {item.has_sugar_tax && (
                  <Badge bgColor="#DD514430" px={2}>
                    Sugar Tax
                  </Badge>
                )}
                {item.has_sales_tax && (
                  <Badge bgColor="#1aa26030" px={2}>
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

  if (isLoading) {
    return (
      <Flex justifyContent={'center'} height="50vh" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex justifyContent={'center'} my="10">
      <Flex width="60%" fontFamily="Avenir" flexDirection={'column'}>
        <Box
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px"
          borderBottomColor="gray.200"
          paddingBottom="1">
          <Text fontSize={30} fontWeight="bold">
            Inventory
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <IoLayers size={25} />
            <Text fontSize={24} fontWeight="500">
              &nbsp; 1000+ items
            </Text>
          </Box>
        </Box>

        <FilterOptions dataFilter={appliedFilterData} />

        <Box>
          <List>
            <ListItem>
              {items.map((i, index) => (
                <RenderInventoryItems key={index} item={i} />
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
              onClick={() => getMoreInventoryCall()}
              isLoading={showMoreLoading}>
              Load More
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Inventory;
