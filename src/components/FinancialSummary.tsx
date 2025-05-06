
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/contexts/FinanceContext";
import { formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const FinancialSummary: React.FC = () => {
  const { summary } = useFinance();
  const { totalIncome, totalExpenses, netBalance } = summary;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Wallet size={20} />
          Financial Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-finance-income" size={18} />
                <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
              </div>
              <p className="text-2xl font-semibold text-finance-income">
                {formatCurrency(totalIncome)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="text-finance-expense" size={18} />
                <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
              </div>
              <p className="text-2xl font-semibold text-finance-expense">
                {formatCurrency(totalExpenses)}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-4">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Net Balance</h3>
            <div 
              className={`p-4 rounded-lg ${
                netBalance >= 0 
                  ? "bg-finance-positive text-finance-income" 
                  : "bg-finance-negative/10 text-finance-negative"
              }`}
            >
              <p className="text-3xl font-bold flex justify-center items-center">
                {netBalance >= 0 ? "+" : ""}
                {formatCurrency(netBalance)}
              </p>
              <p className="text-center mt-1 text-sm">
                {netBalance >= 0 
                  ? "Money Left in Hand" 
                  : "Deficit"}
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
