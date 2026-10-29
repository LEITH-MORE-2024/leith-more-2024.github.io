/* ============================================================
   PATTERN C — CINEMA 専用の演出（タイムコードと現在のシーン表示）
   表示内容は content.js で管理しています。このファイルは編集不要です。
   ============================================================ */
(() => {
  'use strict';
  const pad = (n) => String(n).padStart(2, '0');

  // 上の黒帯のタイムコード（24fps）
  const tc = document.getElementById('gcTc');
  const t0 = performance.now();
  const tick = () => {
    const f = Math.floor((performance.now() - t0) / (1000 / 24));
    const s = Math.floor(f / 24);
    tc.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f % 24)}`;
    requestAnimationFrame(tick);
  };
  if (tc) tick();

  // 黒帯が開き終わったら、スクロールへの追従を即時にする
  const settle = () => document.body.classList.add('gc-settled');
  const waitReady = setInterval(() => {
    if (document.body.classList.contains('is-ready')) { clearInterval(waitReady); setTimeout(settle, 2600); }
  }, 100);

  // 左下に「SCENE 03 — WORKS」のように現在のセクションを表示
  const scene = document.getElementById('gcScene');
  if (!scene) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const no = en.target.querySelector('.section-head__no');
      const title = en.target.querySelector('.section-head__en');
      if (no && title) {
        scene.textContent = `Scene ${no.textContent} — ${title.textContent}`;
        scene.classList.add('is-shown');
      } else {
        scene.classList.remove('is-shown');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  document.querySelectorAll('main > section, footer').forEach((s) => io.observe(s));
})();
