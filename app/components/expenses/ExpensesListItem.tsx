import { Link, useFetcher } from "@remix-run/react";
import type { ExpenseF } from "~/domain/data/expenses/expenseSchema.server";

function ExpenseListItem({ id, title, amount, date }: ExpenseF) {
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    const proceed = confirm("Are you sure do you want to delete this item?");

    if (!proceed) {
      return;
    }

    fetcher.submit(null, {
      method: "delete",
      action: `/expenses/${id}`,
    });
  }

  if (fetcher.state !== "idle")
    return (
      <article className="expense-item locked">
        <p>deleting</p>
      </article>
    );

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
        <p className="expense-amount">{date}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
