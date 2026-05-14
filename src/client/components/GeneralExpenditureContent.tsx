import { type GeneralExpenditureItem } from "@/lib/types";
import { MonthButtons } from "./buttons/GeneralExpenditureButtons";
import { GeneralExpenditureTable } from "./tables/GeneralExpenditureTable";
import { useState, useEffect } from "react";

export const GeneralExpenditureContent = (): React.ReactNode => {
  const [data, setData] = useState<GeneralExpenditureItem[]>();
  const [monthChoice, setMonthChoice] = useState<string>("January");
  const [year, setYearChoice] = useState<number>(2026);

  const [loadingData, setLoadingData] = useState<boolean>(false);

  const fetchDataOfYear = async () => {
    const params = new URLSearchParams({ year: String(year) });
    setLoadingData(true);
    const res = await fetch(
      `/api/protected/general_expenditure/get_by_year?${params}`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) {
      setLoadingData(false);
      throw new Error(`Request failed: ${res.status}`);
    }
    const json = await res.json();
    console.log(json);
    setData(json.data);
    setLoadingData(false);
  };

  useEffect(() => {
    fetchDataOfYear();
  }, [year]);
  const handleMonthChoice = (month: string) => {
    setMonthChoice(month);
  };

  const filterData = (): GeneralExpenditureItem[] => {
    if (!data) return [];
    return data.filter((item) => {
      return item.month.toLocaleLowerCase() === monthChoice.toLocaleLowerCase();
    });
  };
  return (
    <div>
      <MonthButtons onClick={handleMonthChoice} activeMonth={monthChoice} />
      <h3 className="justify-self-center py-4">General Expense Table</h3>

      {loadingData ? (
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div>
          <GeneralExpenditureTable data={filterData()} isPreview={false} />
          <button className="btn btn-soft btn-accent"></button>
        </div>
      )}
    </div>
  );
};
