import axios from 'axios';
import { API_Defaults, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;

    },
    function(error){
        return Promise.reject(error);

    }
)

axiosInstance.interceptors.response.use(
    function(response){
        //stop globbal loader 
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
)

const processResponse = (response) =>{
     if(response?.status === 200){
        return { isSuccess:true , data: response.data }

     } else{
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
     }
}

const processError = (error) => {
    if(error.response){
        //responded with code other than 200
        console.log('Error in response: ' , error.toJSON());
        return{
            isError: true,
            msg: API_Defaults.responseFailure,
            code: error.response.status
        }
    } else if(error.request){
        //request made bt no response == check connectivity of back nd front
        console.log('Error in request: ' , error.toJSON());
        return{
            isError: true,
            msg: API_Defaults.requestFailure,
            code: ""
        }
    } else{
        //frontend error
        console.log('Error in network : ' , error.toJSON());
        return{
            isError: true,
            msg: API_Defaults.networkError,
            code: ""
        }
    }
}



const API = {
    
}
