import { useMemo } from "react"
import { formatCurrency } from "../helpers"
import { type Expense } from "../types"
import { categories } from "../data/categories"

type ExpenseDetailsProps = {

  expense: Expense
}

export const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0] ,[expense])

  return (
    <div className="flex justify-between items-center text-black">
        <div>
            <img src={`/icono_${categoryInfo.icon}.svg`} alt="" className="w-8 h-8"/>
        </div>
      <div>
        <p className="text-lg font-bold">{categoryInfo?.name}</p>
        <p className="text-lg font-bold">{expense.expenseName}</p>
      </div>
      <div>
        <p className="text-lg font-bold">{formatCurrency(expense.amount)}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">{expense.date?.toLocaleString('es-CL', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}</p>
      </div>

    </div>
  )
}
