import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { type DraftExpense, type Value } from "../types";
import { ErrorMsg } from "./ErrorMsg";
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");
  const { dispatch, state, availableBudget } = useBudget();
  const [previusAmount, setPreviusAmount] = useState(0);

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];
      setExpense(editingExpense);
      setPreviusAmount(editingExpense.amount);
    }
  }, [state.editingId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("")) {
      setError("Por favor complete todos los campos");
      return;
    }

    if ((expense.amount - previusAmount) > availableBudget) {
      setError("El gasto excede el presupuesto disponible");
      return;
    }

    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({
        type: "add-expense",
        payload: {
          expense,
        },
      });
    }

    setExpense({
      expenseName: "",
      amount: 0,
      category: "",
      date: new Date(),
    });
    setPreviusAmount(0);

  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 rounded-2xl border border-neutral-700 text-white shadow-xl"
        onSubmit={handleSubmit}
      >
        {/* Header del formulario */}
        <div className="mb-8">
          <legend className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text">
            {state.editingId ? "Actualizar Gasto" : "Nuevo Gasto"}
          </legend>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-pink-700 mx-auto rounded-full"></div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6">
            <ErrorMsg>{error}</ErrorMsg>
          </div>
        )}

        {/* Grid de campos del formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Campo Nombre */}
          <div className="md:col-span-2">
            <label htmlFor="expenseName" className="block text-lg font-semibold mb-3 text-gray-200">
              Nombre del Gasto
            </label>
            <input
              placeholder="Ej: Compra de supermercado"
              type="text"
              id="expenseName"
              name="expenseName"
              className="w-full border border-neutral-600 rounded-xl p-4 bg-neutral-700 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300"
              value={expense.expenseName}
              onChange={handleChange}
            />
          </div>

          {/* Campo Cantidad */}
          <div>
            <label htmlFor="amount" className="block text-lg font-semibold mb-3 text-gray-200">
              Cantidad
            </label>
            <input
              placeholder="0.00"
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              min="0"
              className="w-full border border-neutral-600 rounded-xl p-4 bg-neutral-700 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300"
              value={expense.amount || ''}
              onChange={handleChange}
            />
          </div>

          {/* Campo Categoría */}
          <div>
            <label htmlFor="category" className="block text-lg font-semibold mb-3 text-gray-200">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              className="w-full border border-neutral-600 rounded-xl p-4 bg-neutral-700 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300 cursor-pointer"
              value={expense.category}
              onChange={handleChange}
            >
              <option value="" className="text-gray-400">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="text-white bg-neutral-700">
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Fecha */}
          <div className="md:col-span-2">
            <label htmlFor="date" className="block text-lg font-semibold mb-3 text-gray-200">
              Fecha del Gasto
            </label>
            <div className="w-full">
              <DatePicker
                className="w-full border border-neutral-600 rounded-xl p-4 bg-neutral-700 text-black focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300"
                value={expense.date}
                onChange={handleChangeDate}
                format="dd/MM/yyyy"
                clearIcon={null}
                calendarIcon={
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="pt-4 border-t border-neutral-600">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
          >
            {state.editingId ? "Actualizar Gasto" : "Registrar Gasto"}
          </button>
        </div>
      </form>
    </div>
  );
};
