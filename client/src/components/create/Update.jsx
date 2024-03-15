import React, { useState, useEffect, useContext, useRef } from "react";

import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { API, uploadFile } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import JoditEditor from "jodit-react";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
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

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);
  const editor = useRef(null);

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);

        post.picture = response;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const updatePost = async () => {
    let response = await API.updatePost(post);
    if (response.isSuccess) {
      navigate(`/details/${id}`);
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Image src={url} alt="post" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add
            fontSize="large"
            color="action"
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
          value={post.title}
          onChange={(e) => handleChange(e)}
          name="title"
          placeholder="Title"
          style={{ color: "#fff" }}
        />
        <Button
          onClick={() => updatePost()}
          variant="contained"
          color="primary"
        >
          Update
        </Button>
      </StyledFormControl>

      {/* <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                value={post.description}
                name='description'
                onChange={(e) => handleChange(e)} 
            /> */}
      <JoditEditor
        ref={editor}
        value={post.description}
        onChange={(newContent) =>
          setPost((prevPost) => ({ ...prevPost, description: newContent }))
        }
        name="description"
        className="custom-editor"
        style={{
          width: "100%",
          marginTop: "25px",
          marginBottom: "25px",
          border: "none",
          padding: "10px",
        }}
      />
    </Container>
  );
};

export default Update;
