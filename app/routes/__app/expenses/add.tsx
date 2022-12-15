// /expenses/add

import { json, redirect } from "@remix-run/cloudflare";
import { inputFromForm } from "domain-functions";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import type { Env } from "~/db/dbConfig.server";
import { addExpense } from "~/db/expense.server";

export type AddAction = typeof action;

export default function AddExpensesPage() {
  return (
    <Modal redirect={"/expenses"}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action({
  request,
  context,
}: {
  request: Request;
  context: Env;
}) {
  const connect = addExpense(context);
  const result = await connect(await inputFromForm(request));

  if (!result.success) {
    return json(result);
  }

  return redirect("/expenses");
}
