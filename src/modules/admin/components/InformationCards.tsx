import { User } from "@/modules/adheridos/components/Columns";
import {
  getCollection,
  getLastRaffle,
} from "@/services/firebase/firestore/firestore";
import { FilterByPaymentStatus } from "@/shared/utils/filterUsers";
import { useEffect, useState } from "react";

export const InformationCards = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersDebt, setTotalUsersDebt] = useState(0);
  const [dateLastRaffle, setDateLastRaffle] = useState("");

  const cardsList = [
    { title: "Adheridos", value: totalUsers },
    { title: "Deudores", value: totalUsersDebt },
    { title: "Ult. Sorteo", value: dateLastRaffle },
  ];

  useEffect(() => {
    getCollection("users").then((data) => {
      setTotalUsers(data.length);
      const filterUsers = FilterByPaymentStatus(data as User[]);
      setTotalUsersDebt(filterUsers.length);
    });
    getLastRaffle().then((raffle) => {
      setDateLastRaffle(raffle?.date);
    });
  }, []);

  return (
    <section className="flex w-full justify-between gap-2">
      {cardsList.map((card, index) => (
        <div
          className="w-full border rounded flex flex-col px-1 py-2 sm:py-6"
          key={index}
        >
          <h4 className="text-lg font-semibold text-zinc-700 text-center sm:text-start px-4 sm:text-2xl">
            {card.title}
          </h4>
          <span className="text-center sm:text-2xl">{card.value}</span>
        </div>
      ))}
    </section>
  );
};
