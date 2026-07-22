/* =====================================================================
   Happy Birthday — interaction engine (vanilla JS, no dependencies)
   ===================================================================== */
(function () {
  "use strict";

  const CFG = window.BIRTHDAY_CONFIG || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  if (isTouch) document.body.classList.add("touch");

  /* ------------------------------------------------------------------
     Populate content from config
  ------------------------------------------------------------------ */
  function text(id, val) { const el = document.getElementById(id); if (el != null && val != null) el.textContent = val; }

  text("intro-hint", CFG.envelopeHint);
  text("intro-btn", CFG.envelopeButton);
  text("hero-line1", CFG.heroTitle);
  text("hero-name", CFG.herName);
  text("hero-btn", CFG.heroButton);
  text("cake-hint", "psst — try blowing out the candles 🎂");
  text("reasons-title", CFG.reasonsTitle);
  text("reasons-intro", CFG.reasonsIntro);
  text("memories-title", CFG.memoriesTitle);
  text("memories-intro", CFG.memoriesIntro);
  text("letter-title", CFG.letterTitle);
  text("letter-signoff", CFG.letterSignoff);
  text("letter-name", CFG.yourName);
  text("wish-btn", CFG.wishButton);
  text("wish-text", CFG.wishMessage);
  text("footer-text", "Made with all my love, for " + (CFG.herName || "you") + " · " + (CFG.yourName || ""));

  // Letter body paragraphs
  const letterBody = $("#letter-body");
  if (letterBody && Array.isArray(CFG.letterBody)) {
    letterBody.innerHTML = "";
    CFG.letterBody.forEach((p) => { const el = document.createElement("p"); el.textContent = p; letterBody.appendChild(el); });
  }

  document.title = "Happy Birthday, " + (CFG.herName || "You") + " 💗";

  /* ------------------------------------------------------------------
     Cursor glow + trail
  ------------------------------------------------------------------ */
  const glow = $(".cursor-glow");
  if (glow && !isTouch && !reduceMotion) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, gx = mx, gy = my;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    (function follow() {
      gx += (mx - gx) * 0.2; gy += (my - gy) * 0.2;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      requestAnimationFrame(follow);
    })();
    document.addEventListener("mouseleave", () => glow.style.opacity = "0");
    document.addEventListener("mouseenter", () => glow.style.opacity = "1");
  } else if (glow) {
    glow.style.display = "none";
  }

  /* ------------------------------------------------------------------
     Ambient particles (hearts / petals / sparkles) on #fx-canvas
  ------------------------------------------------------------------ */
  const fx = $("#fx-canvas");
  const fctx = fx.getContext("2d");
  let W, H, DPR;
  const petals = [];
  const GLYPHS = ["♥", "❀", "✦", "♡", "❁"];
  const COLORS = ["#fb7185", "#f472b6", "#e8c36b", "#fff2c9", "#fb7ba8"];

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
      size: 10 + Math.random() * 18, speed: 0.4 + Math.random() * 1.1,
      drift: (Math.random() - 0.5) * 0.8, rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02, sway: Math.random() * Math.PI * 2,
      glyph: GLYPHS[(Math.random() * GLYPHS.length) | 0],
      color: COLORS[(Math.random() * COLORS.length) | 0],
      alpha: 0.35 + Math.random() * 0.45,
    };
  }
  const PETAL_COUNT = reduceMotion ? 0 : (W < 640 ? 22 : 40);
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

  /* ------------------------------------------------------------------
     Confetti engine on #confetti-canvas
  ------------------------------------------------------------------ */
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
        size: 5 + Math.random() * 7, color: COLORS[(Math.random() * COLORS.length) | 0],
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
        // gentle fade-in
        let v = 0; const fade = setInterval(() => { v = Math.min(0.6, v + 0.03); audio.volume = v; if (v >= 0.6) clearInterval(fade); }, 80);
      }).catch(() => { /* autoplay blocked — user can press the button */ });
    }
  }
  musicBtn.addEventListener("click", () => {
    if (!musicReady) { musicBtn.animate([{ transform: "scale(1)" }, { transform: "scale(0.9)" }, { transform: "scale(1)" }], { duration: 250 }); return; }
    if (audio.paused) { audio.play().then(() => { audio.volume = 0.6; musicBtn.classList.add("playing"); }).catch(() => {}); }
    else { audio.pause(); musicBtn.classList.remove("playing"); }
  });

  /* ------------------------------------------------------------------
     Intro envelope → open experience
  ------------------------------------------------------------------ */
  const intro = $("#intro");
  const envelope = $("#envelope");
  const stage = $("#stage");
  let opened = false;

  function openExperience() {
    if (opened) return; opened = true;
    envelope.classList.add("open");
    tryPlayMusic();
    setTimeout(() => {
      const r = envelope.getBoundingClientRect();
      burstConfetti(r.left + r.width / 2, r.top + r.height / 2, 160);
    }, 350);
    setTimeout(() => {
      intro.classList.add("gone");
      stage.hidden = false;
      initReveals();
      startTypewriter();
      setTimeout(() => intro.remove(), 900);
    }, 850);
  }
  envelope.addEventListener("click", openExperience);
  envelope.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openExperience(); } });
  $("#intro-btn").addEventListener("click", openExperience);

  /* ------------------------------------------------------------------
     Scroll reveals
  ------------------------------------------------------------------ */
  let revealObserver;
  function initReveals() {
    if (reduceMotion) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealObserver.unobserve(en.target); } });
    }, { threshold: 0.18 });
    $$(".reveal").forEach((el) => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------
     Typewriter (hero)
  ------------------------------------------------------------------ */
  function startTypewriter() {
    const el = $("#typewriter");
    const str = CFG.heroTypewriter || "";
    if (!el) return;
    if (reduceMotion) { el.textContent = str; return; }
    let i = 0;
    (function type() {
      if (i <= str.length) { el.textContent = str.slice(0, i); i++; setTimeout(type, 45); }
    })();
  }

  /* ------------------------------------------------------------------
     Cake: blow out candles
  ------------------------------------------------------------------ */
  const cake = $("#cake");
  if (cake) {
    cake.addEventListener("click", () => {
      cake.classList.add("blown");
      $("#cake-hint").classList.add("hide");
      const r = cake.getBoundingClientRect();
      burstConfetti(r.left + r.width / 2, r.top + 10, 90);
    });
  }

  /* Hero button → scroll to countdown */
  $("#hero-btn").addEventListener("click", () => { $("#countdown").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); });

  /* ------------------------------------------------------------------
     Countdown
  ------------------------------------------------------------------ */
  function nextBirthday(dateStr) {
    const now = new Date();
    const base = new Date(dateStr + "T00:00:00");
    if (isNaN(base)) return null;
    let target = new Date(now.getFullYear(), base.getMonth(), base.getDate(), 0, 0, 0);
    // Only roll to next year once the birthday has fully passed — never on the
    // day itself, so the countdown reads zero (and celebrates) on the big day.
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (target < todayMidnight) target.setFullYear(now.getFullYear() + 1);
    return target;
  }
  const grid = $("#count-grid");
  const countSub = $("#count-sub");
  const target = CFG.birthday ? nextBirthday(CFG.birthday) : null;
  const birthdayDate = CFG.birthday ? new Date(CFG.birthday + "T00:00:00") : null;
  let celebrated = false;

  function pad(n) { return String(n).padStart(2, "0"); }
  function renderCountdown() {
    if (!grid) return;
    const now = new Date();
    const subParts = [];

    if (target) {
      const isBirthdayToday = birthdayDate && !isNaN(birthdayDate) &&
        now.getMonth() === birthdayDate.getMonth() &&
        now.getDate() === birthdayDate.getDate();

      if (isBirthdayToday) {
        // The big day — zero the clock and celebrate once (this runs every
        // second, so guard the confetti so it doesn't loop all day).
        cells([["Days", 0], ["Hours", "00"], ["Minutes", "00"], ["Seconds", "00"]]);
        subParts.push("🎉 It's finally here — Happy Birthday! 🎂");
        if (!celebrated) { celebrated = true; confettiRain(3000); }
      } else {
        const diff = Math.max(0, target - now);
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        cells([["Days", d], ["Hours", pad(h)], ["Minutes", pad(m)], ["Seconds", pad(s)]]);
        subParts.push("…until we celebrate you again.");
      }
    }

    // Days together
    if (CFG.togetherSince) {
      const since = new Date(CFG.togetherSince + "T00:00:00");
      if (!isNaN(since)) {
        const days = Math.floor((now - since) / 86400000);
        if (!target) cells([["Days together", days.toLocaleString()]]);
        subParts.push(days.toLocaleString() + " days of us — and counting.");
      }
    }

    if (countSub) countSub.textContent = subParts.join("  ·  ");
  }
  function cells(list) {
    if (!grid) return;
    grid.style.gridTemplateColumns = `repeat(${Math.min(4, list.length)}, 1fr)`;
    grid.innerHTML = list.map(([label, num]) =>
      `<div class="count-cell"><div class="count-num">${num}</div><div class="count-label">${label}</div></div>`
    ).join("");
  }
  if (target || CFG.togetherSince) { renderCountdown(); setInterval(renderCountdown, 1000); }

  /* ------------------------------------------------------------------
     Reasons shuffle
  ------------------------------------------------------------------ */
  const reasons = Array.isArray(CFG.reasons) ? CFG.reasons.slice() : [];
  const reasonCard = $("#reason-card");
  const reasonText = $("#reason-text");
  const reasonCount = $("#reason-count");
  let rIndex = 0;
  function showReason(i) {
    if (!reasonText || reasons.length === 0) return;
    reasonText.textContent = reasons[i];
    reasonCount.textContent = (i + 1) + " / " + reasons.length;
  }
  showReason(0);
  $("#reason-next").addEventListener("click", () => {
    if (reasons.length === 0) return;
    reasonCard.classList.add("swap");
    const r = $("#reason-next").getBoundingClientRect();
    burstConfetti(r.left + r.width / 2, r.top + r.height / 2, 26);
    setTimeout(() => {
      rIndex = (rIndex + 1) % reasons.length;
      showReason(rIndex);
      reasonCard.classList.remove("swap");
    }, 320);
  });

  /* ------------------------------------------------------------------
     Memories grid + placeholders + 3D tilt + lightbox
  ------------------------------------------------------------------ */
  const grad = [
    "linear-gradient(135deg,#7a1e56,#f472b6)",
    "linear-gradient(135deg,#45103f,#fb7185)",
    "linear-gradient(135deg,#b02a6e,#e8c36b)",
    "linear-gradient(135deg,#2b0b2e,#b02a6e)",
    "linear-gradient(135deg,#7a1e56,#e8c36b)",
    "linear-gradient(135deg,#45103f,#f472b6)",
  ];
  const camSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.4"><path d="M3 8h3l2-2h8l2 2h3v11H3z"/><circle cx="12" cy="13" r="3.4"/></svg>';

  const memGrid = $("#memory-grid");
  const memories = Array.isArray(CFG.memories) ? CFG.memories : [];
  function mediaHTML(m, idx) {
    if (m.img) return `<img src="${m.img}" alt="${m.caption || "A memory"}" loading="lazy" />`;
    return `<div class="memory-placeholder" style="background:${grad[idx % grad.length]}">${camSVG}</div>`;
  }
  if (memGrid) {
    memGrid.innerHTML = memories.map((m, idx) => `
      <article class="memory-card" data-idx="${idx}" tabindex="0" aria-label="${m.date || "Memory"}: ${m.caption || ""}">
        <span class="memory-tag">${String(idx + 1).padStart(2, "0")}</span>
        <div class="memory-media">${mediaHTML(m, idx)}<span class="memory-glare"></span></div>
        <div class="memory-info">
          <div class="memory-date">${m.date || ""}</div>
          <div class="memory-caption">${m.caption || ""}</div>
        </div>
      </article>`).join("");

    // 3D tilt
    if (!isTouch && !reduceMotion) {
      $$(".memory-card", memGrid).forEach((card) => {
        const glare = $(".memory-glare", card);
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          const rx = (0.5 - py) * 12, ry = (px - 0.5) * 14;
          card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
          if (glare) { glare.style.setProperty("--mx", px * 100 + "%"); glare.style.setProperty("--my", py * 100 + "%"); }
        });
        card.addEventListener("mouseleave", () => { card.style.transform = ""; });
      });
    }

    // Lightbox
    const lb = $("#lightbox"), lbInner = $("#lightbox-inner");
    function openLB(idx) {
      const m = memories[idx]; if (!m) return;
      lbInner.innerHTML = `
        <div class="lb-media">${mediaHTML(m, idx)}</div>
        <div class="lb-date">${m.date || ""}</div>
        <div class="lb-caption">${m.caption || ""}</div>`;
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
     Make a wish
  ------------------------------------------------------------------ */
  const wishBtn = $("#wish-btn");
  const wishOverlay = $("#wish-overlay");
  if (wishBtn) {
    wishBtn.addEventListener("click", () => {
      confettiRain(3200);
      burstConfetti(W / 2, H / 2, 180);
      wishOverlay.hidden = false;
      setTimeout(() => { wishOverlay.hidden = true; }, 3400);
    });
  }
})();
