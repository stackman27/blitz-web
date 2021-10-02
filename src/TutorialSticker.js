import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
const data = [
  {
    'Product Name': "Chester's Fries Corn and Potato Snacks Flamin' Hot",
    UPC: 28400331524,
    URL: 'https://images.barcodelookup.com/16659/166592453-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY 1 GET 1 FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Takis Tortilla Chips Hot Chili Pepper and Lime',
    UPC: 757528008680,
    URL: 'https://images.barcodelookup.com/3181/31814115-1.jpg',
    'Current Price': 3.99,
    'Promotion type': '50% off',
    'New Price': 2,
  },
  {
    'Product Name': 'Doritos Flavor Shots',
    UPC: 28400211772,
    URL: 'https://images.barcodelookup.com/13658/136586181-1.jpg',
    'Current Price': 1.19,
    'Promotion type': 'BUY 1 GET 1 FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Ruffles Sco',
    UPC: 28400324410,
    URL: 'https://images.barcodelookup.com/19678/196780810-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY 1 GET 1 FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Ruffle flm ht',
    UPC: 28400324472,
    URL: 'https://images.barcodelookup.com/16285/162854126-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY 1 GET 1 FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Cheetos hot puff',
    UPC: 28400329132,
    URL: 'https://images.barcodelookup.com/19808/198088066-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY 1 GET 1 FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Funyons',
    UPC: 28400331555,
    URL: 'https://images.barcodelookup.com/19959/199592061-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY 1 GET 1 FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Cheetos Flaming Hot',
    UPC: 28400329491,
    URL: 'https://images.barcodelookup.com/16285/162854092-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY 1 GET 1 FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Cheetos XXTRA Flaming Hot',
    UPC: 28400329460,
    URL: 'https://images.barcodelookup.com/16659/166592470-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY 1 GET 1 FREE',
    'New Price': '',
  },
];

function TutorialSticker() {
  return (
    <Flex style={{ flex: 1, flexWrap: 'wrap' }}>
      {data.map((item, index) => {
        return (
          <Flex
            key={index}
            style={{
              width: 210,
              height: 230,
              borderWidth: 1,
              borderColor: '#ddd',
              margin: 10,
              flexDirection: 'column',
              borderRadius: 15,
              display: 'inline',
            }}>
            <Flex
              style={{
                background: '#0A63BC',
                padding: 15,
                paddingLeft: 10,
                width: '100%',
                height: 75,
                borderTopRightRadius: 15,
                alignItems: 'center',
                borderTopLeftRadius: 15,
              }}>
              <Flex
                style={{
                  height: 50,
                  width: 55,
                  borderColor: '#bbb',
                  borderRadius: '100%',
                  borderWidth: 1,
                }}>
                <Image
                  src={item.URL}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '100%',
                    padding: 5,
                    background: '#fff',
                  }}
                  objectFit="contain"
                />
              </Flex>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#fff',
                  fontFamily: 'Avenir',
                }}
                noOfLines={3}>
                {item['Product Name']}
              </Text>
            </Flex>

            <Flex
              style={{
                flex: 1,
                height: 120,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                fontFamily: 'Avenir',
              }}>
              <Flex
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',

                    fontFamily: 'Avenir Next',
                    color: '#222',
                  }}>
                  {item['Promotion type']}
                </Text>
              </Flex>

              {item['New Price'] && (
                <>
                  <Text style={{ color: '#bbb' }}> | </Text>
                  <Flex
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textDecoration: 'line-through',
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      ${item['Current Price']}
                    </Text>

                    <Flex
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}>
                      <Text
                        style={{
                          fontSize: 28,
                          fontWeight: 'bold',
                          fontFamily: 'Avenir Next',
                          color: '#0A63BC',
                        }}>
                        ${parseFloat(item['New Price']).toFixed(2)}
                      </Text>
                      <Text
                        style={{
                          color: '#0A63BC',
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}>
                        New Price
                      </Text>
                    </Flex>
                  </Flex>
                </>
              )}
            </Flex>

            <Flex
              style={{
                fontFamily: 'Avenir',
                width: '100%',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,

                background: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
              }}>
              <Flex
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: 'bold',
                    color: 'red',
                  }}>
                  *For
                </Text>
                <Image
                  src={'/img/blitzlogo.png'}
                  fit="contain"
                  width={'10%'}
                  style={{ marginLeft: 5 }}
                  borderRadius="4"
                  height={'10%'}
                  background="red"
                />
                <Text
                  style={{
                    fontFamily: 'Avenir Next',
                    fontWeight: 'bold',
                    marginLeft: 5,
                    fontStyle: 'italic',
                    color: '#0A63BC',
                  }}>
                  Blitz
                </Text>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: 'bold',
                    color: 'red',
                    marginLeft: 5,
                  }}>
                  users only
                </Text>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default TutorialSticker;
