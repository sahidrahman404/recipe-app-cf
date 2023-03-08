type ParseForm = (
  data: Request
) => Promise<{ [k: string]: FormDataEntryValue }>;
export const parseForm: ParseForm = async (data) => {
  try {
    return await data.formData().then((data) => Object.fromEntries(data));
  } catch (error) {
    throw new Error("Failed to parse form data");
  }
};
