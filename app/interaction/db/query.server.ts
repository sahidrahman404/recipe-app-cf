import { Kysely } from "kysely";
import { internalError } from "~/domain/calculation/internalError";
import { validateData } from "~/domain/calculation/validateData.server";
import {
  expense,
  Expense,
  Expenses,
  expenses,
} from "~/domain/data/schema.server";
import { Database, db } from "~/interaction/db/db.server";

export const getExpenses = async (db: Kysely<Database>) => {
  const result = await db.selectFrom("expense").selectAll().execute();
  const validation = await validateData(expenses, result);
  if (validation.success === false) {
    throw internalError(validation.error._errors[0]);
  }
  const validatedData: Expenses = validation.data;
  return validatedData;
};
