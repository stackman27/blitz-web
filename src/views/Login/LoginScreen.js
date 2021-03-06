import React from 'react';
import { Flex, useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import {
  signInWithGoogle,
  checkifVendor,
  saveToken,
} from '../../fb-calls/FirebaseLogin';
import Header from './components/Header';
import Body from './components/Body';

function LoginScreen() {
  const toast = useToast();
  const history = useHistory();

  const signIn = () => {
    signInWithGoogle().then((res) => {
      checkifVendor(res.user.uid).then((vRes) => {
        if (vRes) {
          // user is a vendor
          saveToken(res);
          history.push('/home');
          window.location.reload();
        } else {
          // user is not a vendor
          toast({
            title: 'Unauthorized login attempt',
            description: 'You have to be an authorized vendor to sign in.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
        }
      });
    });
  };

  return (
    <Flex flexDir="column" width="100%" height="100vh">
      <Header signIn={signIn} />
      <Body signIn={signIn} />
    </Flex>
  );
}

export default LoginScreen;
