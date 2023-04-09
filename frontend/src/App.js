import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserForm from "./Components/UserForm";
import PostForm from "./Components/PostForm";
import UserList from "./Components/UserList";
import PostList from "./Components/PostList";
import UserAnalytics from "./Components/UserAnalytics";
import PostAnalytics from "./Components/PostAnalytics";
import "./App.css";

const App = () => {
  {
    /* <UserForm />
  <PostForm />
  <UserList />
  <PostList />
  <UserAnalytics />
  <PostAnalytics /> */
  }
  return (
    <div>
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/postsForm">Add Posts</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/userAnalytics">User Analytics</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/postAnalytics">Post Analytics</Link>
            </li>
          </div>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/postsForm" element={<PostForm />} />
        <Route path="/userAnalytics" element={<UserAnalytics />} />
        <Route path="/postAnalytics" element={<PostAnalytics />} />
      </Routes>
    </div>
  );
};

export default App;
