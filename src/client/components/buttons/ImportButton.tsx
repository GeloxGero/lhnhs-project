export const ImportButton = () => {
  const handleImportButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    (document.getElementById("import_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div>
      <button className="btn" onClick={handleImportButtonClick}>
        Modal is Open
      </button>
      <dialog id="import_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
