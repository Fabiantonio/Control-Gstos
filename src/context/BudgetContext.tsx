import { useReducer, createContext, type ReactNode, useMemo } from "react";
import {
  budgetReducer,
  initialState,
  type BudgetState,
  type BudgetActions,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
  availableBudget: number;
  totalExpense: number;

};

type BudgetProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpense = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );
  const availableBudget = useMemo(
    () => state.budget - totalExpense,
    [state.budget, totalExpense]
  );

  return (
    <BudgetContext.Provider value={{ state, dispatch, availableBudget, totalExpense }}>


      {children}
    </BudgetContext.Provider>
  );
};
