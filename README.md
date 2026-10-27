<div align="center">

# 🎸 Concerts Archieve

**Личный архив концертов: каждое шоу, город и площадка с 2011 года.**

[![CI](https://github.com/iamlykke/my-blog/actions/workflows/ci.yml/badge.svg)](https://github.com/iamlykke/my-blog/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-map-199900?logo=leaflet&logoColor=white)

</div>

---

## ✨ Возможности

- 📅 **Хронология концертов.** Предстоящие шоу идут отдельным блоком, прошедшие сгруппированы по годам.
- 🎶 **Сет-листы и заметки.** Сет-лист и энкор раскрываются прямо в строке концерта, к любому шоу можно добавить личную заметку.
- 🗺️ **Карта.** Все города, где были концерты, на интерактивной карте Leaflet (страница `/map`).
- 🎧 **Now Playing.** Текущий трек и последние прослушивания из Last.fm.
- 🧱 **Swiss-стиль.** Минималистичная типографика и строгая сетка.

## 🛠 Стек

| Слой       | Технологии                                       |
| ---------- | ------------------------------------------------ |
| Фреймворк  | Next.js 16 (App Router), React 19, TypeScript    |
| Стили      | Tailwind CSS 4, daisyUI                          |
| Карта      | Leaflet + react-leaflet                          |
| Анимации   | Motion                                           |
| Данные     | JSON + TypeScript-модули, Last.fm API            |
| Аналитика  | Vercel Analytics                                 |

## 🚀 Быстрый старт

Нужен Node.js 20 или новее.

```bash
git clone https://github.com/iamlykke/my-blog.git
cd my-blog
npm install
```

Создайте `.env.local` для виджета Last.fm:

```env
LASTFM_USERNAME=your_lastfm_username
LASTFM_API_KEY=your_lastfm_api_key
```

> API-ключ можно получить на [last.fm/api](https://www.last.fm/api/account/create).

Запустите dev-сервер и откройте [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

### Скрипты

| Команда         | Что делает                       |
| --------------- | -------------------------------- |
| `npm run dev`   | Dev-сервер с hot reload          |
| `npm run build` | Продакшен-сборка                 |
| `npm run start` | Запуск собранного приложения     |
| `npm run lint`  | Проверка кода ESLint             |

## 📝 Как добавить концерт

**1. Запись в [`content/concerts.json`](content/concerts.json):**

```json
{ "date": "17.09.2023", "artist": "Blink-182, The Story So Far", "location": "London, UK", "venue": "The O2" }
```

- `date` в формате `DD.MM.YYYY`. Концерт с датой в будущем автоматически попадёт в «Upcoming».
- `venue` и `setlistUrl` необязательны.

**2. Новый город на карте.** Если города ещё нет, добавьте его координаты в [`lib/cityCoords.ts`](lib/cityCoords.ts):

```ts
"London": [51.5074, -0.1278],
```

**3. Сет-лист или заметка (по желанию)** в [`lib/setlists.ts`](lib/setlists.ts). Ключ имеет вид `"DD.MM.YYYY|Артист"` и должен посимвольно совпадать с записью в `concerts.json`:

```ts
"17.09.2023|Blink-182, The Story So Far": {
  songs: ["Elevator", "All the Small Things"],
  encore: ["Dammit"],
  note: "Стояли в первых рядах.",
},
```

Подробная инструкция есть в комментарии в начале файла.

## 📁 Структура

```
├── app/
│   ├── page.tsx            # Главная: архив концертов
│   ├── map/page.tsx        # Карта концертов
│   └── api/lastfm/         # Прокси к Last.fm API
├── components/             # UI-компоненты
├── content/concerts.json   # Данные о концертах
├── lib/
│   ├── concerts.ts         # Сортировка и группировка
│   ├── cityCoords.ts       # Координаты городов
│   └── setlists.ts         # Сет-листы и заметки
├── types/                  # TypeScript-типы
└── public/images/          # Фото с концертов
```

## ☁️ Деплой

Проект рассчитан на [Vercel](https://vercel.com). Импортируйте репозиторий и добавьте `LASTFM_USERNAME` и `LASTFM_API_KEY` в переменные окружения проекта.

GitHub Actions запускает lint и сборку на каждый push и pull request в `master`.

---

<div align="center">
<sub>Сделано с 🤘 Сергеем Усачёвым</sub>
</div>
