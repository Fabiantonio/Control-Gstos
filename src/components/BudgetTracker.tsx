import { AmountDisplay } from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { formatCurrency } from "../helpers";
import { useMemo } from "react";

export const BudgetTracker = () => {

  const { state, availableBudget, totalExpense } = useBudget();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text">Presupuesto</h2>
        <p className="text-5xl font-bold text-green-400">{formatCurrency(state.budget)}</p>

      </div>
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-neutral-700 shadow-lg space-y-4">
        <button className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white p-3 rounded-xl w-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
          Reiniciar Presupuesto
        </button>
        <div className="space-y-3">
          <AmountDisplay amount={availableBudget} label="Disponible" />

          <AmountDisplay amount={totalExpense} label="Gastado" />

        </div>
      </div>
    </div>
  );
};
