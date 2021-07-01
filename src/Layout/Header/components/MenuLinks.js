import React from 'react' 
import { 
  Flex, 
  Link
} from "@chakra-ui/react"; 

function MenuLinks() {
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
            flex = {1}
            flexDir={"row"}
            justifyContent="space-evenly"    
        > 
          <NavLink key={"1"} label={"Active Customers"} href={"/active"}/>
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
        <NavLink key={"2"} label={"Total Sales"} href={"/sales"} />
        <NavLink key={"3"} label={"Inventory"} href={"/inventory"} />
        <NavLink key={"3"} label={"Analytics"} href={"/analytics"} />
      </Flex> 
    ) 
}

export default MenuLinks