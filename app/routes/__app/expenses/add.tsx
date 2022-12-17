// /expenses/add

import { connect } from "@planetscale/database/dist";
import { json, redirect } from "@remix-run/cloudflare";
import { inputFromForm, makeDomainFunction } from "domain-functions";
import { z } from "zod";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import type { Env } from "~/db/dbConfig.server";
import { config, envSchema } from "~/db/dbConfig.server";

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

  // BUSINESS LOGIC
  const addExpense = makeDomainFunction(
    z.object({
      title: z.string().min(5).max(30),
      amount: z.preprocess((val) => Number(val), z.number().positive()),
      date: z.preprocess((val) => {
        if (typeof val === "string" || val instanceof Date)
          return new Date(val);
      }, z.date().max(new Date())),
    }),
    envSchema
  )(async ({ title, amount, date }, envSchema) => {
    try {
      const db = connect(config(envSchema));
      const query = "INSERT INTO expense (title, amount, date) VALUES(?,?,?)";
      const params = [title, amount, new Date(date)];
      const result = await db.execute(query, params);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  // END

  const result = await addExpense(input, context);

  if (!result.success) {
    return json(result);
  }

  return redirect("/expenses");
}
