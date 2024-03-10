import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)`
  margin-top: 90px;
  margin: 90px 100px 0 100px;
  display: flex;
  flex-direction: column;
`;

const Image = styled("img")({
  margin: "auto",
  height: "50vh",
  width: "100%",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 20px;
  font-size: 20px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 25px;
  font-size: 16px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");

  const { account } = useContext(DataContext);

  const location = useLocation();

  useEffect(() => {
    const getImage = () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        // API Call
        post.picture = "";
      }
    };

    post.categories = location.search?.split("=")[1] || All;
    post.username = account.username;
    getImage();
  }, [file]);

  const onHandleChange = () => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container>
        <Image src="createpost_image1.jpg" />

        <StyledFormControl>
          <label htmlFor="fileInput">
            <Add fontSize="large" color="action" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <InputTextField
            placeholder="Title"
            onChange={(e) => onHandleChange(e)}
            name="title"
          />
          <Button variant="contained">Publish</Button>
        </StyledFormControl>
        <TextArea
          minRows={5}
          placeholder="Tell your story..."
          onChange={(e) => onHandleChange(e)}
          name="description"
        />
      </Container>
    </>
  );
};

export default CreatePost;
