export interface EquipmentItem {
  name: string;
  description: string;
  tip: string;
  priceRange: string;
  rating: number;
  tags: string[];
  status?: "current" | "former";
  affiliateSlug?: string;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  items: EquipmentItem[];
}

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: "grily",
    name: "Grily",
    icon: "🔥",
    description: "Kotle, smokey joe a větší sestava",
    items: [
      {
        name: "Weber Master-Touch 57 cm",
        description: "Kuchař pro všechno — steak, pulled pork i celé kuře. GBS rošt otevírá dveře k příslušenství. Snake metoda funguje perfektně.",
        tip: "GBS (Gourmet BBQ System) rošt umožňuje vkládat různé nástavce — litiový rošt, pizza kámen, wok.",
        priceRange: "6 000–8 000 Kč",
        rating: 5,
        tags: ["Low & Slow", "Přímý žár", "Velký"],
        status: "current",
        affiliateSlug: "weber-master-touch",
      },
      {
        name: "Weber Kettle Premium 57 cm",
        description: "O stupeň víc než Classic — teploměr v víku, lepší ventilace, odnímatelná popelnice. Ideální startovní gril.",
        tip: "Verze Premium má odnímatelnou popelnici, která usnadňuje čištění. Za příplatek rozhodně stojí.",
        priceRange: "4 500–5 500 Kč",
        rating: 4,
        tags: ["Low & Slow", "Přímý žár", "Velký"],
        status: "former",
      },
      {
        name: "Weber SmokeFire EX4",
        description: "Pelletový gril s Wi-Fi kontrolou. Automatické doplňování pelet, konstantní teplota bez zásahu. Pro ty, kdo chtějí set and forget.",
        tip: "Pelletové grily jsou výborné pro dlouhé smoky — ale bark nikdy nebude tak tuhý jako na kettle.",
        priceRange: "20 000–25 000 Kč",
        rating: 4,
        tags: ["Low & Slow", "Pelety", "Wi-Fi"],
        status: "current",
      },
      {
        name: "Offset smoker",
        description: "Tradiční americký smoker s topeniskem zboku. Nejautentičtější chuť — ale vyžaduje pozornost každých 45 minut.",
        tip: "Offset smoker není pro začátečníky. Musíte rozumět ohni a umět udržet teplotu manuálně.",
        priceRange: "8 000–50 000 Kč",
        rating: 4,
        tags: ["Low & Slow", "Tradiční BBQ", "Pro"],
      },
      {
        name: "Kamado (Big Green Egg / Monolith)",
        description: "Keramický gril s výjimečnou tepelnou izolací. Drží teplotu 16+ hodin na jedno plnění uhlím. Drahý, ale výkon je skvělý.",
        tip: "Kamado drží teplo tak dobře, že se musíte naučit správně ventilovat — přehřát je snadné.",
        priceRange: "15 000–60 000 Kč",
        rating: 5,
        tags: ["Low & Slow", "Přímý žár", "Keramika"],
        status: "current",
      },
      {
        name: "Plynový gril 3 hořáky",
        description: "Rychlý start, přesná regulace. Pro steaky a zeleninu perfektní. Pro low & slow jen nouzové řešení.",
        tip: "Plynový gril nikdy nedá kouřové aroma. Pro BBQ ho použijte jen s udícím boxem na dřevěné štěpky.",
        priceRange: "3 000–15 000 Kč",
        rating: 3,
        tags: ["Rychlý žár", "Plyn", "Jednoduché"],
        status: "former",
      },
    ],
  },
  {
    id: "teplomery",
    name: "Teploměry",
    icon: "🌡",
    description: "Bez teploměru jste slepí",
    items: [
      {
        name: "ThermoWorks Thermapen ONE",
        description: "Nejrychlejší instant-read teploměr na trhu — odečet za 1 sekundu. Přesnost ±0,5 °C. Investice, která se vrátí na prvním steaku.",
        tip: "Otočná sonda umožňuje měřit pod jakýmkoliv úhlem — ideální pro silné kusy masa.",
        priceRange: "2 500–3 000 Kč",
        rating: 5,
        tags: ["Instant Read", "Přesný", "Profesionální"],
        status: "current",
      },
      {
        name: "ThermoPro TP19H",
        description: "Dobrý instant-read za rozumnou cenu. Odečet za 3–4 sekundy, přesnost ±1 °C. Skvělý vstupní teploměr.",
        tip: "Vodotěsný a magnetický — přilepí se na gril a vždy víte, kde ho hledat.",
        priceRange: "500–800 Kč",
        rating: 4,
        tags: ["Instant Read", "Cenově dostupný"],
        status: "former",
        affiliateSlug: "teplomer-thermopro",
      },
      {
        name: "MEATER+",
        description: "Bezdrátový teploměr se sondou do masa. Bluetooth + Wi-Fi, aplikace v telefonu. Ideální pro long smoke bez nutnosti otevírat gril.",
        tip: "MEATER odhaduje čas dokončení na základě aktuální rychlosti ohřevu — celkem přesné.",
        priceRange: "2 500–3 500 Kč",
        rating: 4,
        tags: ["Bezdrátový", "Aplikace", "Long Smoke"],
        status: "current",
      },
      {
        name: "ThermoWorks Signals",
        description: "4 sondy, Wi-Fi + Bluetooth, aplikace. Pro složité smoky s více kusy masa najednou. Profesionální řešení.",
        tip: "Jedna sonda vždy patří do grilu — monitoring teploty grilu je stejně důležitý jako teplota masa.",
        priceRange: "5 000–6 500 Kč",
        rating: 5,
        tags: ["4 sondy", "Wi-Fi", "Pro"],
        status: "current",
      },
      {
        name: "Weber iGrill Mini",
        description: "Základní Bluetooth teploměr s jednou sondou. Dostačující pro začátečníky, ale app je pomalá.",
        tip: "iGrill Mini zvládá pouze jednu sondu — pro pulled pork dostačující, ale nic víc.",
        priceRange: "800–1 200 Kč",
        rating: 3,
        tags: ["Bluetooth", "Jednoduchý"],
        status: "former",
      },
    ],
  },
  {
    id: "prislusenstvi",
    name: "Příslušenství",
    icon: "🛠",
    description: "Co usnadní práci u grilu",
    items: [
      {
        name: "Grilovací kleště 40 cm",
        description: "Nerezové kleště s pružinou. Dlouhé rameno chrání ruce před žárem. Základní nástroj, který musíte mít.",
        tip: "Kleště kratší než 35 cm jsou nebezpečné u přímého žáru. Investujte do delšího modelu.",
        priceRange: "200–500 Kč",
        rating: 5,
        tags: ["Základní", "Nerez"],
        status: "current",
      },
      {
        name: "Grilovací rukavice (aromatex)",
        description: "Tepelně odolné rukavice do 300 °C. Nutnost při manipulaci s horkým masem nebo uhlím.",
        tip: "Aromatex rukavice vydrží přímý kontakt s uhlím na 2–3 sekundy. Nejsou na doteky do ohně.",
        priceRange: "400–800 Kč",
        rating: 5,
        tags: ["Bezpečnost", "Tepelné"],
        status: "current",
      },
      {
        name: "Řeznické prkénko (45×30 cm)",
        description: "Velké prkénko s drážkou pro zachycení šťávy. Pro pulled pork a brisket je velká plocha nutnost.",
        tip: "Dřevěné prkénko je šetrnější ke krájecím nástrojům než plastové. Ošetřujte ho olejem.",
        priceRange: "800–2 000 Kč",
        rating: 5,
        tags: ["Základní", "Dřevo"],
        status: "current",
      },
      {
        name: "Udící box na štěpky",
        description: "Kovová krabička s dírkami — plníte dřevěnými štěpkami a vkládáte na uhlí nebo pod rošt plynového grilu.",
        tip: "Štěpky nemusíte namáčet — suché hoří lépe a dávají intenzivnější kouř.",
        priceRange: "200–400 Kč",
        rating: 4,
        tags: ["Uzení", "Štěpky"],
        status: "current",
      },
      {
        name: "Koš na zeleninu",
        description: "Perforovaná nádoba na grilování zeleniny, brambor nebo malých kusů. Zabraňuje propadnutí roštem.",
        tip: "Koš použijte i na ryby — filet se nerozsype a je snadné ho otočit.",
        priceRange: "300–600 Kč",
        rating: 4,
        tags: ["Zelenina", "Ryby"],
      },
      {
        name: "Komínový rozpalovač",
        description: "Weber Rapidfire nebo podobný. Uhlí rozžhavíte rovnoměrně za 15–20 minut bez podpalovačů a chemie.",
        tip: "Naplňte komín na ¾ — plný komín rozpaluje déle a uhlí na vrchu není dost horké.",
        priceRange: "400–600 Kč",
        rating: 5,
        tags: ["Rozpalování", "Základní"],
        status: "current",
        affiliateSlug: "weber-rapidfire",
      },
    ],
  },
  {
    id: "udrzba",
    name: "Údržba",
    icon: "🧹",
    description: "Čistý gril lépe griluje",
    items: [
      {
        name: "Mosazný kartáč na rošt",
        description: "Měkčí než ocelový, ale efektivní. Mosazné drátky se nevylomí do jídla — bezpečnější varianta.",
        tip: "Čistěte rošt hned po skončení grilování, dokud je ještě horký — nečistoty jdou snadněji.",
        priceRange: "150–300 Kč",
        rating: 4,
        tags: ["Čištění", "Mosaz"],
        status: "current",
      },
      {
        name: "Weber Universal Grill Spray",
        description: "Ochranný sprej na kovové části grilu. Chrání před korozí a usnadňuje čištění při dalším použití.",
        tip: "Nastříkejte rošt před uzavřením grilu na zimní sezónu. Prodlouží životnost o roky.",
        priceRange: "200–350 Kč",
        rating: 4,
        tags: ["Ochrana", "Koroze"],
      },
      {
        name: "Škrabák na rošt",
        description: "Dřevěný nebo plastový škrabák — alternativa k drátkům. Bezpečnější a trvá déle.",
        tip: "Dřevěný škrabák se přizpůsobí tvaru roštu po prvním použití — díky tomu čistí lépe než drátky.",
        priceRange: "100–250 Kč",
        rating: 4,
        tags: ["Čištění", "Bezpečné"],
      },
      {
        name: "Ochranný obal na gril",
        description: "Voděodolný obal přesně pro daný model grilu. Prodlouží životnost laku a chrání před deštěm.",
        tip: "Nepoužívejte obal hned po grilování — gril musí vychladnout a vlhkost se odpařit, jinak hrdlí.",
        priceRange: "600–1 500 Kč",
        rating: 4,
        tags: ["Ochrana", "Zima"],
        status: "current",
      },
    ],
  },
];

export const starterKit = [
  { icon: "🔥", name: "Weber Kettle 57 cm", reason: "Základ vybavení — zvládne vše od steaků po pulled pork" },
  { icon: "🌡", name: "Instant-read teploměr", reason: "ThermoPro TP19H nebo Thermapen — nutnost pro přesné vaření" },
  { icon: "🪵", name: "Komínový rozpalovač", reason: "Weber Rapidfire — bezpečné a rychlé rozžhavení uhlí" },
  { icon: "🔧", name: "Kleště 40 cm", reason: "Dlouhé kleště pro bezpečnou manipulaci s masem" },
  { icon: "🧤", name: "Grilovací rukavice", reason: "Tepelně odolné rukavice — povinnost při práci s uhlím" },
  { icon: "🪵", name: "Dřevěné štěpky", reason: "Hickory + jabloň — smoke aroma pro pulled pork a ribs" },
];
