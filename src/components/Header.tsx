
import React from "react";
import { Button } from "@/components/ui/button";
import { useFinance } from "@/contexts/FinanceContext";
import { useAuth } from "@/contexts/AuthContext";
import { Wallet, LogOut } from "lucide-react";

const Header: React.FC = () => {
  const { clearTransactions } = useFinance();
  const { user, signOut } = useAuth();

  return (
    <header className="bg-background p-4 shadow">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wallet size={24} className="text-primary" />
          <h1 className="text-2xl font-bold">PocketGlow</h1>
        </div>
        <div className="flex gap-2">
          {user && (
            <>
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={signOut}
              >
                <LogOut size={18} className="mr-1" />
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
