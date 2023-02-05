type ParseForm = (data: Request) => Promise<{ [k: string]: FormDataEntryValue }>
export const parseForm: ParseForm = async (data) => {
  return await data.formData().then((data) => Object.fromEntries(data));
};
