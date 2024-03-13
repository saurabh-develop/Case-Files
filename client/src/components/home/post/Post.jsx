
import { Box,Typography,styled } from "@mui/material";

import {addElipses} from '../../../utils/common-utils'

const Container = styled(Box)`
    border:1px solid #d3cede;
    border-radius: 10px;
    margin:10px;
`

const Image = styled('img')({
    width:'100%'
})
const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;


const Post = ({post}) =>{
    return(
        <Container>
         <Image src={post.picture} alt-="blog"/>
         <Typography>{post.categories}</Typography>
         <Heading>{addElipses(post.title)}</Heading>
         <Typography>{post.username}</Typography>
         <Details>{addElipses(post.description,100)}</Details>
        </Container>
    )
}
export default Post;