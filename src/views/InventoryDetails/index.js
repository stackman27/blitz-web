/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Text,
  Flex,
  Box,
  Image,
  Input,
  Badge,
  Switch,
  Select,
  useToast,
  HStack,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react';
import {
  getProductDetails,
  updateInventory,
  removeItem,
} from '../../fb-calls/FirebaseInventory';

function InventoryDetails() {
  const { state } = useLocation();
  const history = useHistory();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [originalVal, setOriginalVal] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [item, setItem] = useState({
    product_name: '',
    upc: '',
    size: '',
    upce: '',
    department: '',
    img: '',
    has_crv: false,
    sell_price: 0,
    sugar_tax: 0,
    crv_by_05_cents: 0,
    sales_tax: 0,
    blitz_item_discount: 0,
    has_sales_tax: false,
    has_sugar_tax: false,
  });

  useEffect(() => {
    return getAllData();
  }, []);

  const getAllData = () => {
    getProductDetails(state.pId).then((res) => {
      res.crv_by_05_cents = res.crv_by_05_cents * 0.05;
      setOriginalVal(res);
      setItem(res);
    });
  };

  const updateItem = () => {
    setIsLoading(true);
    updateInventory(state.pId, item).then(() => {
      toast({
        title: 'Successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      getAllData();
      setIsLoading(false);
    });
  };

  const deleteItem = () => {
    removeItem(state.pId).then(() => {
      toast({
        title: 'Successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      history.goBack();
    });
  };

  return (
    <Flex justifyContent={'center'} my="10">
      <Flex width="50%" fontFamily="Avenir" flexDirection={'column'}>
        <Flex
          flex={1}
          flexDir="row"
          justifyContent="space-between"
          alignItems="center">
          <Image
            src={
              item.img
                ? item.img
                : 'https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png'
            }
            width={100}
            height={100}
          />
          <Input
            variant="flushed"
            placeholder={'Product Name'}
            value={item.product_name}
            onChange={(e) => setItem({ ...item, product_name: e.target.value })}
            fontSize={20}
            marginLeft={10}
            textAlign={'right'}
            fontWeight="500"
          />
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            UPC
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <Input
              variant="flushed"
              name={'upc'}
              placeholder={'UPC'}
              onChange={(e) => setItem({ ...item, upc: e.target.value })}
              value={item.upc}
              fontSize={20}
              textAlign={'right'}
              fontWeight={'500'}
            />
          </Box>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            Weight
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <Input
              variant="flushed"
              name={'size'}
              placeholder={'Item size'}
              onChange={(e) => setItem({ ...item, size: e.target.value })}
              value={item.size}
              fontSize={20}
              textAlign={'right'}
              fontWeight={'500'}
            />
          </Box>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            Department
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <Select
              variant="filled"
              placeholder={'Select an item...'}
              value={item.department}
              onChange={(e) => setItem({ ...item, department: e.target.value })}
              required>
              <option value="Food">Food</option>
              <option value="Energy Drink">Energy Drink</option>
              <option value="Sports Drinks">Sports Drinks</option>
              <option value="Drinks">Drinks</option>
              <option value="Soda">Soda</option>
              <option value="Frozen Food">Frozen Food</option>
              <option value="Dairy">Dairy</option>
              <option value="Nuts/Seeds">Nuts/Seeds</option>
              <option value="Chips">Chips</option>
              <option value="Candies/Bars/Gum">Candies/Bars/Gum</option>
              <option value="Ice Creams">Ice Creams</option>
              <option value="Teas/coffees">Teas/coffees</option>
              <option value="Water/Juices">Water/Juices</option>
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Household Essentials">Household Essentials</option>
              <option value="Dry Tea/Coffee">Dry Tea/Coffee</option>
              <option value="Cheese">Cheese</option>
            </Select>
          </Box>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            Sell Price
          </Text>
          <Box display="flex" flexDir="row" alignItems="flex-end">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.500"
                fontSize="1.2em"
                children="$"
              />
              <Input
                placeholder="Enter Sell Price"
                variant="flushed"
                value={`${item.sell_price ? item.sell_price : 0}`}
                onChange={(e) =>
                  setItem({ ...item, sell_price: e.target.value })
                }
                fontSize={20}
                textAlign={'right'}
                fontWeight={'500'}
              />
            </InputGroup>
          </Box>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            CRV Fee
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.500"
                fontSize="1.2em"
                children="$"
              />
              <Input
                placeholder="Enter Sell Price"
                variant="flushed"
                value={`${item.crv_by_05_cents ? item.crv_by_05_cents : 0}`}
                onChange={(e) =>
                  setItem({
                    ...item,
                    crv_by_05_cents: e.target.value,
                    has_crv: Boolean(Number(e.target.value)),
                  })
                }
                fontSize={20}
                textAlign={'right'}
                fontWeight={'500'}
              />
            </InputGroup>
          </Box>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            Sugar tax
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.500"
                fontSize="1.2em"
                children="$"
              />
              <Input
                placeholder="Enter Sell Price"
                variant="flushed"
                value={`${item.sugar_tax ? item.sugar_tax : 0}`}
                onChange={(e) =>
                  setItem({
                    ...item,
                    sugar_tax: e.target.value,
                    has_sugar_tax: Boolean(Number(e.target.value)),
                  })
                }
                fontSize={20}
                textAlign={'right'}
                fontWeight={'500'}
              />
            </InputGroup>
          </Box>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            Sales Tax
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <Switch
              size="md"
              isChecked={Boolean(item.has_sales_tax)}
              value={Boolean(item.has_sales_tax)}
              onChange={(e) =>
                setItem({ ...item, has_sales_tax: !item.has_sales_tax })
              }
            />
          </Box>
        </Flex>

        <Box display="flex" flexDir="row" justifyContent="space-between" my={5}>
          <Text fontSize={18} fontWeight="500" color="gray">
            Tags
          </Text>
          <HStack spacing="15px">
            <Badge bgColor="#2C528C30" px={2}>
              {item.department}
            </Badge>
            {item.crv_by_05_cents > 0 && (
              <Badge bgColor="#FFCD4630" px={2}>
                CRV
              </Badge>
            )}
            {item.sugar_tax > 0 && (
              <Badge bgColor="#DD514430" px={2}>
                Sugar Tax
              </Badge>
            )}
            {item.has_sales_tax && (
              <Badge bgColor="#1aa26030" px={2}>
                Sales Tax
              </Badge>
            )}
          </HStack>
        </Box>

        <Box display="flex" justifyContent="flex-end" marginTop={10}>
          <Button
            colorScheme="blue"
            size="md"
            disabled={Object.is(item, originalVal)}
            mx={5}
            onClick={() => updateItem()}
            isLoading={isLoading}>
            Update Item
          </Button>

          <Button colorScheme="red" size="md" onClick={onOpen}>
            Remove Item
          </Button>
        </Box>
      </Flex>
      <ConfirmationModal
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        deleteItem={deleteItem}
      />
    </Flex>
  );
}

function ConfirmationModal({ onClose, isOpen, deleteItem }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text> Are you sure you want to delete this item? </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" color="red" onClick={() => deleteItem()}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InventoryDetails;
