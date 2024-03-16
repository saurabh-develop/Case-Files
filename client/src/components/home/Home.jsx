import React from "react";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import { styled, Box, Grid } from "@mui/material";
import { Posts } from "./post/Posts";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";

const BannerContainer = styled(Box)`
  .dark {
    background-color: #1b1c1e;
    color: #fff;
  }
  .light {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const Home = () => {
  const { darkMode } = useContext(DataContext);
  return (
    <>
      <BannerContainer>
        <Banner />
        <Grid container className={darkMode === true ? "dark" : "light"}>
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
