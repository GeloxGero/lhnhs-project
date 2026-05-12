export const GeneralExpenditureModalButton = () => {
  const handleImportButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    (document.getElementById("import_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <button className="btn" onClick={handleImportButtonClick}>
      Import Tables
    </button>
  );
};

export const GeneralExpenditureImportButton = () => {};
