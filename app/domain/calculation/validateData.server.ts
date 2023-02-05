import { match } from "ts-pattern";
import type { z } from "zod";

type ValidateData = <Data extends unknown>(
  zodSchema: z.ZodTypeAny,
  data: any
) => Promise<
  z.SafeParseSuccess<Data> | { success: false; error: { _errors: string[] } }
>;

export const validateData: ValidateData = async (zodSchema, data) => {
  const result = await zodSchema.safeParseAsync(data);
  return match(result)
    .with({ success: true }, (result) => result)
    .with({ success: false }, (result) => ({
      ...result,
      error: result.error.format(),
    }))
    .exhaustive();
};
