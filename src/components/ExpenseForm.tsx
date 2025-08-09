import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
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
  const { dispatch } = useBudget();

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
    dispatch({
      type: "add-expense",
      payload: {
        expense,
      },
    });

    setExpense({
      expenseName: "",
      amount: 0,
      category: "",
      date: new Date(),
    });
  };

  return (
    <form className=" text-black" onSubmit={handleSubmit}>
      <legend className="text-2xl font-bold border-b-4 border-pink-600">
        Nuevo Gasto
      </legend>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <div className="flex flex-col">
        <label htmlFor="expenseName" className="text-lg font-bold">
          Nombre
        </label>
        <input
          placeholder="Nombre de gasto"
          type="text"
          id="expenseName"
          name="expenseName"
          className="border border-pink-600 rounded-md p-2"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="amount" className="text-lg font-bold">
          Cantidad
        </label>
        <input
          placeholder="Cantidad del gasto"
          type="number"
          id="amount"
          name="amount"
          className="border border-pink-600 rounded-md p-2"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="text-lg font-bold">
          Categoria
        </label>
        <select
          id="category"
          name="category"
          className="border border-pink-600 rounded-md p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="amount" className="text-lg font-bold">
          Fecha Gasto
        </label>
        <DatePicker
          className="border border-pink-600 rounded-md p-2"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        value={"Registrar"}
        className="bg-pink-600 text-white rounded-md p-2 w-full mt-4"
      />
    </form>
  );
};
