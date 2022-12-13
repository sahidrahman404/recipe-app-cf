// /expenses => sahred layout

import { Link, Outlet } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";
import type { Expense } from "~/components/expenses/Chart";
import ExpensesList from "~/components/expenses/ExpensesList";

const DUMMY_EXPENSES: Expense[] = [
  { id: "e1", title: "first expense", date: "January 28 2022", amount: 200 },
  { id: "e2", title: "second expense", date: "November 28 2022", amount: 300 },
];

export default function ExpensesLayout() {
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
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
