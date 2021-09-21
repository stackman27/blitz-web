import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
const data = [
  {
    'Product Name': 'Bottle Coca Cola',
    UPC: 75004699,
    URL: 'https://img.packworld.com/files/base/pmmi/all/image/2021/02/Coke_rPET_20oz.602495208a6ed.png?auto=format%2Ccompress&fit=max&q=70&w=1200',
    'Current Price': 2.49,
    'Promotion type': '40% off',
    'New Price': 1.5,
  },
  {
    'Product Name': 'Mountain Dew',
    UPC: 12000001314,
    URL: 'https://images.barcodelookup.com/4998/49983827-1.jpg',
    'Current Price': 2.25,
    'Promotion type': '40% off',
    'New Price': 1.35,
  },
  {
    'Product Name': 'Yerba Mate Sprk Gold',
    UPC: 632432333106,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 2.99,
    'Promotion type': '50% off',
    'New Price': 1.5,
  },
  {
    'Product Name': 'Yerba Mate Sprk Grapefruit',
    UPC: 632432333205,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 2.99,
    'Promotion type': '50% off',
    'New Price': 1.5,
  },
  {
    'Product Name': 'Yerba mate: sparkling cranbery pomegranate',
    UPC: 632432333304,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 2.99,
    'Promotion type': '50% off',
    'New Price': 1.5,
  },
  {
    'Product Name': 'Yerba Mate Bluephoira',
    UPC: 632432708775,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.69,
    'Promotion type': '50% off',
    'New Price': 1.85,
  },
  {
    'Product Name': 'Yerba Mate: Lemon',
    UPC: 632432717777,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.69,
    'Promotion type': '50% off',
    'New Price': 1.85,
  },
  {
    'Product Name': 'Yerba Mate:Orange Exuberance',
    UPC: 632432728773,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.69,
    'Promotion type': '50% off',
    'New Price': 1.85,
  },
  {
    'Product Name': 'Yerba Mate:Revel Berry',
    UPC: 632432737775,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.69,
    'Promotion type': '50% off',
    'New Price': 1.85,
  },
  {
    'Product Name': 'Yerba Mate: Enlighten Mint',
    UPC: 632432757773,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.69,
    'Promotion type': '50% off',
    'New Price': 1.85,
  },
  {
    'Product Name': 'Yerba Mate: Traditional Mate',
    UPC: 632432911007,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.95,
    'Promotion type': '50% off',
    'New Price': 1.99,
  },
  {
    'Product Name': 'Yerba Mate: Mint Btl',
    UPC: 632432911205,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.94,
    'Promotion type': '50% off',
    'New Price': 1.99,
  },
  {
    'Product Name': 'Yerba Mate: Raspberry Revolution Btl',
    UPC: 632432911403,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.94,
    'Promotion type': '50% off',
    'New Price': 1.99,
  },
  {
    'Product Name': 'Yerba mate: Traditional Unsweetened Btl',
    UPC: 632432911502,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.94,
    'Promotion type': '50% off',
    'New Price': 1.99,
  },
  {
    'Product Name': 'Yerba Mate: Lemon Mint Unsweetened Btl',
    UPC: 632432911526,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.94,
    'Promotion type': '50% off',
    'New Price': 1.99,
  },
  {
    'Product Name': 'Yerba mate: Passion Btl',
    UPC: 632432911809,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.94,
    'Promotion type': '50% off',
    'New Price': 1.99,
  },
  {
    'Product Name': 'Yerba Mate: Peach',
    UPC: 632432922225,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.94,
    'Promotion type': '50% off',
    'New Price': 1.99,
  },
  {
    'Product Name': 'Yerba Mate: blue',
    UPC: 638632708775,
    URL: 'https://images.barcodelookup.com/1033/10332604-1.jpg',
    'Current Price': 3.64,
    'Promotion type': '50% off',
    'New Price': 1.99,
  },
  {
    'Product Name': 'Lays BBQ Chips',
    UPC: 28400199612,
    URL: 'https://images.barcodelookup.com/3181/31819392-1.jpg',
    'Current Price': 3.79,
    'Promotion type': 'BUY 2 GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Lays Sour Cream & Onion',
    UPC: 28400199636,
    URL: 'https://images.barcodelookup.com/3181/31813076-1.jpg',
    'Current Price': 3.79,
    'Promotion type': 'BUY 2 GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'doritos flamin hot',
    UPC: 28400199247,
    URL: 'https://images.barcodelookup.com/11695/116957624-1.jpg',
    'Current Price': 4.29,
    'Promotion type': '20% OFF',
    'New Price': 3.5,
  },
  {
    'Product Name': 'Lays: Honey BBQ',
    UPC: 28400323819,
    URL: 'https://images.barcodelookup.com/19883/198836890-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY ONE GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Lays: Classic',
    UPC: 28400323826,
    URL: 'https://images.barcodelookup.com/19883/198836890-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY ONE GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Lays: Salt & Vinegar',
    UPC: 28400323857,
    URL: 'https://images.barcodelookup.com/19883/198836890-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY ONE GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Lays: faming hot',
    UPC: 28400323864,
    URL: 'https://images.barcodelookup.com/19883/198836890-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY ONE GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Lays: sweet suthern BBQ',
    UPC: 28400323888,
    URL: 'https://images.barcodelookup.com/19883/198836890-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY ONE GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Lays: Chile Lime',
    UPC: 28400323901,
    URL: 'https://images.barcodelookup.com/19883/198836890-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY ONE GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Lays: Barbecue',
    UPC: 28400324205,
    URL: 'https://images.barcodelookup.com/19883/198836890-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY ONE GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Lays: Limon',
    UPC: 28400324236,
    URL: 'https://images.barcodelookup.com/19883/198836890-1.jpg',
    'Current Price': 1.99,
    'Promotion type': 'BUY ONE GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Clover 2% Milk',
    UPC: 70852191003,
    URL: 'https://images.barcodelookup.com/9050/90502196-1.jpg',
    'Current Price': 3.59,
    'Promotion type': '30% OFF',
    'New Price': 2.5,
  },
  {
    'Product Name': 'Redbull: Blue',
    UPC: 611269182460,
    URL: 'https://images.barcodelookup.com/5587/55871606-1.jpg',
    'Current Price': 3.79,
    'Promotion type': '40% OFF',
    'New Price': 2.3,
  },
  {
    'Product Name': 'Redbull: Orange',
    UPC: 611269206432,
    URL: 'https://images.barcodelookup.com/5587/55871606-1.jpg',
    'Current Price': 3.79,
    'Promotion type': '40% OFF',
    'New Price': 2.3,
  },
  {
    'Product Name': 'Redbull: Green',
    UPC: 611269212457,
    URL: 'https://images.barcodelookup.com/5587/55871606-1.jpg',
    'Current Price': 3.79,
    'Promotion type': '40% OFF',
    'New Price': 2.3,
  },
  {
    'Product Name': 'Redbull: Peach',
    UPC: 611269283105,
    URL: 'https://images.barcodelookup.com/5587/55871606-1.jpg',
    'Current Price': 3.79,
    'Promotion type': '40% OFF',
    'New Price': 2.3,
  },
  {
    'Product Name': 'Redbull: Coco',
    UPC: 611269321210,
    URL: 'https://images.barcodelookup.com/5587/55871606-1.jpg',
    'Current Price': 3.79,
    'Promotion type': '40% OFF',
    'New Price': 2.3,
  },
  {
    'Product Name': 'Bang Cotton Candy',
    UPC: 610764000316,
    URL: 'https://images.barcodelookup.com/8253/82533885-1.jpg',
    'Current Price': 2.99,
    'Promotion type': '30% OFF',
    'New Price': 2,
  },
  {
    'Product Name': 'Bang',
    UPC: 610764028495,
    URL: 'https://images.barcodelookup.com/8253/82533885-1.jpg',
    'Current Price': 2.99,
    'Promotion type': '30% OFF',
    'New Price': 2,
  },
  {
    'Product Name': 'Bang Cherry Lemonade',
    UPC: 610764120472,
    URL: 'https://images.barcodelookup.com/8253/82533885-1.jpg',
    'Current Price': 2.99,
    'Promotion type': '30% OFF',
    'New Price': 2,
  },
  {
    'Product Name': 'Pepsi Cola',
    UPC: 12000030284,
    URL: 'https://images.barcodelookup.com/5047/50478939-1.jpg',
    'Current Price': 1.78,
    'Promotion type': 'BUY ONE GET ONE FREE',
    'New Price': '',
  },
  {
    'Product Name': 'Starbucks Frappuccino Coffee',
    UPC: 12000001802,
    URL: 'https://images.barcodelookup.com/3013/30138786-1.jpg',
    'Current Price': 3.64,
    'Promotion type': '30% OFF',
    'New Price': 2.5,
  },
  {
    'Product Name': 'Frappuccino Coffee Drink Caramel',
    UPC: 12000002717,
    URL: 'https://images.barcodelookup.com/3013/30138786-1.jpg',
    'Current Price': 2.59,
    'Promotion type': '30% OFF',
    'New Price': 1.78,
  },
  {
    'Product Name': 'Starbucks Coffee Drink',
    UPC: 12000003554,
    URL: 'https://images.barcodelookup.com/3013/30138786-1.jpg',
    'Current Price': 2.94,
    'Promotion type': '30% OFF',
    'New Price': 2,
  },
  {
    'Product Name': 'Starbucks Frappuccino Vanilla',
    UPC: 12000004100,
    URL: 'https://images.barcodelookup.com/3013/30138786-1.jpg',
    'Current Price': 2.64,
    'Promotion type': '40% OFF',
    'New Price': 1.6,
  },
  {
    'Product Name': 'Starbucks Frappuccino Mocha',
    UPC: 12000004520,
    URL: 'https://images.barcodelookup.com/3013/30138786-1.jpg',
    'Current Price': 3.64,
    'Promotion type': '30% OFF',
    'New Price': 2.5,
  },
  {
    'Product Name': 'Starbucks Frappuccino Mocha',
    UPC: 12000006494,
    URL: 'https://images.barcodelookup.com/3013/30138786-1.jpg',
    'Current Price': 2.94,
    'Promotion type': '30% OFF',
    'New Price': 2,
  },
  {
    'Product Name': 'Starbucks Doubleshot Light:Espresso & Cream',
    UPC: 12000008801,
    URL: 'https://images.barcodelookup.com/4730/47305851-1.jpg',
    'Current Price': 3.99,
    'Promotion type': '10% OFF',
    'New Price': 3.6,
  },
  {
    'Product Name':
      'Starbucks Frappuccino Caramel Intense Chilled Coffee Drink',
    UPC: 12000016721,
    URL: 'https://images.barcodelookup.com/3013/30136192-1.jpg',
    'Current Price': 3.64,
    'Promotion type': '30% OFF',
    'New Price': 2.5,
  },
  {
    'Product Name': 'Starbucks Doubleshot:Mocha',
    UPC: 12000028458,
    URL: 'https://images.barcodelookup.com/3013/30136192-1.jpg',
    'Current Price': 3.74,
    'Promotion type': '30% OFF',
    'New Price': 2.6,
  },
  {
    'Product Name': 'Starbucks Doubleshot:Coffee',
    UPC: 12000028472,
    URL: 'https://images.barcodelookup.com/3013/30136192-1.jpg',
    'Current Price': 3.74,
    'Promotion type': '30% OFF',
    'New Price': 2.6,
  },
  {
    'Product Name': 'Starbucks Doubleshot:Vanilla',
    UPC: 12000028496,
    URL: 'https://images.barcodelookup.com/3013/30136192-1.jpg',
    'Current Price': 3.74,
    'Promotion type': '30% OFF',
    'New Price': 2.6,
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
              height: 225,
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
              <Image
                src={item.URL}
                style={{
                  height: 50,
                  width: 50,
                  padding: 5,
                  borderRadius: '100%',
                  background: '#fff',
                }}
                objectFit="contain"
              />
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
              <Flex style={{ alignItems: 'center' }}>
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
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                *Use{' '}
                <span
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: '#0A63BC',
                  }}>
                  Blitz{' '}
                </span>
                to access discounts
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default TutorialSticker;
