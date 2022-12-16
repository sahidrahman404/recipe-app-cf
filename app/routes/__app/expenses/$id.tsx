import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
// import type { Env } from "~/db/dbConfig.server";
// import { getExpense } from "~/db/expense.server";
// import { loaderResponseOrThrow } from "~/lib/index";

export default function UpdateExpensesPage() {
  return (
    <Modal redirect={"/expenses"}>
      <ExpenseForm />
    </Modal>
  );
}

// export type LoaderData = typeof loader;
// export async function loader({
//   params,
//   context,
// }: {
//   params: Params;
//   context: Env;
// }) {
//   const result = await getExpense(params, context);

//   return loaderResponseOrThrow(result);
// }
