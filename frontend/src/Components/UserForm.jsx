import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const api = "https://backendserver1.onrender.com";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${api}/users`, { name, email, bio });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    console.log({ name, email, bio });
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h2>Add Users</h2>
      <label htmlFor="name">
        Name:{" "}
        </label><br />
        <input
          id="name"
          type="text"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />
      <br/><br/>
      <label htmlFor="email">
        Email:{" "}
        </label><br />
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      <br/><br/>
      <label htmlFor="bio">
        Bio:{" "}
        </label> <br />
        <input
          id="bio"
          type="text"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      <br/><br/>
      <button id="btn" type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
