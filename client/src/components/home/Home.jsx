import React from "react";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import { styled, Box, Grid, Container } from "@mui/material";
import Post from "./post/Post";

const Wrapper = styled(Box)`
  background-color: #1b1c1e;
`;
const BannerContainer = styled(Box)``;

const Home = () => {
  return (
    <>
      <Wrapper>
        <BannerContainer>
          <Banner />
          <Grid container>
            <Grid item lg={2} sm={2} xs={12}>
              <Categories />
            </Grid>
            <Grid container item xs={12} sm={10} lg={10}>
              <Post />
            </Grid>
          </Grid>
        </BannerContainer>
      </Wrapper>
    </>
  );
};

export default Home;
