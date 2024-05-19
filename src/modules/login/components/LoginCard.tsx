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

export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim().length === 0 || password.trim().length === 0) {
      toast.error("Debe rellenar los dos campos");
      return;
    }

    setLoading(true);
    try {
      const data = await signIn(email, password);
      if (data) {
        setUserData(data);
        setLoading(false);
        console.log(data);
        // navigate("/dashboard");
      } else {
        setLoading(false);
        console.log("No user data found.");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Iniciar sesion</CardTitle>
        <CardDescription>
          Porfavor rellene los campos con sus creedenciales
        </CardDescription>
      </CardHeader>
      <form onSubmit={(e) => handleSubmit(e)}>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label>Correo electronico</Label>
            <Input onChange={(e) => setEmail(e.target.value.toString())} />
          </div>
          <div>
            <Label>Contraseña</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value.toString())}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Iniciar sesion
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
