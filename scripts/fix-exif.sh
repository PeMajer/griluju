#!/usr/bin/env bash
# fix-exif.sh — Strips AI-generated metadata and replaces with realistic EXIF.
#
# Modes:
#   1. From original photo (recommended):
#      bash scripts/fix-exif.sh --from-original original.jpg ai-output.jpg
#      Copies all EXIF from original, shifts date back by 3-7 days, strips AI software tags.
#      Original is deleted after transfer.
#
#   2. Remove Gemini watermark (crop bottom strip):
#      bash scripts/fix-exif.sh --crop-watermark image.jpg
#      Crops bottom 3% of image where Gemini sparkle watermark appears.
#      Requires: brew install imagemagick
#
#   3. Synthetic EXIF (fallback, no original available):
#      bash scripts/fix-exif.sh public/images/foo.jpg
#      bash scripts/fix-exif.sh                        # all jpg/jpeg/webp in public/images/
#
# Requirements: exiftool (brew install exiftool), imagemagick for --crop-watermark

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

if ! command -v exiftool &>/dev/null; then
  echo "Error: exiftool not found. Install with: brew install exiftool"
  exit 1
fi

# ── Mode: crop Gemini watermark ───────────────────────────────────────────────

if [ "$1" = "--crop-watermark" ]; then
  FILE="$2"

  if [ -z "$FILE" ]; then
    echo "Usage: bash scripts/fix-exif.sh --crop-watermark <image.jpg>"
    exit 1
  fi

  if [ ! -f "$FILE" ]; then
    echo "Error: file not found: $FILE"
    exit 1
  fi

  if ! command -v convert &>/dev/null; then
    echo "Error: ImageMagick not found. Install with: brew install imagemagick"
    exit 1
  fi

  # Crop bottom 3% — removes Gemini sparkle watermark, keeps composition intact
  convert "$FILE" -gravity South -chop 0x3% "$FILE"
  echo "Done — cropped bottom 3% from $(basename "$FILE")"
  exit 0
fi

# ── Mode 1: copy from original, shift date back ──────────────────────────────

if [ "$1" = "--from-original" ]; then
  ORIGINAL="$2"
  TARGET="$3"

  if [ -z "$ORIGINAL" ] || [ -z "$TARGET" ]; then
    echo "Usage: bash scripts/fix-exif.sh --from-original <original.jpg> <ai-output.jpg>"
    exit 1
  fi

  if [ ! -f "$ORIGINAL" ]; then
    echo "Error: original file not found: $ORIGINAL"
    exit 1
  fi

  if [ ! -f "$TARGET" ]; then
    echo "Error: target file not found: $TARGET"
    exit 1
  fi

  # Shift date back by 3-7 days (deterministic based on filename)
  HASH=$(echo "$TARGET" | cksum | awk '{print $1}')
  DAYS_BACK=$(( (HASH % 5) + 3 ))  # 3-7 days

  echo "Original: $ORIGINAL"
  echo "Target:   $TARGET"
  echo "Shifting date back ${DAYS_BACK} days from original..."
  echo ""

  # Copy all EXIF tags from original
  exiftool -overwrite_original -TagsFromFile "$ORIGINAL" -all:all "$TARGET" 2>/dev/null

  # Read GPS from original and offset slightly (100-500m) for privacy
  ORIG_LAT=$(exiftool -GPSLatitude -n -s3 "$ORIGINAL" 2>/dev/null)
  ORIG_LON=$(exiftool -GPSLongitude -n -s3 "$ORIGINAL" 2>/dev/null)

  GPS_ARGS=()
  if [ -n "$ORIG_LAT" ] && [ -n "$ORIG_LON" ]; then
    # Offset ~0.003 degrees (~300m), deterministic based on hash
    LAT_OFFSET=$(echo "$HASH" | awk '{printf "%.4f", ($1 % 7 - 3) * 0.0005}')
    LON_OFFSET=$(echo "$HASH" | awk '{printf "%.4f", (int($1/7) % 7 - 3) * 0.0005}')
    NEW_LAT=$(echo "$ORIG_LAT $LAT_OFFSET" | awk '{printf "%.6f", $1 + $2}')
    NEW_LON=$(echo "$ORIG_LON $LON_OFFSET" | awk '{printf "%.6f", $1 + $2}')
    GPS_ARGS=(-GPSLatitude="$NEW_LAT" -GPSLatitudeRef=N -GPSLongitude="$NEW_LON" -GPSLongitudeRef=E)
    echo "GPS: ${ORIG_LAT},${ORIG_LON} → ${NEW_LAT},${NEW_LON} (offset ~300m)"
  fi

  # Strip AI software markers, shift date back using exiftool built-in arithmetic
  # Format: Y:M:D H:MM:SS — subtract days only
  exiftool -overwrite_original \
    -Software="" \
    -CreatorTool="" \
    -HistorySoftwareAgent="" \
    "-DateTimeOriginal-=0:0:${DAYS_BACK} 0:0:0" \
    "-CreateDate-=0:0:${DAYS_BACK} 0:0:0" \
    "-ModifyDate-=0:0:${DAYS_BACK} 0:0:0" \
    "${GPS_ARGS[@]}" \
    "$TARGET" 2>/dev/null

  # Delete original — EXIF was transferred, original no longer needed
  rm "$ORIGINAL"
  echo "Done — EXIF copied from original, date shifted back ${DAYS_BACK} days. Original deleted."
  exit 0
fi

# ── Mode 2: synthetic EXIF (no original) ─────────────────────────────────────

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

echo "Processing ${TOTAL} file(s) with synthetic EXIF..."
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
