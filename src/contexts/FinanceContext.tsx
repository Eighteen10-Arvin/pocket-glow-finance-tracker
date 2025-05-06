
import React, { createContext, useContext, useState, useEffect } from "react";
import { Transaction, FinancialSummary } from "@/types/finance";
import { nanoid } from "@/lib/utils";
import { toast } from "sonner";

interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
  clearTransactions: () => void;
  summary: FinancialSummary;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [summary, setSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    
    // Calculate summary
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
      
    const netBalance = totalIncome - totalExpenses;
    
    setSummary({ totalIncome, totalExpenses, netBalance });
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: nanoid() };
    setTransactions((prev) => [...prev, newTransaction]);
    toast.success(`${transaction.type === "income" ? "Income" : "Expense"} added successfully`);
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.info("Transaction removed");
  };

  const clearTransactions = () => {
    setTransactions([]);
    toast.info("All transactions cleared");
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        clearTransactions,
        summary,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
