import { BudgetForm } from "./components/BudgetForm";
import { BudgetTracker } from "./components/BudgetTracker";
import { ExpenseList } from "./components/ExpenseList";
import ExpenseModal from "./components/ExpenseModal";
import { useBudget } from "./hooks/useBudget";
import { useEffect, useMemo } from "react";

function App() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state]);

  return (
    <>
      <header className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 shadow-lg border-b border-neutral-700">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Control de gastos
        </h1>
      </header>

      <div className="max-w-4xl mx-auto shadow-2xl mt-12 bg-gradient-to-br from-neutral-900 to-neutral-800 p-12 rounded-2xl border border-neutral-700 backdrop-blur-sm">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBudget && (
        <main className="max-w-4xl mx-auto shadow-2xl mt-12 bg-gradient-to-br from-neutral-900 to-neutral-800 p-12 rounded-2xl border border-neutral-700 backdrop-blur-sm">
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
