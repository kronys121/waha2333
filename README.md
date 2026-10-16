# POV: Твоя жизнь на каждом уровне Космодесанта

Мульт-анимация кодом (Canvas 2D в Chromium), 1920x1080, 30 fps, без субтитров.
Озвучка: `audio/narration.mp3`, тайминги фраз: `audio/timestamps.json` (выгрузка в `audio/cues.tsv`).

## Готовое видео

`video/part01.mp4` ... `video/part08.mp4`, по одной части на уровень, у каждой свой кусок озвучки.
Собрать в один файл (нужен ffmpeg):

- Windows: двойной клик по `video/join.bat`
- Linux/macOS: `sh video/join.sh`

Результат: `video/kosmodesant_full.mp4` (около 15:17).

## Сборка из исходников

```
npm install
node scripts/render.mjs --jobs 3       # все части в video/
node scripts/render.mjs 4              # перерендерить только часть 4
node scripts/preview.mjs 120 300 --sheet   # отдельные кадры в out/preview/
```

Предпросмотр в браузере: статический сервер из корня репозитория, страница `src/video/index.html?t=123.4`.

## Устройство

- `src/video/core.js` движок: таймлайн шотов, камера, анимационные хелперы, плашки, пузыри, штампы, карточки уровней
- `src/video/chars.js` персонажи-риги: космодесантник, терминатор, люди, тиранид, орк, некрон, дредноут, Коул, Мортарион
- `src/video/world.js` фоны и реквизит
- `src/video/shots1.js` ... `shots8.js` монтаж по уровням, шоты привязаны к номерам фраз из `audio/cues.tsv`
- `src/video/cues.js` время начала каждой фразы
- `script/narration.md` текст озвучки
- `style/` пробные кадры стилей
