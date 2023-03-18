import { json } from "@remix-run/cloudflare";
import { useCatch, useLoaderData } from "@remix-run/react";
import { Chart } from "~/routes/_app.expenses_.analysis/components/expenses/Chart";
import { ExpenseStatistics } from "~/routes/_app.expenses_.analysis/components/expenses/ExpenseStatistics";
import type { Env } from "~/domain/data/env.server";
import { getExpenses } from "~/interaction/expenses/expense.server";
import { repo } from "~/interaction/repo.server";
import Error from "~/components/util/Error";

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData<typeof loader>();

  return (
    <main>
      <>
        <Chart expenses={expenses} />
        <ExpenseStatistics expenses={expenses} />
      </>
    </main>
  );
}

export async function loader({ context }: { context: Env }) {
  const conn = repo(context);
  const expenses = await getExpenses(conn);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Cannot load analysis there is no data" },
      { status: 404, statusText: "Expenses not found" }
    );
  }
  return json(expenses);
}

export function CatchBoundary() {
  const errorResponse = useCatch();

  return (
    <main>
      <Error title="Expenses not found">
        {errorResponse.data?.message || "Something went wrong"}
      </Error>
    </main>
  );
}
