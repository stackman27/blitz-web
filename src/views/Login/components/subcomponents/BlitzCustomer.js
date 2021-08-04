/* eslint-disable react/prop-types */
import React from 'react';
import { Text, Box, Flex, Image } from '@chakra-ui/react';
import { IoChevronForwardSharp, IoChevronBackSharp } from 'react-icons/io5';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function BlitzCustomer() {
  const settings = {
    dots: true,
    infinite: true,
    accessibility: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Box width="100%" height="90%">
      <Flex flexDir="column">
        <Text
          color="#0A63BC"
          fontWeight="extrabold"
          fontSize="large"
          textAlign="center"
          letterSpacing={2.5}>
          BLITZ FOR CUSTOMERS
        </Text>
        <Box width={'95%'} px={5} margin="auto">
          <Slider {...settings}>
            <ImageContentContainer
              titleLabel={'Select the store you want to shop.'}
              imgUrl={'/img/customer/cust1.png'}
            />
            <ImageContentContainer
              titleLabel={'Scan products directly from your phone.'}
              imgUrl={'/img/customer/cust2.png'}
            />
            <ImageContentContainer
              titleLabel={'Use Apple Pay to purchase your products.'}
              imgUrl={'/img/customer/cust3.png'}
            />
            <ImageContentContainer
              titleLabel={'Tap your phone and verify your payment.'}
              imgUrl={'/img/customer/cust4.png'}
            />
          </Slider>
        </Box>
      </Flex>
    </Box>
  );
}

function ImageContentContainer(props) {
  const { titleLabel, imgUrl } = props;
  return (
    <div>
      <Flex minHeight="120">
        <Text
          fontWeight="extrabold"
          textAlign="center"
          paddingTop="5"
          fontSize="32"
          width="80%"
          margin="auto"
          color="#444444">
          {titleLabel}
        </Text>
      </Flex>

      <Box height="100%" width="100%" alignSelf="start" marginTop="10">
        <Image
          src={imgUrl}
          fit="contain"
          width={'100%'}
          height={'100%'}
          background="transparent"
          margin="auto"
        />
      </Box>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div>
      <IoChevronForwardSharp
        color="#555555"
        className={className}
        style={{ ...style }}
        onClick={() => onClick()}
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div>
      <IoChevronBackSharp
        color="#555555"
        className={className}
        style={{ ...style }}
        onClick={() => onClick()}
      />
    </div>
  );
}

export default BlitzCustomer;
