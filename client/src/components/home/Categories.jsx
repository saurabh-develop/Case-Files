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

const StyledTable = styled(Table)`
  border: 0px 0px 1px 0px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;

  &:hover {
    color: #1976d2;
  }
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

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
            <TableCell>
              <StyledLink to="/">All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/?category=${category.type}`}>
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
