import { json, redirect } from "@remix-run/cloudflare";
import type { Params } from "@remix-run/react";
import { inputFromForm } from "domain-functions";
import { z } from "zod";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { Env } from "~/db/dbConfig.server";
import { updateExpense } from "~/db/expense.server";
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

export async function action({
  params,
  request,
  context,
}: {
  params: Params;
  request: Request;
  context: Env;
}) {
  const input = await inputFromForm(request);
  const dateScheme = z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) return new Date(val);
  }, z.date().max(new Date()));
  const dateValidation = dateScheme.parse(input.date);
  const result = await updateExpense(
    { ...params, ...input, dateValidation },
    context
  );
  if (!result.success) {
    return json(result);
  }
  return redirect("/expenses");
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
