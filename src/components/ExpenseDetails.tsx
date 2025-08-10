import { useMemo } from "react";
import { formatCurrency } from "../helpers";
import { type Expense } from "../types";
import { categories } from "../data/categories";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

type ExpenseDetailsProps = {
  expense: Expense;
};

export const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => {}}>Actualizar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => {}}>Eliminar</SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="w-full bg-gradient-to-r from-neutral-700 to-neutral-800 p-5 rounded-xl border border-neutral-600 hover:border-neutral-500 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between">
            {/* Sección izquierda: Icono y detalles */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Icono de categoría */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">

                  <img
                    src={`/icono_${categoryInfo.icon}.svg`}
                    alt={categoryInfo?.name}
                    className="w-7 h-7 opacity-80"
                  />
                </div>
              </div>

              {/* Información del gasto */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                      {categoryInfo?.name}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-100 truncate leading-tight">
                    {expense.expenseName}
                  </h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {expense.date?.toLocaleString("es-CL", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Sección derecha: Monto */}
            <div className="flex-shrink-0 text-right">
              <div className="flex flex-col items-end">
                <p className="text-2xl font-bold text-red-600 leading-tight">
                  -{formatCurrency(expense.amount)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-xs text-gray-400 font-medium">GASTO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Indicador de swipe */}
          <div className="flex justify-center mt-3 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
            <div className="flex gap-1">
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
