import { User } from "@/modules/adheridos/components/Columns";

export function checkExist(users: User[], bonoWin: string): User | undefined {
  return users.find((user) => user.bono === bonoWin);
}

export function isUserUpToDate(user: User): boolean {
  const lastPaidDate = new Date(user.last_paid);

  const currentDate = new Date();

  const differenceInTime = currentDate.getTime() - lastPaidDate.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays < 30;
}
