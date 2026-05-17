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

const regularRows = [
  {
    kra: "KRA 1: LEADING STRATEGICALLY",
    sip: "",
    activity: "Pay of monthly electricity bill",
    purpose:
      "Paid electricity of the JHS to ensure continuous provision of electrical supply",
    indicator: "# of monthly electricity bills",
    resource: "electrical supply",
    qty: 1,
    cost: 40000,
    title: "Electricity Expenses",
    code: "5020402000",
    ar: 99,
  },
  {
    kra: "KRA 1: LEADING STRATEGICALLY",
    sip: "",
    activity: "Pay monthly landline subscription",
    purpose:
      "Paid landline subscription for teachers and staff with official transactions",
    indicator: "# of monthly landline services paid",
    resource: "telephone services",
    qty: 1,
    cost: 2000,
    title: "Communication Expenses Landline",
    code: "5020202002",
    ar: 102,
  },
  {
    kra: "KRA 1: LEADING STRATEGICALLY",
    sip: "",
    activity: "Pay monthly internet subscription",
    purpose:
      "Paid monthly internet connection for academic & administrative use for school learners support services",
    indicator: "# of monthly internet services paid",
    resource: "fiber internet",
    qty: 1,
    cost: 2100,
    title: "Communication Expenses Internet Subscription",
    code: "5020503000",
    ar: 104,
  },
  {
    kra: "KRA 1: LEADING STRATEGICALLY",
    sip: "",
    activity: "Procure fuel for school service in submission of school report",
    purpose:
      "Provided transportation for teachers and staff in submission of school report",
    indicator: "# of procured fuel for school service for",
    resource: "Gasoline",
    qty: 4,
    cost: 5000,
    title: "Fuel, Oil, and Lubricants",
    code: "5020309000",
    ar: 106,
  },
  {
    kra: "KRA 1: LEADING STRATEGICALLY",
    sip: "",
    activity: "Pay hired Job Order Utility Personnel",
    purpose: "Paid hired job order utility services",
    indicator: "# of personnel paid",
    resource: "wages",
    qty: 2,
    cost: 22500,
    title: "Other General Services",
    code: "5021299000",
    ar: 108,
  },
  {
    kra: "KRA 2: MANAGING SCHOOL OPERATIONS AND RESOURCES",
    sip: "",
    activity: "Pay monthly internet bills",
    purpose:
      "Paid monthly internet connection for academic & administrative use",
    indicator: "# of internet bills paid",
    resource: "5Mbps Internet Connection",
    qty: 3,
    cost: 5000,
    title: "Internet Subscription Expenses",
    code: "5020503000",
    ar: 110,
  },
  {
    kra: "KRA 2: MANAGING SCHOOL OPERATIONS AND RESOURCES",
    sip: "",
    activity: "Pay Electricity bills",
    purpose: "To provide the electrical supply for the SHS",
    indicator: "# of monthly internet bill paid",
    resource: "Electricity",
    qty: 1,
    cost: 80000,
    title: "Electricity Expenses",
    code: "5020402000",
    ar: 112,
  },
];

