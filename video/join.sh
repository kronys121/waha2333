#!/bin/sh
# Join the 8 parts into one video. Needs ffmpeg. Run from this folder: sh join.sh
# Video streams are copied as-is; the sound is taken from the full narration so there are no gaps at the joins.
cd "$(dirname "$0")"
ffmpeg -y -f concat -safe 0 -i parts.txt -i ../audio/narration.mp3 \
  -filter_complex "[1:a]apad[a]" -map 0:v -map "[a]" \
  -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart \
  kosmodesant_full.mp4
