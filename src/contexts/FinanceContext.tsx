
import React, { createContext, useContext, useState, useEffect } from "react";
import { Transaction, FinancialSummary } from "@/types/finance";
import { nanoid } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
  clearTransactions: () => void;
  summary: FinancialSummary;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();

  const [summary, setSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
  });

  useEffect(() => {
    // Load transactions from localStorage when the component mounts
    if (user) {
      const userId = user.id;
      const storageKey = `transactions_${userId}`;
      const saved = localStorage.getItem(storageKey);
      setTransactions(saved ? JSON.parse(saved) : []);
    } else {
      setTransactions([]);
    }
  }, [user]);

  useEffect(() => {
    if (user && transactions.length > 0) {
      const userId = user.id;
      const storageKey = `transactions_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(transactions));
    }
    
    // Calculate summary
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
      
    const netBalance = totalIncome - totalExpenses;
    
    setSummary({ totalIncome, totalExpenses, netBalance });
  }, [transactions, user]);

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
    if (user) {
      const userId = user.id;
      const storageKey = `transactions_${userId}`;
      localStorage.removeItem(storageKey);
    }
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
