import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PostAnalytics = () => {
    const [totalPosts, setTotalPosts] = useState(0)
    const [mostLikedPosts, setMostLikedPosts] = useState([])
    const api = "https://backendserver1.onrender.com"

    useEffect(()=>{
        axios.get(`${api}/analytics/posts`).then((response)=>{
            setTotalPosts(response.data.totalPosts)
        })
        axios.get(`${api}/analytics/posts/top-liked`).then((response)=>{
            setMostLikedPosts(response.data.mostLikedPosts)
        })
    },[])

  return (
    <div>
      <h2>Post Analytics</h2>
      <p>Total number of posts: {totalPosts}</p>
      <p>Top 5 most liked posts:</p>
      <ul>
        {/* {mostLikedPosts.map((post)=>(
            <li key={post._id}>
                {post.content} - {post.likes} likes
            </li>
        ))} */}
      </ul>
    </div>
  )
}

export default PostAnalytics
