import React from 'react';
import {
  Flex,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
} from '@chakra-ui/react';
import {
  IoAnalyticsOutline,
  IoSearchCircleOutline,
  IoCashOutline,
  IoLaptopOutline,
  IoRadioButtonOnOutline,
  IoConstructOutline,
} from 'react-icons/io5';
import Fade from 'react-reveal/Fade';

function BlitzAsPos() {
  return (
    <Flex width="100%" height={900} marginTop={50}>
      <Flex flexDir="column" width="85%" height="100%" margin="auto">
        <Box width="100%">
          <Text
            color="#0A63BC"
            fontWeight="extrabold"
            fontSize="26px"
            textAlign="center"
            letterSpacing={2.5}>
            BLITZ AS POINT OF SALE SYSTEM
          </Text>
          <Text
            paddingTop={5}
            textAlign="center"
            fontSize="22"
            width="60%"
            margin="auto"
            fontWeight="bold"
            color="gray">
            Powerful and Modern tools live inside our POS system - we have
            features that lets you customize and grow your business
            effortlessly.
          </Text>
        </Box>

        <Box width="100%" paddingTop={50}>
          <Flex width="90%" justifyContent="space-evenly" margin="auto">
            <Tabs width="100%">
              <TabList width="100%" alignItems="center" justifyContent="center">
                <TabListItem
                  tabName="Analytics"
                  iconOutline={<IoAnalyticsOutline size={50} />}
                />
                <TabListItem
                  tabName="Track and Trace"
                  iconOutline={<IoSearchCircleOutline size={50} />}
                />
                <TabListItem
                  tabName="Reduced Price"
                  iconOutline={<IoCashOutline size={50} />}
                />
                <TabListItem
                  tabName="All Digital"
                  iconOutline={<IoLaptopOutline size={50} />}
                />
                <TabListItem
                  tabName="Tap Verification"
                  iconOutline={<IoRadioButtonOnOutline size={50} />}
                />
                <TabListItem
                  tabName="Customizable"
                  iconOutline={<IoConstructOutline size={50} />}
                />
              </TabList>

              <TabPanels>
                <TabPanel>
                  <TabPanelList
                    tabName="Analytics"
                    tabDescription="With Blitz, you can know your customer better than ever. Analyze your customer’s purchasing activity by generating 
                    custom monthly, weekly, or daily data reports. We also have sales and tax reportings where you'll be able to get an entire rundown of 
                    your business profit and revenue."
                    tabImg={'/img/blitz-as-pos/analytics.png'}
                  />
                </TabPanel>

                <TabPanel>
                  <TabPanelList
                    tabName="Track and Trace"
                    tabDescription="Blitz allows vendors to monitor purchasing activity in real time within their store. From active notifications to receipt
                     history, Blitz keeps you informed of past, present, and soon to be transactions. Since we've digitized all the receipts, you'll be able 
                     to handle purchase and returns with your smartphone or your computer."
                    tabImg={'/img/blitz-as-pos/track-and-trace.png'}
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Reduced Price"
                    tabDescription="Unlike traditional POS systems, Blitz requires no hardware! Therefore we have no hardware fees, allowing us to truly 
                    provide you with great service at an affordable price. Blitz cost is almost 10x cheaper than any other POS system. Also, you can use 
                    all of Blitz features for free. The only fee we charge is the 2.9% + 30c fees on every purchase from the customer side to process payments."
                    tabImg={'/img/blitz-as-pos/reduced-price.png'}
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="All Digital"
                    tabDescription="Everything is digital in Blitz. From receipts to product details to payment verification, we digitize everything so 
                    that you dont have to worry about paper receipts or paper barcodes. We are software focused company so want to transform the entire
                     POS system into software to modernize your business and make it easy for the customer to purchase."
                    tabImg={'/img/blitz-as-pos/all-digital.png'}
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Tap Verification"
                    tabDescription="Rather than scanning individual products at the counter, Blitz allows customers to directly do so from their phone 
                    further leading to less waiting times at the counter. Through the use of Blitz tapper, customers can tap their phone at the counter
                     for a quick verification process."
                    tabImg={'/img/blitz-as-pos/tapper-verify.png'}
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Customizable"
                    tabDescription="Take control of your POS system. We have wide range of features that lets your modify the system that fits your store. 
                    Some of the notable features include customizing promotions, batch items for bulk share, complete inventory control from your phone, 
                    get digital pictures of each of your product and many more. Your store, your rules!"
                    tabImg={'/img/blitz-as-pos/customizable.png'}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

const TabListItem = ({ tabName, iconOutline }) => {
  return (
    <Tab width="100%">
      <Box display="flex" alignItems="center" flexDir="column">
        {iconOutline}
        <Text> {tabName} </Text>
      </Box>
    </Tab>
  );
};

const TabPanelList = ({ tabName, tabDescription, tabImg }) => {
  return (
    <Fade duration={2000}>
      <Flex flexDir="row" justifyContent="space-between" marginTop="28">
        <Box>
          <Text fontSize={'24px'} fontWeight="bold">
            {tabName}
          </Text>
          <br />
          <Text fontSize={18} width="80%">
            {tabDescription}
          </Text>
        </Box>
        <Image
          src={tabImg}
          fit="contain"
          width={'50%'}
          height={'50%'}
          padding={0}
          margin={0}
          borderRadius={20}
        />
      </Flex>
    </Fade>
  );
};

export default BlitzAsPos;
