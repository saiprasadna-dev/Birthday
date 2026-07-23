/* =====================================================================
   💗  EDIT EVERYTHING HERE  💗
   This is the ONLY file you need to change to personalize the site.
   Replace the names, dates, wishes, memories and letter below.
   ===================================================================== */

window.BIRTHDAY_CONFIG = {

  /* --- The basics ------------------------------------------------- */
  herName: "Bujjamma",          // 👈 your wife's name (shown big in the title)
  yourName: "Your Husband",     // 👈 your name (shown in the finale & footer)

  /* --- Dates (YYYY-MM-DD) ----------------------------------------- */
  birthday: "2026-08-15",       // her next birthday — used for the final countdown
  togetherSince: "2018-02-14",  // when your story began — "days together" counter ("" to hide)

  /* --- Intro (the little gift you open) --------------------------- */
  introHint: "A little surprise, wrapped just for you",
  introButton: "Open your gift 🎁",

  /* --- Hero (the big bubbly title) -------------------------------- */
  heroTitle: "Happy Birthday",  // her name is added right after, big and pink
  heroTypewriter: "Today the whole world celebrates the day you were born — and no one celebrates it louder than me. 💖",
  cakeHint: "psst… tap the cake and make a wish 🎂",
  cakeWish: "I already made mine — it was you. 💫",
  heroButton: "My wishes for you 💌",   // takes her to the next page

  /* --- Wishes (revealed one card at a time) ----------------------- */
  wishesIntro: "A few little wishes, straight from my heart to yours…",
  wishes: [
    { lead: "🌸", text: "May your day be as soft, warm and lovely as the way you make me feel every single morning.", tail: "💗" },
    { lead: "✨", text: "I wish you a year full of laughter, tiny adventures, and every dream you whisper to yourself at night.", tail: "🌟" },
    { lead: "💕", text: "May you always feel how deeply you're loved — not just today, but in every ordinary, wonderful day with you.", tail: "🌷" },
    { lead: "🥳", text: "Stay exactly the incredible woman you are — the heart of our little world. Happiest birthday, my love.", tail: "💖" },
  ],
  revealButton: "Click here… 💕",
  revealAgainButton: "One more… 💕",
  storylaneButton: "Enter our storylane 🌀",   // opens the memories page
  memoriesButton: "Read my little letter 💌",  // opens the finale page

  /* --- Memories gallery ------------------------------------------- */
  // Drop images into the assets/ folder named photo1.jpg, photo2.jpg, …
  // Leave `img` blank ("") to show a pretty gradient placeholder instead.
  memoriesTitle: "Our Beautiful Moments Together",
  memoriesIntro: "Every moment with you has been magical. Let's cherish these precious memories…",
  memories: [
    { img: "assets/photo1.jpg", title: "Where It All Began", caption: "Two hearts, one look, and a story I never want to end. 💗" },
    { img: "assets/photo2.jpg", title: "Just Us", caption: "May our journey ahead stay full of happiness, laughter and endless smiles. 😊💕" },
    { img: "assets/photo3.jpg", title: "My Favourite View", caption: "Keep being the beautiful soul you are — you make every moment brighter. 🌸💖" },
  ],

  /* --- Finale letter ---------------------------------------------- */
  finaleTitle: "Thank You for Every Moment",
  finaleBody: [
    "Every laugh, every quiet night, and every little moment we've shared has been the best part of my life. 🌀",
    "I'm so grateful for you — for your warmth, your patience, and the way you turn an ordinary life into ours.",
    "On your birthday, all I wish is for endless happiness, love and success to always find their way to you. 🌸",
  ],
  finaleClose: "You deserve all the joy in the world — keep shining, my love. ✨",
  finaleButton: "Until we meet again 💝",

  /* --- Countdown (revealed by the very last button) --------------- */
  countdownTitle: "Counting Down to You Again",
  countdownSub: "…until the whole world gets to celebrate you all over again.",
  birthdayMessage: "🎉 It's finally here — Happy Birthday, my love! 🎂",
  replayButton: "Relive the magic 🔁",

  /* --- Music ------------------------------------------------------ */
  // Drop an mp3 into assets/ and name it here. Missing file = stays silent.
  musicFile: "assets/music.mp3",
};
