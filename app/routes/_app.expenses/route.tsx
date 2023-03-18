// /expenses => sahred layout

import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import { ExpensesList } from "~/routes/_app.expenses/components/expenses/ExpensesList";
import type { Env } from "~/domain/data/env.server";
import { getExpenses } from "~/interaction/expenses/expense.server";
import { repo } from "~/interaction/repo.server";

export default function ExpensesLayout() {
  const expenses = useLoaderData<typeof loader>();

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus /> <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload /> <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ context }: { context: Env }) {
  const conn = repo(context);
  const expenses = await getExpenses(conn);

  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     { message: "Could not find any expenses" },
  //     { status: 404, statusText: "No expenses found" }
  //   );
  // }
  return json(expenses);
}

// export function CatchBoundary() {
//   return <p>Error</p>;
// }
