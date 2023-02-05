import { CamelCasePlugin } from "kysely";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import type { Env } from "~/domain/data/env.server";
import type { Expense } from "~/domain/data/expenses/expenseSchema.server";

export type Database = {
  expenses: Expense;
};

export const repo = ({
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
}: Env) => {
  return new Kysely<Database>({
    dialect: new PlanetScaleDialect({
      host: DATABASE_HOST,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    }),
    plugins: [new CamelCasePlugin()],
  });
};
