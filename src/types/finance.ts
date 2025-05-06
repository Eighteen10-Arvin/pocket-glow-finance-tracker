
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}
