import type { LinksFunction } from "@remix-run/cloudflare";
import AuthForm from "~/components/auth/AuthForm";
import authStyles from "../../styles/auth.css";

export default function AuthPage() {
  return <AuthForm />;
}

export const links: LinksFunction = function () {
  return [{ rel: "stylesheet", href: authStyles }];
};
