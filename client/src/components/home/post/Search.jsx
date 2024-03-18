// import { useState, useEffect } from "react";
// import { InputBase, Box } from "@mui/material";
// import { useSearchParams, Link } from "react-router-dom";

// import { API, searchPosts } from "../../../service/api.js";
// import axios from "axios";

// //components
// import Khojo from "./khojo.jsx";

// export const Search = () => {
//   const [posts, setPosts] = useState([]);
//   const [searchParams] = useSearchParams();
//   const post = searchParams.get("posts");
//   const [text, setText] = useState('');



//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     let response = await API.getAllPosts2({ q: text });
//   //     if (response.isSuccess) {
//   //       setPosts(response);
//   //     }
//   //   };
//   //   fetchData();
//   // }, [text]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedPosts = await searchPosts(text); // Pass search text to API function
//         setPosts(fetchedPosts);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         // Handle error appropriately
//       }
//     };
//     fetchData();
//   }, [text]);


//   const getText = (text) => {
//     setText(text);
//   }


//   // const handleSearch = async (text) => {
//   //   try {
//   //     const fetchedPosts = await searchPosts(text);
//   //     setPosts(fetchedPosts);

//   //   } catch (error) {
//   //     console.error('Error fetching posts:', error);

//   //   }
//   // };

//   // const getText = async (text) => {
//   //   // Update state with search text
//   //   // Perform search API call
//   //   if (text) {
//   //     await handleSearch(text);
//   //   } else {
//   //     setPosts([]); // Clear posts if search text is empty
//   //   }
//   // }

//   return (
//     <>
//       <InputBase
//         placeholder="Search"
//         onChange={(e) => getText(e.target.value)}
//       />
//      { (
//         text && posts.map((post) => (
//           <Link
//             key={post._id} 
//             to={`details/${post._id}`}
//             style={{ textDecoration: "none", color: "inherit" }}
//           >
//             <Khojo post={post} />
//           </Link>
//         ))
//       )}
//     </>
//   );
// };


import { useState, useEffect } from "react";
import { Box, Grid, InputBase } from "@mui/material";
import { useSearchParams, Link } from "react-router-dom";

import { API } from "../../../service/api";

//components

import Khojo from "./khojo";

export const Search = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const [text, setText] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ title: title || "" });
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [title]);


  const getText = (text) => {
    setText(text);
  }

  return (
    <>

      <InputBase
        placeholder="Search"
        onChange={(e) => getText(e.target.value)}
      />

      {posts && (
        posts.map((post) => (
          <Grid item lg={3} sm={4} xs={12}>
            <Link
              to={`details/${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              
            </Link>
          </Grid>
        ))
      )}
    </>
  );
};

