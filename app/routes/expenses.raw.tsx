// /expenses/raw

import type { LoaderFunction } from "@remix-run/cloudflare";
import type { Expense } from "~/components/expenses/Chart";

const DUMMY_EXPENSES: Expense[] = [
    { id: "e1", title: "first expense", date: "January 28 2022", amount: 200 },
    { id: "e2", title: "second expense", date: "November 28 2022", amount: 300 },
];

export const loader: LoaderFunction = function () {
    return DUMMY_EXPENSES;
};
