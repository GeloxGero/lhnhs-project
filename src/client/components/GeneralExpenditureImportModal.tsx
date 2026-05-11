import { useState } from "react";
import { ImportButton } from "./buttons/ImportButton";
import { GeneralExpenditureTable } from "@/components/tables/GeneralExpenditureTable";
import { parseGeneralExpenditureSheet } from "@/lib/excelParser";
import { MonthButtons } from "./MonthButtons";
import type { GeneralExpenditureItem } from "@/lib/types";

export const ImportModal = () => {
  const [previewData, setPreviewData] = useState<GeneralExpenditureItem[]>();
  const [parsing, setParsing] = useState(false);
  const [monthChoice, setMonthChoice] = useState("January");

  const handleMonthChoice = (month: string) => {
    setMonthChoice(month);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsing(true);
    const data = await parseGeneralExpenditureSheet(file);
    setParsing(false);
    setPreviewData(data);
    console.log(data);
  };

  const filterData = () => {
    return previewData!.filter(
      (item) =>
        item.month.toLocaleLowerCase() === monthChoice.toLocaleLowerCase(),
    );
  };

  return (
    <div>
      <ImportButton />
      <dialog id="import_modal" className="modal">
        {previewData ? (
          <div className="modal-box">
            <div> General Expense Table Preview</div>
            <GeneralExpenditureTable data={filterData()} />
            <MonthButtons
              onClick={handleMonthChoice}
              activeMonth={monthChoice}
            />
          </div>
        ) : (
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              General Expense Summary Import
            </h3>
            <div className="modal-action flex justify-center">
              {parsing && (
                <span className="skeleton skeleton-text">Parsing data...</span>
              )}
              {!previewData && !parsing ? (
                <input
                  type="file"
                  className="file-input"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                />
              ) : (
                <form method="dialog" />
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};
