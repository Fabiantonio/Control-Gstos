
import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {

    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(Number(e.target.value))
        console.log(budget)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0

    }, [budget])

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('presupuesto definido')
        dispatch({
            type: 'add-budget',
            payload: {budget}
        })

    }

  return (
    <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>

      <div className="flex flex-col space-y-6">
        <label className="text-white text-4xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" htmlFor="budget">
          Ingresar Presupuesto
        </label>

        <input
          className="w-full p-4 border-2 border-neutral-600 rounded-xl bg-neutral-800 text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 text-lg"
          type="number"
          id="budget"
          placeholder="Ingresa tu presupuesto..."
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 font-bold text-white p-4 rounded-xl cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        type="submit"
        value="Definir Presupuesto"
        disabled={isValid}
      />
    </form>
  );
};
