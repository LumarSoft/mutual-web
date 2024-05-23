import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { singUp } from "@/services/firebase/auth/auth";
import { useState } from "react";

export const DialogNewUser = ({ children }: { children: React.ReactNode }) => {
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
  const [instalmentsQty, setInstalmentsQty] = useState(0);

  const [useCurrentDateForSubscription, setUseCurrentDateForSubscription] =
    useState(true);
  const [dateSubscription, setDateSubscription] = useState(formattedDate);

  const [useCurrentDateForLastPaid, setUseCurrentDateForLastPaid] =
    useState(true);
  const [DateLastPaid, setDateLastPaid] = useState(formattedDate);

  const handleSubmit = () => {
    const user = {
      name,
      DNI,
      email,
      tel,
      bono,
      instalmentsQty,
      dateSubscription,
      DateLastPaid,
    };

    singUp("users", user);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
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
            <Input
              onChange={(e) => setInstalmentsQty(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <Label>Fecha de suscripcion</Label>
            <Input
              type="date"
              disabled={useCurrentDateForSubscription}
              onChange={(e) => setDateSubscription(e.target.value)}
            />
          </div>
          <div className="w-full text-center">
            <Label>Utilizar fecha actual</Label>
            <Input
              type="checkbox"
              checked={useCurrentDateForSubscription}
              className="w-6 m-auto"
              onChange={() =>
                setUseCurrentDateForSubscription(!useCurrentDateForSubscription)
              }
            />
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-full">
            <Label>Fecha de ultimo pago</Label>
            <Input
              type="date"
              disabled={useCurrentDateForLastPaid}
              onChange={(e) => setDateLastPaid(e.target.value)}
            />
          </div>
          <div className="w-full text-center">
            <Label>Utilizar fecha actual</Label>
            <Input
              type="checkbox"
              className="w-6 m-auto"
              checked={useCurrentDateForLastPaid}
              onChange={() =>
                setUseCurrentDateForLastPaid(!useCurrentDateForLastPaid)
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose
            className="w-full bg-blue-800 py-3 rounded hover:bg-blue-900"
            onClick={handleSubmit}
          >
            Registrar
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
