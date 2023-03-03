import type { TypedResponse } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import {Chart} from "~/routes/_app.expenses.analysis/components/expenses/Chart";
import {ExpenseStatistics} from "~/routes/_app.expenses.analysis/components/expenses/ExpenseStatistics";
import type { Env } from "~/domain/data/env.server";
import type { ExpensesF } from "~/domain/data/expenses/expenseSchema.server";
import { getExpenses } from "~/interaction/expenses/expense.server";
import { repo } from "~/interaction/repo.server";

export default function ExpensesAnalysisPage() {
  const data = useLoaderData() as ExpensesF;

  return (
    <main>
      <Chart expenses={data} />
      <ExpenseStatistics expenses={data} />
    </main>
  );
}

export async function loader({ context }: { context: Env }): Promise<TypedResponse<ExpensesF>> {
  const conn = repo(context);
  const results = await getExpenses(conn);
  return json(results);
}
