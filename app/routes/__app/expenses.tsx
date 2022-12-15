// /expenses => sahred layout

import type { Params } from "@remix-run/react";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import type { Env } from "~/db/dbConfig.server";
import { getExpense } from "~/db/expense.server";

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

export async function loader({
  context,
  params,
}: {
  context: Env;
  params: Params;
}) {
  const connect = getExpense(context);
  const result = await connect(params);

  if (!result.success) console.log(result);

  if (result.success) {
    return result.data;
  }
}
