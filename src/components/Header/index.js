import React from "react";
import {
  Flex,
  Box,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  useToast,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { IoChevronDownOutline } from "react-icons/io5";
import { updatetoNFC, updatetoQR } from "../FirebaseGlobal";
import { logOut } from "../Home/FirebaseVHome";
import { vendorUid } from "../Variables";

function Header() {
  const history = useHistory();

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
          <Box display={"flex"} position="relative" justifyContent={"center"}>
            <NavLink key={"1"} label={"Active Customers"} href={"/active"} />
            {/* <Text
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 20,
                height: 20,
                fontWeight: "bold",
                textAlign: "center",
                alignItems: "center",
                borderWidth: 0,
                fontSize: 13,
                borderRadius: 100,
                background: "red",
                color: "#fff",
              }}
            >
              2
            </Text> */}
          </Box>
          <NavLink key={"2"} label={"Total Sales"} href={"/sales"} />
          <NavLink key={"3"} label={"Inventory"} href={"/inventory"} />
          <NavLink key={"3"} label={"Analytics"} href={"/analytics"} />
        </Box>
        <ProfileMenu logOut={logOutTrigger} />
      </Flex>
    </Flex>
  );
}

function ProfileMenu({ logOut }) {
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
      <MenuButton
        as={Button}
        rightIcon={<IoChevronDownOutline />}
        style={{ height: 33 }}
      >
        {"Derby Food Center".replace(/(.{21})..+/, "$1…")}
      </MenuButton>
      <MenuList>
        <MenuItem>Derby Food Center</MenuItem>
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
