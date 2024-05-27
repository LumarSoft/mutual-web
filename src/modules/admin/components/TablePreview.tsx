import { CardDescription, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const TablePreview = () => {
  const navigate = useNavigate();

  return (
    <section
      className="row-span-2 border rounded relative cursor-pointer"
      onClick={() => navigate("/admin/adheridos")}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: "url(/preview3.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          filter: "blur(3px)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <CardHeader className="text-2xl font-bold">Buscar Adherente</CardHeader>
        <CardDescription>
          Presione aqui para buscar mediante un adherente mediante el documento
        </CardDescription>
      </div>
    </section>
  );
};
