import React from "react";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import { styled, Box, Grid } from "@mui/material";
import { Posts } from "./post/Posts";

const BannerContainer = styled(Box)``;

const Home = () => {
  return (
    <>
      <BannerContainer>
        <Banner />
        <Grid container>
          <Grid item lg={2} sm={2} xs={12}>
            <Categories />
          </Grid>
          <Grid container item xs={12} sm={10} lg={10}>
            <Posts style={{ padding: "10px" }} />
          </Grid>
        </Grid>
      </BannerContainer>
    </>
  );
};

export default Home;
