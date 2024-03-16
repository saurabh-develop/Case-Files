import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { categories } from "../../constants/data";
import styled from "@emotion/styled";
import { Link, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

const StyledTable = styled(Table)`
  border: 0px 0px 1px 0px solid rgba(224, 224, 224, 1);
  margin: 0px 5px;
`;

const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  margin: auto;
  &:hover {
    color: #1976d2;
  }
  .dark {
    background-color: #1b1c1e;
    color: #fff;
  }
  .light {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { darkMode } = useContext(DataContext);

  return (
    <>
      <StyledLink
        to={`/create?category=${category || ""}`}
        style={{ textDecoration: "none" }}
      >
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink>

      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell style={{ display: "flex" }}>
              <StyledLink
                to="/"
                className={darkMode === true ? "dark" : "light"}
              >
                All Categories
              </StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell style={{ display: "flex" }}>
                <StyledLink
                  to={`/?category=${category.type}`}
                  className={darkMode === true ? "dark" : "light"}
                >
                  {category.type}
                </StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
