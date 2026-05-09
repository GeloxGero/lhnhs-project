import { useState } from "react";
import { CircleX } from "lucide-react";

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error);
      return;
    }

    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box h-fit w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        {error && (
          <div role="alert" className="alert alert-error alert-soft">
            <CircleX />
            <span>{error}</span>
          </div>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </form>
  );
};

export const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setError("Passwords do not match!");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmpassword }),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error);
      return;
    }

    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box h-fit w-xs border p-4">
        <legend className="fieldset-legend">Register</legend>

        {error && (
          <div role="alert" className="alert alert-error alert-soft">
            <CircleX />
            <span>{error}</span>
          </div>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          required
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="input"
          placeholder="Password"
          required
        />

        <label className="label">Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          value={confirmpassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="input"
          placeholder="Confirm Password"
          required
        />

        <button type="submit" className="btn btn-neutral mt-4">
          Register
        </button>
      </fieldset>
    </form>
  );
};
