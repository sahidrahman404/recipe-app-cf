// /expenses/add

import { json, redirect } from "@remix-run/cloudflare";
import { z } from "zod";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { parseForm } from "~/domain/calculation/parseForm.server";
import { validateData } from "~/domain/calculation/validateData.server";
import type { Env } from "~/domain/data/env.server";
import type { ExpenseInput } from "~/domain/data/expenses/expenseSchema.server";
import { expense } from "~/domain/data/expenses/expenseSchema.server";
import { addExpense } from "~/interaction/expenses/expense.server";
import { repo } from "~/interaction/repo.server";

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
  const formData = await parseForm<ExpenseInput>(request);

  const date = z.object({
    date: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date().max(new Date())),
  });

  const validation = await validateData(
    expense.pick({ amount: true, title: true }).merge(date),
    formData
  );

  if (validation.success === false) {
    return json(validation.error);
  }
  const conn = repo(context);
  await addExpense(conn, validation.data);
  return redirect("/expenses");
}
