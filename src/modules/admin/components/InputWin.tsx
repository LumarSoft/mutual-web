import { useNavigate } from "react-router-dom";

export const NewRaffle = () => {
  const navigation = useNavigate();

  return (
    <section className="col-start-2 border rounded flex items-center justify-center h-full" onClick={()=>navigation('/admin/sorteos')}>
      <h3 className="text-3xl font-semibold">Nuevo sorteo</h3>
    </section>
  );
};
