import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetails } from "./ExpenseDetails";

export const ExpenseList = () => {
  const { state } = useBudget();
  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  return (
    <div className="bg-neutral rounded-xl p-4">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">No hay gastos registrados</p>
          <p className="text-gray-400 text-sm mt-1">Agrega tu primer gasto para comenzar</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Gastos Recientes</h3>
          </div>
          {state.expenses.map((expense) => (
            <ExpenseDetails key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </div>
  );
};
