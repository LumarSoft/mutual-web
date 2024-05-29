import { Navbar } from "@/shared/components/navbar/Navbar";
import { LoginExcelCard } from "./components/LoginExcelCard";
import { DialogWhatsapp } from "./components/DialogWhatsapp";

const AdminModule = () => {
  return (
    <main className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="px-2 py-4 flex flex-col gap-4 h-full lg:px-8">
        <h2 className="text-3xl font-bold">Administrador</h2>
        <LoginExcelCard />
        <DialogWhatsapp />
      </div>
    </main>
  );
};

export default AdminModule;
