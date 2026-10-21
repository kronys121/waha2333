@echo off
rem Join the 8 parts into one video. Needs ffmpeg in PATH. Double-click or run from this folder.
rem If narration.mp3 is found (here or in ..\audio) the sound is taken from it, otherwise from the parts.
cd /d "%~dp0"
set AUDIO=
if exist "..\audio\narration.mp3" set AUDIO=..\audio\narration.mp3
if exist "narration.mp3" set AUDIO=narration.mp3
if defined AUDIO goto withaudio
ffmpeg -y -f concat -safe 0 -i parts.txt -c copy -movflags +faststart emperor_full.mp4
goto done
:withaudio
ffmpeg -y -f concat -safe 0 -i parts.txt -i "%AUDIO%" -filter_complex "[1:a]apad[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart emperor_full.mp4
:done
pause
