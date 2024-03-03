import React, { useState } from "react";
import userContext from "./userContext";

const UserState = (props) => {
  const host = "https://notes-man-backend.vercel.app";
  const [user, setUser] = useState({});

  // Get user details
  const getUser = async () => {
    // API Calls
    let url = `${host}/api/auth/getuser`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    setUser(json);
  }

  return (
    <userContext.Provider value={{ user, getUser}}>
      {props.children}
    </userContext.Provider>
  )
}

export default UserState;