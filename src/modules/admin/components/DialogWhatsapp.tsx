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

export const DialogWhatsapp = () => {
  const handleSend = async () => {

    
  };

  return (
    <Dialog>
      <DialogTrigger>Enviar resultados por whatsapp</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escanee el QR para poder enviar el mensaje</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <DialogDescription>Aca iria el QR</DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full">
          <DialogClose className="w-full bg-green-800 hover:bg-green-900 py-3 rounded" onClick={handleSend}>
            Enviar mensaje
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
