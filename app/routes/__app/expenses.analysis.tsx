// /expenses/anlysis

import type { Expense } from "~/components/expenses/Chart";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

const DUMMY_EXPENSES: Expense[] = [
  { id: "e1", title: "first expense", date: "January 28 2022", amount: 200 },
  { id: "e2", title: "second expense", date: "November 28 2022", amount: 300 },
];
export default function ExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}
