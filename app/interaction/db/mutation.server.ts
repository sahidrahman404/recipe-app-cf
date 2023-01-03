import type { Kysely } from "kysely";
import type { Expense } from "~/domain/data/schema.server";
import type { Database } from "~/interaction/db/db.server";

export const addExpense = async (
  db: Kysely<Database>,
  { date, title, amount }: Expense
) => {
  const result = await db
    .insertInto("expense")
    .values({ title, date, amount })
    .executeTakeFirst();
  return result;
};

export const updateExpense = async (
  db: Kysely<Database>,
  { id, title, amount, date }: Expense
) => {
  const result = await db
    .updateTable("expense")
    .set({ title, amount, date })
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
  return result;
};

export const deleteExpense = async (db: Kysely<Database>, { id }: Expense) => {
  const result = await db
    .deleteFrom("expense")
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
  return result
};
