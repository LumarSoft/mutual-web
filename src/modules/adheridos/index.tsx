import { Navbar } from "@/shared/components/navbar/Navbar";
import { useState } from "react";
import { TableComponent } from "./components/Table";
import { columns } from "./components/Columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { getDocumentsByField } from "@/services/firebase/firestore/firestore";
import { User } from "@/shared/types/users";

const TableModule = () => {
  const [data, setData] = useState<User[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (input.length === 0) {
      return toast.error("Ingrese un nombre para buscar");
    }
    setLoading(true);
    getDocumentsByField("users", "documento", input)
      .then((res) => {
        setLoading(false);
        const userData = res.map((doc) => ({
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
        setData(userData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main className="w-full h-full flex flex-col">
      <Navbar />
      <div className="px-2 pt-4 flex flex-col h-full sm:px-8 gap-4">
        <h2 className="text-3xl font-bold">Adheridos</h2>
        <form className="flex gap-4">
          <Input
            placeholder="Buscar por DOCUMENTO"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={(e) => handleSearch(e)}>Buscar</Button>
        </form>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <TableComponent columns={columns} data={data} />
        )}
      </div>
    </main>
  );
};

export default TableModule;
