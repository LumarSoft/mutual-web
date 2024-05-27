import { forwardRef, ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "./table/Columns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { updateDocument } from "@/services/firebase/firestore/firestore";

export const UpdateDialog = forwardRef<
  HTMLButtonElement,
  { children: ReactNode; user: User }
>(({ children, user }, ref) => {
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

  useEffect(() => {
    if (user) {
      setName(user.name);
      setDNI(user.DNI);
      setEmail(user.email);
      setTel(user.tel);
      setBono(user.bono);
      setInstalmentsQty(user.instalments_Qty);
      setDateSubscription(user.date_subscription);
      setDateLastPaid(user.last_paid);
    }
  }, [user]);

  const handleUpdate = () => {
    if (
      name === "" ||
      tel === "" ||
      bono === "" ||
      instalmentsQty === 0 ||
      dateSubscription === "" ||
      DateLastPaid === ""
    ) {
      return toast.error("Todos los campos son obligatorios");
    }

    const updatedUser = {
      id: user.uid,
      name,
      DNI,
      email,
      tel,
      bono,
      instalments_Qty: instalmentsQty,
      date_subscription: dateSubscription,
      date_last_paid: DateLastPaid,
    };

    updateDocument("users", user.uid, updatedUser);
  };

  return (
    <Dialog>
      <DialogTrigger
        ref={ref}
        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar adherente</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Nombre completo</Label>
          <Input onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div>
          <Label>DNI</Label>
          <Input
            onChange={(e) => setDNI(e.target.value)}
            value={DNI}
            disabled
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled
          />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input onChange={(e) => setTel(e.target.value)} value={tel} />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <Label>Nro. Bono</Label>
            <Input onChange={(e) => setBono(e.target.value)} value={bono} />
          </div>
          <div className="w-full">
            <Label>Plan cantidad de cuotas</Label>
            <Input
              onChange={(e) => setInstalmentsQty(Number(e.target.value))}
              value={instalmentsQty.toString()}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <Label>Fecha de suscripción</Label>
            <Input
              type="date"
              disabled={useCurrentDateForSubscription}
              onChange={(e) => setDateSubscription(e.target.value)}
              value={dateSubscription}
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
            <Label>Fecha de último pago</Label>
            <Input
              type="date"
              disabled={useCurrentDateForLastPaid}
              onChange={(e) => setDateLastPaid(e.target.value)}
              value={DateLastPaid}
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
            className="w-full py-3 rounded bg-blue-800 hover:bg-blue-900 font-bold"
            onClick={handleUpdate}
          >
            Actualizar
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

UpdateDialog.displayName = "UpdateDialog";
