import { Link, useFetcher, useSubmit } from "@remix-run/react";
import { Expense } from "~/domain/data/schema.server";

function ExpenseListItem({ id, title, amount }: Omit<Expense, "date">) {
  const fetcher = useFetcher();
  // const submit = useSubmit();
  function deleteExpenseItemHandler() {
    // submit(null, {
    //   method: "delete",
    //   action: `/expenses/${id}`,
    // });
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
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* <Form method="delete" action={`/expenses/${id}`}> */}
        {/*   <button>Delete</button> */}
        {/* </Form> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
