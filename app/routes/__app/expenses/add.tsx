// /expenses/add

import { json, redirect } from "@remix-run/cloudflare";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import type { Env } from "~/domain/data/env.server";
import { parseForm } from "~/domain/calculation/parseForm.server";
import { validateData } from "~/domain/calculation/validateData.server";
import { expense } from "~/domain/data/schema.server";
import { db } from "~/interaction/db/db.server";
import { addExpense } from "~/interaction/db/mutation.server";
import { z } from "zod";

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
  const date = z.object({
    date: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date().max(new Date())),
  });
  const formData = await parseForm(request);
  const validation = await validateData(
    expense.pick({ amount: true, title: true }).merge(date),
    formData
  );
  if (validation.success === false) {
    return json(validation.error);
  }
  const conn = db(context);
  await addExpense(conn, validation.data);
  return redirect("/expenses");
}
