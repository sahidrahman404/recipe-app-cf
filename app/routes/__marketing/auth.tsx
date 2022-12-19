import type { LinksFunction } from "@remix-run/cloudflare";
import AuthForm from "~/components/auth/AuthForm";
import { inputFromForm, inputFromUrl } from "domain-functions";
import authStyles from "../../styles/auth.css";

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }: { request: Request }) {
  // Extract serachParams with domain function helper
  const authMode = inputFromUrl(request).mode || "login";
  console.log("searchParams", authMode);

  // Extract serachParams with web api
  // const searchParams = new URL(request.url).searchParams;
  // console.log("searchParams", searchParams);
  // const authMode = searchParams.get("mode") || "login";
  // console.log("authMode", authMode);

  // Extract request data with domain functions helper
  const credential = await inputFromForm(request);
  console.log("credential", credential);

  // Extract request data with web api
  // const formData = await request.formData();
  // console.log("formData", formData);
  // const credential = Object.fromEntries(formData);
  // console.log("credential", credential);

  if (authMode === "login") {
    //login logic
  } else {
    //signup logic (create a user)
  }
}
export const links: LinksFunction = function () {
  return [{ rel: "stylesheet", href: authStyles }];
};
