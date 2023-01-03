import { match } from "ts-pattern";
import type { z } from "zod";

export const validateData = async (zodSchema: z.ZodTypeAny, data: any) => {
  const result = await zodSchema.safeParseAsync(data);
  return match(result)
    .with({ success: true }, (result) => result)
    .with({ success: false }, (result) => ({
      ...result,
      error: result.error.format(),
    }))
    .exhaustive();
};
