import React from "react";
import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)`
  background-image: url("banner_image.jpeg");
  background-repeat: no-repeat;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled(Typography)`
  font-size: 60px;
  color: #fff;
  line-height: 1.4;
`;
const SubHeading = styled(Typography)`
  font-size: 25px;
  background: #fff;
`;

const Banner = () => {
  return (
    <>
      <Image>
        <Heading>Sherlock's Sleuthing Dispatch</Heading>
        <SubHeading>Unraveling Mysteries Through Blogging</SubHeading>
      </Image>
    </>
  );
};

export default Banner;
