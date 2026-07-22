/* =====================================================================
   💗  EDIT EVERYTHING HERE  💗
   This is the ONLY file you need to change to personalize the site.
   Replace the placeholder text, dates, reasons and photos below.
   ===================================================================== */

window.BIRTHDAY_CONFIG = {

  /* --- The basics ------------------------------------------------- */
  herName: "Bujjamma",         // 👈 your wife's name
  yourName: "Your Husband",    // 👈 your name (shown in the letter & footer)

  /* --- Dates (YYYY-MM-DD) ----------------------------------------- */
  // Her next birthday — used for the live countdown.
  birthday: "2026-08-15",
  // The day your story began (wedding day / first date). Used for the
  // "days together" counter. Set to "" to hide that counter.
  togetherSince: "2018-02-14",

  /* --- Intro envelope --------------------------------------------- */
  envelopeHint: "A little surprise, just for you",
  envelopeButton: "Open your gift",

  /* --- Hero (first big scene) ------------------------------------- */
  heroTitle: "Happy Birthday",       // "Happy Birthday" — her name is added on the next line
  // The typewriter line under the title:
  heroTypewriter: "Today the whole world celebrates the day you were born — and so do I. 💖",
  heroButton: "Enter our little world",

  /* --- Reasons I love you (shuffle cards) ------------------------- */
  reasonsTitle: "Reasons I Adore You",
  reasonsIntro: "Tap the heart to reveal another — I could keep going forever.",
  reasons: [
    "The way your laugh turns an ordinary day into my favourite memory.",
    "How you make even the smallest moments feel like an adventure.",
    "Your kindness — the quiet, effortless kind that changes people.",
    "The way you believe in me, especially when I forget to.",
    "How coming home to you is the best part of every single day.",
    "Your stubborn, beautiful heart that never gives up on the people it loves.",
    "The little things — your morning sleepiness, your terrible-good jokes, your hand in mine.",
    "That you chose me, and keep choosing me, every day.",
  ],

  /* --- Memories gallery ------------------------------------------- */
  // Each memory becomes a tilt card. To use a REAL photo, set `img` to a
  // path like "assets/photo1.jpg". Leave `img` as "" to show a styled
  // placeholder (each one gets a different gradient automatically).
  memoriesTitle: "Our Favourite Moments",
  memoriesIntro: "A few frames from a story I never want to end.",
  memories: [
    { img: "", date: "The Beginning", caption: "Where two strangers became a whole world." },
    { img: "", date: "That Trip",     caption: "Sandy feet, salty hair, endless laughter." },
    { img: "", date: "Little Sundays", caption: "Coffee, chaos, and absolutely nowhere to be." },
    { img: "", date: "The Big Day",    caption: "I promised forever — and I meant every word." },
    { img: "", date: "Us, Lately",     caption: "Still my favourite person to do nothing with." },
    { img: "", date: "Today",          caption: "Celebrating you, exactly as you are." },
  ],

  /* --- Final letter ----------------------------------------------- */
  letterTitle: "A Little Letter",
  letterBody: [
    "My love, on your birthday I don't just want to wish you joy — I want to thank you.",
    "Thank you for your patience, your warmth, and for turning an ordinary life into ours.",
    "Every candle on your cake is a wish I've already had answered: it was you.",
    "Here's to another year of your laughter, your dreams, and every quiet moment in between.",
  ],
  letterSignoff: "Forever yours,",

  wishButton: "Make a wish",
  wishMessage: "Happy Birthday, my love. 🎂✨",

  /* --- Music ------------------------------------------------------ */
  // Drop an mp3 into the assets folder and put its name here.
  // If the file is missing the button simply stays quiet — nothing breaks.
  musicFile: "assets/music.mp3",
  musicAutoplayHint: true,
};
