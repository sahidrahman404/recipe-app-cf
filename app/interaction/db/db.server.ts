import { CamelCasePlugin } from "kysely";

import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import type { Env } from "~/domain/data/env.server";
import type { Expense } from "~/domain/data/schema.server";

export type Database = {
  expenses: Expense;
};

export const db = ({ DATABASE_URL }: Env) => {
  return new Kysely<Database>({
    dialect: new PlanetScaleDialect({
      url: DATABASE_URL,
    }),
    plugins: [new CamelCasePlugin()],
  });
};
