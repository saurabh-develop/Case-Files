import React, { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { DataContext } from "../../context/DataProvider";
import { Search } from "../home/post/Search";

const Component = styled(AppBar)`
  background: #1b1c1e;
  display: flex;
  .dRow {
    flex-direction: row;
  }
  .dCol {
    flex-direction: column;

    margin: auto;
    justify-content: center;
  }
`;

const Container = styled(Toolbar)`
  justify-content: center;
  display: flex;
  flex-direction: row;
  .navIcon {
    display: none;
  }
  & > a {
    padding: 30px 70px;
    color: #fff;
    text-decoration: none;
  }
  @media only screen and (max-width: 860px) {
    flex-direction: column;
    margin: auto;
    .navIcon {
      display: block;
      margin-right: 65px;
    }
    .active {
      display: block;
      border-bottom: 1px solid #fff;
    }
    .inactive {
      display: none;
      .home {
        border: none;
      }
    }
    .header-link {
      width: 100%;
    }
  }
  .darkInactive {
    display: none;
  }
  .lightInactive {
    display: none;
  }
`;

const onHandleClick = () => {
  localStorage.clear();
  navigate("/login");
};

const Header = () => {
  const [showNav, setShowNav] = useState("inactive");
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(DataContext);

  const onToggleChange = () => {
    showNav === "inactive" ? setShowNav("active") : setShowNav("inactive");
  };

  const toggleMode = () => {
    darkMode === true ? setDarkMode(false) : setDarkMode(true);
  };

  return (
    <>
      <Component>
        <Container
          className={`wrapper ${showNav === "active" ? "dCol" : "dRow"}`}
        >
          <Link to="/" className="header-link active home">
            HOME
          </Link>
          <Link to="/about" className={`header-link ${showNav}`}>
            ABOUT
          </Link>
          <Link to="/contact" className={`header-link ${showNav}`}>
            CONTACT
          </Link>
          <Link
            to="/login"
            onClick={() => onHandleClick()}
            className={`header-link ${showNav}`}
          >
            LOGOUT
          </Link>
          <Search/>
          <ViewHeadlineIcon
            className="navIcon "
            onClick={() => onToggleChange()}
            style={{ margin: "10px" }}
          />
          <DarkModeIcon
            onClick={() => toggleMode()}
            className={darkMode === true ? "darkActive" : "darkInactive"}
          />
          <LightModeIcon
            onClick={() => toggleMode()}
            className={darkMode === false ? "lightActive" : "lightInactive"}
          />
        </Container>
      </Component>
    </>
  );
};

export default Header;
