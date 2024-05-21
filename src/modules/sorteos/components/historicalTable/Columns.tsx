import { ColumnDef } from "@tanstack/react-table";

export interface Raffles {
  name: string;
  bono_win: string;
  date: string;
  award: string;
}

export const columnsHistorical: ColumnDef<Raffles>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "bono_win",
    header: "nro. Bono",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "award",
    header: "Premio",
  },
];
