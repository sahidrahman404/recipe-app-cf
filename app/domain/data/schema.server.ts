import { z } from "zod";

export const expense = z.object({
  id: z.optional(
    z.preprocess((arg) => {
      if (
        typeof arg === "string" ||
        typeof arg === "number" ||
        typeof arg === "bigint"
      )
        return BigInt(arg);
    }, z.bigint())
  ),
  title: z.string().max(255).min(5),
  amount: z.preprocess((arg) => Number(arg), z.number().positive()),
  createdAt: z.optional(
    z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date())
  ),
  updatedAt: z.optional(
    z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date())
  ),
  date: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

export type Expense = z.infer<typeof expense>;

export const expenses = z.array(expense);

export type Expenses = z.infer<typeof expenses>;
