import { json, redirect } from "@remix-run/cloudflare";
import type { Params } from "@remix-run/react";
import { z } from "zod";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { parseForm } from "~/domain/calculation/parseForm.server";
import { validateData } from "~/domain/calculation/validateData.server";
import type { Env } from "~/domain/data/env.server";
import type {
  Expense,
  ExpenseInput,
} from "~/domain/data/expenses/expenseSchema.server";
import { expense } from "~/domain/data/expenses/expenseSchema.server";
import {
  deleteExpense,
  updateExpense,
} from "~/interaction/expenses/expense.server";
import { repo } from "~/interaction/repo.server";

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
  const conn = repo(context);
  if (request.method === "PATCH" || request.method === "POST") {
    const formData = (await parseForm(request)) as ExpenseInput;
    const date = z.object({
      date: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date().max(new Date())),
    });
    const validation = await validateData<
      Omit<Expense, "createdAt" | "updatedAt">
    >(expense.pick({ id: true, amount: true, title: true }).merge(date), {
      ...params,
      ...formData,
    });
    if (validation.success === false) {
      return json(validation.error);
    }
    await updateExpense(conn, validation.data);
    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    const validation = await validateData<{ id: string }>(
      expense.pick({ id: true }),
      params
    );
    if (validation.success === false) {
      return json(validation.error);
    }
    await deleteExpense(conn, validation.data);
    return json({ deletedId: params.id });
  }
}
