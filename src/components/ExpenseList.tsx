import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetails } from "./ExpenseDetails";

export const ExpenseList = () => {
  const { state } = useBudget();
  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  return (
    <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300">
      {isEmpty ? (
        <p className="text-white text-center">No hay gastos</p>
      ) : (
        <div className="space-y-3">
          {state.expenses.map((expense) => (
            <div key={expense.id} className="bg-white p-4 rounded-xl shadow-md">
              <ExpenseDetails expense={expense} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
