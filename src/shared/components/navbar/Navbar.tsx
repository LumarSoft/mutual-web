import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAdminStore } from "@/services/zustand/adminStore";

export const Navbar = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAdminStore();

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

      {admin && (
        <div className="flex gap-4">
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </div>
      )}
    </nav>
  );
};
