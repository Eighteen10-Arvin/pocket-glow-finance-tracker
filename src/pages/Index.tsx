
import React from "react";
import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";
import TransactionsList from "@/components/TransactionsList";
import FinancialSummary from "@/components/FinancialSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceProvider } from "@/contexts/FinanceContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <FinanceProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 container max-w-xl py-6 px-4 md:px-0 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6 pb-8">
              <FinancialSummary />
              
              <Tabs defaultValue="income" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="expense">Expenses</TabsTrigger>
                </TabsList>
                <TabsContent value="income">
                  <TransactionForm type="income" />
                </TabsContent>
                <TabsContent value="expense">
                  <TransactionForm type="expense" />
                </TabsContent>
              </Tabs>
              
              <TransactionsList />
            </div>
          </ScrollArea>
        </main>
      </div>
    </FinanceProvider>
  );
};

export default Index;
