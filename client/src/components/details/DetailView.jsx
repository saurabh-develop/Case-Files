import { Box, Typography, styled } from "@mui/material";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { API } from "../../service/api";
import { Edit, Delete } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";

//components
import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: " 50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  marginTop: "30px",
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 39px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin: 20px 0 10px 0;
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
    margin: 5px;,
    padding: 5px;,
    border: 1px solid #fff;,
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;,
    padding: 5px;,
    border: 1px solid #878787;,
    border-radius: 10px;
    cursor: pointer;
`;

const PostContent = styled(Box)`
  width: 100%;
  height: 40vh;
  background-color: #101012;
  color: #fff;
  margin-top: 10px;
  padding: 0px 20px;
  .desc {
    width: 80%;
    height: 50%;
    margin: 20px;
  }
`;

const Author = styled(Box)`
    color: #fff;,
    margin: 20px 0px;,
    display: flex;
    @media only screen and (max-width: 650px){
      text-align: center;
      margin-left: -50px;
    }
`;

const Description = styled(Typography)`
  word-break: break-word;
`;

const DetailView = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();
  const { account } = useContext(DataContext);

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

  const navigate = useNavigate();

  const deleteBlog = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };
  return (
    <Container>
      <Image src={url} alt="blog" />
      <PostContent>
        <Box style={{ float: "right", marginRight: "10px" }}>
          {account.username === post.username && (
            <>
              <Link to={`/update/${post._id}`}>
                <EditIcon color="primary" />
              </Link>
              <DeleteIcon onClick={() => deleteBlog()} color="error" />
            </>
          )}
        </Box>

        <Heading>{post.title}</Heading>
        <Author>
          <Typography>
            Author:
            <Box component="span" style={{ fontWeight: 600 }}>
              {` ${post.username}`}
            </Box>
          </Typography>
          <Typography style={{ marginLeft: "auto" }}>
            {new Date(post.createdDate).toDateString()}
          </Typography>
        </Author>

        <Description className="desc">{post.description}</Description>
      </PostContent>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
