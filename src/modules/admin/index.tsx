import { Navbar } from "@/shared/components/navbar/Navbar";
import { InformationCards } from "./components/InformationCards";
import { TablePreview } from "./components/TablePreview";
import { InputNewUser } from "./components/InputNewUser";
import { InputWin } from "./components/InputWin";

const AdminModule = () => {
  return (
    <main className="h-screen w-screen bg-background flex flex-col">
      <Navbar />
      <div className="px-2 py-4 flex flex-col gap-4 h-full">
        <h2 className="text-3xl font-bold">Administrador</h2>
        <InformationCards />
        <div className="flex flex-col gap-2 h-full sm:grid grid-cols-2 grid-rows-2 pb-8 sm:gap-8">
          <TablePreview />
          <InputNewUser />
          <InputWin />
        </div>
      </div>
    </main>
  );
};

export default AdminModule;