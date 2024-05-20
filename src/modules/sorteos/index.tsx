import { Navbar } from "@/shared/components/navbar/Navbar";

const SorteosModule = () => {
  return (
    <main className="w-full h-full bg">
      <Navbar />
      <div className="px-2 pt-4 flex flex-col h-full sm:px-8 gap-4">
        <h2 className="text-3xl font-bold">Sorteos</h2>
      </div>
    </main>
  );
};

export default SorteosModule;
