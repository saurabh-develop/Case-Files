import { useState, useEffect, useContext } from "react";
import { Box, TextareaAutosize, Button, styled } from "@mui/material";

import { DataContext } from "../../../context/DataProvider";
import { useNavigate } from "react-router-dom";

import { API } from "../../../service/api";

//components
import Comment from "./Comment";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
  .dark {
    background-color: #101012;
    color: #fff;
  }
  .light {
    background-color: #dad8c9;
    color: #333;
  }
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px !important;
  width: 100%;
  margin: 0 20px;
  background: #101012;
  color: #fff;
  border: none;
  padding: 10px;
  resize: none;
`;

const initialValue = {
  name: "",
  postId: "",
  date: new Date(),
  comments: "",
};

const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";

  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { account, darkMode } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      const response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setComments(response.data);
      }
    };
    getData();
  }, [post, toggle]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };
  const filterComments = (comments) => {
    const filteredComments = comments.filter((comment) => {
      const forbiddenWords = ["mc", "fuck","bc","bsdk","madharchod", "bhadwe", "bhadwa", "chutiya", "chutiye" ,"chutiyo","behenchod","bahenchod","madherchod",
       "bhosdiwale", "gandu", "lawde", "lode", "lund" , "gand", "lodu","chod"]; // List of forbidden words
      return !forbiddenWords.some((word) =>
        comment.comments.toLowerCase().includes(word)
      );
    });

    return filteredComments;
  };
  const addComment = async () => {
    await API.newComment(comment);
    setComment(initialValue);
    setToggle((prevState) => !prevState);
    const navigate = useNavigate();

    navigate("/");
  };

  return (
    <Box>
      <Container>
        <Image src={url} alt="dp" />
        <StyledTextArea
          rowsMin={5}
          placeholder="what's on your mind?"
          onChange={(e) => handleChange(e)}
          value={comment.comments}
          className={darkMode === true ? "dark" : "light"}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: 40 }}
          onClick={(e) => addComment(e)}
        >
          Post
        </Button>
      </Container>
      <Box>
        {filterComments(comments).map((comment) => (
          <Comment key={comment._id} comment={comment} setToggle={setToggle} />
        ))}
      </Box>
    </Box>
  );
};

export default Comments;
