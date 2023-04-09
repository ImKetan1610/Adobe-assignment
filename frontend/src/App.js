import React from 'react'
import UserForm from './Components/UserForm'
import PostForm from './Components/PostForm'
import UserList from './Components/UserList'
import PostList from './Components/PostList'
import UserAnalytics from './Components/UserAnalytics'
import PostAnalytics from './Components/PostAnalytics'

const App = () => {
  return (
    <>
      <UserForm />
      <PostForm />
      <UserList />
      <PostList />
      <UserAnalytics />
      <PostAnalytics />
    </>
  )
}

export default App
