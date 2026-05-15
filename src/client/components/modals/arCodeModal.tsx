export const arCodeModal = () => {
  return (
    <dialog id="ar_code_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
      </div>
    </dialog>
  );
};

export const onClickShowModal = (modalId: string): void => {
  (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
};

export const GeneralExpenditureModalButton = () => {
  const handleImportButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    (document.getElementById("import_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <button className="btn btn-primary" onClick={handleImportButtonClick}>
      Import Tables
    </button>
  );
};
