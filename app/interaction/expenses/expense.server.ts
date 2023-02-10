import type { DeleteResult, InsertResult, Kysely, UpdateResult } from "kysely";
import type {
  Expense,
  ExpensesF,
} from "~/domain/data/expenses/expenseSchema.server";
import type { Database } from "~/interaction/repo.server";

type AddExpense = (
  db: Kysely<Database>,
  { date, title, amount }: Pick<Expense, "date" | "title" | "amount">
) => Promise<InsertResult>;
export const addExpense: AddExpense = async (db, { date, title, amount }) => {
  const result = await db
    .insertInto("expenses")
    .values({ title, date, amount })
    .executeTakeFirst();
  return result;
};

type UpdateExpense = (
  db: Kysely<Database>,
  { id, title, amount, date }: Pick<Expense, "id" | "title" | "amount" | "date">
) => Promise<UpdateResult>;
export const updateExpense: UpdateExpense = async (
  db,
  { id, title, amount, date }
) => {
  const result = await db
    .updateTable("expenses")
    .set({ title, amount, date })
    .where("id", "=", id)
    .executeTakeFirst();
  return result;
};

type DeleteExpense = (
  db: Kysely<Database>,
  { id }: Pick<Expense, "id">
) => Promise<DeleteResult>;
export const deleteExpense: DeleteExpense = async (db, { id }) => {
  const result = await db
    .deleteFrom("expenses")
    .where("id", "=", id)
    .executeTakeFirst();
  return result;
};

type GetExpenses = (db: Kysely<Database>) => Promise<ExpensesF>;
export const getExpenses: GetExpenses = async (db) => {
  const results = await db
    .selectFrom("expenses")
    .select(["id", "date", "title", "amount"])
    .execute();
  const transformedResults = results.map((result) => ({
    ...result,
    amount: Number(result.amount),
    date: result.date.toDateString(),
  })) as ExpensesF;
  return transformedResults;
};
