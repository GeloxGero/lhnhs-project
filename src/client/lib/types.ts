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
  verified: boolean;
  image_url?: string;
  month: string;
  arCode?: number; // which month sheet it came from
}

export type GeneralExpenditureCategory =
  "regular" | "project_related" | "repair_and_maintenance" | "others";

export interface ExpenseItem {
  id: number;
  unspc: string | null;
  description: string | null;
  specification: string | null;
  unitOfMeasure: string | null;
  quantity: number | null;
  price: string | null;
  total: string | null;
  arCode: number | null;
  verified: boolean;
  imageUrl?: string;
  isActive: boolean;
  expenseTotal: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}
