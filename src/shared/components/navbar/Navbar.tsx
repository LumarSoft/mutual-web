import { Button } from "@/components/ui/button";
import { useStore } from "@/services/zustand/userStore";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user, logout } = useStore();
  const navigation = useNavigate();

  const handleLogout = () => {
    logout();
    navigation("/");
  };

  return (
    <nav className="w-full h-20 flex items-center justify-end px-8 border-b">
      <DropdownNav />
      {user && <Button onClick={handleLogout}>Cerrar sesión</Button>}
    </nav>
  );
};

const DropdownNav = () => {
  return <></>;
};
