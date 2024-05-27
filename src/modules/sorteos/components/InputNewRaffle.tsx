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
import { useState } from "react";
import { toast } from "react-toastify";
import { DialogQR } from "./dialogQR";
import { newWinner } from "@/services/firebase/firestore/firestore";

export const InputNewRaffle = () => {
  const [numberClient, setNumberClient] = useState("");
  const [award, setAward] = useState("");

  const handleNewRaffle = async () => {
    if (numberClient.trim().length === 0 || award.trim().length === 0) {
      toast.error("Debe completar ambos campos");
      return;
    }
    newWinner(numberClient, award);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nuevo sorteo</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="w-full">
          <Label>
            Escriba el nro. del ganador
            <Input onChange={(e) => setNumberClient(e.target.value)} />
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
