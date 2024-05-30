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
import { LoadingComponent } from "@/shared/components/loading/Loading";
import { useState } from "react";
import { toast } from "react-toastify";

export const LoginExcelCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return toast.error("Por favor seleccione un archivo");
    }

    setLoading(true);

    const isFinish = await uploadExcelInFirestore(file);

    if (isFinish) {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent />;

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
        <Input type="file" onChange={changeFile} accept=".xlsx, .xls" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleUpload}>
          Subir
        </Button>
      </CardFooter>
    </Card>
  );
};
