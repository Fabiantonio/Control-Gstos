import { AmountDisplay } from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { formatCurrency } from "../helpers";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"

export const BudgetTracker = () => {

  const { state, availableBudget, totalExpense, dispatch} = useBudget();

  const percentage = Number(((totalExpense / state.budget) * 100).toFixed(2));



  return (
    <div className="max-w-7x mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Sección Principal del Presupuesto */}
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <div className="flex flex-col lg:flex-row items-center gap-8 h-full">
              
              {/* Información del Presupuesto */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                  Presupuesto Total
                </h2>
                <p className="text-6xl font-bold text-green-400 mb-4">
                  {formatCurrency(state.budget)}
                </p>
                <div className="text-lg text-gray-300">
                  <p className="mb-2">
                    {percentage > 80 ? '⚠️ Presupuesto casi agotado' : 
                     percentage > 60 ? '⚡ Controla tus gastos' : 
                     '✅ Presupuesto bajo control'}
                  </p>
                </div>
              </div>

              {/* Gráfico Circular */}
              <div className="flex-shrink-0">
                <div className="w-56 h-56">
                  <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                      pathColor: percentage > 60 ? 'red' : 'green',
                      textColor: 'white',
                      trailColor: 'rgba(255, 255, 255, 0.2)',
                      pathTransition: 'stroke-dasharray 0.5s ease 0s',
                    })}
                    text={`${percentage}%`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Control Lateral */}
        <div className="xl:col-span-1">
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <div className="flex flex-col h-full">
              
              {/* Título del Panel */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                  Resumen
                </h3>
              </div>

              {/* Información de Montos */}
              <div className="flex-1 space-y-6">
                <AmountDisplay amount={availableBudget} label="Disponible" />
                <AmountDisplay amount={totalExpense} label="Gastado" />
              </div>

              {/* Botón de Reinicio */}
              <div className="mt-8">
                <button onClick={() => dispatch({type: "reset-expenses"})} className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white p-4 rounded-xl w-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-neutral-800">

                  Reiniciar Presupuesto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
