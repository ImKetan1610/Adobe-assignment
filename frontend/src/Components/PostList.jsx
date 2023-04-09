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
  console.log(post);
    
  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {post.map((ps)=>(
            <li key={ps._id}>
                {/* <h2>{ps.title}</h2> */}
                <p>Post: {ps.content}</p>
                <p>Likes: {ps.likes}</p>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
