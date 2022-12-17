import { useLoaderData } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import type { Env } from "~/db/dbConfig.server";
import { getExpenses } from "~/db/expense.server";
import { loaderResponseOrThrow } from "~/lib/index";

export default function ExpensesAnalysisPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <Chart expenses={data} />
      <ExpenseStatistics expenses={data} />
    </main>
  );
}

export async function loader({ context }: { context: Env }) {
  const result = await getExpenses(context);

  return loaderResponseOrThrow(result);
}
