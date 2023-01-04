import type { Kysely } from "kysely";
import { internalError } from "~/domain/calculation/internalError";
import { validateData } from "~/domain/calculation/validateData.server";
import type { Expenses } from "~/domain/data/schema.server";
import { expenses } from "~/domain/data/schema.server";
import type { Database } from "~/interaction/db/db.server";

export const getExpenses = async (db: Kysely<Database>) => {
  const result = await db
    .selectFrom("expenses")
    .selectAll()
    .orderBy("updatedAt", "desc")
    .execute();
  const validation = await validateData(expenses, result);
  if (validation.success === false) {
    throw internalError(validation);
  }
  const validatedData: Expenses = validation.data;
  return validatedData;
};