const projectRows = [
  {
    kra: "KRA 2: MANAGING SCHOOL OPERATIONS AND RESOURCES",
    sip: "",
    activity: "Procure Medicines and Vitamins",
    purpose:
      "Procured medicines and vitamins for the treatment of minor illness and to boost the immune system of teachers, students and personnel",
    indicator: "# of procured medicines and vitamins",
    resource: "(please see annexes for list of medicines and vitamins)",
    qty: 1,
    cost: 15000,
    title: "Drugs and Medicines Expenses",
    code: "5020307000",
    ar: 100,
  },
  {
    kra: "KRA 1: LEADING STRATEGICALLY",
    sip: "",
    activity:
      "Procure of materials for the printing of 1st and 2nd Quarterly Assessment of students",
    purpose:
      "Procured printing materials for the 1st and 2nd Quarterly Assessment of students",
    indicator: "# of procured printing materials",
    resource: "Bondpapers",
    qty: 240,
    cost: 60000,
    title: "Office Supplies Expenses",
    code: "5020301002",
    ar: 103,
  },
  {
    kra: "KRA 3: FOCUSING ON TEACHING AND LEARNING",
    sip: "",
    activity: "Reimburse travelling expenses of SHS Teachers for Immersion",
    purpose:
      "Reimburse travelling expenses of SHS Teachers for Immersion of SHS students",
    indicator: "No. of reimbursement requested",
    resource: "Registration fee and Travelling expenses",
    qty: 10,
    cost: 5000,
    title: "Travelling Expenses",
    code: "5020101000",
    ar: 105,
  },
  {
    kra: "KRA 2: MANAGING SCHOOL OPERATIONS AND RESOURCES",
    sip: "",
    activity:
      "Procure materials for the printing of Quarterly Assessment for SHS",
    purpose:
      "Procured materials for the printing of Summative Assessment of SHS in the 3rd & 4th Quarter",
    indicator: "# of procurement made",
    resource: "",
    qty: 1,
    cost: 100000,
    title: "Office Supplies Expenses",
    code: "5020301002",
    ar: 107,
  },
  {
    kra: "KRA 2: MANAGING SCHOOL OPERATIONS AND RESOURCES",
    sip: "",
    activity: "Procure Semi-Expendable ICT Equipment for HUMSS",
    purpose: "Procured ICT equipment for HUMSS Teacher",
    indicator: "# of procurement made",
    resource: "",
    qty: 1,
    cost: 10000,
    title: "Semi Expendable - ICT Equipment",
    code: "5020321003",
    ar: 109,
  },
  {
    kra: "KRA 2: MANAGING SCHOOL OPERATIONS AND RESOURCES",
    sip: "",
    activity: "Procure Expendable materials & ICT Equipment for",
    purpose: "Procured materials and ICT Equipment to improve the...",
    indicator: "# of procurement made",
    resource: "",
    qty: 1,
    cost: 10000,
    title: "Semi Expendable - ICT Equipment",
    code: "5020321003",
    ar: 111,
  },
];

const ArBadge = ({ code }: { code: number }) => (
  <span className="inline-flex h-7 min-w-[2.4rem] cursor-pointer items-center justify-center rounded-full bg-cyan-500 px-2 text-xs font-bold text-slate-900 tabular-nums shadow shadow-cyan-500/30 transition-colors hover:bg-cyan-400">
    {code}
  </span>
);

const kraColor = (kra: string) => {
  if (kra.includes("KRA 1")) return "border-l-cyan-400 bg-cyan-400/5";
  if (kra.includes("KRA 2")) return "border-l-teal-400 bg-teal-400/5";
  if (kra.includes("KRA 3")) return "border-l-sky-400 bg-sky-400/5";
  return "border-l-slate-500";
};

const kraBadgeColor = (kra: string) => {
  if (kra.includes("KRA 1"))
    return "bg-cyan-400/10 text-cyan-400 ring-cyan-400/30";
  if (kra.includes("KRA 2"))
    return "bg-teal-400/10 text-teal-400 ring-teal-400/30";
  if (kra.includes("KRA 3"))
    return "bg-sky-400/10 text-sky-400 ring-sky-400/30";
  return "bg-slate-400/10 text-slate-400";
};

type Row = (typeof regularRows)[0];

