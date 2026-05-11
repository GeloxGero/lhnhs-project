interface Props {
  onClick: (month: string) => void;
  activeMonth?: string;
}

export const MonthButtons = ({ onClick, activeMonth }: Props) => {
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
    <div>
      {months.map((month) => {
        return (
          <button
            className={`btn btn-soft ${activeMonth === month ? "btn-default" : "btn-primary"} `}
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
