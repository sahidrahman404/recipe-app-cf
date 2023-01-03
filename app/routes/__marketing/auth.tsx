import type { LinksFunction } from "@remix-run/cloudflare";
import AuthForm from "~/components/auth/AuthForm";
import { parseForm } from "~/domain/calculation/parseForm.server";
import authStyles from "../../styles/auth.css";

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }: { request: Request }) {
  // Extract serachParams with web api
  const searchParams = new URL(request.url).searchParams;
  console.log("searchParams", searchParams);
  const authMode = searchParams.get("mode") || "login";
  console.log("authMode", authMode);

  // Extract request data with domain functions helper
  const credential = await parseForm(request);
  console.log("credential", credential);

  if (authMode === "login") {
    //login logic
  } else {
    //signup logic (create a user)
  }
}
export const links: LinksFunction = function () {
  return [{ rel: "stylesheet", href: authStyles }];
};
