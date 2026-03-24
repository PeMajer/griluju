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
          "Keramický gril, který mám dnes jako hlavní. Drží teplotu s minimem uhlí, zvládne low & slow i searing na 350 °C+. K tomu pizza kámen, litinová deska a expander rošt.",
        tip: "Na jednu náplň uhlí zvládnete klidně 20 hodin grilování při 130 °C — keramika drží teplotu bez korekce.",
        priceRange: "30 000–50 000 Kč",
        rating: 5,
        tags: ["Uhlí", "Multifunkční", "Low & slow"],
        status: "current",
      },
      {
        name: "Weber Master-Touch 57 cm",
        description:
          "Gril na dřevěné uhlí s GBS systémem. Používám ho dodnes — na krátké grilování, steaky a vše, kde nepotřebuji stabilitu kamada na 12+ hodin.",
        tip: "GBS litinový rošt je investice, která se vyplatí. Akumuluje teplo a maso nepustí, dokud se samo neodlepí.",
        priceRange: "6 000–9 000 Kč",
        rating: 5,
        tags: ["Uhlí", "GBS systém", "Steaky"],
        status: "current",
      },
      {
        name: "Levný gril z hypermarketu",
        description:
          "Kotlíkový gril za pár stovek z Tesca — tím vším to začalo. Krkovička, první pokusy, první chyby. Na víc jsem ho nepoužil, ale svůj účel splnil.",
        tip: "Výborný způsob jak zjistit, jestli vás grilování vůbec baví — než investujete do čehokoliv pořádného.",
        priceRange: "500–1 500 Kč",
        rating: 3,
        tags: ["Uhlí", "Začátečník"],
        status: "former",
      },
      {
        name: "Plynový gril Weber",
        description:
          "Měl jsem ho jako doplněk — rychlý start, snadná regulace. Ale té výsledné chuti pořád něco scházelo — kouřové aroma, které plamen bez dřeva prostě nedá.",
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
    description: "Bez teploměru grilujete poslepu. Investice, která se vrátí hned při prvním steaku.",
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
          "WiFi teploměr se šesti sondami a řízeným ventilátorem. Ovládám teplotu grilu na dálku přes aplikaci — ideální pro noční grilování.",
        tip: "Drive Fan v kombinaci s Kamado Joe drží teplotu ±2 °C bez ruční korekce.",
        priceRange: "8 000–12 000 Kč",
        rating: 5,
        tags: ["WiFi", "Vícekanálový", "Ventilátor"],
        status: "current",
      },
      {
        name: "MEATER 2 Plus",
        description:
          "Kompletně bezdrátová sonda — žádné kabely, které by překážely. Měří vnitřní teplotu masa i okolní teplotu grilu současně.",
        tip: "Ideální na kusy masa, kde nechcete tahat kabel přes víko grilu. Dosah přes WiFi bridge je solidní.",
        priceRange: "3 000–4 000 Kč",
        rating: 4,
        tags: ["Bezdrátový", "WiFi"],
        status: "former",
      },
      {
        name: "ThermoWorks DOT",
        description:
          "Jednoduchá digitální sonda s alarmem. Zapíchnete, nastavíte cílovou teplotu a víc se nestaráte.",
        tip: "Nejlepší záložní teploměr. Když nechcete řešit technologie a potřebujete jen alarm na cílovou teplotu.",
        priceRange: "800–1 200 Kč",
        rating: 4,
        tags: ["Sonda", "Jednoduchý"],
        status: "current",
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
      },
      {
        name: "Kevlarové grilovací rukavice BBQ Premium",
        description:
          "Kevlarové rukavice na manipulaci s horkými rošty, kamennými deskami i celými kusy masa přímo z grilu.",
        tip: "Vyhněte se bavlněným — nasáknou tuk a hrozí opaření. Kevlar je bezpečnější a vydrží déle.",
        priceRange: "600–1 000 Kč",
        rating: 5,
        tags: ["Ochrana", "Kevlar"],
        status: "current",
      },
      {
        name: "Štěpky na uzení Weber",
        description:
          "Dřevěné štěpky různých druhů na přidání kouřové chuti. Štěpky hickory na hovězí, třešeň na vepřové, jabloň na drůbež.",
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
        tip: "Injektujte maso před použitím koření nebo rubu, ne po. Vlhkost uvnitř je základ pro dlouhé grilování.",
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
          "Čisticí spreje na rošt a vnitřek grilu. Fungují na jakýkoliv typ grilu a roštu.",
        tip: "Aplikujte na studený gril, nechte působit 15 minut. Na horkém povrchu se přípravek odpaří dřív, než zafunguje.",
        priceRange: "200–400 Kč",
        rating: 4,
        tags: ["Čištění"],
        status: "current",
      },
      {
        name: "Kartáče na rošt (různé druhy)",
        description:
          "Mosazné, ocelové i bezdrátové škrabky. Pro každý typ roštu jiný nástroj — litinový rošt nechcete drhnout ocelovým kartáčem.",
        tip: "Kartáčem čistěte rošt za tepla — nahřejte gril na maximum, pak 30 sekund drhnete rošt.",
        priceRange: "200–700 Kč",
        rating: 4,
        tags: ["Čištění", "Bezpečné"],
        status: "current",
      },
    ],
  },
];

export const starterKit = [
  { name: "Gril na dřevěné uhlí",  icon: Flame,       reason: "Základ, bez kterého to nejde" },
  { name: "Instantní teploměr",    icon: Thermometer,  reason: "Konec hádání — víte přesně, kdy je hotovo" },
  { name: "Rozpalovací komín",     icon: Wind,         reason: "Uhlí za 15 minut, bez chemie" },
  { name: "Grilovací kleště",      icon: Utensils,     reason: "Prodloužení ruky grillmastera" },
  { name: "Žáruvzdorné rukavice",  icon: ShieldCheck,  reason: "Manipulace s horkými rošty bez rizika" },
  { name: "Mosazný kartáč",        icon: Wrench,       reason: "Čistý rošt = čistá chuť" },
];
