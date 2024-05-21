import { User } from "@/modules/adheridos/components/Columns";

export function FilterByPaymentStatus(users: User[]): User[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  return users.filter((user) => {
    const [añoPagado, mesPagado] = user.last_paid.split("-").map(Number);
    return añoPagado === currentYear && mesPagado === currentMonth;
  });
}
