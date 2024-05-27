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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export const InputExcelCard = () => {
  const [fileData, setFileData] = useState([]);

  const readExcel = (file: File) => {
    if (!file) {
      toast.error("No se ha seleccionado ningún archivo");
      return;
    }

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (!e.target) return;

        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise
      .then((data) => {
        setFileData(data);
        toast.success("Archivo cargado exitosamente");
      })
      .catch((error) => {
        toast.error("Error al leer el archivo: " + error.message);
      });
  };

  const handleUpload = () => {
    console.log(fileData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carga de Excel</CardTitle>
        <CardDescription>
          Aquí se cargará el Excel del total de los clientes.
          <br /> Esta operación se realizará una sola vez, de esta forma la base
          de datos quedará llena en cuanto a usuarios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>
          Inserte el Excel aquí:
          <Input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                readExcel(file);
              }
            }}
          />
        </Label>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleUpload}>
          Subir Excel
        </Button>
      </CardFooter>
    </Card>
  );
};
