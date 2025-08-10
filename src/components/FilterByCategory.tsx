import type { ChangeEvent } from "react";
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export const FilterByCategory = () => {

    const { dispatch } = useBudget();

    const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: "add-filter-category",
            payload: {
                id: e.target.value
            }
        })
    }

  return (
    <div className="flex justify-end">
        <form action="" className="flex items-center">
            <label htmlFor="category" className="mr-2 text-white">Filtrar por:</label>
            <select onChange={handleChange} id="category" className="p-2 rounded-md border border-neutral-700 bg-neutral-800 text-white">
                <option value="">Todas</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </form>
    </div>
  )
}
