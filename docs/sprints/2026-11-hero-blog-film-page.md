# Hero slides, featured blog article and film player cover (2026-11-22)

Follow-up to the home hero slider: the hero gets real slides, the Blog page a featured article, and the film page a click-to-play cover.

## Shipped

- **Home hero** (aac7829): two featured slides, the blog's lead article and the latest film (first in `movies.json`), each with a main button ("Read", "Discover") and a quieter one ("All articles", "All films"). The film slide shows director and year under the title and the first paragraph of the synopsis in the page's language. The slider advances every 10 s, holding while hovered, touched or focused, and is off with reduced motion. The club slide keeps only the description; the mission is gone from it. The credits strip (1964 · Hammam-Lif · Tunisia · FTCA · 60+ years) is back under the hero.
- **Blog** (bdc4c3f): `featured: true` on an article makes it the Blog page's lead and the hero's article slide (`getFeaturedArticle`, falling back to the first); Ghassen's article is featured. Arabic articles mark their title and excerpt with `lang` and `dir="auto"` on cards, the article heading and the hero slide, so they read right to left.
- **Film page** (b87b5ec): the YouTube player sits behind a cover (`VideoEmbed`: blurred poster, wheat play button) and loads only on click, from youtube-nocookie.com, autoplaying with the page's language, subtitles on and related videos kept to the channel. Films without a visible player show a "Where to watch" card pointing to the club's screenings and social links.
- **Contact map pin** (16a060f): now a green teardrop with a wheat centre (colours swapped).
- **Portrait** (ed55667): Wadii Klaii's new portrait, 1000×1000, 2.5 MB down to 99 KB.

## Decisions

- **Auto-advance added after all** (10 s), reversing the previous sprint's "no auto-advance". It pauses on hover, touch and focus and respects reduced motion. Why it was reversed isn't recorded; presumably because the club slide is now shorter.
- **Featured slides resolve themselves:** `{ kind: 'article' }` and `{ kind: 'film' }` without an id follow the blog's `featured` flag and the catalog's first film, so the hero stays current without editing `FEATURED`.
- **The player loads only on click, through youtube-nocookie**, so no YouTube cookies or scripts load on a page view.
- Why the mission left the club slide and the credits strip came back: not recorded.

## Left over

- "Latest film" is simply the first entry in `movies.json`, not sorted by year; keep the newest film first there.
- The hero quote string is still unused in `home.json` (carried over), along with `films.directedBy`, `events.title`, `events.subtitle`, `events.viewAll`.
- Pale slide images glowing in dark mode: still deferred.
- The "Where to watch" text promises upcoming screenings even when none is scheduled.
