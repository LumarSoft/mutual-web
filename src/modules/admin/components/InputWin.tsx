import { CardDescription, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const NewRaffle = () => {
  const navigation = useNavigate();

  return (
    <section
      className="col-start-2 border rounded flex items-center justify-center h-full relative cursor-pointer"
      onClick={() => navigation("/admin/sorteos")}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: "url(/preview2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          filter: "blur(3px)",
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <CardHeader className="text-2xl font-bold">Nuevo sorteo</CardHeader>
        <CardDescription>
          Presione aqui para registrar realizar un nuevo sorteo
        </CardDescription>
      </div>
    </section>
  );
};
