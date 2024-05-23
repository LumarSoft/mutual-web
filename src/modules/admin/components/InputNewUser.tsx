import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { DialogNewUser } from "./dialogNewUser";

export const InputNewUser = () => {
  return (
    <DialogNewUser>
      <Card className="relative cursor-pointer">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url(/preview.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            filter: "blur(3px)",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <CardHeader className="text-2xl font-bold">
            Nuevo adherente
          </CardHeader>
          <CardDescription>
            Presione aqui para registrar nuevo adherente a la base de datos
          </CardDescription>
        </div>
      </Card>
    </DialogNewUser>
  );
};
