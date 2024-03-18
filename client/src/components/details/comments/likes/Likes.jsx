import { Box, Typography, styled } from '@mui/material';
import {IconButton} from '@mui/material';
import { Edit, Delete,FavoriteBorder , Favorite } from '@mui/icons-material';
import { useState } from 'react';

const Likes = ({ post }) => {

    const[like,setLike] = useState(3);
   const [isLike,setIsLike] = useState(false);


    const onLikeButtonClick = () =>{
        setLike (like + (isLike ? -1: 1));
        setIsLike(!isLike);
    }
    return(
        <Box style={{ float: 'left' }} >
        {  <p>
          <IconButton style={{color:'#fff'}}>
      {isLike ? (
        <Favorite onClick={onLikeButtonClick} />
      ) : (
        <FavoriteBorder onClick={onLikeButtonClick} />
      )}
    </IconButton>
           <br/>
           <p>{like}</p>
        </p>
         
        }
        </Box>
    )
    
    }
    
     export default Likes;