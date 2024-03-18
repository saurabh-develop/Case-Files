import { Box, Typography, styled } from "@mui/material";
import { IconButton } from "@mui/material";
import { Edit, Delete, FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

const Likes = ({ post }) => {
  const [like, setLike] = useState(0);
  const [isLike, setIsLike] = useState(false);

  const onLikeButtonClick = () => {
    setLike(like + (isLike ? -1 : 1));
    setIsLike(!isLike);
  };
  return (
    <Box style={{ float: "left" }}>
      {
        <p>
          <IconButton style={{ color: "#fff" }}>
            {isLike === true ? (
              <FavoriteIcon onClick={onLikeButtonClick} />
            ) : (
              <FavoriteBorder onClick={onLikeButtonClick} />
            )}
          </IconButton>
          <br />
          <p>{like}</p>
        </p>
      }
    </Box>
  );
};

export default Likes;
