import React from 'react';
import { Text, Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Footer() {
  const styles = {
    FooterHeaderBlitz: {
      margin: '0px 20px 0px 20px',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: '42px',
      fontFamily: 'Avenir Next',
    },
    FooterHeader: {
      margin: '10px 50px 0px 50px',
      fontWeight: 'bold',
    },
    FooterHeaderLinks: {
      fontWeight: '400',
      letterSpacing: 0,
      marginTop: 10,
    },
  };

  return (
    <Flex
      style={{
        width: '100%',
        background: '#0A63BC',
        color: '#fefefe',
        fontSize: 18,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Flex
        style={{
          margin: 'auto',
          flexDirecktion: 'row',
          padding: 50,
          paddingBottom: 100,
          width: '90%',
          justifyContent: 'space-between',
        }}>
        <Box style={styles.FooterHeaderOptions}>
          <Text style={styles.FooterHeaderBlitz}>Blitz</Text>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 21,
              fontWeight: '500',
              color: '#ddd',
            }}>
            Scan, Pay, Verify and Leave.
          </Text>
        </Box>

        <Flex>
          <Box style={styles.FooterHeader}>
            <Text>EXPLORE</Text>

            <Box style={styles.FooterHeaderLinks}>
              <Link>For Vendors</Link>
            </Box>

            <Box style={styles.FooterHeaderLinks}>
              <Link>For Customers</Link>
            </Box>

            <Box style={styles.FooterHeaderLinks}>
              <Link>About us</Link>
            </Box>
          </Box>

          <Box style={styles.FooterHeader}>
            <Text> RESOURCES </Text>
            <Box style={styles.FooterHeaderLinks}>
              <Link>Request a demo</Link>
            </Box>

            <Box style={styles.FooterHeaderLinks}>
              <Link>Contact us</Link>
            </Box>
          </Box>
        </Flex>
      </Flex>

      <Flex
        style={{
          flexDirection: 'row',
          padding: 20,
          fontWeight: '500',
          width: '85%',
          color: '#ddd',
          margin: 'auto',
          justifyContent: 'space-between',
        }}>
        <Box>
          <Text>© Blitz-Checkout, Inc 2021</Text>
        </Box>

        <Box>
          <Text>Made with ⚡ in Berkeley</Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Footer;
