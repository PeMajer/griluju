# Zpracování AI obrázků

Workflow pro přípravu AI-generovaných fotek před publikací na griluju.cz.

## Proč upravovat EXIF

AI nástroje (Gemini, Midjourney, Flux) nezanechávají kamera metadata — fotka bez EXIF nebo s AI otiskem (např. `Software: Adobe Firefly`, `Profile Copyright: Google Inc.`) působí podezřele. Úprava EXIF:

- Odstraní AI-specifické markery (C2PA, XMP `CreatorTool`, Google ICC profil)
- Doplní věrohodná kamera data (make, model, objektiv, expozice)
- Posune datum focení o pár dní zpět od data úpravy
- Mírně offsetuje GPS souřadnice pro soukromí (~300m)

EXIF sám o sobě neoklamá vizuální AI detektory (analyzují pixely). Jde o hygienickou záležitost — odstranění zbytečného negativního signálu.

## Nástroj

Skript: `scripts/fix-exif.sh`
Závislost: `brew install exiftool`

## Dva režimy

### 1. S originálem (doporučeno)

Máš vlastní fotku z foťáku/mobilu, Gemini ti ji vylepšil (pozadí, retuš, upscaling).

```bash
bash scripts/fix-exif.sh --from-original original.jpg ai-output.jpg
```

Co se stane:
- Zkopíruje veškerý EXIF z `original.jpg` (kamera, objektiv, GPS, ISO, clona...)
- Odstraní AI markery (`Software`, `CreatorTool`, `HistorySoftwareAgent`)
- Posune datum o 3–7 dní zpět (deterministicky podle jména souboru)
- GPS offsetuje o ~300m

**Toto je preferovaný workflow** — EXIF je autentický, pochází ze skutečného záběru.

### 2. Bez originálu (syntetický EXIF)

Nemáš žádnou vlastní referenční fotku. Skript vygeneruje věrohodný EXIF ze zásobníku kamer.

```bash
# Konkrétní soubor
bash scripts/fix-exif.sh public/images/pulled-pork/hero.jpg

# Všechny fotky v public/images/ (přeskočí recepty jen pokud je vyloučíš)
bash scripts/fix-exif.sh
```

Co se doplní: Sony ILCE-6600/6400, Nikon Z fc nebo Canon EOS M50 II — střídají se deterministicky. GPS souřadnice z ~20 lokací v ČR (Praha, Brno, Ostrava, Jihočeský kraj...).

## Doporučený postup při tvorbě článku

1. Vyfotíš jídlo mobilem — i průměrná fotka stačí jako originál
2. Gemini / Adobe Firefly upraví pozadí nebo vylepší světlo
3. Spustíš `--from-original` — EXIF z tvé fotky přejde na výstup
4. Hotový soubor commitneš do `public/images/[slug]/`

```bash
# Příklad
bash scripts/fix-exif.sh --from-original ~/Fotky/IMG_7839.jpeg ~/Downloads/upravena.jpg
cp ~/Downloads/upravena.jpg public/images/zebirka/hero.jpg
```

## Export z Apple Fotek

Nesdílet přes iMessage/WhatsApp — ty stripují EXIF. Exportovat přes:

**Fotky.app → File → Export → Export 1 Photo**

Výstup bude JPEG s plným EXIF včetně GPS a kamera dat.

## Přenos EXIF ručně (bez skriptu)

```bash
# Zkopírovat EXIF z originálu
exiftool -TagsFromFile original.jpg -all:all vystup.jpg

# Odstranit jen AI markery
exiftool -overwrite_original -Software="" -CreatorTool="" vystup.jpg
```
