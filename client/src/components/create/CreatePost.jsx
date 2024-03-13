import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add, LocationOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Wrapper = styled(Box)`
  margin: 0;
  padding: 0;
  background-color: #1b1c1e;
`;

const Container = styled(Box)(({theme})=>({
  margin:' 50px 100px',
  [theme.breakpoints.down('md')]:{
      margin:0
  }

}));

const Image = styled("img")({
  marginTop: "90px",
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
  
  }
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 16px;
  border: none;
  padding: 10px;
  background-color: #101012;
  color: #fff;
  outline: none;
  &:focus-visible {
    outline: none;
    padding: 10px;
    background-color: #101012;
    color: #fff;
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
  const navigate = useNavigate();

  const { account } = useContext(DataContext);

  const location = useLocation();

  const url = post.picture ? post.picture : "createpost_image1.jpg";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const onHandleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    let response = await API.createPost(post);
    if (response.isSuccess) {
      navigate(`/`);
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Image src={url} alt="post" />

          <StyledFormControl>
            <label htmlFor="fileInput">
              <Add
                fontSize="large"
                style={{ color: "#fff", cursor: "pointer" }}
              />
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
              style={{ color: "#fff" }}
            />
            <Button variant="contained" onClick={() => savePost()}>Publish</Button>
          </StyledFormControl>
          <TextArea
            minRows={5}
            placeholder="Tell your story..."
            onChange={(e) => onHandleChange(e)}
            name="description"
          />
        </Container>
      </Wrapper>
    </>
  );
};

export default CreatePost;
