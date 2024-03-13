import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../service/api";
import styled from "@emotion/styled";

const Container = styled(Box)`
  margin: 92px 100px 50px 100px;
`;

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 10px 0px 10px 0px;
`;

const DetailView = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();
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

  return (
    <Container>
      <Image src={url} alt="blog" />
      <Heading>{post.title}</Heading>
      <Box>
        <Typography>{post.username}</Typography>
        <Typography>{new Date(post.createdDate).toDateString()}</Typography>
      </Box>
      <Typography>{post.description}</Typography>
    </Container>
  );
};

export default DetailView;
