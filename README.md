# 🎂 Happy Birthday — for my Wife 💗

A dreamy, interactive birthday microsite built with **plain HTML, CSS & JavaScript** — no build step, no frameworks, no dependencies. Just open it in a browser or deploy it free to GitHub Pages.

## ✨ What's inside
- 💌 An opening **envelope** that unseals into the experience
- 🎉 A **confetti** engine and floating hearts/petals (custom-built, no libraries)
- ⌨️ **Typewriter** greeting + animated *Great Vibes* script headings
- 🎂 A **cake you can blow out** (click it!)
- ⏳ A live **countdown** to her next birthday + a "days together" counter
- 💖 A **"Reasons I adore you"** shuffle card
- 🖼️ A **memories gallery** with 3D tilt cards + lightbox (styled placeholders until you add photos)
- 💫 A heartfelt **letter** and a **"Make a wish"** finale
- 🎵 A **background-music** toggle
- ♿ Respects `prefers-reduced-motion`, keyboard-accessible, responsive down to 375px

## 🛠️ Make it yours — edit ONE file
Open **`js/config.js`** and change the values at the top:
- `herName`, `yourName`
- `birthday` and `togetherSince` dates (format `YYYY-MM-DD`)
- the `reasons` list, the `memories` list, and the `letterBody`

That's the only file you need to touch. 💕

## 🖼️ Adding real photos
1. Drop your images into the **`assets/`** folder (e.g. `assets/photo1.jpg`).
2. In `js/config.js`, set each memory's `img` to its path, e.g.
   ```js
   { img: "assets/photo1.jpg", date: "The Beginning", caption: "..." },
   ```
Leave `img: ""` to keep the pretty gradient placeholder.

## 🎵 Adding music
Put an `.mp3` in `assets/` (e.g. `assets/music.mp3`) — it's already wired up.
Change the filename in `config.js` via `musicFile` if needed. Browsers block
auto-play until the first click, so music starts when the envelope is opened
(or via the note button, top-right). *Use a song you have the rights to.*

## 🚀 Run it locally
Just open `index.html` in your browser. (For the music/fonts to load reliably,
serving it is nicer: `python -m http.server` then visit `http://localhost:8000`.)

## 🌍 Deploy free on GitHub Pages
1. Commit & push this repo.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` / `root`.
3. Your site goes live at `https://<username>.github.io/Birthday/`.

Made with love. 💗
