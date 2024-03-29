export const API_Defaults = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded ... Please wait!",
  },
  success: {
    title: "Success",
    message: "Successfully Loaded",
  },
  responseFailure: {
    title: "Response failure occured",
    message: "No response from server",
  },
  requestFailure: {
    title: "Request failure occured",
    message: "Request parsing error",
  },
  networkError: {
    title: "Network error",
    message:
      "Unable to connect with server. Please check your internet connectivity.",
  },
};

//Api service calls
// urls, methods , params nd query

export const SERVICE_URLS = {
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: { url: "file/upload", method: "POST" },
  createPost: { url: "/create", method: "POST" },
  getAllPosts:{url:'/posts',method:'GET',params:true},
  getPostById:{url:'/post',method:'GET',query:true},
  updatePost: {url: '/update' , method: 'PUT' , query: true},
  deletePost: { url: '/delete' , method: 'DELETE' , query: true},
  newComment:{url:'/comment/new',method:'POST'},
  getAllComments:{url:'/comments',method:'GET',query:true},
  deleteComment:{url:'comment/delete',method:'DELETE',query:true}
};
