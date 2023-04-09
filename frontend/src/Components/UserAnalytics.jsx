import React, { useEffect, useState } from "react";
import axios from "axios";

const UserAnalytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [mostActiveUsers, setMostActiveUsers] = useState([]);

  const api = "https://backendserver1.onrender.com";

  useEffect(() => {
    axios.get(`${api}/analytics/users`).then((response) => {
      setTotalUsers(response.data.totalUsers);
    });
    axios.get(`${api}/analytics/users/top-active`).then((response) => {
      setMostActiveUsers(response.data.mostActiveUsers);
    });
  }, []);
console.log("most",totalUsers,mostActiveUsers)
  return (
    <div>
      <h2>User Analytics</h2>
      <p>Total Numbers of User : {totalUsers} </p>
      <p>Top 5 most active users : </p>
      <ul>
        {mostActiveUsers.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserAnalytics;
