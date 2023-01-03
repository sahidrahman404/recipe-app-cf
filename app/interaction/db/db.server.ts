import { CamelCasePlugin } from "kysely";

import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { Env } from "~/domain/data/env.server";
import type { Expense } from "~/domain/data/schema.server";

export type Database = {
  expense: Expense;
};

export const db = ({
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
