import {Box,Typography} from '@mui/material';
import {useParams } from 'react-router-dom';
import {useEffect,useState} from 'react';
import {API} from '../../service/api';
 
 const DetailView=()=>{

    const[post,setPost] = useState({});

    const { id } = useParams();
    const url='https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(()=>{
        const fetchData = async() =>{
           let response = await API.getPostById(id);
           if(response.isSuccess){
            setPost(response.data);
           }
        }
        fetchData();

    },[])

    return(
        <Box>
           <img src={url} alt="blog" />
        </Box>
    )
}

export default DetailView; 