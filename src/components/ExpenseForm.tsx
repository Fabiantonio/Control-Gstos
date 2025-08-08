import { categories } from "../data/categories";

export const ExpenseForm = () => {
  return (
    <form className=" text-black">
      <legend className="text-2xl font-bold border-b-4 border-pink-600">
        Nuevo Gasto
      </legend>

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
        >
            <option value="">Selecciona una categoria</option>
            {categories.map(category => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
      </div>

      <input type="submit" value={'Registrar'} className="bg-pink-600 text-white rounded-md p-2 w-full mt-4" />

    </form>
  );
};
