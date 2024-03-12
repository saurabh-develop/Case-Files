import React, { useEffect, useState } from "react";
import { API } from "../../../service/api";

const Post = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts();
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => <div>Hello</div>)
      ) : (
        <div>No data available to display</div>
      )}
    </>
  );
};

export default Post;
