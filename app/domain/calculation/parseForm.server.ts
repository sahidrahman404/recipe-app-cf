export const parseForm = async (data: Request) => {
  return await data.formData().then((data) => Object.fromEntries(data));
};
