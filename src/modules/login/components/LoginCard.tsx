import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInAsAdmin, signInAsUser } from "@/services/firebase/auth/auth";
import { useState } from "react";
import { LoadingComponent } from "@/shared/components/loading/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/services/zustand/userStore";
import { useAdminStore } from "@/services/zustand/adminStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const LoginCard = () => {
  const [field1, setField1] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginAs, setLoginAs] = useState("users");

  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setAdmin = useAdminStore((state) => state.setAdmin);

  const handleSubmit = async () => {
    if (field1.trim().length === 0 || password.trim().length === 0) {
      toast.error("Debe rellenar los dos campos");
      return;
    }
    setLoading(true);

    console.log(
      "loginAs: ",
      loginAs,
      "field1: ",
      field1,
      "password: ",
      password
    );

    let data;

    try {
      if (loginAs === "admins") {
        data = await signInAsAdmin(field1, password, loginAs);
        navigate("/admin");
        if (data) {
          const adminData = {
            email: data.email || "",
            name: data.name || "",
            tel: data.tel || "",
            uid: data.uid || "",
          };
          setAdmin(adminData);
        }
      } else {
        data = await signInAsUser(field1, password);
        if (data) {
          const userData = {
            apellido: data.apellido || "",
            documento: data.documento || "",
            cliente: data.cliente || "",
            entidad: data.entidad || "",
            codigo: data.codigo || "",
            fec_mae: data.fec_mae || "",
            cuopag: data.cuopag || "",
            cuopen: data.cuopen || "",
            ult_cob: data.ult_cob || "",
            fupdate: data.fupdate || "",
            fupd: data.fupd || "",
            ganador: data.ganador || "",
            fec_gan: data.fec_gan || "",
            pre_pen: data.pre_pen || "",
          };
          setUser(userData);
          setLoading(false);
          navigate(`/user/${userData.cliente}`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar sesión");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Tabs defaultValue="user" className="w-[400px] smMax:m-3">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="user" onClick={() => setLoginAs("users")}>
          Usuario
        </TabsTrigger>
        <TabsTrigger value="admin" onClick={() => setLoginAs("admins")}>
          Administrador
        </TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <Card>
          <CardHeader>
            <CardTitle>Usuario</CardTitle>
            <CardDescription>
              Inicie sesión para conocer su estado dentro de la Mutual. Además,
              puede consultar el ganador del sorteo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="emailUser">Número de socio</Label>
              <Input
                id="emailUser"
                placeholder="123456"
                value={field1}
                onChange={(e) => setField1(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="passwordUser">Documento</Label>
              <Input
                id="passwordUser"
                // type="password"
                placeholder="Tu documento aquí"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              Iniciar sesión
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="admin">
        <Card>
          <CardHeader>
            <CardTitle>Administrador</CardTitle>
            <CardDescription>Accede al panel de administración</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="emailAdmin">Email</Label>
              <Input
                id="emailAdmin"
                type="text"
                placeholder="bodinidev@gmail.com"
                value={field1}
                onChange={(e) => setField1(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="passwordAdmin">Contraseña</Label>
              <Input
                id="passwordAdmin"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              Iniciar sesión
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
