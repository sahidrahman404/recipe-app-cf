import { Link, useActionData } from "@remix-run/react";
import { errorMessagesFor } from "domain-functions";
import type { AddAction } from "~/routes/__app/expenses/add";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData<AddAction>();

  return (
    <form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          minLength={5}
          maxLength={30}
          required
        />
        {typeof validationErrors !== "undefined" ? (
          <span>
            {errorMessagesFor(validationErrors?.inputErrors, "title")[0]}
          </span>
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
          />
          {typeof validationErrors !== "undefined" ? (
            <span>
              {errorMessagesFor(validationErrors?.inputErrors, "amount")[0]}
            </span>
          ) : null}
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required />
          {typeof validationErrors !== "undefined" ? (
            <span>
              {errorMessagesFor(validationErrors?.inputErrors, "date")[0]}
            </span>
          ) : null}
        </p>
      </div>

      <div className="form-actions">
        <button>Save Expense</button>
        <Link to="/expenses">Cancel</Link>
      </div>
    </form>
  );
}

export default ExpenseForm;
