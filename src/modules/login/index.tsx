import { LoginCard } from "./components/LoginCard";

const LoginModule = () => {
  return (
    <main className="w-screen h-screen bg-background flex mdMax:flex-col-reverse mdMax:items-center mdMax:justify-center">
      <div className="w-full h-full flex flex-col items-center justify-between py-8">
        <div className="flex items-center gap-4">
          <img src="/whatsappLogo.png" className="w-10" />
          <div className="flex flex-col">
            <p className="text-center">
              Consultas:{" "}
              <a 
                href="https://wa.me/5491131489197" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                11 3148 9197
              </a>
            </p>
            <span>(de 10 a 13hs y de 14 a 16hs)</span>
          </div>
        </div>
        <LoginCard />
        <div className="min-w-96 w-2/3 text-center">
          <h1 className="text-xl">
            Centro de Suboficiales Retirados y pensionados de la Republica
            Argentina Civil del Personal de Gendarmeria Nacional
          </h1>
          <h4>Inscripcion I.G.J N. 1556096 - Resolucion General N. 000831</h4>
          <span>Cuit 30-71211776-8</span>
          <div className="flex justify-center items-center gap-4">
            <img src="/instagramLogo.png" className="w-8" />
            <a
              className="text-lg font-semibold"
              href="https://www.instagram.com/centroretiradosgn/?hl=es"
            >
              @CentroretiradosGN
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center smMax:hidden mdMax:w-60 mdMax:h-auto mdMax:mt-10 bg-white mdMax:hidden">
        <img src="./logoMutual.png" className="mdMax:w-full" />
      </div>
    </main>
  );
};

export default LoginModule;
