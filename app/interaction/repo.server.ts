import { CamelCasePlugin, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import type { Account } from "~/domain/data/account/accountSchema.server";
import type { Env } from "~/domain/data/env.server";
import type { Expense } from "~/domain/data/expenses/expenseSchema.server";

export type Database = {
  expenses: Expense;
  accounts: Account;
};

type Repo = ({
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
}: Env) => Kysely<Database>;

export const repo: Repo = ({
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
}) => {
  return new Kysely<Database>({
    dialect: new PlanetScaleDialect({
      host: DATABASE_HOST,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    }),
    plugins: [new CamelCasePlugin()],
  });
};
