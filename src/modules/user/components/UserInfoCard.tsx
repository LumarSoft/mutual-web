import { useStore } from "@/services/zustand/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User } from "@/shared/types/users";

export const UserInfoCard = () => {
  const { logout } = useStore();
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isUser = (user: any): user is User => "apellido" in user;

  return (
    <main className="flex justify-center items-center mt-10 mx-4">
      <Card className="w-[650px] mb-10">
        <CardHeader>
          <CardTitle className="text-center text-4xl">{`Hola, ${
            isUser(user) ? user.apellido : "Usuario"
          }!`}</CardTitle>
          <CardDescription className="text-center">
            A continuación se mostrarán sus datos. Cualquier modificación que
            desee realizar deberá comunicarse con soporte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isUser(user) ? (
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <Label className="pt-2" htmlFor="apellido">
                    Apellido
                  </Label>
                  <span
                    id="apellido"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.apellido}
                  </span>

                  <Label className="pt-2" htmlFor="cliente">
                    Cliente
                  </Label>
                  <span
                    id="cliente"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.cliente}
                  </span>

                  <Label className="pt-2" htmlFor="documento">
                    Documento
                  </Label>
                  <span
                    id="documento"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.documento}
                  </span>

                  <Label className="pt-2" htmlFor="cuopag">
                    Cuotas Pagas
                  </Label>
                  <span
                    id="cuopag"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.cuopag}
                  </span>

                  <Label className="pt-2" htmlFor="cuopen">
                    Cuotas Pendientes
                  </Label>
                  <span
                    id="cuopen"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.cuopen}
                  </span>

                  <Label className="pt-2" htmlFor="fupdate">
                    Última Actualización del Sistema
                  </Label>
                  <span
                    id="fupdate"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.fupdate}
                  </span>

                  <Label className="pt-2" htmlFor="ganador">
                    Ganador
                  </Label>
                  <span
                    id="ganador"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.ganador === "1" ? (
                      <span id="ganador">Si!</span>
                    ) : (
                      <span id="ganador">No</span>
                    )}
                  </span>

                  <Label className="pt-2" htmlFor="Premio">
                    Premio
                  </Label>
                  <span
                    id="Premio"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.pre_pen === "" ? (
                      <span id="Premio">Sin premio</span>
                    ) : (
                      <span id="Premio">{user.pre_pen}</span>
                    )}
                  </span>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold"
                    type="button"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center">
              No se encontraron datos del usuario.
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};
