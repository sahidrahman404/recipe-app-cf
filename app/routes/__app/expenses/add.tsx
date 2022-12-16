// /expenses/add

import { json, redirect } from "@remix-run/cloudflare";
import { inputFromForm } from "domain-functions";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import type { Env } from "~/db/dbConfig.server";
import { addExpense } from "~/db/expense.server";

export default function AddExpensesPage() {
  return (
    <Modal redirect={"/expenses"}>
      <ExpenseForm />
    </Modal>
  );
}

export type ActionData = typeof action;
export async function action({
  request,
  context,
}: {
  request: Request;
  context: Env;
}) {
  const input = await inputFromForm(request);
  const result = await addExpense(input, context);

  if (!result.success) {
    return json(result);
  }

  return redirect("/expenses");
}
