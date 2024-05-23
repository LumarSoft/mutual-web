import { LoginCard } from "./components/LoginCard";

const LoginModule = () => {
  return (
    <main className="w-screen h-screen bg-background flex">
      <div className="w-full h-full flex items-center justify-center">
        <LoginCard />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <img src="/logo.png" />
      </div>
    </main>
  );
};

export default LoginModule;
