import type { GeneralExpenditureItem } from "@/lib/types";

interface SubTableProps {
  title: string;
  data: GeneralExpenditureItem[];
}

const ExpenditureTable = ({ title, data }: SubTableProps) => {
  if (data.length === 0) return null;

  return (
    <div className="mb-6">
      <h4 className="mb-2 font-semibold">{title}</h4>
      <div className="overflow-x-auto">
        <table className="table-xs table">
          <thead>
            <tr>
              <th>#</th>
              <th>KRA</th>
              <th>SIP Program</th>
              <th>Activity</th>
              <th>Purpose</th>
              <th>Indicator</th>
              <th>Resources Description</th>
              <th>Quantity</th>
              <th>Estimated Cost</th>
              <th>Account Title</th>
              <th>Account Code</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.kra}</td>
                <td>{item.sipProgram}</td>
                <td>{item.activity}</td>
                <td>{item.purpose}</td>
                <td>{item.indicator}</td>
                <td>{item.resourcesDescription}</td>
                <td>{item.resourcesQuantity}</td>
                <td>{item.estimatedCost}</td>
                <td>{item.accountTitle}</td>
                <td>{item.accountCode}</td>
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
}

export const GeneralExpenditureTable = ({ data }: Props) => {
  const CATEGORIES: { key: string; label: string }[] = [
    { key: "regular", label: "Regular Expenditure" },
    { key: "project_related", label: "Project Related Expenditure" },
    { key: "repair_and_maintenance", label: "Repair and Maintenance" },
    { key: "others", label: "Others" },
  ];

  return (
    <div className="overflow-x-auto">
      {CATEGORIES.map(({ key, label }) => {
        return (
          <ExpenditureTable
            key={key}
            title={label}
            data={data.filter((item) => item.category === key)}
          />
        );
      })}
    </div>
  );
};
