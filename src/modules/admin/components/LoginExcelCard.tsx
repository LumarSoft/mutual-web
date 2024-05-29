import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const LoginExcelCard = () => {
  const [file, setFile] = useState<File | null>(null);

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }

  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inserte el archivo Excel aqui</CardTitle>
        <CardDescription>
          El sistema leera el excel y actualizara la base de datos con la
          informacion proporcionada
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="file" onChange={changeFile} />
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleUpload}>
          Subir
        </Button>
      </CardFooter>
    </Card>
  );
};
