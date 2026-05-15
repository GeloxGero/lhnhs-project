import type { GeneralExpenditureItem } from "@/lib/types";

type ImportButtonProps = {
  year: number;
  data: GeneralExpenditureItem[];
  isYearValid: boolean;
};

export const GeneralExpenditureImportButton = ({
  data,
  year,
  isYearValid,
}: ImportButtonProps) => {
  data = data.map((item) => ({ ...item, year }));

  return (
    <button
      className={`btn btn-soft btn-primary`}
      disabled={!isYearValid}
      onClick={async () => {
        const res = await fetch(
          "/api/protected/general_expenditure/batch_import",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
          },
        );

        console.log(await res.json());
      }}
    >
      Import Tables
    </button>
  );
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
