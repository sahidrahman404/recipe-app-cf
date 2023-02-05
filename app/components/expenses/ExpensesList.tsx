import type { Expenses } from "~/domain/data/expenses/expenseSchema.server";
import ExpenseListItem from "./ExpensesListItem";

function ExpensesList({ expenses }: { expenses: Expenses }) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id!}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;
