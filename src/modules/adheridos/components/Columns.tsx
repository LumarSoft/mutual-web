// Archivo principal con la definición de las columnas
import { ColumnDef } from "@tanstack/react-table";
import { DropDownRow } from "./DropDownRow";

export interface User {
  email: string;
  tel: string;
  uid: string;
  last_paid: string;
  date_subscription: string;
  bono: string;
  name: string;
  admin: boolean;
  dni: string;
  instalments_Qty: number;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "DNI",
    header: "DNI",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tel",
    header: "Telefono",
  },
  {
    accessorKey: "date_subscription",
    header: "Fecha de Suscripcion",
  },
  {
    accessorKey: "instalments_Qty",
    header: "Cuotas",
  },
  {
    accessorKey: "last_paid",
    header: "Ultimo Pago",
  },
  {
    accessorKey: "bono",
    header: "nro. Bono",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DropDownRow user={row.original} />;
    },
  },
];
