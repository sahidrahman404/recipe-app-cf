import { z } from "zod";

export type Env = {
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
};

export const envSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
});

export function config(context: Env) {
  return {
    host: (context as Env).DATABASE_HOST,
    username: (context as Env).DATABASE_USERNAME,
    password: (context as Env).DATABASE_PASSWORD,
  };
}
