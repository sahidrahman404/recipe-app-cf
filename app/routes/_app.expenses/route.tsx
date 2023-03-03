// /expenses => sahred layout

import type { TypedResponse } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import { ExpensesList } from "~/routes/_app.expenses/components/expenses/ExpensesList";
import type { Env } from "~/domain/data/env.server";
import type { ExpensesF } from "~/domain/data/expenses/expenseSchema.server";
import { getExpenses } from "~/interaction/expenses/expense.server";
import { repo } from "~/interaction/repo.server";

export default function ExpensesLayout() {
  const data = useLoaderData() as ExpensesF;

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
        <ExpensesList expenses={data} />
      </main>
    </>
  );
}

export async function loader({
  context,
}: {
  context: Env;
}): Promise<TypedResponse<ExpensesF>> {
  const conn = repo(context);
  const result = await getExpenses(conn);
  return json(result);
}
