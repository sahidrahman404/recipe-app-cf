import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import type { Env } from "~/domain/data/env.server";
import { superjson, useSuperLoaderData } from "~/domain/calculation/superjson";
import { db } from "~/interaction/db/db.server";
import { getExpenses } from "~/interaction/db/query.server";

export default function ExpensesAnalysisPage() {
  const data = useSuperLoaderData<typeof loader>();

  return (
    <main>
      <Chart expenses={data} />
      <ExpenseStatistics expenses={data} />
    </main>
  );
}

export async function loader({ context }: { context: Env }) {
  const conn = db(context);
  const result = await getExpenses(conn);

  return superjson(result);
}
