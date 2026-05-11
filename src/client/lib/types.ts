export interface GeneralExpenditureItem {
  kra: string;
  sipProgram: string;
  activity: string;
  purpose: string;
  indicator: string;
  resourcesDescription: string;
  resourcesQuantity: string;
  estimatedCost: number;
  accountTitle: string;
  accountCode: string;
  category: GeneralExpenditureCategory;
  sheet: string; // which month sheet it came from
}

export interface ParsedGeneralExpenditureItemsData {
  regular: GeneralExpenditureItem[];
  project_related: GeneralExpenditureItem[];
  repair_and_maintenance: GeneralExpenditureItem[];
  others: GeneralExpenditureItem[];
}

export type GeneralExpenditureCategory =
  | "regular"
  | "project_related"
  | "repair_and_maintenance"
  | "others";
