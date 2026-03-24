import { Flame, Thermometer, Utensils, Wrench, Wind, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ItemStatus = "current" | "former";

export type EquipmentItem = {
  name: string;
  description: string;
  tip: string;
  priceRange: string;
  rating: number;
  tags: string[];
  status?: ItemStatus;
  affiliateSlug?: string;
};

export type EquipmentCategory = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  items: EquipmentItem[];
};

export const equipmentData: EquipmentCategory[] = [
  {
    id: "grills",
    name: "Grily",
    icon: Flame,
    description: "Grily, na kterých jsem opravdu griloval — od levného uhláče až po keramické kamado.",
    items: [
      {
        name: "Kamado Joe Classic 3",
        description:
          "Keramický gril, který mám dnes jako hlavní. Drží teplotu s minimem uhlí, zvládne low & slow i searing na 350 °C+. K tomu pizza kámen, litinová deska a expander rošt — versatilita, která překvapí.",
        tip: "Keramika drží teplotu výjimečně dobře — na jednu náplň uhlí zvládnete klidně 12–14 hodin uzení.",
        priceRange: "30 000–50 000 Kč",
        rating: 5,
        tags: ["Uhlí", "Multifunkční", "Low & slow"],
        status: "current",
        affiliateSlug: "kamado-joe-classic-3",
      },
      {
        name: "Weber Master-Touch 57 cm",
        description:
          "Klasický uhlíkový kotlík s GBS systémem. Používám ho dodnes hlavně na steaky — s litinovým roštem dá perfektní grilovací šmouhy a vysokou teplotu.",
        tip: "GBS litinový rošt je investice, která se vyplatí. Akumuluje teplo a dá rýhy jako steakhouse.",
        priceRange: "6 000–9 000 Kč",
        rating: 5,
        tags: ["Uhlí", "GBS systém", "Steaky"],
        status: "current",
        affiliateSlug: "weber-master-touch",
      },
      {
        name: "Weber Kettle (57 cm)",
        description:
          "Můj první 'velký' gril. Klasický kotlík, na kterém jsem se naučil nepřímé grilování, snake metodu a první low & slow. Nesmrtelná klasika.",
        tip: "Výborný startovací gril. Zvládne překvapivě dobře i delší uzení, pokud zvládnete snake metodu.",
        priceRange: "4 000–6 000 Kč",
        rating: 5,
        tags: ["Uhlí", "Klasika"],
        status: "former",
      },
      {
        name: "Plynový gril Weber",
        description:
          "Měl jsem ho jako doplněk — rychlý start, snadná regulace. Ale chuť nikdy nebyla ta pravá. Nakonec jsem se vrátil k uhlí.",
        tip: "Plyn je pohodlný, ale uhlí a dřevo dávají chuť, kvůli které grilování vlastně děláme.",
        priceRange: "8 000–20 000 Kč",
        rating: 3,
        tags: ["Plyn", "Rychlé"],
        status: "former",
      },
    ],
  },
  {
    id: "thermometers",
    name: "Teploměry",
    icon: Thermometer,
    description: "Bez teploměru grilujete poslepu. Investice, která se vrátí hned při prvním steak.",
    items: [
      {
        name: "ThermoWorks Thermapen ONE",
        description:
          "Zlatý standard instantních teploměrů. Měří za 1 sekundu s přesností ±0,3 °C. Voděodolný, s automatickým podsvícením. Prostě nejlepší.",
        tip: "Drahý, ale vydrží roky. Pokud kupujete instantní teploměr jednou provždy, tohle je on.",
        priceRange: "2 500–3 000 Kč",
        rating: 5,
        tags: ["Instantní", "Profesionální"],
        status: "current",
      },
      {
        name: "FireBoard 2 Drive + sondy + ventilátor",
        description:
          "WiFi teploměr se šesti sondami a řízeným ventilátorem. Ovládám teplotu grilu na dálku přes aplikaci — ideální pro noční low & slow session.",
        tip: "Drive Fan v kombinaci s Kamado Joe je kombinace, která drží teplotu ±2 °C bez ruční korekce.",
        priceRange: "8 000–12 000 Kč",
        rating: 5,
        tags: ["WiFi", "Vícekanálový", "Ventilátor"],
        status: "current",
        affiliateSlug: "fireboard-2-drive",
      },
      {
        name: "MEATER 2 Plus",
        description:
          "Kompletně bezdrátová sonda — žádné kabely, které by překážely. Měří vnitřní teplotu masa i okolní teplotu grilu současně.",
        tip: "Ideální na kusy masa, kde nechcete tahat kabel přes víko grilu. Dosah přes WiFi bridge je solidní.",
        priceRange: "3 000–4 000 Kč",
        rating: 4,
        tags: ["Bezdrátový", "WiFi"],
        status: "current",
        affiliateSlug: "meater-2-plus",
      },
      {
        name: "ThermoWorks DOT",
        description:
          "Jednoduchá digitální sonda s alarmem. Zapíchnete, nastavíte cílovou teplotu a jdete jinam. Žádné WiFi, žádná aplikace.",
        tip: "Nejlepší záložní teploměr. Když nechcete řešit technologie a potřebujete jen alarm na cílovou teplotu.",
        priceRange: "800–1 200 Kč",
        rating: 4,
        tags: ["Sonda", "Jednoduchý"],
        status: "current",
        affiliateSlug: "thermoworks-dot",
      },
    ],
  },
  {
    id: "accessories",
    name: "Příslušenství",
    icon: Utensils,
    description: "Věci, bez kterých se dá grilovat — ale proč bychom to dělali.",
    items: [
      {
        name: "Rozpalovací komín Weber",
        description:
          "Nastartujte uhlí za 15 minut bez chemického podpalovače. Čistší chuť masa, rychlejší start.",
        tip: "Použijte ekologické podpalovače nebo noviny. Nikdy tekutý líh — nebezpečné a chuťově katastrofální.",
        priceRange: "300–600 Kč",
        rating: 5,
        tags: ["Základní", "Uhlí"],
        status: "current",
        affiliateSlug: "weber-rapidfire",
      },
      {
        name: "Kevlarové grilovací rukavice BBQ Premium",
        description:
          "Aramidové rukavice odolné do 250 °C+. Manipulace s horkými rošty, kamennými deskami i celými kusy masa přímo z grilu.",
        tip: "Vyhněte se bavlněným — nasáknou tuk a hrozí opaření. Aramid je bezpečnější a vydrží déle.",
        priceRange: "600–1 000 Kč",
        rating: 5,
        tags: ["Ochrana", "Aramid"],
        status: "current",
        affiliateSlug: "kevlarove-rukavice-bbq",
      },
      {
        name: "Štěpky na uzení Weber",
        description:
          "Dřevěné štěpky různých druhů na přidání kouřové chuti. Hickory na hovězí, třešeň na vepřové, jabloň na drůbež.",
        tip: "Štěpky nemusíte namáčet — suchou cestou se kouř vyvíjí rychleji a intenzivněji.",
        priceRange: "150–350 Kč",
        rating: 4,
        tags: ["Uzení", "Chuť"],
        status: "current",
      },
      {
        name: "Stříkačka pro injektáž masa",
        description:
          "Kovová stříkačka na vpíchnutí marinády přímo do středu velkých kusů masa — brisket, plec, celá jehněčí kýta.",
        tip: "Injektujte vždy před rub, ne po. Vlhkost uvnitř masa je základ pro úspěšný long cook.",
        priceRange: "200–500 Kč",
        rating: 4,
        tags: ["Injektáž", "Low & slow"],
        status: "current",
      },
      {
        name: "Grilovací náčiní (kleště, obracečka)",
        description:
          "Základní výbava — kvalitní kleště 40+ cm a robustní obracečka. Momentálně používám set z Kauflandu s dřevěnou rukojetí.",
        tip: "Dlouhé kleště jsou základ. Kratší než 35 cm = spálené ruce zaručeny.",
        priceRange: "200–800 Kč",
        rating: 4,
        tags: ["Základní", "Každodenní"],
        status: "current",
      },
    ],
  },
  {
    id: "maintenance",
    name: "Údržba",
    icon: Wrench,
    description: "Čistý gril = lepší chuť a delší životnost. Pár minut po každém grilování.",
    items: [
      {
        name: "Čisticí přípravky Weber",
        description:
          "Originální čisticí spreje a přípravky pro uhlíkové grily. Odstraní připálený tuk bez poškození povrchu.",
        tip: "Čistěte rošt vždy za tepla — nahřejte gril na max, pak 30 sekund kartáčem. Výsledek je o třídu lepší.",
        priceRange: "200–400 Kč",
        rating: 4,
        tags: ["Čištění", "Weber"],
        status: "current",
      },
      {
        name: "Kartáče na rošt (různé druhy)",
        description:
          "Mosazné, ocelové i bezdrátové škrabky. Pro každý typ roštu jiný nástroj — litinový rošt nechcete drhnout ocelovým kartáčem.",
        tip: "Na litinový rošt používejte mosazný kartáč nebo škrabku bez drátků. Ocel poškodí ochrannou vrstvu.",
        priceRange: "200–700 Kč",
        rating: 4,
        tags: ["Čištění", "Bezpečné"],
        status: "current",
      },
    ],
  },
];

export const starterKit = [
  { name: "Uhlíkový gril (Weber Kettle)", icon: Flame,       reason: "Základ, bez kterého to nejde" },
  { name: "Instantní teploměr",           icon: Thermometer,  reason: "Konec hádání — víte přesně, kdy je hotovo" },
  { name: "Rozpalovací komín",            icon: Wind,         reason: "Uhlí za 15 minut, bez chemie" },
  { name: "Grilovací kleště",             icon: Utensils,     reason: "Prodloužení ruky grillmastera" },
  { name: "Žáruvzdorné rukavice",         icon: ShieldCheck,  reason: "Manipulace s horkými rošty bez rizika" },
  { name: "Mosazný kartáč",              icon: Wrench,       reason: "Čistý rošt = čistá chuť" },
];
