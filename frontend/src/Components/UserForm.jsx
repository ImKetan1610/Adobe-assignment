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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name:{" "}
        <input
          id="name"
          type="text"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label htmlFor="email">
        Email:{" "}
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label htmlFor="bio">
        Bio:{" "}
        <input
          id="bio"
          type="text"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
