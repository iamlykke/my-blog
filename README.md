<div align="center">

# 🎸 Concerts Archieve

**A personal archive of every concert I've been to since 2011: artists, cities and venues.**

[![CI](https://github.com/iamlykke/my-blog/actions/workflows/ci.yml/badge.svg)](https://github.com/iamlykke/my-blog/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-map-199900?logo=leaflet&logoColor=white)

</div>

---

## ✨ Features

- 📅 **Concert timeline.** Upcoming shows are listed separately; past shows are grouped by year.
- 🎶 **Setlists and notes.** Setlists and encores expand right inside the concert row, and any show can carry a personal note or a link to an external setlist.
- 🗺️ **Map.** Every city with a concert on an interactive Leaflet map at `/map`.
- 🧱 **Swiss style.** Minimal typography on a strict grid.

## 🛠 Tech stack

| Layer     | Technologies                                  |
| --------- | --------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling   | Tailwind CSS 4, daisyUI                       |
| Map       | Leaflet + react-leaflet                       |
| Data      | JSON and TypeScript modules, no database      |
| Analytics | Vercel Analytics                              |

## 🚀 Getting started

Requires Node.js 20 or newer.

```bash
git clone https://github.com/iamlykke/my-blog.git
cd my-blog
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). No environment variables are needed.

### Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server with hot reload |
| `npm run build` | Build for production             |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

## 📝 Adding a concert

**1. Add an entry to [`content/concerts.json`](content/concerts.json):**

```json
{ "date": "17.09.2023", "artist": "Blink-182, The Story So Far", "location": "London, UK", "venue": "The O2" }
```

- `date` uses the `DD.MM.YYYY` format. A future date puts the show under "Upcoming" automatically.
- `venue` and `setlistUrl` are optional.

**2. New city on the map.** If the city isn't listed yet, add its coordinates to [`lib/cityCoords.ts`](lib/cityCoords.ts):

```ts
"London": [51.5074, -0.1278],
```

**3. Setlist or note (optional)** in [`lib/setlists.ts`](lib/setlists.ts). The key is `"DD.MM.YYYY|Artist"` and must match the `date` and `artist` fields in `concerts.json` exactly:

```ts
"17.09.2023|Blink-182, The Story So Far": {
  songs: ["Elevator", "All the Small Things"],
  encore: ["Dammit"],
  note: "Front row the whole night.",
},
```

The comment at the top of that file has full instructions.

## 📁 Project structure

```
├── app/
│   ├── page.tsx            # Home: the concert archive
│   └── map/page.tsx        # Concert map
├── components/             # UI components
├── content/concerts.json   # Concert data
├── lib/
│   ├── concerts.ts         # Sorting and grouping
│   ├── cityCoords.ts       # City coordinates
│   └── setlists.ts         # Setlists and notes
├── types/                  # TypeScript types
└── public/images/          # Concert photos
```

## ☁️ Deployment

The site is built for [Vercel](https://vercel.com): import the repository and deploy, no extra configuration is required.

GitHub Actions runs lint and a production build on every push and pull request to `master`.

---

<div align="center">
<sub>Made with 🤘</sub>
</div>
