gsap.registerPlugin(ScrollTrigger);

/**
 * 1) Floating effect (melayang) terus-menerus
 *    Ini seperti animasi loop halus.
 */
gsap.utils.toArray(".float.deco").forEach((el, i) => {
  gsap.to(el, {
    y: i % 2 === 0 ? -18 : 18,
    duration: 2.4 + i * 0.3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});

/**
 * 2) SCENE 1: background zoom + teks muncul
 */
const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-1",
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
});

tl1
  .fromTo(".scene-1 .bg-1", { scale: 1.25 }, { scale: 1.05, ease: "none" }, 0)
  .fromTo(".scene-1 .eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.05)
  .fromTo(".scene-1 .title", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.10)
  .fromTo(".scene-1 .subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.15);

/**
 * 3) SCENE 2: foto slide-in + teks fade/slide
 */
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-2",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1
  }
});

tl2
  .fromTo(".scene-2 .bg-2", { scale: 1.2 }, { scale: 1.05, ease: "none" }, 0)
  .fromTo(".scene-2 .photo", { x: -60, opacity: 0 }, { x: 0, opacity: 1 }, 0.05)
  .fromTo(".scene-2 .text", { x: 60, opacity: 0 }, { x: 0, opacity: 1 }, 0.10);

/**
 * 4) SCENE 3: heading + tombol muncul, bg subtle zoom
 */
const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene-3",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1
  }
});

tl3
  .fromTo(".scene-3 .bg-3", { scale: 1.2 }, { scale: 1.05, ease: "none" }, 0)
  .fromTo(".scene-3 .heading", { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 0.05)
  .fromTo(".scene-3 .body", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 0.10)
  .fromTo(".scene-3 .cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 0.15);

/**
 * 5) Tombol NEXT: scroll ke scene berikutnya (opsional)
 *    Ini cocok kalau kamu mau undangan "slide" ala video.
 */
const scenes = gsap.utils.toArray(".scene");
let idx = 0;

document.getElementById("nextBtn").addEventListener("click", () => {
  idx = Math.min(idx + 1, scenes.length - 1);
  scenes[idx].scrollIntoView({ behavior: "smooth" });
});

// Bonus: kalau user scroll manual, update idx mendekati scene yang lagi terlihat
scenes.forEach((scene, i) => {
  ScrollTrigger.create({
    trigger: scene,
    start: "top center",
    end: "bottom center",
    onToggle: self => { if (self.isActive) idx = i; }
  });
});
