/* =====================================================================
   Happy Birthday — page-by-page experience (vanilla JS, no dependencies)
   ===================================================================== */
(function () {
  "use strict";

  const CFG = window.BIRTHDAY_CONFIG || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  if (isTouch) document.body.classList.add("touch");

  function text(id, val) { const el = document.getElementById(id); if (el != null && val != null) el.textContent = val; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  /* ------------------------------------------------------------------
     Populate content from config
  ------------------------------------------------------------------ */
  text("intro-hint", CFG.introHint);
  text("intro-btn", CFG.introButton);
  text("hero-line1", CFG.heroTitle);
  text("hero-name", CFG.herName);
  text("cake-hint", CFG.cakeHint);
  text("hero-next", CFG.heroButton);
  text("wishes-intro", CFG.wishesIntro);
  text("wish-reveal", CFG.revealButton);
  text("wish-done", CFG.storylaneButton);
  text("memories-title", CFG.memoriesTitle);
  text("memories-intro", CFG.memoriesIntro);
  text("memories-next", CFG.memoriesButton);
  text("finale-title", CFG.finaleTitle);
  text("finale-close", CFG.finaleClose);
  text("finale-name", (CFG.finaleSignoff || "Forever yours,") + " " + (CFG.yourName || ""));
  text("finale-btn", CFG.finaleButton);
  text("countdown-title", CFG.countdownTitle);
  text("replay-btn", CFG.replayButton);
  text("wish-text", CFG.cakeWish);
  text("footer-text", "Made with all my love, for " + (CFG.herName || "you") + " · " + (CFG.yourName || ""));

  const finaleBody = $("#finale-body");
  if (finaleBody && Array.isArray(CFG.finaleBody)) {
    finaleBody.innerHTML = "";
    CFG.finaleBody.forEach((p) => { const el = document.createElement("p"); el.textContent = p; finaleBody.appendChild(el); });
  }
  document.title = "Happy Birthday, " + (CFG.herName || "You") + " 💗";

  /* ------------------------------------------------------------------
     Ambient particles + confetti (shared across all pages)
  ------------------------------------------------------------------ */
  const fx = $("#fx-canvas");
  const fctx = fx.getContext("2d");
  let W, H, DPR;
  const petals = [];
  const GLYPHS = ["♥", "❀", "✿", "♡", "✦"];
  const COLORS = ["#f472b6", "#f9a8d4", "#c4b5fd", "#fbcfe8", "#f6b64c"];
  const CONFETTI_COLORS = ["#f63c97", "#ff92c6", "#a24be0", "#8b5cf6", "#f6b64c", "#ffffff"];

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    [fx, $("#confetti-canvas")].forEach((c) => {
      c.width = W * DPR; c.height = H * DPR;
      c.getContext("2d").setTransform(DPR, 0, 0, DPR, 0, 0);
    });
  }
  window.addEventListener("resize", resize);
  resize();

  function makePetal() {
    return {
      x: Math.random() * W, y: -20 - Math.random() * H,
      size: 10 + Math.random() * 16, speed: 0.35 + Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 0.7, rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02, sway: Math.random() * Math.PI * 2,
      glyph: GLYPHS[(Math.random() * GLYPHS.length) | 0],
      color: COLORS[(Math.random() * COLORS.length) | 0],
      alpha: 0.35 + Math.random() * 0.4,
    };
  }
  const PETAL_COUNT = reduceMotion ? 0 : (W < 640 ? 20 : 38);
  for (let i = 0; i < PETAL_COUNT; i++) { const p = makePetal(); p.y = Math.random() * H; petals.push(p); }

  function drawPetals() {
    fctx.clearRect(0, 0, W, H);
    for (const p of petals) {
      p.y += p.speed; p.sway += 0.01; p.x += p.drift + Math.sin(p.sway) * 0.4; p.rot += p.vr;
      if (p.y > H + 30) { Object.assign(p, makePetal()); p.y = -20; }
      fctx.save();
      fctx.translate(p.x, p.y); fctx.rotate(p.rot);
      fctx.globalAlpha = p.alpha; fctx.fillStyle = p.color;
      fctx.font = p.size + "px serif"; fctx.textAlign = "center"; fctx.textBaseline = "middle";
      fctx.fillText(p.glyph, 0, 0);
      fctx.restore();
    }
    requestAnimationFrame(drawPetals);
  }
  if (PETAL_COUNT > 0) drawPetals();

  const cc = $("#confetti-canvas");
  const cctx = cc.getContext("2d");
  let confetti = [];
  let confettiRunning = false;

  function burstConfetti(x, y, amount) {
    if (reduceMotion) return;
    amount = amount || 120;
    for (let i = 0; i < amount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const power = 4 + Math.random() * 9;
      confetti.push({
        x, y,
        vx: Math.cos(angle) * power, vy: Math.sin(angle) * power - 4,
        size: 5 + Math.random() * 7, color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
        life: 1, shape: Math.random() > 0.5 ? "rect" : "circ",
      });
    }
    if (!confettiRunning) { confettiRunning = true; runConfetti(); }
  }
  function runConfetti() {
    cctx.clearRect(0, 0, W, H);
    for (let i = confetti.length - 1; i >= 0; i--) {
      const c = confetti[i];
      c.vy += 0.18; c.vx *= 0.99; c.x += c.vx; c.y += c.vy; c.rot += c.vr; c.life -= 0.008;
      if (c.life <= 0 || c.y > H + 40) { confetti.splice(i, 1); continue; }
      cctx.save(); cctx.translate(c.x, c.y); cctx.rotate(c.rot);
      cctx.globalAlpha = Math.max(0, c.life); cctx.fillStyle = c.color;
      if (c.shape === "rect") cctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      else { cctx.beginPath(); cctx.arc(0, 0, c.size / 2, 0, Math.PI * 2); cctx.fill(); }
      cctx.restore();
    }
    if (confetti.length > 0) requestAnimationFrame(runConfetti);
    else { cctx.clearRect(0, 0, W, H); confettiRunning = false; }
  }
  function confettiRain(duration) {
    if (reduceMotion) return;
    const end = Date.now() + (duration || 2200);
    (function frame() {
      burstConfetti(Math.random() * W, -10, 6);
      if (Date.now() < end) setTimeout(frame, 120);
    })();
  }

  /* ------------------------------------------------------------------
     Music
  ------------------------------------------------------------------ */
  const audio = $("#bg-music");
  const musicBtn = $("#music-toggle");
  let musicReady = false;
  if (CFG.musicFile) { audio.src = CFG.musicFile; musicReady = true; }
  function tryPlayMusic() {
    if (!musicReady) return;
    audio.volume = 0;
    const p = audio.play();
    if (p && p.then) {
      p.then(() => {
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("aria-label", "Pause background music");
        let v = 0; const fade = setInterval(() => { v = Math.min(0.55, v + 0.03); audio.volume = v; if (v >= 0.55) clearInterval(fade); }, 80);
      }).catch(() => {});
    }
  }
  musicBtn.addEventListener("click", () => {
    if (!musicReady) { musicBtn.animate([{ transform: "scale(1)" }, { transform: "scale(0.9)" }, { transform: "scale(1)" }], { duration: 250 }); return; }
    if (audio.paused) { audio.play().then(() => { audio.volume = 0.55; musicBtn.classList.add("playing"); }).catch(() => {}); }
    else { audio.pause(); musicBtn.classList.remove("playing"); }
  });

  /* ==================================================================
     PAGE NAVIGATION  (one full-screen page at a time)
  ================================================================== */
  const screens = $$(".screen");
  const navBack = $("#nav-back");
  const progress = $("#progress");
  let current = 0;
  let animating = false;

  // Build the progress dots (one per page after the intro)
  screens.forEach((s, i) => {
    if (i === 0) return;
    const dot = document.createElement("button");
    dot.className = "dot"; dot.type = "button";
    dot.setAttribute("aria-label", "Go to page " + i);
    dot.addEventListener("click", () => goTo(i));
    progress.appendChild(dot);
  });
  const dots = $$(".dot", progress);

  function updateChrome() {
    navBack.hidden = current === 0;
    progress.hidden = current === 0;
    dots.forEach((d, i) => d.classList.toggle("on", i + 1 === current));
  }

  function goTo(idx) {
    if (idx === current || animating || idx < 0 || idx >= screens.length) return;
    const cur = screens[current];
    const next = screens[idx];
    current = idx;

    if (reduceMotion) {
      cur.classList.remove("is-active", "is-leaving");
      next.classList.add("is-active");
      afterEnter(next);
      return;
    }

    animating = true;
    cur.classList.add("is-leaving");
    setTimeout(() => {
      cur.classList.remove("is-active", "is-leaving");
      next.classList.add("is-active");
      afterEnter(next);
      setTimeout(() => { animating = false; }, 450);
    }, 300);
  }
  function goBack() { if (current > 0) goTo(current - 1); }

  function afterEnter(screen) {
    updateChrome();
    window.scrollTo({ top: 0, behavior: "auto" });
    const name = screen.dataset.name;
    if (name === "hero") startTypewriter();
    if (name === "countdown") { startCountdown(); confettiRain(2600); burstConfetti(W / 2, H * 0.4, 150); }
  }

  navBack.addEventListener("click", goBack);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#lightbox").hidden) return; // handled by lightbox
    if (e.key === "ArrowLeft") goBack();
  });

  /* ------------------------------------------------------------------
     Page 0 → 1 : open the gift
  ------------------------------------------------------------------ */
  const gift = $("#gift");
  let opened = false;
  function openGift() {
    if (opened) return; opened = true;
    gift.classList.add("opening");
    tryPlayMusic();
    setTimeout(() => { const r = gift.getBoundingClientRect(); burstConfetti(r.left + r.width / 2, r.top + r.height / 2, 150); }, 250);
    setTimeout(() => goTo(1), 620);
  }
  gift.addEventListener("click", openGift);
  gift.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openGift(); } });
  $("#intro-btn").addEventListener("click", openGift);

  /* Forward buttons */
  $("#hero-next").addEventListener("click", () => goTo(2));
  $("#memories-next").addEventListener("click", () => goTo(4));
  $("#finale-btn").addEventListener("click", () => goTo(5));
  $("#replay-btn").addEventListener("click", () => goTo(1));

  /* ------------------------------------------------------------------
     Typewriter (hero)
  ------------------------------------------------------------------ */
  let typed = false;
  function startTypewriter() {
    const el = $("#typewriter");
    const str = CFG.heroTypewriter || "";
    if (!el) return;
    if (reduceMotion || typed) { el.textContent = str; typed = true; return; }
    typed = true;
    let i = 0;
    (function type() {
      if (i <= str.length) { el.textContent = str.slice(0, i); i++; setTimeout(type, 42); }
    })();
  }

  /* ------------------------------------------------------------------
     Cake: blow out candles → make a wish
  ------------------------------------------------------------------ */
  const cake = $("#cake");
  const wishOverlay = $("#wish-overlay");
  if (cake) {
    function blowCake() {
      if (cake.classList.contains("blown")) return;
      cake.classList.add("blown");
      $("#cake-hint").classList.add("hide");
      const r = cake.getBoundingClientRect();
      burstConfetti(r.left + r.width / 2, r.top + 10, 100);
      if (CFG.cakeWish && wishOverlay) {
        wishOverlay.hidden = false;
        setTimeout(() => { wishOverlay.hidden = true; }, 2800);
      }
    }
    cake.addEventListener("click", blowCake);
    cake.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); blowCake(); } });
  }

  /* ------------------------------------------------------------------
     Wishes — reveal one card at a time
  ------------------------------------------------------------------ */
  const wishes = Array.isArray(CFG.wishes) ? CFG.wishes : [];
  const wishList = $("#wish-list");
  const wishReveal = $("#wish-reveal");
  const wishDone = $("#wish-done");
  const wishCount = $("#wish-count");
  let wIndex = 0;

  function renderWishCount() { if (wishCount) wishCount.textContent = wishes.length ? "Wish " + wIndex + " of " + wishes.length : ""; }
  function revealNextWish() {
    if (wIndex >= wishes.length) return;
    const w = wishes[wIndex];
    const card = document.createElement("div");
    card.className = "wish-card";
    card.innerHTML = '<span class="wl">' + esc(w.lead || "") + "</span> " + esc(w.text || "") + ' <span class="wt">' + esc(w.tail || "") + "</span>";
    wishList.appendChild(card);
    wIndex++;
    renderWishCount();
    const r = wishReveal.getBoundingClientRect();
    burstConfetti(r.left + r.width / 2, r.top + r.height / 2, 28);
    if (wIndex >= wishes.length) { wishReveal.hidden = true; wishDone.hidden = false; }
    else if (wIndex >= 1 && CFG.revealAgainButton) { wishReveal.textContent = CFG.revealAgainButton; }
  }
  if (wishReveal) {
    revealNextWish();                       // first wish is visible straight away
    wishReveal.addEventListener("click", revealNextWish);
  }
  if (wishDone) wishDone.addEventListener("click", () => goTo(3));

  /* ------------------------------------------------------------------
     Memories grid + placeholders + 3D tilt + lightbox
  ------------------------------------------------------------------ */
  const grad = [
    "linear-gradient(135deg,#ff9ccd,#c4b5fd)",
    "linear-gradient(135deg,#f9a8d4,#f6b64c)",
    "linear-gradient(135deg,#c4b5fd,#ff92c6)",
    "linear-gradient(135deg,#ffb3d9,#a78bfa)",
    "linear-gradient(135deg,#fbcfe8,#f472b6)",
    "linear-gradient(135deg,#ddd6fe,#f9a8d4)",
  ];
  const camSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.95)" stroke-width="1.5"><path d="M3 8h3l2-2h8l2 2h3v11H3z"/><circle cx="12" cy="13" r="3.4"/></svg>';

  const memGrid = $("#memory-grid");
  const memories = Array.isArray(CFG.memories) ? CFG.memories : [];
  function placeholder(idx) { return '<div class="memory-placeholder" style="background:' + grad[idx % grad.length] + '">' + camSVG + "</div>"; }
  function mediaHTML(m, idx) {
    if (m.img) return '<img src="' + esc(m.img) + '" alt="' + esc(m.caption || "A memory") + '" loading="lazy" onerror="this.parentNode.innerHTML=this.parentNode.dataset.fallback;" />';
    return placeholder(idx);
  }
  if (memGrid) {
    memGrid.innerHTML = memories.map((m, idx) => {
      const fb = placeholder(idx).replace(/"/g, "&quot;");
      return '<article class="memory-card" data-idx="' + idx + '" tabindex="0" aria-label="' + esc(m.title || "Memory") + ": " + esc(m.caption || "") + '">' +
        '<div class="memory-media" data-fallback="' + fb + '">' + mediaHTML(m, idx) + '<span class="memory-glare"></span></div>' +
        '<span class="memory-tag">' + String(idx + 1).padStart(2, "0") + " · a moment</span>" +
        '<div class="memory-date">' + esc(m.title || "") + "</div>" +
        '<div class="memory-caption">' + esc(m.caption || "") + "</div>" +
        "</article>";
    }).join("");

    if (!isTouch && !reduceMotion) {
      $$(".memory-card", memGrid).forEach((card) => {
        const glare = $(".memory-glare", card);
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          const rx = (0.5 - py) * 8, ry = (px - 0.5) * 10;
          card.style.transform = "perspective(800px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-6px)";
          if (glare) { glare.style.setProperty("--mx", px * 100 + "%"); glare.style.setProperty("--my", py * 100 + "%"); }
        });
        card.addEventListener("mouseleave", () => { card.style.transform = ""; });
      });
    }

    const lb = $("#lightbox"), lbInner = $("#lightbox-inner");
    function openLB(idx) {
      const m = memories[idx]; if (!m) return;
      const fb = placeholder(idx).replace(/"/g, "&quot;");
      lbInner.innerHTML =
        '<div class="lb-media memory-media" data-fallback="' + fb + '">' + mediaHTML(m, idx) + "</div>" +
        '<div class="lb-date">' + esc(m.title || "") + "</div>" +
        '<div class="lb-caption">' + esc(m.caption || "") + "</div>";
      lb.hidden = false;
    }
    function closeLB() { lb.hidden = true; }
    memGrid.addEventListener("click", (e) => { const c = e.target.closest(".memory-card"); if (c) openLB(+c.dataset.idx); });
    memGrid.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("memory-card")) { e.preventDefault(); openLB(+e.target.dataset.idx); } });
    $("#lightbox-close").addEventListener("click", closeLB);
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeLB(); });
  }

  /* ------------------------------------------------------------------
     Countdown (its page is the finale reveal)
  ------------------------------------------------------------------ */
  function nextBirthday(dateStr) {
    const now = new Date();
    const base = new Date(dateStr + "T00:00:00");
    if (isNaN(base)) return null;
    let target = new Date(now.getFullYear(), base.getMonth(), base.getDate(), 0, 0, 0);
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (target < todayMidnight) target.setFullYear(now.getFullYear() + 1);
    return target;
  }
  const grid = $("#count-grid");
  const countSub = $("#count-sub");
  const target = CFG.birthday ? nextBirthday(CFG.birthday) : null;
  const birthdayDate = CFG.birthday ? new Date(CFG.birthday + "T00:00:00") : null;
  let celebrated = false;
  let countdownStarted = false;

  function pad(n) { return String(n).padStart(2, "0"); }
  function cells(list) {
    if (!grid) return;
    grid.style.gridTemplateColumns = "repeat(" + Math.min(4, list.length) + ", 1fr)";
    grid.innerHTML = list.map(([label, num]) =>
      '<div class="count-cell"><div class="count-num">' + num + '</div><div class="count-label">' + label + "</div></div>"
    ).join("");
  }
  function renderCountdown() {
    if (!grid) return;
    const now = new Date();
    const subParts = [];
    if (target) {
      const isBirthdayToday = birthdayDate && !isNaN(birthdayDate) &&
        now.getMonth() === birthdayDate.getMonth() && now.getDate() === birthdayDate.getDate();
      if (isBirthdayToday) {
        cells([["Days", 0], ["Hours", "00"], ["Minutes", "00"], ["Seconds", "00"]]);
        subParts.push(CFG.birthdayMessage || "🎉 Happy Birthday! 🎂");
        if (!celebrated) { celebrated = true; confettiRain(3000); }
      } else {
        const diff = Math.max(0, target - now);
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        cells([["Days", d], ["Hours", pad(h)], ["Minutes", pad(m)], ["Seconds", pad(s)]]);
        if (CFG.countdownSub) subParts.push(CFG.countdownSub);
      }
    }
    if (CFG.togetherSince) {
      const since = new Date(CFG.togetherSince + "T00:00:00");
      if (!isNaN(since)) {
        const days = Math.floor((now - since) / 86400000);
        if (!target) cells([["Days together", days.toLocaleString()]]);
        subParts.push(days.toLocaleString() + " days of us — and counting. 💞");
      }
    }
    if (countSub) countSub.textContent = subParts.join("  ·  ");
  }
  function startCountdown() {
    if (countdownStarted) return; countdownStarted = true;
    if (!(target || CFG.togetherSince)) return;
    renderCountdown();
    setInterval(renderCountdown, 1000);
  }

  /* ------------------------------------------------------------------
     Start on page 0
  ------------------------------------------------------------------ */
  updateChrome();
})();
