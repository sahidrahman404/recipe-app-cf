import { json, redirect } from "@remix-run/cloudflare";
import type { Params } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import type { Env } from "~/domain/data/env.server";
import { parseForm } from "~/domain/calculation/parseForm.server";
import { validateData } from "~/domain/calculation/validateData.server";
import { expense } from "~/domain/data/schema.server";
import { db } from "~/interaction/db/db.server";
import { deleteExpense, updateExpense } from "~/interaction/db/mutation.server";

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
  const conn = db(context);
  if (request.method === "PATCH") {
    const formData = await parseForm(request);
    const validation = await validateData(
      expense.pick({ id: true, date: true, amount: true, title: true }),
      { ...params, ...formData }
    );
    if (validation.success === false) {
      return json(validation.error);
    }
    await updateExpense(conn, validation.data);
    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    const validation = await validateData(expense.pick({ id: true }), params);
    if (validation.success === false) {
      return json(validation.error);
    }
    await deleteExpense(conn, validation.data);
    return json({ deletedId: params.id });
  }
}
