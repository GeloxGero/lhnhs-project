import { logout } from "@/lib/helpers";

export const LogoutButton = () => {
  return (
    <button
      className="btn btn-dash btn-error"
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
};
