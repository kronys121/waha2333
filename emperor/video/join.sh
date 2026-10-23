#!/bin/sh
# Join the 8 parts into one video. Needs ffmpeg. Run: sh join.sh
# If mix.m4a (voice + music + effects) is found (here or in ../audio) the sound is taken from it, otherwise from the parts.
cd "$(dirname "$0")"
AUDIO=""
[ -f ../audio/mix.m4a ] && AUDIO=../audio/mix.m4a
[ -f mix.m4a ] && AUDIO=mix.m4a
if [ -n "$AUDIO" ]; then
  ffmpeg -y -f concat -safe 0 -i parts.txt -i "$AUDIO" \
    -filter_complex "[1:a]apad[a]" -map 0:v -map "[a]" \
    -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart emperor_full.mp4
else
  ffmpeg -y -f concat -safe 0 -i parts.txt -c copy -movflags +faststart emperor_full.mp4
fi
