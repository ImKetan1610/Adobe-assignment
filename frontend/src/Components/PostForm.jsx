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
    <form onSubmit={handleSubmit}>
      <label htmlFor="userId">User ID: </label>
      <input
        type="text"
        id="userId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />

      <label htmlFor="content">Content: </label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
