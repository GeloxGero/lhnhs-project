import { logout } from "@/lib/helpers";

export const LogoutButton = () => {
  return (
    <button
      className="btn btn-neutral btn-outline"
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
};
