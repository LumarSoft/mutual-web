import { useStore } from "@/services/zustand/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getLastRaffle } from "@/services/firebase/firestore/firestore";
import { useEffect, useState } from "react";

type Raffle = {
  award: string;
  bono_win: string;
  date: string;
  name: string;
};

export const UserInfoCard = () => {
  const user = useStore((state) => state.user);
  const [lastRaffle, setLastRaffle] = useState<Raffle | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastRaffle = async () => {
      try {
        const lastRaffleData = await getLastRaffle();
        if (lastRaffleData) {
          setLastRaffle(lastRaffleData as Raffle);
        }
      } catch (err) {
        setError("Error al obtener los datos del sorteo.");
      } finally {
        setLoading(false);
      }
    };

    fetchLastRaffle();
  }, []);

  return (
    <main className="flex justify-center items-center mt-10 mx-4">
      <Card className="w-[650px]">
        <CardHeader>
          <CardTitle className="text-center text-4xl">{`Hola, ${user.name}!`}</CardTitle>
          <CardDescription className="text-center">
            A continuación se mostrarán sus datos. Cualquier modificación que
            desee realizar deberá comunicarse con soporte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center">Cargando...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2.5">
                  <Label className="pt-2" htmlFor="name">
                    Nombre
                  </Label>
                  <span
                    id="name"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.name}
                  </span>

                  <Label className="pt-2" htmlFor="dni">
                    DNI
                  </Label>
                  <span
                    id="dni"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.DNI}
                  </span>

                  <Label className="pt-2" htmlFor="date_subscription">
                    FECHA DE SUSCRIPCIÓN
                  </Label>
                  <span
                    id="date_subscription"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.date_subscription}
                  </span>

                  <Label className="pt-2" htmlFor="instalments_Qty">
                    PLAN CANTIDAD DE CUOTAS
                  </Label>
                  <span
                    id="instalments_Qty"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.instalments_Qty}
                  </span>

                  <Label className="pt-2" htmlFor="last_paid">
                    CUOTAS PAGAS
                  </Label>
                  <span
                    id="last_paid"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.last_paid}
                  </span>

                  {lastRaffle && (
                    <>
                      <Label className="pt-2">ÚLTIMO GANADOR 🏆</Label>
                      <span
                        id="last_winner"
                        className="text-white border border-orange-500 rounded p-2 font-medium"
                      >
                        {lastRaffle.name}
                      </span>

                      <Label className="pt-2">FECHA DEL ÚLTIMO SORTEO</Label>
                      <span
                        id="raffle_date"
                        className="text-white border border-gray-800 rounded p-2 font-medium"
                      >
                        {lastRaffle.date}
                      </span>

                      <Label className="pt-2">PREMIO</Label>
                      <span
                        id="raffle_award"
                        className="text-white border border-gray-800 rounded p-2 font-medium"
                      >
                        {lastRaffle.award}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
};
