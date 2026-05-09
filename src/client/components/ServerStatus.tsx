import { useEffect, useState } from "react";

export const ServerStatus = () => {
  const [status, setStatus] = useState("bad");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, []);
  return (
    <div>
      <h1>ServerStatus</h1>
      <p>{status}</p>
    </div>
  );
};
