import { z } from "zod";

export const account = z.object({
  email: z.string().email(),
  password: z.string().min(12),
});

export type Account = {
  email: string;
  password: string;
};
