import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

const DatesForRaffles = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Estadisticas</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Datos importantes sobre la actualidad de los adheridos
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default DatesForRaffles;
