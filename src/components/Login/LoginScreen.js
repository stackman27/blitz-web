import React from "react";
import { Text, Box, Button, useToast } from "@chakra-ui/react";
import { IoLogoGoogle } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import {
  signInWithGoogle,
  checkifVendor,
  saveToken,
} from "../Login/FirebaseLogin";

function LoginScreen() {
  const toast = useToast();
  const history = useHistory();

  const signIn = () => {
    signInWithGoogle().then((res) => {
      checkifVendor(res.user.uid).then((vRes) => {
        if (vRes) {
          // user is a vendor
          saveToken(res);
          history.push("/home");
          window.location.reload(); // trigger page reload to go to the directed url
        } else {
          // user is not a vendor
          toast({
            title: "Unauthorized login attempt",
            description: "You have to be a vendor to sign in.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
    });
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        fontSize="5xl"
        paddingBottom={5}
        color="#0A63BC"
        fontWeight="extrabold"
        fontStyle="italic"
        _hover={{ textDecoration: "none" }}
        href={"/"}
      >
        Blitz
      </Text>

      <Button
        colorScheme="whiteAlpha"
        onClick={() => signIn()}
        borderWidth={1}
        borderColor="gray"
        boxShadow="base"
        leftIcon={<IoLogoGoogle color="gray" />}
      >
        <Text color="#444444"> Sign in with Google</Text>
      </Button>
    </Box>
  );
}

export default LoginScreen;
