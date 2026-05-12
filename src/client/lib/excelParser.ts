import * as XLSX from "xlsx";

import type {
  GeneralExpenditureCategory,
  GeneralExpenditureItem,
} from "./types";

export const parseGeneralExpenditureSheet = (
  file: File,
): Promise<GeneralExpenditureItem[]> => {
  const OFF_KRA = 0;
  const OFF_SIP = 1;
  const OFF_PPA = 2;
  const OFF_PURPOSE = 3;
  const OFF_PERF_IND = 4;
  const OFF_RES_DESC = 5;
  const OFF_QTY = 6;
  const OFF_COST = 7;
  const OFF_ACC_TITLE = 8;
  const OFF_ACC_CODE = 9;

  const DATA_START_ROW = 5;

  const SECTIONS: { category: GeneralExpenditureCategory; startCol: number }[] =
    [
      { category: "regular", startCol: 1 },
      { category: "project_related", startCol: 12 }, // adjust to match your template
      { category: "repair_and_maintenance", startCol: 23 }, // adjust
      { category: "others", startCol: 34 }, // adjust
    ];

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);

        const workbook = XLSX.read(data, {
          type: "array",
          cellFormula: false,
          cellHTML: false,
          cellNF: false,
          cellStyles: false,
        });

        const parsedData: GeneralExpenditureItem[] = [];

        for (const sheetName of workbook.SheetNames) {
          const ws = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json<string[]>(ws, {
            header: 1,
            defval: "",
          });

          for (let r = DATA_START_ROW - 1; r < rows.length; r++) {
            const row = rows[r] as string[];

            for (const { category, startCol } of SECTIONS) {
              const col = startCol - 1;

              const kra = String(row[col + OFF_KRA] ?? "").trim();
              const ppa = String(row[col + OFF_PPA] ?? "").trim();

              // skip empty rows
              if (!kra && !ppa) continue;

              // skip NONE and subtotal rows
              if (kra.toUpperCase() === "NONE" || ppa.toUpperCase() === "NONE")
                continue;
              if (
                /sub-?total|total budget/i.test(ppa) ||
                /sub-?total|total budget/i.test(kra)
              )
                continue;

              const costRaw = String(row[col + OFF_COST] ?? "").replace(
                /[₱,\s]/g,
                "",
              );
              const cost = parseFloat(costRaw) || 0;

              if (!ppa && cost === 0) continue;

              const item: GeneralExpenditureItem = {
                kra,
                sipProgram: String(row[col + OFF_SIP] ?? "").trim(),
                activity: ppa,
                purpose: String(row[col + OFF_PURPOSE] ?? "").trim(),
                indicator: String(row[col + OFF_PERF_IND] ?? "").trim(),
                resourcesDescription: String(
                  row[col + OFF_RES_DESC] ?? "",
                ).trim(),
                resourcesQuantity:
                  parseInt(
                    String(row[col + OFF_QTY] ?? "").replace(/[,\s]/g, ""),
                  ) || 0,
                estimatedCost: cost,
                accountTitle: String(row[col + OFF_ACC_TITLE] ?? "").trim(),
                accountCode: String(row[col + OFF_ACC_CODE] ?? "").trim(),
                category,
                month: sheetName,
              };

              parsedData.push(item);
            }
          }
        }

        resolve(parsedData);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};
