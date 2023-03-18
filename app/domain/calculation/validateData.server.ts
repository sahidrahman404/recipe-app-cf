import { match } from "ts-pattern";
import type { z } from "zod";

type ValidateData = <TData extends z.ZodType<any, any, any>>(
  zodSchema: TData,
  data: any
) => Promise<
  | z.SafeParseSuccess<z.infer<TData>>
  | { success: false; error: z.typeToFlattenedError<z.infer<TData>> }
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
