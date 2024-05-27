import { Navbar } from "@/shared/components/navbar/Navbar";
import { InputExcelCard } from "./components/InputExcelCard";

function ExcelModule() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="w-full h-full flex items-center justify-center">
        <InputExcelCard />
      </div>
    </main>
  );
}

export default ExcelModule;
