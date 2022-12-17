import { connect } from "@planetscale/database/dist";
import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import { envSchema } from "./dbConfig.server";
import { config } from "./dbConfig.server";

// GET EXPENSES

const expense = z.object({
  id: z.string(),
  title: z.string(),
  amount: z.preprocess((val) => Number(val), z.number()),
  date: z.string(),
});

const expenseResult = z.array(expense);

export const getExpenses = makeDomainFunction(envSchema)(async (envSchema) => {
  try {
    const db = connect(config(envSchema));
    const query =
      "SELECT id,title,amount,date FROM expense ORDER BY amount DESC";
    const result = await db.execute(query);
    const parsedResult = expenseResult.parse(result.rows);
    return parsedResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// GET EXPENSE

const getExpenseArgs = z.object({
  id: z.string(),
});

export const getExpense = makeDomainFunction(
  getExpenseArgs,
  envSchema
)(async ({ id }, envSchema) => {
  try {
    const db = connect(config(envSchema));
    const query = "SELECT * FROM expense WHERE id = ?;";
    const params = [id];
    const result = await db.execute(query, params);
    const parsedResult = expense.parse(result.rows[0]);
    return parsedResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
