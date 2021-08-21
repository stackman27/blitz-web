/* eslint-disable react/no-children-prop */
import React from 'react';
import {
  Text,
  Flex,
  Box,
  Image,
  Input,
  Badge,
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

function InventoryBatchDetailsContainer(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { stateProps } = props;
  const { item } = stateProps;
  const { functionalProps } = props;
  const newValue =
    item.batch_data?.count !== stateProps.itemCountVal ||
    item.batch_data?.amount !== stateProps.batchItemAmount;

  return (
    <Flex justifyContent={'center'} my="10">
      <Flex
        width={[
          '90%', // 480px upwards
          '80%', // 768px upwards
          '55%', // 992px upwards
        ]}
        fontFamily="Avenir"
        flexDirection={'column'}>
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
          <Text fontSize={20} fontWeight="500" color="#555555">
            {item.product_name}
          </Text>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={7}>
          <Text fontSize={18} fontWeight="500" color="gray">
            UPC
          </Text>
          <Box display="flex" flexDir="row" alignItems="center">
            <Text fontSize={20} fontWeight="500" color="#333333">
              {item.upc}
            </Text>
          </Box>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            Price Per Item
          </Text>
          <Box display="flex" flexDir="row" alignItems="flex-end">
            <Text fontSize={20} fontWeight="500" color="#333333">
              ${item.sell_price?.toFixed(2)}
            </Text>
          </Box>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            Discount Amount
          </Text>
          <Box display="flex" flexDir="row" alignItems="flex-end">
            <Text fontSize={20} fontWeight="500" color="#333333">
              -$
              {(
                stateProps.itemCountVal * item.sell_price -
                stateProps.batchItemAmount
              ).toFixed(2)}
            </Text>
          </Box>
        </Flex>

        <Flex
          flex={1}
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={3}>
          <Text fontSize={18} fontWeight="500" color="gray">
            Batch Count
          </Text>
          <Box display="flex" flexDir="row" alignItems="flex-end">
            <Input
              variant="flushed"
              inputMode="numeric"
              placeholder={'Batch Count'}
              value={stateProps.itemCountVal}
              onChange={(e) => functionalProps.setItemCountVal(e.target.value)}
              fontSize={22}
              marginLeft={10}
              textAlign={'right'}
              fontWeight="500"
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
            Batch Total Price
          </Text>
          <Box display="flex" flexDir="row" alignItems="flex-end">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.500"
                inputMode="decimal"
                fontSize="1.2em"
                children="$"
              />
              <Input
                placeholder="Batch Total Price"
                variant="flushed"
                value={`${stateProps.batchItemAmount}`}
                onChange={(e) =>
                  functionalProps.setBatchItemAmount(e.target.value)
                }
                fontSize={22}
                textAlign={'right'}
                fontWeight={'500'}
              />
            </InputGroup>
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
            disabled={!newValue}
            mx={5}
            onClick={() => functionalProps.updateBatchItem()}
            isLoading={stateProps.isLoading}>
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
        removeItem={functionalProps}
      />
    </Flex>
  );
}

function ConfirmationModal({ onClose, isOpen, removeItem }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove Batch Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text> Are you sure you want to remove this batch item? </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="ghost"
            color="red"
            onClick={() => removeItem.removeBatchItem()}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InventoryBatchDetailsContainer;
