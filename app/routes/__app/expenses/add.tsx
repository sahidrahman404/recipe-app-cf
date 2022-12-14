// /expenses/add

import { connect } from "@planetscale/database/dist";
import { redirect } from "@remix-run/cloudflare";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { config, Env } from "~/db/dbConfig.server";

export default function AddExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    // navigate programmatically
    navigate("/expenses");
  }
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action({
  request,
  context,
}: {
  request: Request;
  context: Env;
}) {
  const formData = await request.formData();
  const conn = connect(config(context));
  const title = formData.get("title");
  const amount = formData.get("amount");
  const date = formData.get("date");
  const query = "INSERT INTO expense (title, amount, date) VALUES(?,?,?)";
  const params = [title, Number(amount), date];
  const result = await conn.execute(query, params);
  return redirect("/expenses");
}
