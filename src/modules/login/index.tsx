import { LoginCard } from "./components/LoginCard";

const LoginModule = () => {
  return (
    <main className="w-screen h-screen bg-background flex mdMax:flex-col-reverse mdMax:items-center mdMax:justify-center">
      <div className="w-full h-full flex items-center justify-center mx-2 mdMax:mx-0 mdMax:mb-4">
        <LoginCard />
      </div>
      <div className="w-full h-full flex items-center justify-center smMax:hidden mdMax:w-60 mdMax:h-auto mdMax:mt-10">
        <img src="/logo.png" className="mdMax:w-full" />
      </div>
    </main>
  );
};

export default LoginModule;
