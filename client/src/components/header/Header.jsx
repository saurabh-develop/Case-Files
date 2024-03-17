import React, { useState } from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
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
`;

const onHandleClick = () => {
  localStorage.clear();
  navigate("/login");
};

const Header = () => {
  const [showNav, setShowNav] = useState("inactive");
  const navigate = useNavigate();

  const onToggleChange = () => {
    showNav === "inactive" ? setShowNav("active") : setShowNav("inactive");
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
        </Container>
      </Component>
    </>
  );
};

export default Header;
