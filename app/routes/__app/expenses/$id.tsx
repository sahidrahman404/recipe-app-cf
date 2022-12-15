// /expenses/<some-id>

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

export default function UpdateExpensesPage() {
  return (
    <Modal redirect={"/expenses"}>
      <ExpenseForm />
    </Modal>
  );
}
