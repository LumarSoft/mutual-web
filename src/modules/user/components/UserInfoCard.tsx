import { useState, useEffect } from "react";
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
import { getLastWinner } from "@/services/firebase/firestore/firestore";
import { DocumentData } from "firebase/firestore";

export const UserInfoCard = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [lastWinner, setLastWinner] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchLastWinner = async () => {
      const winnerData = await getLastWinner();
      setLastWinner(winnerData.length > 0 ? winnerData[0] : null);
    };
    fetchLastWinner();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  function excelDateToJSDate(excelDate: string) {
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + Number(excelDate) * 86400000);
    return date;
  }

  if (!user) {
    return (
      <main className="flex justify-center items-center mt-10 mx-4">
        <Card className="w-[650px] mb-10">
          <CardHeader>
            <CardTitle className="text-center text-4xl">
              Hola, Usuario!
            </CardTitle>
            <CardDescription className="text-center">
              No se encontraron datos del usuario.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            Por favor, inicia sesión nuevamente.
          </CardContent>
        </Card>
      </main>
    );
  }

  const isLastWinner = lastWinner && lastWinner.documento === user.documento;
  const ganadorTexto = isLastWinner ? "Si!" : "No";
  const premioTexto = isLastWinner
    ? user.pre_pen === "undefined"
      ? "Sin premio"
      : user.pre_pen
    : "Ninguno";

  return (
    <main className="flex justify-center items-center mt-10 mx-4">
      <Card className="w-[650px] mb-10">
        <CardHeader>
          <CardTitle className="text-center text-4xl">{`Hola, ${user.apellido}!`}</CardTitle>
          <CardDescription className="text-center">
            A continuación se mostrarán sus datos. Cualquier modificación que
            desee realizar deberá comunicarse con soporte.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  {excelDateToJSDate(user.fupdate).toLocaleDateString()}
                </span>

                <Label className="pt-2" htmlFor="ganador">
                  Ganador
                </Label>
                <span
                  id="ganador"
                  className="text-white border border-gray-800 rounded p-2 font-medium"
                >
                  {ganadorTexto}
                </span>

                <Label className="pt-2" htmlFor="Premio">
                  Premio
                </Label>
                <span
                  id="Premio"
                  className="text-white border border-gray-800 rounded p-2 font-medium"
                >
                  {premioTexto}
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
        </CardContent>
      </Card>
    </main>
  );
};
