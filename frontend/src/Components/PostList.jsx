import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PostList = () => {
    const [post, setPost] = useState([])

    const api = 'https://backendserver1.onrender.com'
 
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${api}/posts`)
            setPost(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {post.map((post)=>{
            <li key={post._id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>Likes: {post.likes}</p>
            </li>
        })}
      </ul>
    </div>
  )
}

export default PostList
