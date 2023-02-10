import type { ExpensesF } from "~/domain/data/expenses/expenseSchema.server";
import ExpenseListItem from "./ExpensesListItem";

function ExpensesList({ expenses }: { expenses: ExpensesF }) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id!}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;
