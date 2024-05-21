import { Navbar } from "@/shared/components/navbar/Navbar";
import { InputNewRaffle } from "./components/InputNewRaffle";
import DatesForRaffles from "./components/DatesForRaffles";
import { HistoricalTable } from "./components/historicalTable/Table";
import { useEffect, useState } from "react";
import {
  columnsHistorical,
  Raffles,
} from "./components/historicalTable/Columns";
import { getCollection } from "@/services/firebase/firestore/firestore";
import { DocumentData } from "firebase/firestore";
import { FilterByPaymentStatus } from "@/shared/utils/filterUsers";
import { User } from "../adheridos/components/Columns";

const SorteosModule = () => {
  const [historicalRaffles, setHistoricalRaffles] = useState<Raffles[]>([]);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [usersInConditions, setUsersInConditions] = useState<DocumentData[]>(
    []
  );

  useEffect(() => {
    getCollection("raffles").then((data) => {
      setHistoricalRaffles(data as Raffles[]);
    });
    getCollection("users").then((data) => {
      setUsers(data as DocumentData[]);
      setUsersInConditions(FilterByPaymentStatus(data as User[]));
    });
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="px-2 pt-4 flex flex-col h-full sm:px-8 gap-4">
        <h2 className="text-3xl font-bold">Sorteos</h2>
        <div className="flex gap-4 flex-col md:flex-row">
          <InputNewRaffle />
          <DatesForRaffles />
        </div>
        <HistoricalTable columns={columnsHistorical} data={historicalRaffles} />
      </div>
    </main>
  );
};

export default SorteosModule;
