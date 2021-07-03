import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  MenuList,
  Skeleton,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { IoChevronDownOutline } from "react-icons/io5";
import { updatetoNFC, updatetoQR } from "../../fb-api-calls/FirebaseGlobal.js";
import { getVendorInfo, logOut } from "../../fb-api-calls/FirebaseHome";
import { vendorUid } from "../../constants/Variables";

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
      localStorage.setItem("loginToken", null);
      localStorage.setItem("user", null);
      history.push("/");
      window.location.reload(); // trigger page reload to go to the directed page
    });
  };

  const NavLink = ({ label, href }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      fontWeight={500}
      fontFamily="Avenir"
      color={"#222222"}
      _hover={{
        textDecoration: "none",
        bg: "#0A63BC10",
      }}
      href={href}
      rel="noopener noreferrer"
    >
      {label}
    </Link>
  );

  return (
    <Flex
      justifyContent={"center"}
      flexDir={"row"}
      borderBottom="1px"
      borderBottomColor="gray.200"
    >
      <Flex
        width="85%"
        paddingBottom="5"
        paddingTop="5"
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Box>
          <Link
            fontSize="4xl"
            color="#0A63BC"
            fontWeight="extrabold"
            fontStyle="italic"
            _hover={{ textDecoration: "none" }}
            href={"/home"}
          >
            Blitz
          </Link>
        </Box>

        <Box
          display="flex"
          flexDir={"row"}
          justifyContent="space-evenly"
          width="60%"
        >
          <NavLink key={"1"} label={"Active Customers"} href={"/active"} />
          <NavLink key={"2"} label={"Total Sales"} href={"/sales"} />
          <NavLink key={"3"} label={"Inventory"} href={"/inventory"} />
          <NavLink key={"3"} label={"Analytics"} href={"/analytics"} />
        </Box>
        <ProfileMenu vendorInfo={vendorInfo} logOut={logOutTrigger} />
      </Flex>
    </Flex>
  );
}

function ProfileMenu({ vendorInfo, logOut }) {
  const toast = useToast();

  const updateCheckoutType = (type) => {
    if (type === "nfc") {
      updatetoNFC(vendorUid).then(() => {
        toast({
          title: "Successfully updated to NFC",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
    } else {
      updatetoQR(vendorUid).then(() => {
        toast({
          title: "Successfully updated to QR Code",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
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
          style={{ height: 33 }}
        >
          {vendorInfo.storeName &&
            vendorInfo.storeName.replace(/(.{21})..+/, "$1…")}
        </MenuButton>
      </Skeleton>
      <MenuList>
        <MenuItem>{vendorInfo.storeName}</MenuItem>
        <MenuDivider />
        <MenuOptionGroup
          defaultValue="asc"
          title="Default Checkout Type"
          type="radio"
        >
          <MenuItemOption value="asc" onClick={() => updateCheckoutType("nfc")}>
            NFC
          </MenuItemOption>
          <MenuItemOption value="desc" onClick={() => updateCheckoutType("qr")}>
            QR Code
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuItem onClick={() => logOut()}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Header;
