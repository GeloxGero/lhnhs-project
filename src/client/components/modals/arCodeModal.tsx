import { useEffect } from "react";
import type { GeneralExpenditureItem } from "@/lib/types";

interface Props {
  item: GeneralExpenditureItem;
  index: number;
}

export const ARCodeModal = ({ item, index }: Props) => {
  const data = [
    {
      desc: "Thermometer Hygrometer",
      spec: "",
      uom: "unit",
      qty: 60,
      price: 1000,
      total: 60000,
    },
    {
      desc: "Barber's Cape/Haircutting Cape",
      spec: "",
      uom: "piece",
      qty: 10,
      price: 130,
      total: 1300,
    },
    {
      desc: "Hair Straightener HP321/00",
      spec: "",
      uom: "bottle",
      qty: 4,
      price: 1800,
      total: 7200,
    },
    {
      desc: "Hair Dryer 1600W Foldable BHD308/10",
      spec: "",
      uom: "unit",
      qty: 2,
      price: 2800,
      total: 5600,
    },
    {
      desc: "Plastic Drawer (Beige)",
      spec: "",
      uom: "unit",
      qty: 2,
      price: 2600,
      total: 5200,
    },
  ];
  return (
    <dialog
      id={`ar_code_modal_${index}`}
      className="modal --color-neutral-content"
    >
      <div className="modal-box bg-base-200 max-w-4xl overflow-hidden rounded-2xl p-0">
        {/* ── Header ── */}
        <div className="bg-base-300 border-base-content/10 relative border-b px-6 pt-6 pb-5">
          <div className="from-primary via-secondary bg-gradient-to-r-to-transparent absolute inset-x-0 top-0 h-0.5" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary/20 text-primary ring-primary/30 ring-offset-base-100 flex w-12 items-center justify-center rounded-xl text-lg font-bold ring ring-offset-2">
                  <span>{index + 1}</span>
                </div>
              </div>

              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <div className="badge badge-primary badge-outline badge-sm font-semibold tracking-wide">
                    {item.kra}
                  </div>
                  <div className="badge badge-secondary badge-outline badge-sm">
                    {item.arCode}
                  </div>
                </div>
                <h3 className="text-base-content text-base leading-tight font-semibold">
                  {item.accountTitle}
                </h3>
              </div>
            </div>
            <form method="dialog">
              <button className="btn btn-ghost btn-sm btn-circle">✕</button>
            </form>
          </div>

          <p className="text-base-content/50 mt-3 pl-15 text-sm leading-relaxed">
            {item.purpose}
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="stats stats-horizontal border-base-content/10 bg-base-300/50 w-full rounded-none border-b shadow-none">
          <div className="stat px-4 py-3">
            <div className="stat-title text-[10px] tracking-widest uppercase">
              Performance Indicator
            </div>
            <div className="stat-value text-primary text-lg"># of Bills</div>
            <div className="stat-desc">monthly electricity bills</div>
          </div>

          <div className="stat px-4 py-3">
            <div className="stat-title text-[10px] tracking-widest uppercase">
              Resource Type
            </div>
            <div className="stat-value text-secondary text-lg">Electrical</div>
            <div className="stat-desc">electrical supply</div>
          </div>

          <div className="stat px-4 py-3">
            <div className="stat-title text-[10px] tracking-widest uppercase">
              Quantity
            </div>
            <div className="stat-value text-accent text-lg">1</div>
            <div className="stat-desc">unit/s</div>
          </div>

          <div className="stat px-4 py-3">
            <div className="stat-title text-[10px] tracking-widest uppercase">
              Budget
            </div>
            <div className="stat-value text-success text-lg">₱30K</div>
            <div className="stat-desc">₱30,000.00</div>
          </div>
        </div>

        {/* ── Account Info ── */}
        <div className="bg-base-300/30 border-base-content/10 flex flex-wrap items-center gap-x-4 gap-y-1 border-b px-6 py-2.5 text-xs">
          <span className="text-base-content/40">Expense Category:</span>
          <span className="text-base-content font-medium">
            Electricity Expenses
          </span>
          <span className="text-base-content/20">|</span>
          <span className="text-base-content/40">Account Code:</span>
          <span className="text-primary font-mono font-semibold">
            5020402000
          </span>
        </div>

        {/* ── Procurement Table ── */}
        <div className="px-6 py-4">
          <h4 className="text-base-content mb-3 flex items-center gap-2 text-sm font-semibold">
            <span className="bg-primary inline-block h-4 w-1 rounded-full" />
            Annual Procurement Plan Items
          </h4>

          <div className="border-base-content/10 overflow-hidden rounded-xl border">
            <div className="max-h-60 overflow-x-auto overflow-y-auto">
              <table className="table-xs table-zebra table w-full">
                <thead className="bg-base-300 text-base-content/50 text-[10px] tracking-wider uppercase">
                  <tr>
                    <th className="py-2.5">#</th>
                    <th className="py-2.5">Item Description</th>
                    <th className="py-2.5">Specification</th>
                    <th className="py-2.5 text-center">UoM</th>
                    <th className="py-2.5 text-center">Qty</th>
                    <th className="py-2.5 text-right">Price (₱)</th>
                    <th className="py-2.5 text-right">Total (₱)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr key={i} className="hover">
                      <td className="text-base-content/40">{i + 1}</td>
                      <td className="text-base-content font-medium">
                        {item.desc}
                      </td>
                      <td className="text-base-content/40">
                        {item.spec || "—"}
                      </td>
                      <td className="text-base-content/60 text-center">
                        {item.uom}
                      </td>
                      <td className="text-center font-medium">{item.qty}</td>
                      <td className="text-right font-mono">
                        {item.price.toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="text-primary text-right font-mono font-semibold">
                        {item.total.toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total row */}
            <div className="bg-primary/10 border-primary/20 flex items-center justify-between border-t px-4 py-3">
              <span className="text-base-content/50 text-xs font-semibold tracking-wide uppercase">
                Total Procurement Amount
              </span>
              <span className="text-primary font-mono text-sm font-bold">
                ₱79,300.00
              </span>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="modal-action border-base-content/10 bg-base-300/30 flex items-center justify-between border-t px-6 py-4">
          <span className="text-base-content/30 text-xs tracking-wider uppercase">
            LHNHS JHS · Annual Procurement Plan 2026
          </span>
          <form method="dialog">
            <button className="btn btn-sm btn-primary btn-outline rounded-lg px-6">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
