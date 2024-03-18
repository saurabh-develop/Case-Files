import React, { useContext, useEffect, useState, useRef } from "react";
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
import { API, uploadFile } from "../../service/api";
import JoditEditor from "jodit-react";

const ModeChanger = styled(Box)`
  .dark {
    background-color: #1b1c1e;
    color: #fff;
  }
  .light {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const Wrapper = styled(Box)`
  margin: 0;
  padding: 0;
`;

const Container = styled(Box)`
  margin: 0px 100px;
  display: flex;
  flex-direction: column;
  .custom-editor {
    width: 100%;
    margin-top: 25px;
    margin-bottom: 25px;
    padding: 10px;
  }
`;

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
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 20px;
  font-size: 20px;
  border-bottom: 1px solid #101010;
  padding: 0 10px;
  @media only screen and (max-width: 600px) {
    margin: 10px 20px;
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
  const editor = useRef(null);
  const { account, darkMode } = useContext(DataContext);
  const location = useLocation();

  const url = post.picture ? post.picture : "createpost_image1.jpg";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        setPost((prevPost) => ({ ...prevPost, picture: response }));
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const onHandleChange = (e) => {
    setPost((prevPost) => ({ ...prevPost, [e.target.name]: e.target.value }));
  };

  const savePost = async () => {
    let response = await API.createPost(post);
    if (response.isSuccess) {
      navigate(`/`);
    }
  };

  return (
    <>
      <ModeChanger>
        <Wrapper className={darkMode === true ? "dark" : "light"}>
          <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
              <label htmlFor="fileInput">
                <Add
                  fontSize="large"
                  style={{ cursor: "pointer" }}
                  className={darkMode === true ? "dark" : "light"}
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
                className={darkMode === true ? "dark" : "light"}
              />
              <Button variant="contained" onClick={() => savePost()}>
                Publish
              </Button>
            </StyledFormControl>
            {/* <TextArea
            minRows={5}
            placeholder="Tell your story..."
            onChange={(e) => onHandleChange(e)}
            name="description"
          /> */}
            <JoditEditor
              ref={editor}
              value={post.description}
              onChange={(newContent) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  description: newContent,
                }))
              }
              name="description"
              className="custom-editor"
              style={
                darkMode === false
                  ? { border: "1px solid #000" }
                  : { border: "none" }
              }
            />
          </Container>
        </Wrapper>
      </ModeChanger>
    </>
  );
};

export default CreatePost;
