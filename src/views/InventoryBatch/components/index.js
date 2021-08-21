import React from 'react';
import {
  Text,
  Flex,
  Box,
  Image,
  List,
  Stack,
  ListItem,
  Badge,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// import { IoPricetag } from 'react-icons/io5';

function BatchItemsListContainer(props) {
  const { stateProps, functionalProps } = props;

  return (
    <Flex justifyContent={'center'} my="10">
      <Flex
        width={[
          '55%',
          '90%', // 480px upwards
          '80%', // 768px upwards
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
            Batch Items
          </Text>
        </Box>

        <Box>
          <List>
            <ListItem>
              {stateProps.items.map((i, index) => (
                <RenderItem key={index} item={i} />
              ))}
            </ListItem>
          </List>
          {stateProps.isItemsRemaining && (
            <Flex alignItems="center" justifyContent="center" my="50">
              <Button
                background="#eee"
                borderColor="#ddd"
                borderWidth="1px"
                size="md"
                px={'28'}
                onClick={() => functionalProps.getMoreInventoryBatchItemCall()}
                isLoading={stateProps.showMoreLoading}>
                Load More
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

const RenderItem = ({ item }) => (
  <Link
    to={{
      pathname: '/inventoryBatchDetail',
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
              <Badge bgColor="#FFCD4630" px={2}>
                Batch Count: {item.batch_data.count}
              </Badge>

              {item.has_sales_tax && (
                <Badge bgColor="#1aa26030" px={2}>
                  Price Per Item: ${parseFloat(item.sell_price).toFixed(2)}
                </Badge>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDir="row">
        <Box mx="2">
          <Text fontSize="22" fontWeight="600" textAlign="right">
            ${parseFloat(item.batch_data.amount).toFixed(2)}
          </Text>
        </Box>
      </Box>
    </Box>
  </Link>
);

export default BatchItemsListContainer;
