import type { Kysely } from "kysely";
import type { Expense } from "~/domain/data/expenses/expenseSchema.server";
import type { Database } from "~/interaction/repo.server";

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

export const getExpenses = async (db: Kysely<Database>) => {
  const result = await db.selectFrom("expenses").selectAll().execute();
  return result;
};
