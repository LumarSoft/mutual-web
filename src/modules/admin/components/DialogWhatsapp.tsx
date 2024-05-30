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
import { getLastWinner, getPhones } from "@/services/firebase/firestore/firestore";

export const DialogWhatsapp = () => {
  const handleSend = async () => {
    try {
      const phones = await getPhones();
      const ganador = await getLastWinner();
  
      fetch ("http://localhost:3008/enviar-mensajes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({phones, ganador}),
      })
      toast.success("Mensaje enviado");
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
