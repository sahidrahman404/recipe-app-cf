import type { Kysely } from "kysely";
import type {
  Expense,
  Expenses,
} from "~/domain/data/expenses/expenseSchema.server";
import type { Database } from "~/interaction/repo.server";
import { validateData } from "~/domain/calculation/validateData.server";
import { expenses } from "~/domain/data/expenses/expenseSchema.server";
import { internalError } from "~/domain/calculation/internalError";
import { SafeParseSuccess } from "zod";

export const addExpense = async (
  db: Kysely<Database>,
  { date, title, amount }: Expense
) => {
  const result = await db
    .insertInto("expenses")
    .values({ title, date, amount })
    .executeTakeFirst();
  return result;
};

export const updateExpense = async (
  db: Kysely<Database>,
  { id, title, amount, date }: Expense
) => {
  const result = await db
    .updateTable("expenses")
    .set({ title, amount, date })
    .where("id", "=", id)
    .executeTakeFirst();
  return result;
};

export const deleteExpense = async (db: Kysely<Database>, { id }: Expense) => {
  const result = await db
    .deleteFrom("expenses")
    .where("id", "=", id)
    .executeTakeFirst();
  return result;
};

type GetExpenses = (db: Kysely<Database>) => Promise<Expenses>;
export const getExpenses: GetExpenses = async (db) => {
  const results = await db.selectFrom("expenses").selectAll().execute();
  const validatedResult = await validateData(expenses, results);
  if (!validatedResult.success) {
    console.log(validatedResult);
    throw internalError();
  }
  return validatedResult.data as Expenses;
};
