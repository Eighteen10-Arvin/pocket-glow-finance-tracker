
import React from "react";
import { Button } from "@/components/ui/button";
import { useFinance } from "@/contexts/FinanceContext";
import { Wallet } from "lucide-react";

const Header: React.FC = () => {
  const { clearTransactions } = useFinance();

  return (
    <header className="bg-background p-4 shadow">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wallet size={24} className="text-primary" />
          <h1 className="text-2xl font-bold">PocketGlow</h1>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            if (window.confirm("Are you sure you want to clear all transactions?")) {
              clearTransactions();
            }
          }}
        >
          Reset
        </Button>
      </div>
    </header>
  );
};

export default Header;
