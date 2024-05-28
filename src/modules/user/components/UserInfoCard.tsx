import { useStore } from "@/services/zustand/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const UserInfoCard = () => {
  const user = useStore((state) => state.user);

  return (
    <main className="flex justify-center items-center mt-10 mx-4">
      <Card className="w-[650px]">
        <CardHeader>
          <CardTitle className="text-center text-4xl">{`Hola, ${
            user?.apellido || "Usuario"
          }!`}</CardTitle>
          <CardDescription className="text-center">
            A continuación se mostrarán sus datos. Cualquier modificación que
            desee realizar deberá comunicarse con soporte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2.5">
                  <Label className="pt-2" htmlFor="apellido">
                    Apellido
                  </Label>
                  <span
                    id="apellido"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.apellido}
                  </span>

                  <Label className="pt-2" htmlFor="cliente">
                    Cliente
                  </Label>
                  <span
                    id="cliente"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.cliente}
                  </span>

                  <Label className="pt-2" htmlFor="documento">
                    Documento
                  </Label>
                  <span
                    id="documento"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.documento}
                  </span>

                  <Label className="pt-2" htmlFor="cuopag">
                    Cuotas Pagas
                  </Label>
                  <span
                    id="cuopag"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.cuopag}
                  </span>

                  <Label className="pt-2" htmlFor="cuopen">
                    Cuotas Pendientes
                  </Label>
                  <span
                    id="cuopen"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.cuopen}
                  </span>

                  <Label className="pt-2" htmlFor="ult_cob">
                    Último Cobro
                  </Label>
                  <span
                    id="ult_cob"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.ult_cob}
                  </span>

                  <Label className="pt-2" htmlFor="fupdate">
                    Última Actualización
                  </Label>
                  <span
                    id="fupdate"
                    className="text-white border border-gray-800 rounded p-2 font-medium"
                  >
                    {user.fupdate}
                  </span>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center">
              No se encontraron datos del usuario.
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};
