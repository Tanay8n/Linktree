/* ══════════════════════════════════════════════
   main.js — Glass Portrait Hero
   ══════════════════════════════════════════════ */

/* ── Constants ────────────────────────────────── */
const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;

/* ── Social Links Data ────────────────────────── */
const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/_tanayiiiii",
    kind: "instagram",
    external: true,
  },
  {
    label: "Telegram",
    href: "https://t.me/erenzyo",
    kind: "telegram",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/Tanay8n",
    kind: "github",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tanay-biswas-8n?",
    kind: "linkedin",
    external: true,
  },
  {
    label: "X",
    href: "https://x.com/Tanay8n?s=09",
    kind: "x",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:tanay8@gmail.com",
    kind: "email",
    external: false,
  },
];

/* ── SVG Icon Templates ───────────────────────── */
const SOCIAL_ICONS = {
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="17.5" cy="6.8" r=".7" fill="currentColor"/></svg>`,

  telegram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20.4 4.4-3 15.1c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.3L5.1 13.1.3 11.6c-1-.3-1-1 .2-1.5L19.2 3c.9-.3 1.7.2 1.2 1.4Z" fill="currentColor"/></svg>`,

  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.7a9.3 9.3 0 0 0-2.9 18.1c.5.1.6-.2.6-.5v-1.8c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.5 0-1 .4-1.8.9-2.4-.1-.2-.4-1.2.1-2.4 0 0 .8-.2 2.5.9a8.6 8.6 0 0 1 4.6 0c1.8-1.2 2.5-.9 2.5-.9.5 1.3.2 2.2.1 2.4.6.6.9 1.4.9 2.4 0 3.5-2.1 4.3-4.1 4.5.3.3.6.9.6 1.7v2.5c0 .3.2.6.6.5A9.3 9.3 0 0 0 12 2.7Z" fill="currentColor"/></svg>`,

  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.2 8.8H3.1V21h3.1V8.8ZM4.7 3A1.8 1.8 0 1 0 4.7 6.6 1.8 1.8 0 0 0 4.7 3ZM21 14c0-3.7-2-5.4-4.6-5.4-2.1 0-3 1.2-3.5 2v-1.7H9.8V21h3.1v-6c0-1.6.3-3.1 2.3-3.1 2 0 2 1.8 2 3.2v6H21v-7Z" fill="currentColor"/></svg>`,

  x: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4.5 10.2 13 4 19.5h2.7l4.8-5 3.7 5H20l-6.6-9 5.8-6h-2.7l-4.4 4.6-3.4-4.6H4Zm4.1 1.8h1.5l6.3 11.4h-1.5L8.1 6.3Z" fill="currentColor"/></svg>`,

  email: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/* ── Render Functions ─────────────────────────── */

/** Generate grid cells (empty <span> elements) */
function renderGridCells(containerId, count) {
  const container = document.getElementById(containerId);
  for (let i = 0; i < count; i++) {
    container.appendChild(document.createElement("span"));
  }
}

/** Generate social link elements */
function renderSocialLinks() {
  const container = document.getElementById("social-links");

  socialLinks.forEach(({ label, href, kind, external }) => {
    const a = document.createElement("a");
    a.className = "social-link";
    a.href = href;
    a.setAttribute("aria-label", label);
    if (external) {
      a.target = "_blank";
      a.rel = "noreferrer";
    }
    a.innerHTML = SOCIAL_ICONS[kind];
    container.appendChild(a);
  });
}

/* ── Pointer Reveal Effect ────────────────────── */
function initRevealEffect() {
  const hero = document.querySelector(".glass-hero");
  if (!hero) return;

  const raw = { x: -999, y: -999 };
  const smooth = { x: -999, y: -999 };
  const radius = { current: 0, target: 0 };
  const touch = { active: false, pointerId: -1 };
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frameId = 0;

  function paint() {
    hero.style.setProperty("--reveal-x", `${smooth.x}px`);
    hero.style.setProperty("--reveal-y", `${smooth.y}px`);
    hero.style.setProperty("--reveal-radius", `${radius.current}px`);
  }

  function setPoint(event, immediately) {
    const bounds = hero.getBoundingClientRect();
    raw.x = event.clientX - bounds.left;
    raw.y = event.clientY - bounds.top;
    if (immediately) {
      smooth.x = raw.x;
      smooth.y = raw.y;
      paint();
    }
  }

  function animate() {
    const factor = motionQuery.matches ? 1 : 0.14;
    const radiusFactor = motionQuery.matches ? 1 : 0.12;

    smooth.x += (raw.x - smooth.x) * factor;
    smooth.y += (raw.y - smooth.y) * factor;
    radius.current += (radius.target - radius.current) * radiusFactor;

    if (Math.abs(radius.target - radius.current) < 0.05) {
      radius.current = radius.target;
    }

    paint();
    frameId = window.requestAnimationFrame(animate);
  }

  /* ── Pointer Handlers ── */

  hero.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse") return;
    setPoint(e, true);
    radius.target = DESKTOP_RADIUS;
  });

  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse" || (touch.active && e.pointerId === touch.pointerId)) {
      setPoint(e);
    }
  });

  hero.addEventListener("pointerleave", (e) => {
    if (e.pointerType === "mouse") radius.target = 0;
  });

  hero.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    touch.active = true;
    touch.pointerId = e.pointerId;
    setPoint(e, true);
    radius.target = MOBILE_RADIUS;
    try {
      hero.setPointerCapture(e.pointerId);
    } catch {
      // Pointer capture can be unavailable when a browser has already released it.
    }
  });

  function endTouch(e) {
    if (!touch.active || e.pointerId !== touch.pointerId) return;
    touch.active = false;
    touch.pointerId = -1;
    radius.target = 0;
  }

  hero.addEventListener("pointerup", endTouch);
  hero.addEventListener("pointercancel", endTouch);

  /* ── Start animation loop ── */
  frameId = window.requestAnimationFrame(animate);
}

/* ── Initialization ───────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderGridCells("grid-desktop", 48);
  renderGridCells("grid-mobile", 24);
  renderSocialLinks();
  initRevealEffect();
});
