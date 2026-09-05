const body = document.body;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal sections as the user scrolls.
const revealItems = document.querySelectorAll('.reveal');
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Custom cursor on pointer devices.
const finePointer = window.matchMedia('(pointer:fine)').matches;
if (finePointer && !prefersReducedMotion) {
  body.classList.add('cursor-enabled');
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = `${mx}px`; dot.style.top = `${my}px`; });
  const loop = () => {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
    requestAnimationFrame(loop);
  };
  loop();
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - .5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - .5) * 8;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

// Let the page react subtly to scroll without turning it into a heavy animation.
if (!prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const reel = document.querySelector('.reel-frame');
    if (reel) reel.style.transform = `translateY(${Math.min(y * 0.025, 18)}px)`;
  }, { passive: true });
}
