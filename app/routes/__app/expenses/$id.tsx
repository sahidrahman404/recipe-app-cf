import { connect } from "@planetscale/database/dist";
import { json, redirect } from "@remix-run/cloudflare";
import type { Params } from "@remix-run/react";
import { inputFromForm, makeDomainFunction } from "domain-functions";
import { z } from "zod";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import type { Env } from "~/db/dbConfig.server";
import { config, envSchema } from "~/db/dbConfig.server";
// import type { Env } from "~/db/dbConfig.server";
// import { getExpense } from "~/db/expense.server";
// import { loaderResponseOrThrow } from "~/lib/index";

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

  // BUSINESS LOGIC
  const updateExpense = makeDomainFunction(
    z.object({
      id: z.string().transform((val) => Number(val)),
      title: z.string().min(5).max(30),
      amount: z.preprocess((val) => Number(val), z.number().positive()),
      date: z.preprocess((val) => {
        if (typeof val === "string" || val instanceof Date)
          return new Date(val);
      }, z.date().max(new Date())),
    }),
    envSchema
  )(async ({ id, title, amount, date }, envSchema) => {
    try {
      const db = connect(config(envSchema));
      const query =
        "UPDATE expense SET title = ?, amount = ?, date = ? WHERE id = ?";
      const params = [title, amount, date, id];
      const result = db.execute(query, params);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  // END

  const result = await updateExpense({ ...params, ...input }, context);
  if (!result.success) {
    return json(result);
  }
  return redirect("/expenses");
}
