// /expenses => sahred layout

import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import type { Env } from "~/db/dbConfig.server";
import { getExpenses } from "~/db/expense.server";
import { loaderResponseOrThrow } from "~/lib/index";

export default function ExpensesLayout() {
  const data = useLoaderData<typeof loader>();

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

export async function loader({ context }: { context: Env }) {
  const result = await getExpenses(context);

  return loaderResponseOrThrow(result);
}
