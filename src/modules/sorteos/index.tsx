import { Navbar } from "@/shared/components/navbar/Navbar";
import { InputNewRaffle } from "./components/InputNewRaffle";
import { HistoricalTable } from "./components/historicalTable/Table";
import { columnsHistorical } from "./components/historicalTable/Columns";
import { useEffect, useState } from "react";
import { filterWinningUsers } from "@/services/firebase/firestore/firestore";
import { User } from "@/shared/types/users";

const SorteosModule = () => {
  const [winnersHistory, setWinnersHistory] = useState<User[]>([]);

  useEffect(() => {
    filterWinningUsers("users", "fec_gan", "").then((data) => {
      const userData = data.map((doc) => ({
        apellido: doc.apellido,
        documento: doc.documento,
        cliente: doc.cliente,
        entidad: doc.entidad,
        codigo: doc.codigo,
        fec_mae: doc.fec_mae,
        cuopag: doc.cuopag,
        cuopen: doc.cuopen,
        ult_cob: doc.ult_cob,
        fupdate: doc.fupdate,
        fupd: doc.fupd,
        ganador: doc.ganador,
        fec_gan: doc.fec_gan,
        pre_pen: doc.pre_pen,
      }));
      setWinnersHistory(userData);
    });
  }, []);

  return (
    <main className="w-screen flex flex-col">
      <Navbar />
      <div className="px-2 pt-4 flex flex-col h-full sm:px-8 gap-4">
        <h2 className="text-3xl font-bold">Sorteos</h2>
        <InputNewRaffle />
        <HistoricalTable data={winnersHistory} columns={columnsHistorical} />
      </div>
    </main>
  );
};

export default SorteosModule;
