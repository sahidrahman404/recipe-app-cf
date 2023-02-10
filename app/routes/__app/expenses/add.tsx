// /expenses/add

import type { TypedResponse } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { z } from "zod";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { parseForm } from "~/domain/calculation/parseForm.server";
import { validateData } from "~/domain/calculation/validateData.server";
import type { Env } from "~/domain/data/env.server";
import type {
  Expense,
  ExpenseError,
  ExpenseInput
} from "~/domain/data/expenses/expenseSchema.server";
import {
  expense
} from "~/domain/data/expenses/expenseSchema.server";
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
}): Promise<TypedResponse<z.typeToFlattenedError<ExpenseError>>> {
  const formData = (await parseForm(request)) as ExpenseInput;

  const date = z.object({
    date: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date().max(new Date())),
  });

  const validation = await validateData<
    Pick<Expense, "title" | "amount" | "date">
  >(expense.pick({ amount: true, title: true }).merge(date), formData);

  if (validation.success === false) {
    return json(validation.error);
  }
  const conn = repo(context);
  await addExpense(conn, validation.data);
  return redirect("/expenses");
}
