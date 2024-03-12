import React from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Component = styled(AppBar)`
  background: transparent;
  display: flex;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 30px 70px 30px 70px;
    color: #fff;
    text-decoration: none;
  }
`;

const onHandleClick = () => {
  localStorage.clear();
  navigate("/login");
};

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Component>
        <Container>
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/login" onClick={() => onHandleClick()}>
            LOGOUT
          </Link>
        </Container>
      </Component>
    </>
  );
};

export default Header;
