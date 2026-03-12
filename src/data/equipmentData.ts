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
    description: "Od kompaktních kotlíků po velké offset smokery.",
    items: [
      {
        name: "Weber Kettle (57 cm)",
        description: "Nesmrtelná klasika. Uhlíkový kotlík, který zvládne grilování i uzení. Ideální pro začátečníky i pokročilé.",
        tip: "Investujte do originálního Weber — vydrží dekády a náhradní díly jsou vždy dostupné.",
        priceRange: "4 000–6 000 Kč",
        rating: 5,
        tags: ["Uhlí", "Univerzální"],
        status: "former",
      },
      {
        name: "Weber Master-Touch",
        description: "Vylepšený Kettle s GBS roštem, popelníkem a lepším systémem ventilace. Nejlepší poměr cena/výkon.",
        tip: "GBS rošt umožňuje přidávat příslušenství — wok, pánev na pizzu, grilovací rošt.",
        priceRange: "6 000–9 000 Kč",
        rating: 5,
        tags: ["Uhlí", "GBS systém"],
        status: "current",
        affiliateSlug: "weber-master-touch",
      },
      {
        name: "Weber SmokeFire",
        description: "Pelletový gril s WiFi připojením. Přesná kontrola teploty od 95 °C do 315 °C.",
        tip: "Perfektní pro low & slow, ale naučte se ho — první pokusy bývají trnitější než u klasiky.",
        priceRange: "25 000–35 000 Kč",
        rating: 4,
        tags: ["Pelety", "WiFi"],
      },
      {
        name: "Offset smoker",
        description: "Pro vážné nadšence do uzení. Oddělená topeniště zajistí čistý kouř a konzistentní teplotu.",
        tip: "Hledejte minimálně 5mm ocel. Tenké modely špatně drží teplotu a budete pálit víc paliva.",
        priceRange: "15 000–60 000 Kč",
        rating: 4,
        tags: ["Uhlí / dřevo", "Low & slow"],
      },
      {
        name: "Kamado (keramický gril)",
        description: "Keramická izolace drží teplotu s minimem paliva. Grilování, uzení, pečení i pizza.",
        tip: "Těžký, ale efektivní. Na jednu náplň uhlí grilujete klidně 12+ hodin.",
        priceRange: "15 000–50 000 Kč",
        rating: 5,
        tags: ["Uhlí", "Multifunkční"],
        status: "current",
      },
      {
        name: "Plynový gril",
        description: "Rychlý start, snadné ovládání teploty. Ideální pro ty, kdo grilují často a chtějí pohodlí.",
        tip: "Dbejte na kvalitní hořáky z nerez oceli. Levné modely prorezaví za 2 sezóny.",
        priceRange: "5 000–30 000 Kč",
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
    description: "Bez teploměru grilujete poslepu. Investice, která se vrátí hned.",
    items: [
      {
        name: "ThermoWorks Thermapen ONE",
        description: "Zlatý standard instantních teploměrů. Měří za 1 sekundu s přesností ±0,3 °C.",
        tip: "Vyšší cena, ale vydrží roky. Voděodolný, s automatickým podsvícením.",
        priceRange: "2 500–3 000 Kč",
        rating: 5,
        tags: ["Instantní", "Profesionální"],
        status: "current",
      },
      {
        name: "ThermoPro TP19H",
        description: "Skvělý poměr cena/výkon. Měření za 2–3 sekundy, voděodolný, magnetický.",
        tip: "Nejlepší volba pro začátečníky. Za zlomek ceny Thermapenu dostanete 90 % funkčnosti.",
        priceRange: "600–900 Kč",
        rating: 4,
        tags: ["Instantní", "Cenově dostupný"],
        status: "former",
        affiliateSlug: "teplomer-thermopro",
      },
      {
        name: "MEATER+ bezdrátový",
        description: "Kompletně bezdrátový sondy teploměr s Bluetooth. Měří vnitřní i okolní teplotu současně.",
        tip: "Ideální pro low & slow v kamadu nebo smokeru. Aplikace odhadne čas dokončení.",
        priceRange: "2 000–3 500 Kč",
        rating: 4,
        tags: ["Bezdrátový", "Bluetooth"],
        status: "current",
      },
      {
        name: "ThermoWorks Signals",
        description: "4kanálový WiFi teploměr pro monitorování více kusů masa současně na dálku.",
        tip: "Perfektní pro víkendové uzení — kontrolujete teplotu z gauče přes telefon.",
        priceRange: "5 000–6 000 Kč",
        rating: 5,
        tags: ["WiFi", "Vícekanálový"],
      },
      {
        name: "Weber iGrill Mini",
        description: "Jednoduchý Bluetooth teploměr s jednou sondou. Integruje se do Weber aplikace.",
        tip: "Dobré pro majitele Weber grilů. Pro pokročilé uzení ale zvažte vícekanálový model.",
        priceRange: "1 200–1 800 Kč",
        rating: 3,
        tags: ["Bluetooth", "Weber ekosystém"],
      },
    ],
  },
  {
    id: "accessories",
    name: "Příslušenství",
    icon: Utensils,
    description: "Grilovací kleště, rukavice, prkénka a další nezbytnosti.",
    items: [
      {
        name: "Grilovací kleště (dlouhé)",
        description: "Nerezové kleště 40+ cm. Držte si odstup od žáru a mějte plnou kontrolu nad masem.",
        tip: "Vyberte s pružinovým mechanismem a silikonovými rukojeťmi. Zamykací kroužek je bonus.",
        priceRange: "300–800 Kč",
        rating: 5,
        tags: ["Základní", "Nerez"],
      },
      {
        name: "Žáruvzdorné rukavice",
        description: "Aramidové nebo silikonové rukavice na manipulaci s horkými rošty a kameny.",
        tip: "Vyhněte se bavlněným — nasáknou tuk. Aramidové vydrží 300 °C+.",
        priceRange: "400–1 200 Kč",
        rating: 5,
        tags: ["Ochrana", "Aramid"],
      },
      {
        name: "Řeznické prkénko (koncové dřevo)",
        description: "Masivní prkénko z koncového dřeva. Šetrné k nožům, odolné a krásné na servírování.",
        tip: "Ošetřujte minerálním olejem. Nikdy nemyjte v myčce — dřevo praskne.",
        priceRange: "1 500–4 000 Kč",
        rating: 4,
        tags: ["Servírování", "Dřevo"],
      },
      {
        name: "Dimebox / udící box",
        description: "Nerezový box na dřevěné štěpky. Přidá kouřovou chuť i na plynovém grilu.",
        tip: "Namočte štěpky na 30 minut před použitím. Budou dýmit déle a rovnoměrněji.",
        priceRange: "300–600 Kč",
        rating: 4,
        tags: ["Uzení", "Plynový gril"],
      },
      {
        name: "Grilovací koš na zeleninu",
        description: "Perforovaný nerezový koš, který zabrání propadnutí menších kousků roštem.",
        tip: "Předehřejte koš na grilu — zelenina se nebude lepit.",
        priceRange: "400–900 Kč",
        rating: 4,
        tags: ["Zelenina", "Nerez"],
      },
      {
        name: "Rozpalovací komín",
        description: "Nastartujte uhlí za 15 minut bez chemického podpalovače. Čistší chuť masa.",
        tip: "Použijte noviny nebo ekologické podpalovače. Nikdy tekutý líh — nebezpečné a chuťově špatné.",
        priceRange: "300–600 Kč",
        rating: 5,
        tags: ["Základní", "Uhlí"],
        affiliateSlug: "weber-rapidfire",
      },
    ],
  },
  {
    id: "maintenance",
    name: "Údržba",
    icon: Wrench,
    description: "Čistý gril = lepší chuť. Pravidelná péče prodlouží životnost.",
    items: [
      {
        name: "Mosazný kartáč na rošt",
        description: "Bezpečnější alternativa k ocelovým kartáčům. Mosaz je měkčí a nezanechává drátky v mase.",
        tip: "Čistěte rošt vždy za tepla — nahřejte gril na maximum, pak 30 sekund kartáčem.",
        priceRange: "300–700 Kč",
        rating: 5,
        tags: ["Čištění", "Bezpečné"],
      },
      {
        name: "Sprej na čištění grilu",
        description: "Odstraní připálený tuk a nečistoty. Používejte na studený gril, nechte působit 15 minut.",
        tip: "Weber nebo Weberin značkové spreje fungují nejlépe. Vyhněte se agresivním průmyslovým čističům.",
        priceRange: "200–400 Kč",
        rating: 4,
        tags: ["Čištění", "Chemie"],
      },
      {
        name: "Ocelový škrabák na rošt",
        description: "Alternativa ke kartáči — žádné drátky, které by mohly skončit v jídle.",
        tip: "Nejbezpečnější metoda čištění. Investice na celý život.",
        priceRange: "400–800 Kč",
        rating: 5,
        tags: ["Čištění", "Bezdrátková"],
      },
      {
        name: "Ochranný obal na gril",
        description: "Chrání gril před deštěm, UV zářením a prachem. Prodlužuje životnost o roky.",
        tip: "Kupujte originální obal pro váš model — univerzální sedí špatně a propouští vodu.",
        priceRange: "800–2 000 Kč",
        rating: 4,
        tags: ["Ochrana", "Venkovní"],
      },
    ],
  },
];

export const starterKit = [
  { name: "Uhlíkový gril (Weber Kettle)", icon: Flame,      reason: "Základ, bez kterého to nejde" },
  { name: "Instantní teploměr",           icon: Thermometer, reason: "Konec hádání — víte přesně, kdy je hotovo" },
  { name: "Rozpalovací komín",            icon: Wind,        reason: "Uhlí za 15 minut, bez chemie" },
  { name: "Grilovací kleště",             icon: Utensils,    reason: "Prodloužení ruky grillmastera" },
  { name: "Žáruvzdorné rukavice",         icon: ShieldCheck, reason: "Manipulace s horkými rošty bez rizika" },
  { name: "Mosazný kartáč",              icon: Wrench,      reason: "Čistý rošt = čistá chuť" },
];
