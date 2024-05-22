import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export const DialogQR = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Escanea QR con Whatsapp</DialogTitle>
          <DialogDescription className="text-center">
            Para poder enviar el mensaje es importante que escanees el QR
            previamente
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex justify-center items-center">
          <img src={"http://john-api.com:3008/"} />
        </div>
        <Button className="bg-green-700 hover:bg-green-800 text-white">Enviar mensaje</Button>
      </DialogContent>
    </Dialog>
  );
};
