export interface MeatTemperatureRow {
  level: string;
  minC: number;
  maxC: number;
  color: string;
}

export interface MeatCategory {
  id: string;
  name: string;
  rows: MeatTemperatureRow[];
}

export const meatTemperatures: MeatCategory[] = [
  {
    id: "hovezi",
    name: "Hovězí",
    rows: [
      { level: "Rare", minC: 49, maxC: 52, color: "#EF4444" },
      { level: "Medium Rare", minC: 54, maxC: 57, color: "#E8531A" },
      { level: "Medium", minC: 60, maxC: 63, color: "#E8531A" },
      { level: "Medium Well", minC: 65, maxC: 69, color: "#A8A29E" },
      { level: "Well Done", minC: 71, maxC: 75, color: "#78716C" },
      { level: "Brisket / Holubí maso", minC: 93, maxC: 96, color: "#78716C" },
    ],
  },
  {
    id: "vepřové",
    name: "Vepřové",
    rows: [
      { level: "Kotlety / pečeně", minC: 63, maxC: 68, color: "#E8531A" },
      { level: "Celé kusy / pečeně", minC: 71, maxC: 74, color: "#A8A29E" },
      { level: "Žebra (baby back)", minC: 85, maxC: 93, color: "#78716C" },
      { level: "Pulled Pork (plec)", minC: 93, maxC: 96, color: "#78716C" },
      { level: "Koleno / vepřové nožičky", minC: 88, maxC: 93, color: "#78716C" },
    ],
  },
  {
    id: "drůbež",
    name: "Drůbež",
    rows: [
      { level: "Kuřecí prsa (bezpečná min.)", minC: 74, maxC: 76, color: "#A8A29E" },
      { level: "Kuřecí prsa (šťavnatá)", minC: 71, maxC: 74, color: "#E8531A" },
      { level: "Kuřecí stehna / křidélka", minC: 79, maxC: 82, color: "#78716C" },
      { level: "Celé kuře", minC: 82, maxC: 85, color: "#78716C" },
      { level: "Kachní prsa", minC: 57, maxC: 63, color: "#E8531A" },
      { level: "Krocan (prsa)", minC: 74, maxC: 76, color: "#78716C" },
    ],
  },
  {
    id: "ryby",
    name: "Ryby",
    rows: [
      { level: "Tuňák — rare", minC: 43, maxC: 46, color: "#EF4444" },
      { level: "Losos — medium", minC: 52, maxC: 54, color: "#E8531A" },
      { level: "Losos — well done", minC: 60, maxC: 63, color: "#78716C" },
      { level: "Bílé ryby (treska, pangasius)", minC: 58, maxC: 63, color: "#78716C" },
      { level: "Celá ryba", minC: 63, maxC: 68, color: "#78716C" },
    ],
  },
  {
    id: "jehněčí",
    name: "Jehněčí",
    rows: [
      { level: "Rare", minC: 52, maxC: 54, color: "#EF4444" },
      { level: "Medium Rare", minC: 54, maxC: 57, color: "#E8531A" },
      { level: "Medium", minC: 60, maxC: 63, color: "#E8531A" },
      { level: "Well Done", minC: 70, maxC: 74, color: "#78716C" },
      { level: "Pulled shoulder (plec)", minC: 88, maxC: 93, color: "#78716C" },
    ],
  },
];

export const meatTips = [
  {
    title: "Měřte v nejsilnějším místě",
    text: "Termometr zasuňte do středu nejsilnější části masa — ne ke kosti, ne na povrch.",
  },
  {
    title: "Carry-over efekt",
    text: "Po sundání z grilu teplota masa ještě stoupne o 2–4 °C. Sundejte maso o něco dřív.",
  },
  {
    title: "Odpočinek je povinný",
    text: "Maso nechte odpočinout 5–30 minut zabalené v alobalu. Šťáva se redistribuuje.",
  },
  {
    title: "Kvalitní teploměr",
    text: "Jediny spolehlivý způsob kontroly je teploměr. Oko vás oklame, číslo ne.",
  },
];
