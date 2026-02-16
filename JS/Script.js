/* ============================
   Helpers
============================ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ============================
   Nav: hamburger + affix + logo behavior
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const nav = $(".nav");
  const navTrigger = $(".navTrigger");
  const mainListDiv = $("#mainListDiv");
  const logo = $(".nav div.logo");

  // Toggle mobile menu
  if (navTrigger && mainListDiv) {
    navTrigger.addEventListener("click", () => {
      navTrigger.classList.toggle("active");
      mainListDiv.classList.toggle("show_list");
      mainListDiv.style.display = "block";
    });

    // Keyboard accessibility
    navTrigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navTrigger.click();
      }
    });
  }

  if (!nav) return;

  const isDesktop = () => window.innerWidth > 767;

  function setNavHeight() {
    nav.style.height = isDesktop() ? "120px" : "90px";
  }

  function onScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    // Affix class
    if (scrollTop > 50) {
      nav.classList.add("affix");
      if (isDesktop()) nav.style.height = "90px";
    } else {
      nav.classList.remove("affix");
      if (isDesktop()) nav.style.height = "120px";
    }

    // Mobile logo behavior
    if (logo) {
      if (window.innerWidth <= 768) {
        if (scrollTop > 0) logo.classList.add("fixedLogo");
        else logo.classList.remove("fixedLogo");
      } else {
        logo.classList.remove("fixedLogo");
      }
    }
  }

  setNavHeight();
  onScroll();

  window.addEventListener("resize", () => {
    setNavHeight();
    onScroll();
  });

  window.addEventListener("scroll", onScroll, { passive: true });
});

/* ============================
   Slideshow
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const slides = $$(".slide");
  const nextBtn = $("#next");
  const prevBtn = $("#prev");
  const slider = $(".slider");

  if (!slides.length || !nextBtn || !prevBtn) return;

  const auto = true;
  const intervalTime = 5000;
  let slideInterval = null;

  const getCurrent = () => $(".slide.current");

  const goNext = () => {
    const current = getCurrent();
    if (!current) {
      slides[0].classList.add("current");
      return;
    }
    current.classList.remove("current");

    const next = current.nextElementSibling?.classList?.contains("slide")
      ? current.nextElementSibling
      : slides[0];

    next.classList.add("current");
  };

  const goPrev = () => {
    const current = getCurrent();
    if (!current) {
      slides[0].classList.add("current");
      return;
    }
    current.classList.remove("current");

    const prev = current.previousElementSibling?.classList?.contains("slide")
      ? current.previousElementSibling
      : slides[slides.length - 1];

    prev.classList.add("current");
  };

  nextBtn.addEventListener("click", () => {
    goNext();
    if (auto) {
      clearInterval(slideInterval);
      slideInterval = setInterval(goNext, intervalTime);
    }
  });

  prevBtn.addEventListener("click", () => {
    goPrev();
    if (auto) {
      clearInterval(slideInterval);
      slideInterval = setInterval(goNext, intervalTime);
    }
  });

  if (auto) {
    slideInterval = setInterval(goNext, intervalTime);

    if (slider) {
      slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
      slider.addEventListener("mouseleave", () => {
        slideInterval = setInterval(goNext, intervalTime);
      });
    }
  }
});

/* ============================
   FAQ toggles (safe if FAQ not on this page)
============================ */
document.addEventListener("DOMContentLoaded", () => {
  function toggleFaq(el) {
    const parent = el.closest(".faq-question");
    if (!parent) return;
    parent.classList.toggle("active");

    const panel = parent.querySelector(".panel");
    if (panel && "checked" in panel) panel.checked = !panel.checked;
  }

  $$(".faq-toggle").forEach((t) => t.addEventListener("click", () => toggleFaq(t)));
  $$(".plus").forEach((p) => p.addEventListener("click", () => toggleFaq(p)));
});

/* ============================
   Social panel (safe if elements not present)
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const floatingBtn = $(".floating-btn");
  const closeBtn = $(".close-btn");
  const panel = $(".social-panel-container");

  if (floatingBtn && panel) {
    floatingBtn.addEventListener("click", () => panel.classList.toggle("visible"));
  }
  if (closeBtn && panel) {
    closeBtn.addEventListener("click", () => panel.classList.remove("visible"));
  }
});

/* ============================
   Smooth scrolling for hash links only
============================ */
document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#") || href === "#") return;

  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.pushState(null, "", href);
});

/* ============================
   iOS autoplay assist (helps mobile Safari)
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const vids = document.querySelectorAll("video[autoplay]");
  vids.forEach((v) => {
    v.muted = true;
    v.playsInline = true;

    const tryPlay = () => v.play().catch(() => {});
    tryPlay();

    document.addEventListener("touchstart", tryPlay, { once: true });
    document.addEventListener("click", tryPlay, { once: true });
  });
});

/* ============================
   Fade-in observers (About + Get In Touch)
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const reveal = (selectors, threshold = 0.4) => {
    const els = selectors
      .map(s => Array.from(document.querySelectorAll(s)))
      .flat();

    if (!els.length) return;

    // If IntersectionObserver isn't supported, just show everything
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("show"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    els.forEach(el => observer.observe(el));
  };

  // About section
  reveal([".aboutDesc img", ".aboutDesc p", ".aboutDesc button"], 0.35);

  // Get In Touch section
  reveal([".gitImage", ".gitPar", ".gitFaqButton", ".gitContactButton"], 0.35);
});

document.addEventListener("DOMContentLoaded", () => {
  const heroVideo = document.querySelector(".hero-video");
  if (!heroVideo) return;

  // As soon as it can play / is playing, fade it in
  const showVideo = () => heroVideo.classList.add("is-ready");
  heroVideo.addEventListener("canplay", showVideo, { once: true });
  heroVideo.addEventListener("playing", showVideo, { once: true });

  // Try to start immediately (won't hurt if blocked)
  const tryPlay = () => heroVideo.play().catch(() => {});
  tryPlay();

  // iOS unlock: first gesture
  document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
  document.addEventListener("click", tryPlay, { once: true });
});

v.closest(".Herro")?.classList.add("video-playing");



   










