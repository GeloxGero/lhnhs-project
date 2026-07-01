import { useEffect, useState, useRef } from "react";
import type { GeneralExpenditureItem, ExpenseItem } from "@/lib/types";
import { ImageViewerModal } from "./modals/imageViewerModal";
import { Upload } from "lucide-react";
import { UploadImage } from "./DevUploadForm";

// ARCodePage.tsx — reads the param on the client
export const ARCodePage = () => {
  const [data, setData] = useState<ExpenseItem[]>();
  const [item, setItem] = useState<GeneralExpenditureItem>();
  const [loading, setLoading] = useState<boolean>(false);
  const [seeding, setSeeding] = useState<boolean>(false);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [selectedItemDescription, setSelectedItemDescription] = useState<
    string | null
  >(null);

  const arCode = Number(
    new URLSearchParams(window.location.search).get("code"),
  );

  useEffect(() => {
    fetchExpenseItems();
    fetchGeneralExpenditureItem();
  }, [arCode]);

  const fetchExpenseItems = async () => {
    try {
      const res = await fetch(
        `/api/protected/expense_summary/ar_get_expenses?arCode=${arCode}`,
      );
      const json: any = await res.json();
      setData(json.data);
      console.log(json.data);
    } catch {
      return <div>Error!</div>;
    }
  };

  const fetchGeneralExpenditureItem = async () => {
    try {
      const res = await fetch(
        `/api/protected/general_expenditure/ar_get_general_expenditure?arCode=${arCode}`,
      );
      const json: any = await res.json();
      setItem(json.data[0]);
    } catch {
      return <div>Error!</div>;
    }
  };

  const DEV_SEED_EXPENSE_ITEM = async () => {
    let res;
    try {
      res = await fetch("/api/protected/expense_summary/ar_code_seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arCode: arCode }),
      });
    } finally {
      fetchExpenseItems();
    }
  };

  const handleViewImage = (description: string | null) => {
    setSelectedItemDescription(description);
    setImageModalOpen(true);
  };

  let tableContent;

  if (!data) {
    tableContent = (
      <div className="text-base-content/30 flex flex-col items-center justify-center gap-3 py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p className="text-sm font-medium">No data found!!</p>
      </div>
    );
  } else if (loading) {
    tableContent = <span className="loading loading-ring loading-lg"></span>;
  } else {
    tableContent = (
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
            <th className="py-2.5 text-center">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {data!.map((item, i) => (
            <tr key={i} className="hover">
              <td className="text-base-content/40">{i + 1}</td>
              <td className="text-base-content font-medium">
                {item.description}
              </td>
              <td className="text-base-content/40">
                {item.specification || "—"}
              </td>
              <td className="text-base-content/60 text-center">
                {item.unitOfMeasure}
              </td>
              <td className="text-center font-medium">{item.quantity}</td>
              <td className="text-right font-mono">{item.price}</td>
              <td className="text-primary text-right font-mono font-semibold">
                {item.total}
              </td>
              <td className="text-center">
                <button
                  onClick={() => handleViewImage(item.description)}
                  className="btn btn-xs btn-ghost text-base-content/40 hover:text-primary hover:bg-primary/10 border-base-content/10 hover:border-primary/30 gap-1 rounded-lg border transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (!arCode) return <div>No AR code provided</div>;

  const totalProcurement = data
    ? data.reduce((sum, item) => sum + Number(item.expenseTotal || 0), 0)
    : 0;
  console.log(item);

  return (
    <div className="bg-base-200 min-h-screen">
      <ImageViewerModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        itemDescription={selectedItemDescription}
      />
      <div className="mx-auto max-w-4xl">
        {/* ── Header ── */}
        <div className="bg-base-300 border-base-content/10 relative border-b px-6 pt-6 pb-5">
          <div className="from-primary via-secondary bg-gradient-to-r-to-transparent absolute inset-x-0 top-0 h-0.5" />
          <div className="mb-4 flex justify-between">
            <button
              onClick={DEV_SEED_EXPENSE_ITEM}
              disabled={seeding}
              className="btn btn-xs btn-warning btn-outline gap-1 font-mono"
            >
              {seeding ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <span>⚡</span>
              )}
              Seed Expense Items
            </button>
            <a href="/" className="btn btn-ghost btn-sm btn-circle">
              ✕
            </a>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary/20 text-primary ring-primary/30 ring-offset-base-100 flex w-12 items-center justify-center rounded-xl text-lg font-bold ring ring-offset-2">
                  <span>{arCode}</span>
                </div>
              </div>

              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <div className="badge badge-primary badge-outline badge-sm font-semibold tracking-wide">
                    {item ? item.kra : "Loading..."}
                  </div>
                  <div className="badge badge-secondary badge-outline badge-sm">
                    {arCode}
                  </div>
                </div>
                <h3 className="text-base-content text-base leading-tight font-semibold">
                  {item ? item.accountTitle : "Loading..."}
                </h3>
              </div>
            </div>
          </div>

          <p className="text-base-content/50 mt-3 pl-15 text-sm leading-relaxed">
            {item ? item.purpose : "Loading..."}
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="stats stats-horizontal border-base-content/10 bg-base-300/50 w-full rounded-none border-b shadow-none">
          <div className="stat px-4 py-3">
            <div className="stat-title text-[10px] tracking-widest uppercase">
              Performance Indicator
            </div>
            <div className="stat-value text-primary text-lg">
              {item ? item.indicator : "Loading..."}
            </div>
            <div className="stat-desc">
              {item ? item.category : "Loading..."}
            </div>
          </div>

          <div className="stat px-4 py-3">
            <div className="stat-title text-[10px] tracking-widest uppercase">
              Resource Type
            </div>
            <div className="stat-value text-secondary text-lg">
              {item ? item.resourcesDescription : "Loading..."}
            </div>
            <div className="stat-desc"></div>
          </div>

          <div className="stat px-4 py-3">
            <div className="stat-title text-[10px] tracking-widest uppercase">
              Quantity
            </div>
            <div className="stat-value text-accent text-lg">
              {item ? item.resourcesQuantity : "Loading..."}
            </div>
            <div className="stat-desc">unit/s</div>
          </div>

          <div className="stat px-4 py-3">
            <div className="stat-title text-[10px] tracking-widest uppercase">
              Estimated Cost
            </div>
            <div className="stat-value text-success text-lg">
              ₱{totalProcurement.toFixed(2)}
            </div>
            <div className="stat-desc">₱{totalProcurement.toFixed(2)}</div>
          </div>
        </div>

        {/* ── Account Info ── */}
        <div className="bg-base-300/30 border-base-content/10 flex flex-wrap items-center gap-x-4 gap-y-1 border-b px-6 py-2.5 text-xs">
          <span className="text-base-content/40">Expense Category:</span>
          <span className="text-base-content font-medium">
            {item ? item.category : "Loading..."}
          </span>
          <span className="text-base-content/20">|</span>
          <span className="text-base-content/40">Account Code:</span>
          <span className="text-primary font-mono font-semibold">
            {item ? item.accountCode : "Loading..."}
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
              {tableContent}
            </div>

            {/* Total row */}
            <div className="bg-primary/10 border-primary/20 flex items-center justify-between border-t px-4 py-3">
              <span className="text-base-content/50 text-xs font-semibold tracking-wide uppercase">
                Total Procurement Amount
              </span>
              <span className="text-primary font-mono text-sm font-bold">
                ₱{totalProcurement.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <UploadImage />

        {/* ── Footer ── */}
        <div className="border-base-content/10 bg-base-300/30 flex items-center justify-between border-t px-6 py-4">
          <span className="text-base-content/30 text-xs tracking-wider uppercase">
            LHNHS JHS · Annual Procurement Plan 2026
          </span>
          <a
            href="/"
            className="btn btn-sm btn-primary btn-outline rounded-lg px-6"
          >
            Close
          </a>
        </div>
      </div>
    </div>
  );
};
