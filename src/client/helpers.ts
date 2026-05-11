export const checkAuth = async () => {
  const cookie = document.cookie;

  console.log(cookie);
};

export const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  window.location.href = "/auth/login";
};
