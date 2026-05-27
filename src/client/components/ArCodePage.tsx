// ARCodePage.tsx — reads the param on the client
export const ARCodePage = () => {
  const arCode = Number(
    new URLSearchParams(window.location.search).get("code"),
  );

  if (!arCode) return <div>No AR code provided</div>;

  return <div>This is the Ar Code Page with the code {arCode}</div>;
};
