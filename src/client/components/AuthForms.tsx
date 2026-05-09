export const LoginForm = () => {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box h-fit w-xs border p-4">
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" />

      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" />

      <button className="btn btn-neutral mt-4">Login</button>
    </fieldset>
  );
};

export const RegisterForm = () => {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box h-fit w-xs border p-4">
      <legend className="fieldset-legend">Register</legend>

      <label className="label">Email</label>
      <input type="email" className="input" placeholder="Email" />

      <label className="label">Password</label>
      <input type="password" className="input" placeholder="Password" />

      <label className="label">Password</label>
      <input
        type="confirmpassword"
        className="input"
        placeholder="Confirm Password"
      />

      <button className="btn btn-neutral mt-4">Register</button>
    </fieldset>
  );
};
