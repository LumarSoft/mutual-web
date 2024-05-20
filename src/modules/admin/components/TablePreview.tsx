import { CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const TablePreview = () => {
  const navigate = useNavigate();

  return (
    <section
      className="row-span-2 border rounded flex items-center justify-center h-full"
      onClick={() => navigate("/admin/adheridos")}
    >
      <CardHeader className="text-2xl font-semibold">
        Lista de adheridos
      </CardHeader>
    </section>
  );
};
