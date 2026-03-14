#!/usr/bin/env bash
# fix-exif.sh — Strips AI-generated metadata and replaces with realistic EXIF.
#
# Usage:
#   bash scripts/fix-exif.sh                          # process all jpg/jpeg/webp in public/images/
#   bash scripts/fix-exif.sh public/images/foo.jpg    # process specific file(s)
#
# Requirements: exiftool (brew install exiftool)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# GPS locations — Czech Republic, outdoor grilling spots
declare -a LATS=(
  50.0755 50.0850 50.0600 50.1200 50.0400
  49.8175 49.8400 49.8700 49.1951 49.2200
  50.2100 50.1800 50.3000 50.2500 49.5000
  49.4500 48.9700 50.6800 50.7500 49.7400
)
declare -a LONS=(
  14.4378 14.4100 14.3200 14.5100 14.4800
  18.2700 18.2100 18.3500 16.6068 16.5800
  15.8300 16.0200 15.7800 15.9500 17.8000
  17.6500 14.4700 15.7700 15.7200 13.3700
)

MAKES=("SONY" "SONY" "SONY" "Nikon" "Canon")
MODELS=("ILCE-6600" "ILCE-6600" "ILCE-6400" "Z fc" "EOS M50 Mark II")
LENS_MODELS=(
  "E 16-55mm F2.8 G"
  "E 55-210mm F4.5-6.3"
  "E 18-135mm F3.5-5.6"
  "NIKKOR Z DX 16-50mm f/3.5-6.3 VR"
  "EF-M 15-45mm f/3.5-6.3 IS STM"
)

# Weekend grilling dates — summer/autumn
DATES=(
  "2024:05:18" "2024:05:25" "2024:06:01" "2024:06:08" "2024:06:15"
  "2024:06:22" "2024:06:29" "2024:07:06" "2024:07:13" "2024:07:20"
  "2024:07:27" "2024:08:03" "2024:08:10" "2024:08:17" "2024:08:24"
  "2024:08:31" "2024:09:07" "2024:09:14" "2024:09:21" "2024:09:28"
)
# Afternoon/evening — typical grilling time
TIMES=(
  "14:23:11" "15:47:32" "16:12:08" "13:38:51" "17:02:44"
  "14:55:27" "16:31:19" "15:44:53" "13:21:06" "17:08:34"
  "14:51:17" "16:04:28" "15:47:35" "13:33:21" "17:18:46"
  "14:22:08" "16:15:53" "15:44:19" "13:07:32" "17:51:24"
)

# Collect files to process
if [ "$#" -gt 0 ]; then
  FILES=("$@")
else
  mapfile -t FILES < <(find "$PROJECT_ROOT/public/images" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.webp" \) | sort)
fi

TOTAL=${#FILES[@]}

if [ "$TOTAL" -eq 0 ]; then
  echo "No files to process."
  exit 0
fi

if ! command -v exiftool &>/dev/null; then
  echo "Error: exiftool not found. Install with: brew install exiftool"
  exit 1
fi

echo "Processing ${TOTAL} file(s)..."
echo ""

i=0
for f in "${FILES[@]}"; do
  idx=$((i % 20))
  cam_idx=$((i % 5))

  DATETIME="${DATES[$idx]} ${TIMES[$idx]}"
  FILENAME=$(basename "$f")

  echo "[$((i+1))/${TOTAL}] $FILENAME → ${MAKES[$cam_idx]} ${MODELS[$cam_idx]} | ${DATES[$idx]} | GPS ${LATS[$idx]},${LONS[$idx]}"

  exiftool \
    -overwrite_original \
    -all= \
    -Make="${MAKES[$cam_idx]}" \
    -Model="${MODELS[$cam_idx]}" \
    -LensModel="${LENS_MODELS[$cam_idx]}" \
    -DateTimeOriginal="${DATETIME}" \
    -CreateDate="${DATETIME}" \
    -ModifyDate="${DATETIME}" \
    -GPSLatitude="${LATS[$idx]}" \
    -GPSLatitudeRef=N \
    -GPSLongitude="${LONS[$idx]}" \
    -GPSLongitudeRef=E \
    -GPSAltitude=240 \
    -GPSAltitudeRef=0 \
    -ExposureTime="1/160" \
    -FNumber=5.6 \
    -ISO=400 \
    -FocalLength=35 \
    -Software="" \
    "$f" 2>/dev/null

  i=$((i+1))
done

echo ""
echo "Done — ${TOTAL} file(s) processed."
