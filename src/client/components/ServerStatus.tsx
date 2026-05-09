import { useEffect, useState } from "react";

export const ServerStatus = () => {
  const [status, setStatus] = useState("bad");

  const fetchPost = () => {
    fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "fafa@gmail.com",
        password: "12345",
        confirmpassword: "12345",
      }),
    })
      .then((res) => res.json())
      .then((data) => setStatus(data));
  };

  const fetchGet = () => {
    fetch("api/auth/email")
      .then((res) => res.json())
      .then((data) => setStatus(data));
  };
  useEffect(fetchPost, []);
  return (
    <div>
      <h1>ServerStatus</h1>
      <p>{status}</p>
    </div>
  );
};
