import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { getPhones } from "@/services/firebase/firestore/firestore";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const DialogWhatsapp = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSend = async () => {
    if (message === "" && file === null) {
      toast.error("Debe ingresar un mensaje o un archivo PDF");
      return;
    }

    try {
      const phones = await getPhones();

      const formData = new FormData();
      formData.append("phones", JSON.stringify(phones));
      formData.append("message", message);
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("http://localhost:3008/enviar-mensajes", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Mensaje enviado");
      } else {
        toast.error("Hubo un error al enviar los mensajes");
      }

      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error al enviar mensajes: ", error);
      toast.error("Hubo un error al enviar los mensajes");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full bg-green-800 hover:bg-green-900 py-3 rounded">
        <b>Enviar resultados por whatsapp</b>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="w-full text-center">
            QR para conectar al bot de{" "}
            <span className="text-green-500">Whatsapp</span>
          </DialogTitle>
          <DialogDescription className="p-1">
            <span className="text-red-500">RECORDATORIO:</span> El QR se
            actualiza cada 1 minuto. Recargar la pagina de ser necesario.
          </DialogDescription>
          <DialogDescription className="flex justify-center items-center p-1">
            <img src="http://localhost:3008/" className="p-4" />
          </DialogDescription>
          <Label>
            Ingrese el mensaje a enviar{" "}
            <span className="font-semibold text-green-600">(OPCIONAL)</span>
          </Label>
          <Textarea onChange={(e) => setMessage(e.target.value)} />
          <Label>
            Inserte archivo PDF{" "}
            <span className="font-semibold text-green-600">(OPCIONAL)</span>
          </Label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </DialogHeader>
        <DialogFooter className="w-full">
          <DialogClose
            className="w-full bg-green-800 hover:bg-green-900 py-3 rounded"
            onClick={handleSend}
          >
            Enviar mensaje
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
