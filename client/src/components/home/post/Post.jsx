import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";

const Container = styled(Box)`
  border: 1px solid;
  border-radius: 10px;
  margin: 10px;
  height: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > p {
    padding: 0 5px 5px 5px;
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
  .dark {
    background-color: #1b1c1e;
    color: #fff;
    border: #d3cede;
  }
  .light {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const Text = styled(Typography)`
  font-size: 12px;
`;

const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const Details = styled(Typography)`
  font-size: 16px;
  word-break: break-word;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 2px;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: grey;
  }
`;

const Image = styled("img")({
  width: "100%",
  borderRadius: "10px 10px 0px 0px",
  objectFit: "cover",
});

const Post = ({ post }) => {
  const url = post.picture ? post.picture : "post_image.jpg";
  const { darkMode } = useContext(DataContext);
  return (
    <Container className={darkMode === true ? "dark" : "light"}>
      <Image src={url} alt-="blog" />
      <Text>{post.categories}</Text>
      <Heading>{addElipsis(post.title, 10)}</Heading>
      <Text>{post.username}</Text>

      <Details>
        {addElipsis(
          <div dangerouslySetInnerHTML={{ __html: post.description }} />,
          100
        )}
      </Details>
    </Container>
  );
};
export default Post;
