import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  height: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > p {
    padding: 0 5px 5px 5px;
    color: #fff;
  }
  @media only screen and (max-width: 600px) and (min-width: 400px) {
    img {
      height: 65%;
    }
  }
  @media only screen and (min-width: 400px) {
    img {
      height: 65%;
    }
  }
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: #010101;
`;

const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const Details = styled(Typography)`
  font-size: 16px;
  word-break: break-word;
`;

const Image = styled("img")({
  width: "100%",
  borderRadius: "10px 10px 0px 0px",
  objectFit: "cover",
});

const Post = ({ post }) => {
  const url = post.picture ? post.picture : "post_image.jpg";

  return (
    <Container>
      <Image src={url} alt-="blog" />
      <Text>{post.categories}</Text>
      <Heading>{addElipsis(post.title, 10)}</Heading>
      <Text>{post.username}</Text>
      <Details>{addElipsis(post.description, 100)}</Details>
    </Container>
  );
};
export default Post;
