import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  amount: number;
  label: string;
};

export const AmountDisplay = ({ amount, label }: AmountDisplayProps) => {
  return (
    <div className="bg-gradient-to-r from-neutral-700 to-neutral-800 p-5 rounded-xl border border-neutral-600 hover:border-neutral-500 transition-all duration-300 hover:shadow-lg">
      <p className="text-sm font-medium text-neutral-300 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold text-white mt-1">{formatCurrency(amount)}</p>
    </div>
  );
};
