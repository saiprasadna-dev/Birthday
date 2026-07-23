# 🎂 Happy Birthday — for my Wife 💗

A dreamy, interactive birthday microsite built with **plain HTML, CSS & JavaScript** — no build step, no frameworks, no dependencies. Just open it in a browser or deploy it free to GitHub Pages.

A soft **pink + lavender** playful theme with bubbly *Fredoka* headings and flowing *Dancing Script* accents.
It plays **one page at a time** — each button opens the next page — and the mouse pointer is a little **heart** 💗.

## ✨ What's inside
- 🎁 An opening **gift** that unwraps into the experience
- 📖 **Page-by-page** flow (back button + progress dots to move around)
- 🎉 A **confetti** engine and floating hearts/petals/sparkles (custom-built, no libraries)
- ⌨️ **Typewriter** greeting + a **cake you can blow out** to make a wish (click it!)
- 💖 A **wishes** section that reveals one heartfelt card at a time
- 🖼️ A **memories gallery** with 3D tilt cards + lightbox (styled placeholders until you add photos)
- 💌 A **thank-you finale** — and the final button unveils…
- ⏳ …a live **countdown** to her next birthday + a "days together" counter
- 🎵 A **background-music** toggle
- ♿ Respects `prefers-reduced-motion`, keyboard-accessible, responsive down to 375px

## 🛠️ Make it yours — edit ONE file
Open **`js/config.js`** and change the values at the top:
- `herName`, `yourName`
- `birthday` and `togetherSince` dates (format `YYYY-MM-DD`)
- the `wishes` list, the `memories` list, and the `finaleBody` letter

That's the only file you need to touch. 💕

## 🖼️ Adding real photos
1. Drop your images into the **`assets/`** folder named `photo1.jpg`, `photo2.jpg`, `photo3.jpg`.
2. They're already wired up in `js/config.js` — each memory's `img` points to one:
   ```js
   { img: "assets/photo1.jpg", title: "Where It All Began", caption: "..." },
   ```
Leave `img: ""` (or if a file is missing) to keep the pretty gradient placeholder.
Portrait images (4:5) fit the cards best.

## 🎵 Adding music
Put an `.mp3` in `assets/` (e.g. `assets/music.mp3`) — it's already wired up.
Change the filename in `config.js` via `musicFile` if needed. Browsers block
auto-play until the first click, so music starts when the gift is opened
(or via the note button, top-right). *Use a song you have the rights to.*

## 🚀 Run it locally
Just open `index.html` in your browser. (For the music/fonts to load reliably,
serving it is nicer: `python -m http.server` then visit `http://localhost:8000`.)

## 🌍 Deploy free on GitHub Pages
1. Commit & push this repo.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` / `root`.
3. Your site goes live at `https://<username>.github.io/Birthday/`.

Made with love. 💗
