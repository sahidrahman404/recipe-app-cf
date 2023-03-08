import { match } from "ts-pattern";
import type { z } from "zod";

type ValidateData = <Data extends unknown>(
  zodSchema: z.ZodTypeAny,
  data: any
) => Promise<
  | z.SafeParseSuccess<Data>
  | { success: false; error: z.typeToFlattenedError<Data> }
>;

export const validateData: ValidateData = async (zodSchema, data) => {
  try {
    const result = await zodSchema.safeParseAsync(data);
    return match(result)
      .with({ success: true }, (result) => result)
      .with({ success: false }, (result) => ({
        ...result,
        error: result.error.flatten(),
      }))
      .exhaustive();
  } catch (error) {
    throw new Error("Error validating form data");
  }
};
