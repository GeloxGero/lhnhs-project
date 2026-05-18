// * --------------------- API CALLS --------------------- * //
export const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  window.location.href = "/auth/login";
};

// * ----------------------- FUNCTION CALLS --------------------- * //

export const onClickShowModal =
  (modalId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };

export const getDialogElement = (modalId: string): HTMLDialogElement => {
  return document.getElementById(modalId) as HTMLDialogElement;
};
