#!/bin/sh
# Join the 8 parts into one video. Needs ffmpeg. Run: sh join.sh
# If narration.mp3 is found (here or in ../audio) the sound is taken from it, otherwise from the parts.
cd "$(dirname "$0")"
AUDIO=""
[ -f ../audio/narration.mp3 ] && AUDIO=../audio/narration.mp3
[ -f narration.mp3 ] && AUDIO=narration.mp3
if [ -n "$AUDIO" ]; then
  ffmpeg -y -f concat -safe 0 -i parts.txt -i "$AUDIO" \
    -filter_complex "[1:a]apad[a]" -map 0:v -map "[a]" \
    -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart kosmodesant_full.mp4
else
  ffmpeg -y -f concat -safe 0 -i parts.txt -c copy -movflags +faststart kosmodesant_full.mp4
fi
