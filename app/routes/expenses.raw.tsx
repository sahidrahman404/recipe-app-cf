// /expenses/raw

import type { LoaderFunction } from "@remix-run/cloudflare";
import { Expenses } from "~/domain/data/expenses/expenseSchema.server";

const DUMMY_EXPENSES: Expenses = [
  { id: "e1", title: "first expense", date: "January 28 2022", amount: 200 },
  { id: "e2", title: "second expense", date: "November 28 2022", amount: 300 },
];

export const loader: LoaderFunction = function () {
  return DUMMY_EXPENSES;
};
