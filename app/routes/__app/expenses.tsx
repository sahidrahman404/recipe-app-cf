// /expenses => sahred layout

import { Link, Outlet } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import type { Env } from "~/domain/data/env.server";
import { superjson, useSuperLoaderData } from "~/domain/calculation/superjson";
import { db } from "~/interaction/db/db.server";
import { getExpenses } from "~/interaction/db/query.server";

export default function ExpensesLayout() {
  const data = useSuperLoaderData<typeof loader>();

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
  const conn = db(context);
  const result = await getExpenses(conn);
  return superjson(result);
}
