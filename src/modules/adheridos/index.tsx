import { Navbar } from "@/shared/components/navbar/Navbar";

const TableModule = () => {
  return (
    <main className="w-full h-full bg-background flex flex-col">
      <Navbar />
      <div className="px-8 pt-4 flex flex-col h-full">
        <h2 className="text-3xl font-bold">Adheridos</h2>
      </div>
    </main>
  );
};

export default TableModule;
