import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const InputNewRaffle = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nuevo sorteo</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardDescription>
          Ingrese el premio del sorteo
        </CardDescription>
        <Input />
        <Button>Sortear!</Button>
      </CardContent>
      <CardFooter>Ganador:</CardFooter>
    </Card>
  );
};
