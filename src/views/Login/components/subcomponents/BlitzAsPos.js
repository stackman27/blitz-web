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
                    tabDescription="With Blitz, you can know your customer better than ever. Analyze your customers’ purchasing activity
                     by generating custom monthly, weekly, or daily data reports. Blitz also provides sales and tax reporting where you will
                    be able to get an entire rundown of your business profit and revenue. "
                    tabImg={'/img/blitz-as-pos/analytics.png'}
                  />
                </TabPanel>

                <TabPanel>
                  <TabPanelList
                    tabName="Track and Trace"
                    tabDescription="Blitz allows vendors to monitor purchasing activity in real time within their store.
                     From active notifications to receipt history, Blitz keeps you informed of past, present, and soon-to-be transactions.
                      Because Blitz has digitalized all the receipts, you will be able to handle purchases and returns with your smartphone or computer. "
                    tabImg={'/img/blitz-as-pos/track-and-trace.png'}
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Reduced Price"
                    tabDescription="Unlike traditional POS systems., Blitz requires no hardware! Therefore, there are no hardware fees, 
                    allowing us to provide great service at an affordable price. Blitz’ cost is almost 10x cheaper than any other POS system. 
                    Also, you have access to all Blitz features for free. We charge only one fee of 2.9% + 30 cents on the customer side in order to process payments."
                    tabImg={'/img/blitz-as-pos/reduced-price.png'}
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="All Digital"
                    tabDescription="Everything from receipts to product details to payment verification is digital in Blitz. 
                    That way, you do not have to worry about keeping track of paper trails. Because we are a software focused company, 
                    we want to transform the entire POS system into software to modernize your business and increase ease of customer purchasing. "
                    tabImg={'/img/blitz-as-pos/all-digital.png'}
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Tap Verification"
                    tabDescription="Rather than scanning products at the counter, Blitz allows customers to scan products directly from their phone, 
                    leading to a faster check out. Through the use of Blitz Tapper, customers only need to tap their phone at the counter for a quick verification process."
                    tabImg={'/img/blitz-as-pos/tapper-verify.png'}
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Customizable"
                    tabDescription="Take control of your POS system. Our wide range of features lets you modify the system to fit your store. Some notable features include customizing promotions, 
                    batch items for bulk share, complete inventory control from your phone, digital pictures of every product and more! Your store, your rules!"
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
