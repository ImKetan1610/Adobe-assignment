import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const api = "https://backendserver1.onrender.com";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/users`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(users);
  return (
    <div>
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.bio}</td>
                <td>{user.created_at}</td>
                <td>{user.updated_at}</td>
                <td>
                    <button>view</button>
                    <button>edit</button>
                    <button>delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
