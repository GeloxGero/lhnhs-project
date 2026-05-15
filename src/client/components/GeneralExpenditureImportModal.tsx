import { useState } from "react";
import {
  MonthButtons,
  GeneralExpenditureImportButton,
} from "./buttons/GeneralExpenditureButtons";
import { GeneralExpenditureTable } from "@/components/tables/GeneralExpenditureTable";
import { parseGeneralExpenditureSheet } from "@/lib/excelParser";
import type { GeneralExpenditureItem } from "@/lib/types";
import { onClickShowModal } from "@/lib/helpers";

export const ImportModal = () => {
  const [previewData, setPreviewData] = useState<GeneralExpenditureItem[]>();
  const [parsing, setParsing] = useState(false);
  const [monthChoice, setMonthChoice] = useState("January");
  const [yearChoice, setYearChoice] = useState<number>(1850);
  const [isYearValid, setIsYearValid] = useState<boolean>(false);

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
  };

  const filterData = () => {
    return previewData!.filter(
      (item) =>
        item.month.toLocaleLowerCase() === monthChoice.toLocaleLowerCase(),
    );
  };

  const handleYearChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.valueAsNumber;
    setYearChoice(year);

    setIsYearValid(year! >= 1900 && year! <= 2030);
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={onClickShowModal("import_modal")}
      >
        Import Tables
      </button>
      <dialog id="import_modal" className="modal">
        {previewData ? (
          <div className="modal-box h-screen max-w-screen">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Year</legend>
              <input
                type="number"
                className="input validator"
                placeholder="Year of this table"
                min={1900}
                max={2030}
                value={yearChoice}
                onChange={handleYearChanged}
                required
              />
              <p className="validator-hint">Invalid Year</p>
            </fieldset>
            <div className="flex justify-between">
              <GeneralExpenditureImportButton
                isYearValid={isYearValid}
                data={previewData}
                year={yearChoice!}
              />
              <MonthButtons
                onClick={handleMonthChoice}
                activeMonth={monthChoice}
              />
            </div>

            <h3 className="justify-self-center py-4">
              General Expense Table Preview
            </h3>
            <GeneralExpenditureTable data={filterData()} isPreview={true} />
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
