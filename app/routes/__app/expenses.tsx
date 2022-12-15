// /expenses => sahred layout

import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { UnpackData } from "domain-functions";
import { FaPlus, FaDownload } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import type { Env } from "~/db/dbConfig.server";
import { getExpense } from "~/db/expense.server";

export default function ExpensesLayout() {
  const data = useLoaderData<LoaderData>();

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

type LoaderData = UnpackData<typeof getExpense>;
export async function loader({ context }: { context: Env }) {
  const result = await getExpense(context);

  if (!result.success) {
    console.log(result);
  } else {
    return json<LoaderData>(result.data);
  }
}
