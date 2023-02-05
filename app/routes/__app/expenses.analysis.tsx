import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import type { Env } from "~/domain/data/env.server";
import { superjson, useSuperLoaderData } from "~/domain/calculation/superjson";
import { repo } from "~/interaction/repo.server";
import { getExpenses } from "~/interaction/expenses/expense.server";

export default function ExpensesAnalysisPage() {
  const data = useSuperLoaderData<typeof loader>();
  console.log(data);

  return (
    <main>
      <Chart expenses={data} />
      <ExpenseStatistics expenses={data} />
    </main>
  );
}

export async function loader({ context }: { context: Env }) {
  const conn = repo(context);
  const result = await getExpenses(conn);

  return superjson(result);
}
