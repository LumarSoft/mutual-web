import { Button } from "@/components/ui/button";
import { useStore } from "@/services/zustand/userStore";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const Navbar = () => {
  const { user, logout } = useStore();
  const navigation = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigation("/");
  };

  return (
    <nav
      className={`w-full h-20 flex items-center px-8 border-b ${
        location.pathname != "/admin" ? "justify-between" : "justify-end"
      }`}
    >
      {location.pathname != "/admin" ? (
        <FaArrowLeft
          size={30}
          onClick={() => navigation("/admin")}
          className="cursor-pointer"
        />
      ) : null}

      {user && (
        <div className="flex gap-4">
          {/* <Button
            className="bg-green-700 hover:bg-green-800"
            onClick={() => navigation("/admin/excel")}
          >
            Cargar Excel
          </Button> */}
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </div>
      )}
    </nav>
  );
};
