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
import { singIn } from "@/services/firebase/auth/auth";
import { useState } from "react";

export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    singIn(email, password);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Iniciar sesion</CardTitle>
        <CardDescription>
          Porfavor rellene los campos con sus creedenciales
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <Label>Correo Electronico</Label>
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
        <Button className="w-full" onClick={handleSubmit}>
          Iniciar sesion
        </Button>
      </CardFooter>
    </Card>
  );
};
