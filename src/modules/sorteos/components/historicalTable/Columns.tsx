import { User } from "@/shared/types/users";
import { ColumnDef } from "@tanstack/react-table";

export const columnsHistorical: ColumnDef<User>[] = [
  {
    accessorKey: "apellido",
    header: "Apellido",
  },
  {
    accessorKey: "documento",
    header: "Documento",
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "entidad",
    header: "Entidad",
  },
  {
    accessorKey: "codigo",
    header: "Codigo",
  },
  {
    accessorKey: "fec_mae",
    header: "Fec Mae",
  },
  {
    accessorKey: "cuopag",
    header: "Cuotas pagas",
  },
  {
    accessorKey: "cuopen",
    header: "Cuotas pendientes",
  },
  {
    accessorKey: "ult_cob",
    header: "Ultimo cobro",
  },
  {
    accessorKey: "fupdate",
    header: "Fupdate",
  },
  { accessorKey: "fupd", header: "Fupd" },
  { accessorKey: "ganador", header: "Ganador" },
  { accessorKey: "fec_gan", header: "Fec Gan" },
  { accessorKey: "pre_pen", header: "Pre Pen" },
];
