import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { singUp } from "@/services/firebase/auth/auth";
import { useState } from "react";

export const InputNewUser = () => {
  return (
    <DialogNewUser>
      <Card className="border rounded flex items-center justify-center">
        <h3 className="text-3xl font-semibold">Nuevo Adherente</h3>
      </Card>
    </DialogNewUser>
  );
};

const DialogNewUser = ({ children }: { children: React.ReactNode }) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(
    "0" +
    (currentDate.getMonth() + 1)
  ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

  const [name, setName] = useState("");
  const [DNI, setDNI] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [bono, setBono] = useState("");
  const [instalmentsQty, setInstalmentsQty] = useState("");
  const [useCurrentDate, setUseCurrentDate] = useState(true);
  const [date, setDate] = useState(formattedDate);

  const handleSubmit = () => {
    const user = {
      name,
      DNI,
      email,
      tel,
      bono,
      instalmentsQty: parseInt(instalmentsQty, 10),
      date,
    };

    singUp(user);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark text-white">
        <DialogHeader>
          <DialogTitle>Registrar nuevo adherente</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Nombre completo</Label>
          <Input onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>DNI</Label>
          <Input onChange={(e) => setDNI(e.target.value)} />
        </div>
        <div>
          <Label>Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label>Telefono</Label>
          <Input onChange={(e) => setTel(e.target.value)} />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <Label>Nro. Bono</Label>
            <Input onChange={(e) => setBono(e.target.value)} />
          </div>
          <div className="w-full">
            <Label>Plan cantidad de cuotas</Label>
            <Input onChange={(e) => setInstalmentsQty(e.target.value)} />
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <Label>Fecha actual</Label>
            <Input
              type="checkbox"
              className="w-6"
              onChange={() => setUseCurrentDate(!useCurrentDate)}
            />
          </div>
          <div className="w-full">
            <Label>Fecha</Label>
            <Input
              type="date"
              disabled={!useCurrentDate}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleSubmit}>Registrar</Button>
      </DialogContent>
    </Dialog>
  );
};
