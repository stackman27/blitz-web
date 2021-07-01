import React from "react";
import { 
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
} from "@chakra-ui/react"; 
import { IoChevronDownOutline } from "react-icons/io5";
import { updatetoNFC, updatetoQR } from "../../../components/FirebaseGlobal"
import { vendorUid } from "../../../components/Variables";

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
  
  export default ProfileMenu