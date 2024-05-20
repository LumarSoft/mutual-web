import { getCollection } from "@/services/firebase/firestore/firestore";
import { Navbar } from "@/shared/components/navbar/Navbar";
import { useEffect, useState } from "react";
import { TableComponent } from "./components/Table";
import { columns, User } from "./components/Columns";

const TableModule = () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    getCollection("users").then((data) => {
      setData(data as User[]);
    });
  }, []);

  return (
    <main className="w-full h-full flex flex-col">
      <Navbar />
      <div className="px-2 pt-4 flex flex-col h-full sm:px-8 gap-4">
        <h2 className="text-3xl font-bold">Adheridos</h2>
        <TableComponent columns={columns} data={data} />
      </div>
    </main>
  );
};

export default TableModule;
