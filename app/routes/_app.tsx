import type { LinksFunction } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expensesStyles from "../styles/expenses.css";

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export const links: LinksFunction = function () {
  return [{ rel: "stylesheet", href: expensesStyles }];
};
