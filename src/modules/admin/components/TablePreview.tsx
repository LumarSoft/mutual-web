import { useNavigate } from "react-router-dom";

export const TablePreview = () => {
  const navigate = useNavigate();

  return (
    <section
      className="row-span-2 border rounded flex items-center justify-center h-full"
      onClick={() => navigate("/admin/adheridos")}
    >
      <h3 className="text-3xl font-semibold">Adheridos</h3>
    </section>
  );
};
