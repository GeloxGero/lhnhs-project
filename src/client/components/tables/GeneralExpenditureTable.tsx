import type { GeneralExpenditureItem } from "@/lib/types";
import { onClickShowModal } from "@/lib/helpers";
import { useState } from "react";

interface SubTableProps {
  title: string;
  data: GeneralExpenditureItem[];
  isPreview: boolean;
  arModalOpenIndex: number | undefined;
  setArModalOpenIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}
const kraColor = (kra: string) => {
  if (kra.includes("KRA 1")) return "border-l-cyan-400 bg-cyan-400/5";
  if (kra.includes("KRA 2")) return "border-l-teal-400 bg-teal-400/5";
  if (kra.includes("KRA 3")) return "border-l-sky-400 bg-sky-400/5";
  return "border-l-slate-500";
};

const kraBadgeColor = (kra: string) => {
  if (kra.includes("KRA 1")) return "bg-cyan-400/10   ring-cyan-400/30";
  if (kra.includes("KRA 2"))
    return "bg-teal-400/10 text-teal-400 ring-teal-400/30";
  if (kra.includes("KRA 3"))
    return "bg-sky-400/10 text-sky-400 ring-sky-400/30";
  return "bg-slate-400/10 text-slate-400";
};

const ExpenditureTable = ({
  title,
  data,
  isPreview,
  arModalOpenIndex,
  setArModalOpenIndex,
}: SubTableProps) => {
  if (data.length === 0) return null;
  console.log(isPreview);

  return (
    <div className="mb-6 rounded-3xl px-3">
      <h4 className="badge badge-soft badge-info my-5">{title}</h4>
      <div className="overflow-x-auto">
        <table className="table-xs table">
          <thead>
            <tr>
              <th className="w-8 py-3 pl-4 font-semibold">#</th>
              <th className="min-w-35 py-3 font-semibold">KRA</th>
              <th className="min-w-20 py-3 font-semibold">SIP</th>
              <th className="min-w-45 py-3 font-semibold">Activity</th>
              <th className="min-w-55 py-3 font-semibold">Purpose</th>
              <th className="min-w-35 py-3 font-semibold">Indicator</th>
              <th className="min-w-30 py-3 font-semibold">Resources</th>
              <th className="py-3 text-center font-semibold">Qty</th>
              <th className="min-w-25 py-3 text-right font-semibold">
                Est. Cost
              </th>
              <th className="min-w-40 py-3 font-semibold">Account Title</th>
              <th className="min-w-27.5 py-3 font-mono font-semibold">
                Acct Code
              </th>

              {isPreview ? null : (
                <th className="py-3 pr-4 text-center font-semibold">Ar Code</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`border-l-2 ${kraColor(item.kra)} border-base-content/5 hover:bg-base-content/5 group border-b transition-colors`}
              >
                <td className="text-base-content/30 py-3 pl-4 text-xs tabular-nums">
                  {index + 1}
                </td>

                <td className="py-3">
                  <span
                    className={`text-neutral-content inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${kraBadgeColor(item.kra)}`}
                  >
                    {item.kra}
                  </span>
                </td>

                <td className="text-base-content/30 py-3 text-xs">
                  {item.sipProgram || "—"}
                </td>

                <td className="text-base-content/80 py-3 text-xs leading-snug font-medium">
                  {item.activity}
                </td>

                <td className="text-base-content/50 max-w-55 py-3 text-xs leading-relaxed">
                  {item.purpose}
                </td>

                <td className="text-base-content/60 py-3 text-xs leading-snug">
                  {item.indicator}
                </td>

                <td className="text-base-content/60 py-3 text-xs">
                  {item.resourcesDescription || "—"}
                </td>

                <td className="text-base-content/70 py-3 text-center text-xs font-semibold">
                  {item.resourcesQuantity}
                </td>

                <td className="text-base-content/80 py-3 text-right font-mono text-xs font-semibold">
                  ₱{item.estimatedCost.toLocaleString()}
                </td>

                <td className="text-base-content/60 py-3 text-xs leading-snug">
                  {item.accountTitle}
                </td>

                <td className="py-3 font-mono text-[11px] text-cyan-500/70">
                  {item.accountCode}
                </td>
                {isPreview ? null : (
                  <td>
                    <a
                      href={`/ar-code?code=${item.arCode}`}
                      className="badge badge-info"
                    >
                      {item.arCode}
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface Props {
  data: GeneralExpenditureItem[];
  isPreview: boolean;
}

export const GeneralExpenditureTable = ({ data, isPreview }: Props) => {
  const [arModalOpenIndex, setArModalOpenIndex] = useState<number | undefined>(
    -1,
  );

  const CATEGORIES: { key: string; label: string }[] = [
    { key: "regular", label: "Regular Expenditure" },
    { key: "project_related", label: "Project Related Expenditure" },
    { key: "repair_and_maintenance", label: "Repair and Maintenance" },
    { key: "others", label: "Others" },
  ];

  return (
    <div className="overflow-x-auto">
      {/* Section label */}
      <div className="mb-3 flex items-center gap-3 px-5 pt-6">
        <h2 className="text-base-content/60 text-sm font-semibold tracking-widest uppercase">
          General Expenses Table
        </h2>
        <div className="bg-base-content/8 h-px flex-1" />
        <span className="badge badge-ghost badge-sm text-base-content/40">
          {data.length} items
        </span>
      </div>
      <div>
        {" "}
        <div className="divider"></div>
      </div>

      {CATEGORIES.map(({ key, label }) => {
        return (
          <ExpenditureTable
            key={key}
            title={label}
            data={data.filter((item) => item.category === key)}
            isPreview={isPreview}
            arModalOpenIndex={arModalOpenIndex}
            setArModalOpenIndex={setArModalOpenIndex}
          />
        );
      })}
    </div>
  );
};
