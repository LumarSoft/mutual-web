export const InformationCards = () => {
  const cardsList = [
    { title: "Adheridos", value: 100 },
    { title: "Deudores", value: 20 },
    { title: "Ult. Sorteo", value: "10/10/2021" },
  ];

  return (
    <section className="flex w-full justify-between gap-2">
      {cardsList.map((card, index) => (
        <div
          className="w-full border rounded flex flex-col px-1 py-2 sm:py-6"
          key={index}
        >
          <h4 className="text-lg font-semibold text-zinc-700 text-center sm:text-start px-4 sm:text-2xl">
            {card.title}
          </h4>
          <span className="text-center sm:text-2xl">{card.value}</span>
        </div>
      ))}
    </section>
  );
};
