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

const SorteosModule = () => {
  const [data, setData] = useState<Raffles[]>([]);

  useEffect(() => {
    getCollection("raffles").then((data) => {
      setData(data as Raffles[]);
    });
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="px-2 pt-4 flex flex-col h-full sm:px-8 gap-4">
        <h2 className="text-3xl font-bold">Sorteos</h2>
        <div className="flex gap-4">
          <InputNewRaffle />
          <DatesForRaffles />
        </div>
        <HistoricalTable columns={columnsHistorical} data={data} />
      </div>
    </main>
  );
};

export default SorteosModule;
