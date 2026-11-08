# Tamil Nadu Cycling Association — website

Static website for the Tamil Nadu Cycling Association (TNCA), the state governing body for road, track, mountain bike and para cycling in Tamil Nadu.

## Structure

- `index.html` — home page
- `about.html`, `disciplines.html`, `events.html`, `news.html`, `gallery.html`, `membership.html`, `contact.html`
- `css/style.css` — the single stylesheet (design tokens at the top under `:root`)
- `js/main.js` — menu, countdown, event filters, discipline hover list, gallery lightbox, contact form
- `images/` — photos and logos

No build step. Open `index.html` in a browser or serve the folder with any static host.

## Editing content

- **Next event and countdown:** the `next-card` block in `index.html` and the `timing` block in `events.html`; change the `data-date` attribute on `#countdown`.
- **Calendar:** the `startlist` lists in `index.html` and `events.html`; each row carries a `data-cat` of `road`, `track`, `mtb` or `open` for the filters.
- **News:** the `story-lead` and `story-list` blocks in `index.html` and `news.html`.
- **Gallery:** add photos to `images/gallery/` and a matching `<button>` in the `gallery-grid`.
- **Statistics:** the `hero-stats` and `stats` blocks; `data-count` drives the count-up animation.
