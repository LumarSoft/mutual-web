import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/modules/adheridos/components/Columns";

const DatesForRaffles = ({
  data,
  usersInConditions,
}: {
  data: User[];
  usersInConditions: User[];
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Estadisticas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-10">
        <CardDescription>
          Datos importantes sobre la actualidad de los adheridos
        </CardDescription>
        <div className="flex w-full justify-between h-full">
          <div className="flex flex-col">
            <span className="text-lg font-bold">Total de adheridos</span>
            <span>{data.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">Total de adheridos al dia</span>
            <span>{usersInConditions.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">Total de adheridos</span>
            <span>{data.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatesForRaffles;
