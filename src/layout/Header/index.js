import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  useToast,
  MenuList,
  Skeleton,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Button,
  PopoverContent,
  Popover,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoChevronDownOutline } from 'react-icons/io5';
import { updatetoNFC, updatetoQR } from '../../fb-calls/FirebaseGlobal.js';
import { getVendorInfo, logOut } from '../../fb-calls/FirebaseHome';
import { vendorUid } from '../../util/Variables';
import '../../css/Header.css';

function Header() {
  const history = useHistory();
  const [vendorInfo, setVendorInfo] = useState({});

  useEffect(() => {
    getVendorInfo().then((res) => {
      setVendorInfo(res);
    });
  }, []);

  const logOutTrigger = () => {
    logOut().then(() => {
      localStorage.setItem('loginToken', null);
      localStorage.setItem('user', null);
      history.push('/');
      window.location.reload(); // trigger page reload to go to the directed page
    });
  };

  const NavLink = ({ label, href, style }) => (
    <Link
      className="headerlink-title"
      to={href}
      rel="noopener noreferrer"
      style={{ ...style }}>
      {label}
    </Link>
  );

  return (
    <Flex
      justifyContent={'center'}
      flexDir={'row'}
      borderBottom="1px"
      borderBottomColor="gray.200"
      position="sticky"
      top="0"
      background="#fefefe">
      <Flex
        width="85%"
        paddingBottom="5"
        paddingTop="5"
        alignItems={'center'}
        justifyContent={'space-evenly'}>
        <Box>
          <Link to={'/home'}>
            <Text
              fontSize="4xl"
              color="#0A63BC"
              fontWeight="extrabold"
              fontStyle="italic">
              Blitz
            </Text>
          </Link>
        </Box>

        <Box
          display="flex"
          flexDir={'row'}
          justifyContent="space-evenly"
          width="60%">
          <NavLink
            key={Math.random()}
            label={'Active Customers'}
            href={'/active'}
          />
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Text
                px={2}
                py={1}
                as={Flex}
                flexDir="row"
                alignItems="center"
                rounded={'md'}
                fontWeight={500}
                fontFamily="Avenir"
                color={'#222222'}
                _hover={{
                  textDecoration: 'none',
                  bg: '#0A63BC10',
                }}>
                Sales {'&'} Receipts&nbsp;
                <IoChevronDownOutline />
              </Text>
            </PopoverTrigger>
            <PopoverContent width="56">
              <Stack margin={0}>
                <NavLink
                  key={Math.random()}
                  style={{ padding: 10, borderRadius: 0 }}
                  label={'Total Sales'}
                  href={'/sales'}
                />

                <NavLink
                  key={Math.random()}
                  style={{ padding: 10, borderRadius: 0 }}
                  label={'Pending Transactions'}
                  href={'/pending'}
                />
              </Stack>
            </PopoverContent>
          </Popover>

          <NavLink
            key={Math.random()}
            label={'Inventory'}
            href={'/inventory'}
          />
          <NavLink
            key={Math.random()}
            label={'Analytics'}
            href={'/analytics'}
          />
        </Box>
        <ProfileMenu vendorInfo={vendorInfo} logOut={logOutTrigger} />
      </Flex>
    </Flex>
  );
}

function ProfileMenu({ vendorInfo, logOut }) {
  const toast = useToast();

  const updateCheckoutType = (type) => {
    if (type === 'nfc') {
      updatetoNFC(vendorUid).then(() => {
        toast({
          title: 'Successfully updated to NFC',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      });
    } else {
      updatetoQR(vendorUid).then(() => {
        toast({
          title: 'Successfully updated to QR Code',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      });
    }
  };

  return (
    <Menu>
      <Skeleton isLoaded>
        <MenuButton
          as={Button}
          minW={170}
          rightIcon={<IoChevronDownOutline />}
          style={{ height: 33 }}>
          {vendorInfo.storeName &&
            vendorInfo.storeName.replace(/(.{21})..+/, '$1…')}
        </MenuButton>
      </Skeleton>
      <MenuList>
        <MenuItem>{vendorInfo.storeName}</MenuItem>
        <MenuDivider />
        <MenuOptionGroup
          defaultValue="asc"
          title="Default Checkout Type"
          type="radio">
          <MenuItemOption value="asc" onClick={() => updateCheckoutType('nfc')}>
            NFC
          </MenuItemOption>
          <MenuItemOption value="desc" onClick={() => updateCheckoutType('qr')}>
            QR Code
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuItem onClick={() => logOut()}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}

Header.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  style: PropTypes.object,
};

ProfileMenu.propTypes = {
  vendorInfo: PropTypes.any,
  logOut: PropTypes.func,
};

export default Header;
