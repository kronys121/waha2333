@echo off
rem Join the 8 parts into one video. Needs ffmpeg in PATH. Double-click or run from this folder.
cd /d "%~dp0"
ffmpeg -y -f concat -safe 0 -i parts.txt -i ..\audio\narration.mp3 -filter_complex "[1:a]apad[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart kosmodesant_full.mp4
pause
