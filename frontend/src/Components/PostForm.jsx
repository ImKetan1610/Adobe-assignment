import React, { useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");

  const api = "https://backendserver1.onrender.com"

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${api}/posts`,{
            user_id:userId,
            content,
        })
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h2>Add Posts</h2>
      <label htmlFor="userId">User ID: </label><br />
      <input
        type="text"
        id="userId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      /><br/><br/>

      <label htmlFor="content">Content: </label><br/>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /><br /><br />

      <button id="btn" type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
