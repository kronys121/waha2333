@echo off
rem Join the 8 parts into one video. Needs ffmpeg in PATH. Double-click or run from this folder.
rem If mix.m4a (voice + music + effects) is found (here or in ..\audio) the sound is taken from it, otherwise from the parts.
cd /d "%~dp0"
set AUDIO=
if exist "..\audio\mix.m4a" set AUDIO=..\audio\mix.m4a
if exist "mix.m4a" set AUDIO=mix.m4a
if defined AUDIO goto withaudio
ffmpeg -y -f concat -safe 0 -i parts.txt -c copy -movflags +faststart guard_full.mp4
goto done
:withaudio
ffmpeg -y -f concat -safe 0 -i parts.txt -i "%AUDIO%" -filter_complex "[1:a]apad[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart guard_full.mp4
:done
pause
