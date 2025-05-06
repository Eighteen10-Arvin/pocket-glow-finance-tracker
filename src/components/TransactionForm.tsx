
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFinance } from "@/contexts/FinanceContext";
import { DollarSign } from "lucide-react";

interface TransactionFormProps {
  type: "income" | "expense";
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction } = useFinance();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      return;
    }

    addTransaction({
      description: description.trim(),
      amount: Number(amount),
      type,
    });

    // Clear the form
    setDescription("");
    setAmount("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <DollarSign 
            className={type === "income" ? "text-finance-income" : "text-finance-expense"} 
            size={20} 
          />
          {type === "income" ? "Add Income" : "Add Expense"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${type}-description`}>
              {type === "income" ? "Income Source" : "Expense Description"}
            </Label>
            <Input
              id={`${type}-description`}
              placeholder={type === "income" ? "e.g., Salary, Freelance" : "e.g., Rent, Groceries"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${type}-amount`}>Amount ($)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input
                id={`${type}-amount`}
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 w-full"
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className={`w-full ${
              type === "income" ? "bg-finance-income hover:bg-finance-income/90" : "bg-finance-expense hover:bg-finance-expense/90"
            }`}
          >
            Add {type === "income" ? "Income" : "Expense"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
