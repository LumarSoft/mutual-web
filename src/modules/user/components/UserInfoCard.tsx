import { useState, useEffect, FormEvent } from "react";
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
import {
  getLastWinner,
  updatePhoneNumber,
  getPhoneNumber,
} from "@/services/firebase/firestore/firestore";
import { DocumentData } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

export const UserInfoCard = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [lastWinner, setLastWinner] = useState<DocumentData | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isPhoneNumberSaved, setIsPhoneNumberSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLastWinner = async () => {
      const winnerData = await getLastWinner();
      setLastWinner(winnerData.length > 0 ? winnerData[0] : null);
    };

    const fetchPhoneNumber = async () => {
      if (user) {
        const phoneData = await getPhoneNumber(user.cliente);
        if (phoneData) {
          setPhoneNumber(phoneData.tel);
          setIsPhoneNumberSaved(true);
        }
      }
    };

    fetchLastWinner();
    fetchPhoneNumber();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUpdatePhoneNumber = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!phoneNumber || phoneNumber.length < 8) {
      toast.error("El número de teléfono debe tener al menos 8 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      await updatePhoneNumber({
        tel: phoneNumber,
        cliente: user.cliente,
        apellido: user.apellido,
      });
      toast.success("Número de teléfono actualizado con éxito.");
      setIsPhoneNumberSaved(true);
    } catch (error) {
      toast.error("Error al actualizar el número de teléfono.");
    } finally {
      setIsLoading(false);
    }
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
          <form onSubmit={handleUpdatePhoneNumber}>
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
                  Número de bono
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
                  {excelDateToJSDate(user.fupdate)?.toLocaleDateString()}
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

                <Label className="pt-3" htmlFor="tel">
                  Teléfono para recibir resultados del sorteo. Ej: 3415690470
                </Label>
                <Input
                  type="number"
                  className="no-spinner border border-green-600"
                  value={phoneNumber}
                  disabled={isPhoneNumberSaved}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                {!isPhoneNumberSaved && (
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
                    type="submit"
                  >
                    {isLoading
                      ? "Actualizando..."
                      : "Actualizar número de teléfono"}
                  </Button>
                )}

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
