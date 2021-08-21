import React, { useContext } from 'react';
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
  Collapse,
  MenuDivider,
  Button,
  PopoverContent,
  Popover,
  PopoverTrigger,
  Stack,
  IconButton,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  IoChevronDownOutline,
  IoMenu,
  IoClose,
  // IoPersonCircle,
  // IoCart,
  // IoLayers,
  // IoAnalytics,
} from 'react-icons/io5';
import '../../styles/css/Header.css';
import { updatetoNFC, updatetoQR } from '../../fb-calls/FirebaseGlobal.js';
import { logOut } from '../../fb-calls/FirebaseHome';
import { UserContext } from '../../context/UserContext';
import { TABLET_SIZE, MOBILE_SIZE } from '../../styles/sizes/index.js';

function Header() {
  const [isMobile] = useMediaQuery(MOBILE_SIZE.MAX_WIDTH);
  const [isTablet] = useMediaQuery(TABLET_SIZE.MAX_WIDTH);
  const isDesktop = !isMobile && !isTablet;

  const currentUser = useContext(UserContext);
  const history = useHistory();

  const logOutTrigger = () => {
    logOut().then(() => {
      localStorage.setItem('loginToken', null);
      history.push('/');
      window.location.reload(); // trigger page reload to go to the directed page
    });
  };

  return (
    <Flex
      width={'100%'}
      justifyContent={'center'}
      flexDir={'row'}
      borderBottom="1px"
      borderBottomColor="gray.200"
      position="sticky"
      top="0"
      background="#fefefe">
      <Flex
        width={[
          '90%', // base
          '100%', // 480px upwards
          '100%', // 768px upwards
          '90%', // 992px upwards
        ]}
        paddingBottom="5"
        paddingTop="5"
        alignItems={'center'}
        justifyContent={'space-evenly'}>
        {isDesktop && (
          <DesktopNav currentUser={currentUser} logOutTrigger={logOutTrigger} />
        )}

        {isTablet && (
          <TabletNav currentUser={currentUser} logOutTrigger={logOutTrigger} />
        )}
      </Flex>
    </Flex>
  );
}

const NavLink = ({ label, href, style }) => (
  <Link
    className="headerlink-title"
    to={href}
    rel="noopener noreferrer"
    style={{ ...style }}>
    {label}
  </Link>
);

function DesktopNav({ currentUser, logOutTrigger }) {
  return (
    <>
      <BlitzHomeIcon />

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
        <Popover trigger="click" placement="bottom-start">
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
                label={'All Sales'}
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

        <Popover trigger="click" placement="bottom-start">
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
              Inventory&nbsp;
              <IoChevronDownOutline />
            </Text>
          </PopoverTrigger>
          <PopoverContent width="56">
            <Stack margin={0}>
              <NavLink
                key={Math.random()}
                style={{ padding: 10, borderRadius: 0 }}
                label={'Inventory Details'}
                href={'/Inventory'}
              />

              <NavLink
                key={Math.random()}
                style={{ padding: 10, borderRadius: 0 }}
                label={'Inventory Batch Items'}
                href={'/inventoryBatch'}
              />
            </Stack>
          </PopoverContent>
        </Popover>

        <NavLink key={Math.random()} label={'Analytics'} href={'/analytics'} />
      </Box>

      <ProfileMenu
        vendorInfo={currentUser}
        logOut={logOutTrigger}
        storeName={currentUser.storeName?.replace(/(.{21})..+/, '$1…')}
      />
    </>
  );
}

function TabletNav({ currentUser, logOutTrigger }) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex width="100%" flexDir="column">
      <Flex
        width="100%"
        flexDir="row"
        justifyContent="space-evenly"
        alignItems="center">
        <IconButton
          onClick={onToggle}
          icon={isOpen ? <IoClose size={25} /> : <IoMenu size={25} />}
          variant="ghost"
          aria-label="Toggle Navigation"
        />

        <Flex width="60%" justifyContent="center">
          <BlitzHomeIcon />
        </Flex>

        <ProfileMenu
          vendorInfo={currentUser}
          logOut={logOutTrigger}
          storeName={currentUser.storeName?.replace(/(.{14})..+/, '$1…')}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <TabletMenu />
      </Collapse>
    </Flex>
  );
}

function ProfileMenu({ vendorInfo, logOut, storeName }) {
  const toast = useToast();

  const updateCheckoutType = (type) => {
    if (type === 'nfc') {
      updatetoNFC(vendorInfo.uid).then(() => {
        toast({
          title: 'Successfully updated to NFC',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      });
    } else {
      updatetoQR(vendorInfo.uid).then(() => {
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
          rightIcon={<IoChevronDownOutline />}
          style={{ height: 33 }}>
          {storeName}
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

function TabletMenu() {
  return (
    <Collapse in={true} animateOpacity>
      <Flex flexDir="column" style={{ width: '100%', padding: 10 }}>
        <NavLink
          key={Math.random()}
          label={'Active Customers'}
          href={'/active'}
          style={{
            width: '100%',
            borderRadius: 0,
            padding: 15,
            paddingLeft: 20,
            paddingRight: 10,
          }}
        />

        <NavLink
          key={Math.random()}
          label={'Analytics'}
          href={'/analytics'}
          style={{
            width: '100%',
            borderRadius: 0,
            padding: 15,
            paddingLeft: 20,
            paddingRight: 10,
          }}
        />
      </Flex>
    </Collapse>
  );
}

function BlitzHomeIcon() {
  return (
    <Box>
      <Link to={'/home'}>
        <Text
          fontSize="4xl"
          textAlign="center"
          color="#0A63BC"
          fontWeight="extrabold"
          fontStyle="italic">
          Blitz
        </Text>
      </Link>
    </Box>
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
