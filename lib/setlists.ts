/**
 * SETLISTS & NOTES
 * ================
 * Здесь хранятся inline-сет-листы и заметки к концертам.
 *
 * Есть два независимых хранилища:
 *   CONCERT_SETLISTS — полный сет-лист (треки + энкор + опциональная заметка)
 *   CONCERT_NOTES    — просто текстовая заметка без сет-листа
 *
 * Ключ в обоих случаях — строка "DD.MM.YYYY|Артист" (точно как в concerts.json).
 *
 * ─────────────────────────────────────────────────────────────
 * КАК ДОБАВИТЬ СЕТ-ЛИСТ
 * ─────────────────────────────────────────────────────────────
 * Добавь запись в CONCERT_SETLISTS:
 *
 *   "17.09.2023|Blink-182, The Story So Far": {
 *     songs: [
 *       "Elevator",
 *       "All the Small Things",
 *       "What's My Age Again?",
 *     ],
 *     encore: [
 *       "Dammit",
 *     ],
 *     note: "Пришли за час до открытия, стояли в первых рядах.",  // необязательно
 *   },
 *
 * Правила:
 *   - songs   — треки основной части, по порядку
 *   - encore  — треки энкора (пустой массив [] если энкора не было)
 *   - note    — личная заметка, показывается рядом с сет-листом (необязательно)
 *   - ключ должен совпадать с полями date и artist из concerts.json до символа
 *
 * Результат: в строке концерта появляется кнопка "Setlist ▾",
 * по клику разворачивается сет-лист прямо на странице.
 *
 * ─────────────────────────────────────────────────────────────
 * КАК ДОБАВИТЬ ЗАМЕТКУ БЕЗ СЕТ-ЛИСТА
 * ─────────────────────────────────────────────────────────────
 * Добавь запись в CONCERT_NOTES:
 *
 *   "22.08.2024|Coldplay": "Стадион в браслетах — 50 тысяч человек.",
 *
 * Заметка без сет-листа НЕ добавляет кнопку в строку концерта —
 * она отображается только если концерт уже раскрыт через inline сет-лист.
 * Используй её как дополнение к CONCERT_SETLISTS, если хочешь разделить
 * данные и текст.
 *
 * ─────────────────────────────────────────────────────────────
 * КАК ДОБАВИТЬ ССЫЛКУ НА SETLIST.FM
 * ─────────────────────────────────────────────────────────────
 * Если inline сет-листа нет, но есть ссылка — добавь поле setlistUrl
 * прямо в concerts.json:
 *
 *   {
 *     "date": "17.09.2023",
 *     "artist": "Blink-182, The Story So Far",
 *     "location": "Hamburg, Germany",
 *     "venue": "Barclays Arena",
 *     "setlistUrl": "https://www.setlist.fm/setlist/blink-182/2023/..."
 *   }
 *
 * Результат: кнопка "Setlist.fm ↗" в строке концерта.
 * Если ни inline сет-листа, ни setlistUrl нет — кнопки не будет вообще.
 *
 * ─────────────────────────────────────────────────────────────
 * ПРИОРИТЕТ
 * ─────────────────────────────────────────────────────────────
 *   1. Inline сет-лист (CONCERT_SETLISTS) — разворачивается на месте
 *   2. Ссылка (setlistUrl в concerts.json) — открывается во вкладке
 *   3. Ничего — кнопки нет
 */

export interface Setlist {
  songs: string[];
  encore: string[];
  note?: string;
}

// Keyed by "DD.MM.YYYY|Artist"
export const CONCERT_SETLISTS: Record<string, Setlist> = {
  "17.11.2025|Radiohead": {
    songs: [
      "Let Down", "Bloom", "2+2=5", "Morning Bell",
      "Kid A", "The National Anthem", "Weird Fishes/Arpeggi",
      "Everything in Its Right Place", "Idioteque", "Reckoner",
      "How to Disappear Completely", "There, There",
      "Pyramid Song", "All I Need", "Lucky"
    ],
    encore: ["No Surprises", "Karma Police", "Street Spirit (Fade Out)"],
    note: "Двухчасовой сет, почти без остановок между песнями. Том в ударе."
  },
  "14.08.2026|Bring Me the Horizon": {
    songs: [
      "DArkSide", "MANTRA", "Parasite Eve", "Throne",
      "sTraNgeRs", "Can You Feel My Heart"
    ],
    encore: [],
    note: "Sziget headline — ждём."
  },
  "11.08.2025|HANABIE., Within Destruction": {
    songs: [
      "Otaku Lovely Densetsu", "Be The GAL", "Pardon Me, I Have to Go Now",
      "Nijigen Komplex", "Tocansuki"
    ],
    encore: ["We Love Sweets"],
    note: "Первый раз видел Hanabie — невероятная энергия, фото не передают."
  }
};

// Keyed by "DD.MM.YYYY|Artist"
export const CONCERT_NOTES: Record<string, string> = {
  "17.11.2025|Radiohead":
    "Пришли за час, успели сходить за вином в фойе. Акустика Unipol Arena оказалась лучше чем ожидали. Свет — минимальный, красные лучи через дым.",
  "22.08.2024|Coldplay":
    "Стадион в браслетах — кажется, это никогда не перестанет работать. Спели 'Viva la Vida' — все 50 тысяч.",
  "16.08.2026|Deftones":
    "METAstadt — старый трамвайный депо, крыша открытая. Билеты достались чудом."
};

export function getSetlist(date: string, artist: string): Setlist | undefined {
  return CONCERT_SETLISTS[`${date}|${artist}`];
}

export function getNote(date: string, artist: string): string | undefined {
  return CONCERT_NOTES[`${date}|${artist}`];
}
