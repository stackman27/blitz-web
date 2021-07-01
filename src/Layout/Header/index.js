import React, { useState, useEffect } from "react";
import {
  Flex,
  Link,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom"; 
import { getVendorInfo, logOut } from "../../components/Home/FirebaseVHome"; 
import ProfileMenu from "./components/ProfileMenu";
import MenuLinks from "./components/MenuLinks"; 

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


  return (
    <Flex
    justifyContent={"center"}
    flexDir={"row"}
    borderBottom="1px"
    borderBottomColor="gray.200"
    position="sticky"
    background = "white"
    top = "0"
  >
    <Flex
      width="80%" 
      paddingBottom="5"
      paddingTop="5"
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
       
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
      <MenuLinks /> 
      <ProfileMenu vendorInfo={vendorInfo} logOut={logOutTrigger} />  
    </Flex>
  </Flex>
  );
}

export default Header;
