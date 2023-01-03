import {
  Form,
  Link,
  useActionData,
  useMatches,
  useParams,
  useTransition,
} from "@remix-run/react";
import type { Expense } from "~/domain/data/schema.server";
// import type { LoaderData } from "~/routes/__app/expenses/$id";
import type { ActionData } from "~/routes/__app/expenses/add";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData<ActionData>();
  const params = useParams();
  const matches = useMatches();
  const expenses = matches.find(
    (match) => match.id === "routes/__app/expenses"
  )?.data;

  const data = expenses
    ? expenses.json.find((expense: Expense) => expense.id === params.id)
    : null;

  const defaultValue = data
    ? {
        title: data.title,
        amount: data.amount,
        date: data.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  const navigation = useTransition();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method={data ? "patch" : "post"} className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          minLength={5}
          maxLength={30}
          required
          defaultValue={defaultValue.title}
        />
        {typeof validationErrors !== "undefined" ? (
          <span>{validationErrors?.title?._errors}</span>
        ) : null}
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValue.amount}
          />
          {typeof validationErrors !== "undefined" ? (
            <span>{validationErrors?.amount?._errors}</span>
          ) : null}
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            defaultValue={
              defaultValue.date ? defaultValue.date.slice(0, 10) : ""
            }
          />
          {typeof validationErrors !== "undefined" ? (
            <span>{validationErrors?.date?._errors}</span>
          ) : null}
        </p>
      </div>

      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="/expenses">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
