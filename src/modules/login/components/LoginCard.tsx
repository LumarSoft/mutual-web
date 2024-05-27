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
import { signIn } from "@/services/firebase/auth/auth";
import { useState } from "react";
import { LoadingComponent } from "@/shared/components/loading/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/services/zustand/userStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginAs, setLoginAs] = useState("users");

  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async () => {

    if (email.trim().length === 0 || password.trim().length === 0) {
      toast.error("Debe rellenar los dos campos");
      return;
    }

    setLoading(true);
    try {
      const data = await signIn(email, password, loginAs);
      if (data) {
        const userData = {
          DNI: data.DNI || "",
          admin: data.admin || false,
          bono: data.bono || "",
          date_subscription: data.date_subscription || "",
          email: data.email || "",
          instalments_Qty: data.instalments_Qty || 0,
          last_paid: data.last_paid || "",
          name: data.name || "",
          tel: data.tel || "",
          uid: data.uid || "",
          up_to_date: data.up_to_date || false,
        };
        setUser(userData);
        setLoading(false);
        loginAs === "admins"
          ? navigate("/admin")
          : navigate(`/user/${userData.uid}`);
      } else {
        setLoading(false);
        setEmail("");
        setPassword("");
        toast.error("No se encontró ningún usuario con esas credenciales");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setLoading(false);
      toast.error("Error durante el inicio de sesión");
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Tabs defaultValue="user" className="w-[400px]">
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
              <Label htmlFor="emailUser">Email</Label>
              <Input
                id="emailUser"
                placeholder="ejemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="passwordUser">Contraseña</Label>
              <Input
                id="passwordUser"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
