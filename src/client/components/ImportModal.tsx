import { useState } from "react";
import { ImportButton } from "./buttons/ImportButton";
import { parseGeneralExpenditureSheet } from "@/lib/excelParser";
import type { ParsedGeneralExpenditureItemsData } from "@/lib/types";

export const ImportModal = () => {
  const [previewData, setPreviewData] =
    useState<ParsedGeneralExpenditureItemsData>();
  const [parsing, setParsing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsing(true);
    const data = await parseGeneralExpenditureSheet(file);
    setParsing(false);
    setPreviewData(data);
    console.log(data);
  };

  return (
    <div>
      <ImportButton />
      <dialog id="import_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">General Expense Summary Import</h3>
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
      </dialog>
    </div>
  );
};
