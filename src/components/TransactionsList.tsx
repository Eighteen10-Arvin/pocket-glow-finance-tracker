
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFinance } from "@/contexts/FinanceContext";
import { formatCurrency } from "@/lib/utils";
import { ArrowDown, ArrowUp, Wallet } from "lucide-react";

const TransactionsList: React.FC = () => {
  const { transactions, removeTransaction } = useFinance();

  const sortedTransactions = [...transactions].sort((a, b) => {
    // Sort by type first (income first, then expenses)
    if (a.type !== b.type) {
      return a.type === "income" ? -1 : 1;
    }
    // Then sort by amount (highest first)
    return b.amount - a.amount;
  });

  if (transactions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Wallet size={20} />
            Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-6">
            No transactions yet. Add some income and expenses to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Wallet size={20} />
          Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {sortedTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="py-3 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                {transaction.type === "income" ? (
                  <ArrowUp className="text-finance-income" size={16} />
                ) : (
                  <ArrowDown className="text-finance-expense" size={16} />
                )}
                <span className="font-medium">{transaction.description}</span>
              </div>
              <div className="flex items-center gap-2">
                <span 
                  className={
                    transaction.type === "income" 
                      ? "text-finance-income font-medium" 
                      : "text-finance-expense font-medium"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeTransaction(transaction.id)}
                  className="h-6 w-6 p-0 rounded-full"
                >
                  &times;
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
