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

export const GeneralExpenditureImportButton = () => {
  return <button className="btn btn-soft btn-primary">Import Tables</button>;
};

interface MonthButtonsProps {
  onClick: (month: string) => void;
  activeMonth?: string;
}

export const MonthButtons = ({ onClick, activeMonth }: MonthButtonsProps) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex gap-4 justify-self-end">
      {months.map((month) => {
        return (
          <button
            className={`btn btn-soft ${activeMonth === month ? "btn-secondary" : "btn-default"} `}
            key={month}
            onClick={() => {
              onClick(month);
            }}
          >
            {month}
          </button>
        );
      })}
    </div>
  );
};
