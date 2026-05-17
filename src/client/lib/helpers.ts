export const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  window.location.href = "/auth/login";
};

export const onClickShowModal =
  (modalId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };
