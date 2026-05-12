export interface GeneralExpenditureItem {
  kra: string;
  sipProgram: string;
  activity: string;
  purpose: string;
  indicator: string;
  resourcesDescription: string;
  resourcesQuantity: number;
  estimatedCost: number;
  accountTitle: string;
  accountCode: string;
  category: GeneralExpenditureCategory;
  month: string; // which month sheet it came from
}

export type GeneralExpenditureCategory =
  | "regular"
  | "project_related"
  | "repair_and_maintenance"
  | "others";
