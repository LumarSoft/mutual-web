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
      <CardContent>
        <CardDescription>
          Porfavor inserte cual sera el premio a sortear
        </CardDescription>
        <Input />
        <Button>Sortear!</Button>
      </CardContent>
      <CardFooter>Ganador:</CardFooter>
    </Card>
  );
};
