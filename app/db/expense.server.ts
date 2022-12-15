import { connect } from "@planetscale/database/dist";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import type { Env } from "./dbConfig.server";
import { config } from "./dbConfig.server";

export function addExpense(context: Env) {
  const schema = z.object({
    title: z.string().min(5).max(30),
    amount: z.preprocess((val) => Number(val), z.number().positive()),
    date: z.preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) return new Date(val);
    }, z.date().max(new Date())),
  });

  const add = makeDomainFunction(schema)(async ({ title, amount, date }) => {
    try {
      const conn = connect(config(context));
      const query = "INSERT INTO expense (title, amount, date) VALUES(?,?,?)";
      const params = [title, amount, date];
      const result = await conn.execute(query, params);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  return add;
}

export function getExpense(context: Env) {
  const expense = z.object({
    id: z.string(),
    title: z.string(),
    amount: z.preprocess((val) => Number(val), z.number()),
    date: z.string(),
  });

  const expenseResult = z.array(expense);

  const get = makeDomainFunction(z.object({}).optional())(async () => {
    try {
      const conn = connect(config(context));
      const query =
        "SELECT id,title,amount,date FROM expense ORDER BY amount DESC";
      const result = await conn.execute(query);
      const parsedResult = expenseResult.parse(result.rows);
      return parsedResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  return get;
}
