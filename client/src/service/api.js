import axios from 'axios';
import { API_Defaults, SERVICE_URLS } from '../constants/config';
import { getAccessToken ,getType} from '../utils/common-utils';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;

    },
    function (error) {
        return Promise.reject(error);

    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        //stop globbal loader 
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
)

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }

    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}




const processError = (error) => {
    if (error.response) {
        //responded with code other than 200
        console.log('Error in response: ', error.toJSON());
        return {
            isError: true,
            msg: API_Defaults.responseFailure,
            code: error.response.status
        }
    } else if (error.request) {
        //request made bt no response == check connectivity of back nd front
        console.log('Error in request: ', error.toJSON());
        return {
            isError: true,
            msg: API_Defaults.requestFailure,
            code: ""
        }
    } else {
        //frontend error
        console.log('Error in network : ', error.toJSON());
        return {
            isError: true,
            msg: API_Defaults.networkError,
            code: ""
        }
    }
}


  

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/file/upload`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}


// user features
export const getAllUsers = async () => {
    try {
        return await axios.get(`${API_URL}/users`);
    } catch (error) {
        console.log('Error while calling getAllUsers API ', error);
        return error.response;
    }
}

export const getUserByUsername = async (data) => {
    try {
        let user = await axios.post(`${API_URL}/user`, data);
        return user.data;
    } catch (error) {
        console.log('Error while calling  getUser API ', error);
        return error.response;
    }
}

export const followUser = async (data) => {
    try {
        return await axios.post(`${API_URL}/follow`, data);
    } catch (error) {
        console.log('Error while calling login User API ', error);
        return error.response;
    }
}

export const searchPosts = async (data) => {
    try {
        let search = await axios.post(`${API_URL}/search`, data);
        return search.data;
    } catch (error) {
        console.log('Error while calling  getUser API ', error);
        return error.response;
    }
}


const API = {


};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers:{
                authorization : getAccessToken()
            },
            TYPE: getType(value,body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
}


export { API };