const TableSection = ({
  title,
  rows,
  accent,
}: {
  title: string;
  rows: Row[];
  accent: string;
}) => (
  <div className="mb-8">
    <div className="border-base-content/10 overflow-hidden rounded-2xl border shadow-xl shadow-black/20">
      <div className="overflow-x-auto">
        <table className="table-sm table w-full">
          <thead>
            <tr className="bg-base-300/80 text-base-content/40 border-base-content/10 border-b text-[10px] tracking-widest uppercase">
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
              <th className="py-3 pr-4 text-center font-semibold">AR</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-l-2 ${kraColor(row.kra)} border-base-content/5 hover:bg-base-content/5 group border-b transition-colors`}
              >
                <td className="text-base-content/30 py-3 pl-4 text-xs tabular-nums">
                  {i + 1}
                </td>

                <td className="py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${kraBadgeColor(row.kra)}`}
                  >
                    {row.kra}
                  </span>
                </td>

                <td className="text-base-content/30 py-3 text-xs">
                  {row.sip || "—"}
                </td>

                <td className="text-base-content/80 py-3 text-xs leading-snug font-medium">
                  {row.activity}
                </td>

                <td className="text-base-content/50 max-w-55 py-3 text-xs leading-relaxed">
                  {row.purpose}
                </td>

                <td className="text-base-content/60 py-3 text-xs leading-snug">
                  {row.indicator}
                </td>

                <td className="text-base-content/60 py-3 text-xs">
                  {row.resource || "—"}
                </td>

                <td className="text-base-content/70 py-3 text-center text-xs font-semibold">
                  {row.qty}
                </td>

                <td className="text-base-content/80 py-3 text-right font-mono text-xs font-semibold">
                  ₱{row.cost.toLocaleString()}
                </td>

                <td className="text-base-content/60 py-3 text-xs leading-snug">
                  {row.title}
                </td>

                <td className="py-3 font-mono text-[11px] text-cyan-500/70">
                  {row.code}
                </td>

                <td className="py-3 pr-4 text-center">
                  <ArBadge code={row.ar} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const GeneralExpenseTable = () => {
  return (
    <div
      className="bg-base-100 text-base-content min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Top Nav ── */}
      <div className="navbar bg-base-200/80 border-base-content/8 sticky top-0 z-30 border-b px-4 shadow-md shadow-black/20 backdrop-blur">
        <div className="navbar-start">
          <button className="btn btn-ghost btn-sm btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="navbar-center">
          <span className="text-base-content text-lg font-bold tracking-[0.2em]">
            LHNHS
          </span>
        </div>
        <div className="navbar-end gap-2">
          <button className="btn btn-ghost btn-sm btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-sm btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-400 px-6 py-6">
        {/* ── Import Button + Month Tabs ── */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button className="btn btn-sm gap-2 rounded-lg border-0 bg-lime-400 font-bold text-slate-900 shadow shadow-lime-400/20 hover:bg-lime-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Import Tables
            </button>

            <div className="text-base-content/30 flex items-center gap-2 text-xs">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" />{" "}
              KRA 1
              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-teal-400" />{" "}
              KRA 2
              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-sky-400" />{" "}
              KRA 3
            </div>
          </div>

          {/* Month tabs */}
          <div className="tabs tabs-boxed bg-base-200 w-full flex-nowrap gap-0.5 overflow-x-auto rounded-xl p-1">
            {months.map((m) => (
              <a
                key={m}
                className={`tab tab-sm min-w-fit flex-1 rounded-lg text-xs font-medium transition-all ${m === "July" ? "tab-active bg-base-100 text-base-content shadow" : "text-base-content/40 hover:text-base-content/70"}`}
              >
                {m}
              </a>
            ))}
          </div>
        </div>

        {/* ── Title ── */}
        <div className="mb-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-base-content text-xl font-bold tracking-[0.15em] uppercase">
              General Expense Table
            </h1>
            <div className="mx-auto mt-2 h-px w-24 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
        </div>

        {/* ── Tables ── */}
        <TableSection
          title="Regular Expenditure"
          rows={regularRows}
          accent="bg-cyan-400"
        />

        <TableSection
          title="Project Related Expenditure"
          rows={projectRows}
          accent="bg-teal-400"
        />
      </div>
    </div>
  );
};
