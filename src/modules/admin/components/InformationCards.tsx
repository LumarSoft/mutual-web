import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const InformationCards = () => {
  const cardsList = [
    { title: "Adheridos", value: 100 },
    { title: "Deudores", value: 20 },
    { title: "Ult. Sorteo", value: "10/10/2021" },
  ];

  return (
    <section className="flex w-full justify-between gap-4">
      {cardsList.map((card, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle className="text-zinc-600 text-xl">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-3xl text-white font-semibold">{card.value}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
