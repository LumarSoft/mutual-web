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
import { uploadExcelInFirestore } from "@/services/firebase/firestore/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import BarLoader from "react-spinners/ClipLoader";

export const LoginExcelCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      return toast.error("Por favor seleccione un archivo");
    }

    setLoading(true);

    uploadExcelInFirestore(file)
      .then(() => {
        toast.success("Archivo subido correctamente");
      })
      .catch((error) => {
        toast.error("Error al subir el archivo");
        console.error("Error al subir el archivo", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <BarLoader color="white" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inserte el archivo Excel aquí</CardTitle>
        <CardDescription>
          El sistema leerá el excel y actualizará la base de datos con la información proporcionada.{" "}
          <b className="text-green-500">
            Tardará un aproximado de 4 minutos en actualizar toda la base de datos
          </b>
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
