import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/modules/adheridos/components/Columns";
import { newDocument } from "@/services/firebase/firestore/firestore";
import { checkExist, isUserUpToDate } from "@/shared/utils/checkWin";
import { useState } from "react";
import { toast } from "react-toastify";
import { DialogQR } from "./dialogQR";

export const InputNewRaffle = ({ users }: { users: User[] }) => {
  const [bonoWin, setBonoWin] = useState("");
  const [award, setAward] = useState("");

  const handleNewRaffle = async () => {
    if (bonoWin.trim().length === 0 || award.trim().length === 0) {
      toast.error("Debe completar ambos campos");
      return;
    }

    const userWin = checkExist(users, bonoWin);

    if (!userWin) {
      toast.error("El bono ingresado no existe");
      return;
    }

    const upToDate = isUserUpToDate(userWin);

    if (!upToDate) {
      toast.error("El usuario no esta al dia con el pago");
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${("0" + currentDate.getDate()).slice(-2)}/${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}/${currentDate.getFullYear()}`;

    const dataForWin = {
      award: award,
      bono_win: bonoWin,
      date: formattedDate,
      name: userWin.name,
    };

    await newDocument("raffles", dataForWin);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nuevo sorteo</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="w-full">
          <Label>
            Escriba el nro. de bono del ganador
            <Input onChange={(e) => setBonoWin(e.target.value)} />
          </Label>
        </div>
        <div className="w-full">
          <Label>
            Escriba el premio el premio que se sorteo
            <Input onChange={(e) => setAward(e.target.value)} />
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full text-white" onClick={handleNewRaffle}>
          Registrar sorteo
        </Button>
        <DialogQR>
          <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
            Enviar resultados por Whatsapp
          </Button>
        </DialogQR>
      </CardFooter>
    </Card>
  );
};
