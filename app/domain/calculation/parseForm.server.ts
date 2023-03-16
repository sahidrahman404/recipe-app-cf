export async function parseForm<T extends { [k: string]: string }>(
  data: Request
): Promise<T> {
  try {
    const formData = await data.formData();
    const formObject = Object.fromEntries(formData) as T;
    return formObject;
  } catch (error) {
    throw new Error("Failed to parse form data");
  }
}
