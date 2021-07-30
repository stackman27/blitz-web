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
            Powerful creativity and productivity tools live inside every Mac —
            apps that help you explore, connect, and work more efficiently.
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
                  tabName="Tapper Verify"
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
                    tabDescription=" Safari has innovative features that let you enjoy more
                        of the web. In even more ways. Built-in privacy features
                        help protect your information and keep your Mac secure.
                        An updated start page helps you easily and quickly save,
                        find, and share your favorite sites. And Siri
                        suggestions surface bookmarks, links from your reading
                        list, iCloud Tabs, links you receive in Messages, and
                        more."
                  />
                </TabPanel>

                <TabPanel>
                  <TabPanelList
                    tabName="Track and Trace"
                    tabDescription=" Safari has innovative features that let you enjoy more
                        of the web. In even more ways. Built-in privacy features
                        help protect your information and keep your Mac secure.
                        An updated start page helps you easily and quickly save,
                        find, and share your favorite sites. And Siri
                        suggestions surface bookmarks, links from your reading
                        list, iCloud Tabs, links you receive in Messages, and
                        more."
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Track and Trace"
                    tabDescription=" Safari has innovative features that let you enjoy more
                        of the web. In even more ways. Built-in privacy features
                        help protect your information and keep your Mac secure.
                        An updated start page helps you easily and quickly save,
                        find, and share your favorite sites. And Siri
                        suggestions surface bookmarks, links from your reading
                        list, iCloud Tabs, links you receive in Messages, and
                        more."
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Reduced Price"
                    tabDescription=" Safari has innovative features that let you enjoy more
                        of the web. In even more ways. Built-in privacy features
                        help protect your information and keep your Mac secure.
                        An updated start page helps you easily and quickly save,
                        find, and share your favorite sites. And Siri
                        suggestions surface bookmarks, links from your reading
                        list, iCloud Tabs, links you receive in Messages, and
                        more."
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="All Digital"
                    tabDescription=" Safari has innovative features that let you enjoy more
                        of the web. In even more ways. Built-in privacy features
                        help protect your information and keep your Mac secure.
                        An updated start page helps you easily and quickly save,
                        find, and share your favorite sites. And Siri
                        suggestions surface bookmarks, links from your reading
                        list, iCloud Tabs, links you receive in Messages, and
                        more."
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Tapper Verify"
                    tabDescription=" Safari has innovative features that let you enjoy more
                        of the web. In even more ways. Built-in privacy features
                        help protect your information and keep your Mac secure.
                        An updated start page helps you easily and quickly save,
                        find, and share your favorite sites. And Siri
                        suggestions surface bookmarks, links from your reading
                        list, iCloud Tabs, links you receive in Messages, and
                        more."
                  />
                </TabPanel>
                <TabPanel>
                  <TabPanelList
                    tabName="Customizable"
                    tabDescription=" Safari has innovative features that let you enjoy more
                        of the web. In even more ways. Built-in privacy features
                        help protect your information and keep your Mac secure.
                        An updated start page helps you easily and quickly save,
                        find, and share your favorite sites. And Siri
                        suggestions surface bookmarks, links from your reading
                        list, iCloud Tabs, links you receive in Messages, and
                        more."
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

const TabPanelList = ({ tabName, tabDescription }) => {
  return (
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
        src={'/img/item1.png'}
        fit="contain"
        width={'50%'}
        height={'50%'}
        padding={0}
        margin={0}
        borderRadius={20}
      />
    </Flex>
  );
};

export default BlitzAsPos;
