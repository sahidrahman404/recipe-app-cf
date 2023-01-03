import { Expenses } from "~/domain/data/schema.server";
import ExpenseListItem from "./ExpensesListItem";

function ExpensesList({ expenses }: { expenses: Expenses }) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id?.toLocaleString()}>
          <ExpenseListItem
            id={expense.id!.toLocaleString()}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;
