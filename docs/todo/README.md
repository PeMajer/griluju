# TODO — Co musíš doplnit ty

Agent zapracoval design a obsah s **placeholder hodnotami**.
Tady je přesně co, kde a jak vyměnit za reálná data.

---

## 1. Stats bar na homepage

**Soubor:** `src/app/(cs)/page.tsx`
**Hledej:** `<!-- PLACEHOLDER: stats -->`

Vyplň reálná čísla:

| Pole | Placeholder | Vyměnit za |
|---|---|---|
| Počet let u grilu | `10+` | tvé reálné číslo |
| Hlavní vybavení | `Weber Kettle` | tvůj gril (model) |
| Specializace | `Low & slow` | tvá specializace |
| Vlastní fotky | `100%` | procento nebo popis |

---

## 2. Osobní příběh — stránka /o-mne

**Soubor:** `src/app/(cs)/o-mne/page.tsx`
**Hledej:** `<!-- PLACEHOLDER: personal-story -->`

Napiš agentovi 3–5 vět o:
1. Kdy a jak jsi začal grilovat (rok, okolnost)
2. Zlomový moment — kdy jsi to začal brát vážně
3. Co tě na grilování nejvíc baví / čemu se specializuješ
4. Proč jsi založil tento web

Agent z toho sestaví plnohodnotný text.

---

## 3. Kontaktní info — stránka /kontakt

**Soubor:** `src/app/(cs)/kontakt/page.tsx`
**Hledej:** `<!-- PLACEHOLDER: contact -->`

Doplň:
- Email pro web (zobrazí se veřejně)
- LinkedIn / GitHub (volitelně)
- Chceš kontaktní formulář nebo jen email?

---

## 4. GA4 Tracking ID

**Soubor:** `.env.local` (vytvoř pokud neexistuje)

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

Najdeš v: [analytics.google.com](https://analytics.google.com) → Admin → Data Streams → tvůj stream → Measurement ID

---

## 5. Cookie banner

**Stav: hotovo** — vanilla-cookieconsent implementován, žádné kroky nejsou potřeba.

---

## 6. Hero headline — vyber variantu

**Soubor:** `src/app/(cs)/page.tsx`
**Hledej:** `<!-- PLACEHOLDER: hero-headline-choice -->`

Agent připravil 3 varianty. Vyber jednu a ostatní smaž.

---

## 7. Footer tagline — vyber variantu

**Soubor:** `src/components/layout/Footer.tsx`
**Hledej:** `<!-- PLACEHOLDER: footer-tagline-choice -->`

Agent připravil 3 varianty. Vyber jednu a ostatní smaž.

---

## 8. Vlastní fotky (průběžně, od Měsíce 2)

Unsplash placeholdery jsou v:
- `/public/images/` — staženy automaticky

Postupně nahrazuj vlastními WebP fotkami (max 150 kB, přirozené světlo, tmavé prkénko).

---

## 9. Vizuální QA — zkontroluj v prohlížeči (~15 min)

- [ ] Light mode vypadá OK
- [ ] Dark mode toggle funguje (ikona v headeru)
- [ ] Dark mode systémová preference funguje (macOS/Windows nastavení)
- [ ] Mobilní zobrazení (reálný telefon, ne jen DevTools)

---

*Generováno agentem · Issue #6 · griluju-design-content-guide-v6*
