import React from "react";
import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)`
  background: url("banner_image.jpeg") center/100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media only screen and (max-width: 860px) {
    background-size: 100% 75%;
  }
`;

const Head = styled(Box)`
  display: flex;
  flex-direction: row;

  gap: 10px;
  @media only screen and (max-width: 860px) {
    flex-direction: column;
    text-align: center;
  }
`;
const SubHead = styled(Box)`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 860px) {
    flex-direction: column;
    text-align: center;
  }
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
        <Head>
          <Heading>Sherlock's </Heading>
          <Heading>Sleuthing </Heading>
          <Heading>Dispatch</Heading>
        </Head>
        <SubHead>
          <SubHeading>Unraveling Mysteries</SubHeading>
          <SubHeading> Through Blogging</SubHeading>
        </SubHead>
      </Image>
    </>
  );
};

export default Banner;
