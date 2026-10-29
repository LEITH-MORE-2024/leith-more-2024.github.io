/* ============================================================
   LEITH MORE Official Website — main
   表示内容は content.js で管理しています。このファイルは編集不要です。
   ============================================================ */
(() => {
  'use strict';

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nl2br = (s) => esc(s).replace(/\n/g, '<br>');
  const pad = (n) => String(n).padStart(2, '0');
  // 外部リンクのアイコン（枠から矢印が出る形）
  const EXT = '<svg class="ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3.5h6.5V10"/><path d="M20.5 3.5 11 13"/><path d="M18.5 13.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5h5.5"/></svg>';
  const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const parseDate = (s) => {
    const [y, m, d] = String(s).split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };
  // 今日（0時）。公演日の翌日になると、その公演は Schedule から History へ自動で移る
  // 確認用に ?today=2026-10-19 のように URL に付けると、その日として表示できる
  const today = (() => {
    const q = (location.search.match(/[?&]today=(\d{4}-\d{2}-\d{2})/) || [])[1];
    if (q) return parseDate(q);
    const t = new Date(); t.setHours(0, 0, 0, 0); return t;
  })();

  const ytId = (url) => {
    const m = String(url).match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/);
    return m ? m[1] : '';
  };

  // 写真枠: src が空 or 読み込み失敗なら枠を表示
  const emptyFrame = (label, hint) => `<div class="ph__empty"><span>${esc(label)}<small>${esc(hint)}</small></span></div>`;
  const photo = (src, label, hint) => `<div class="ph"><div class="ph__inner">${src
    ? `<img src="${esc(src)}" alt="${esc(S.bandName)} ${esc(label)}" data-label="${esc(label)}" data-hint="${esc(hint)}">`
    : emptyFrame(label, hint)}</div></div>`;
  const guardPhotos = () => $$('.ph__inner img').forEach((img) => {
    const fail = () => { img.parentNode.innerHTML = emptyFrame(img.dataset.label, `${img.getAttribute('src')} が見つかりません`); };
    if (img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener('error', fail, { once: true });
  });

  /* ============================================================
     RENDER
     ============================================================ */
  if (S.monochromePhotos) document.body.classList.add('mono');

  $('#year').textContent = new Date().getFullYear();

  // hero
  $('#heroMedia').innerHTML = photo(S.hero.photo, 'Artist Photo', 'images/hero.jpg ― 横長 1920×1080 以上');
  if ($('#heroPhrase')) $('#heroPhrase').innerHTML = nl2br(S.hero.phrase || '');

  // timeline split
  const timeline = (S.timeline || [])
    .map((e) => ({ ...e, _d: parseDate(e.date) }))
    .sort((a, b) => a._d - b._d);
  const upcoming = timeline.filter((e) => e._d >= today);
  const past = timeline.filter((e) => e._d < today);

  // ページごとの設定（pattern-bc.html などで window.LM_OPTS を指定）
  const OPTS = window.LM_OPTS || {};
  const L = Object.assign({ live: 'Live' }, OPTS.labels || {});

  // ロゴ（SNS・配信サービス）
  const ICON = {
    Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.6" cy="6.4" r="1.25" fill="currentColor"/></svg>',
    TikTok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    X: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>',
    YouTube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    'Apple Music': '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="currentColor" d="M16.9 5.9 10.2 7.3c-.5.1-.8.5-.8 1v6.3a2.3 2.3 0 1 0 1.5 2.1v-6.3l4.6-1v3.9a2.3 2.3 0 1 0 1.5 2.1V6.6c0-.5-.4-.8-.9-.7z"/></svg>',
    Spotify: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
    'Amazon Music': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.3 2.6 9.8 3.8c-.4.1-.7.4-.7.9v6.6a2.2 2.2 0 1 0 1.4 2V7.4l3.9-.9v3.4a2.2 2.2 0 1 0 1.4 2V3.3c0-.4-.3-.8-.5-.7z"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M2.6 16.4c5.6 3.9 13.2 4.1 18.8.3"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M17.9 15.2l3.6 1.4-.8 3.6"/></svg>',
  };
  // 配信・SNS のボタン（storeIcons 指定時はロゴで表示）
  const storeBtn = (name, url) => OPTS.storeIcons && ICON[name]
    ? `<a class="store-ico" href="${esc(url)}" target="_blank" rel="noopener" title="${esc(name)}" aria-label="${esc(name)}">${ICON[name]}</a>`
    : `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}${EXT}</a>`;

  // hero: next live（トップの帯と、スクロール中の右下ボタン）
  const nextLive = upcoming.find((e) => e.type === 'LIVE');
  if (nextLive) {
    const d = nextLive._d;
    const md = nextLive.dateLabel || `${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
    const sub = nextLive.dateLabel ? `${d.getFullYear()}` : `${d.getFullYear()}<br>${WEEK[d.getDay()]}`;
    const isJa = /[^\x00-\x7F]/.test(md);
    const link = (a) => {
      if (nextLive.ticket) { a.href = nextLive.ticket; a.target = '_blank'; a.rel = 'noopener'; }
      else { a.href = '#schedule'; a.setAttribute('data-scroll', ''); }
      a.hidden = false;
    };
    const hn = $('#heroNext');
    hn.innerHTML = `
      <span class="next-live__label"><i class="dot"></i>Next ${esc(L.live)}</span>
      <span class="next-live__date"><b class="${isJa ? 'ja' : ''}">${esc(md)}</b><small>${sub}</small></span>
      <span class="next-live__venue">${esc(nextLive.title)}${nextLive.note ? `<small>${esc(nextLive.note)}</small>` : ''}</span>
      <span class="next-live__cta">${nextLive.ticket ? `Tickets ${EXT}` : 'Details →'}</span>`;
    link(hn);
    document.querySelector('.hero').classList.add('has-next');
    const pill = $('#nextPill');
    pill.innerHTML = `<i class="dot"></i><span class="next-pill__k">Next ${esc(L.live)}</span><b>${esc(md)}</b><span class="next-pill__v">${esc(nextLive.title)}</span><span class="next-pill__ar">→</span>`;
    link(pill);
  }

  // about
  $('#aboutLead').innerHTML = String(S.about.lead).split('\n')
    .map((l, i) => `<span class="ln" style="--li:${i}"><span>${esc(l)}</span></span>`).join('');
  $('#aboutLead').setAttribute('data-reveal', 'lead');
  if (OPTS.aboutCopy && S.about.copy) {
    // 紹介文（3段落）を本文として表示し、短いリードは使わない
    $('#aboutLead').remove();
    $('#aboutBody').classList.add('about__copy');
    $('#aboutBody').innerHTML = S.about.copy.map((p, i) => `<p data-reveal style="--d:${i * 0.15}s">${nl2br(p)}</p>`).join('');
  } else $('#aboutBody').innerHTML = S.about.body.map((p, i) => `<p data-reveal style="--d:${i * 0.12 + 0.3}s">${esc(p)}</p>`).join('');
  $('#aboutTheme').innerHTML = [...String(S.about.theme)].map((c, i) =>
    `<span class="split-char" style="--ci:${i}"><span>${esc(c)}</span></span>`).join('');
  $('#aboutTheme').setAttribute('data-reveal', 'lead');
  $('#aboutGenre').innerHTML = nl2br(S.about.genre || '');
  if ($('#aboutStatement')) {
    if (S.about.statement) $('#aboutStatement').innerHTML = String(S.about.statement).split(/\n\s*\n/).map((st) => `<span>${nl2br(st)}</span>`).join('');
    else $('#aboutStatement').remove();
  }
  if (S.about.artwork) $('#aboutArt').innerHTML = `<img src="${esc(S.about.artwork)}" alt="${esc(S.bandName)} artwork" loading="lazy">`;
  else $('#aboutArt').remove();
  $('#aboutFacts').innerHTML = S.about.facts.map((f, i) =>
    `<div data-reveal style="--d:${i * 0.08}s"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('');

  // 世界観（図）
  const concept = S.concept || [];
  const role = (r) => concept.find((c) => c.role === r) || {};
  const wvLabel = (r, x, y, cls = '') => {
    const c = role(r);
    if (!c.word) return '';
    return `<div class="wv-label wv-label--${r} ${cls}" style="--x:${x}%;--y:${y}%"><b>${esc(c.word)}</b>${c.short ? `<small>${esc(c.short)}</small>` : ''}</div>`;
  };
  $('#wvDiagram').innerHTML = `
    <svg viewBox="0 0 800 800" aria-hidden="true">
      <circle class="wv-ring" cx="400" cy="400" r="360" pathLength="1" />
      <circle class="wv-orbit" cx="400" cy="400" r="326" />
      <line class="wv-link" x1="400" y1="298" x2="400" y2="248" pathLength="1" />
      <line class="wv-link" x1="329.4" y1="449.2" x2="282.5" y2="488.4" pathLength="1" />
      <line class="wv-link" x1="470.6" y1="449.2" x2="517.5" y2="488.4" pathLength="1" />
      <circle class="wv-node wv-node--core" cx="400" cy="390" r="92" />
      <circle class="wv-node wv-node--inner" cx="400" cy="390" r="72" />
      <circle class="wv-node wv-node--a" cx="400" cy="170" r="78" />
      <circle class="wv-node wv-node--a" cx="215" cy="545" r="88" />
      <circle class="wv-node wv-node--b" cx="585" cy="545" r="88" />
      <path class="wv-wave" d="M368 730 Q400 744 432 730" />
      <path class="wv-wave wv-wave--2" d="M354 744 Q400 762 446 744" />
    </svg>
    ${wvLabel('society', 50, 5, 'wv-label--onring')}
    ${wvLabel('origin', 50, 48.75)}
    ${wvLabel('sex', 50, 21.25)}
    ${wvLabel('death', 26.9, 68.1)}
    ${wvLabel('love', 73.1, 68.1)}
    ${wvLabel('bare', 50, 85.5)}`;
  $('#wvNotes').innerHTML = concept.map((c, i) => `
    <li data-reveal style="--d:${i * 0.08}s">
      <span class="wv-notes__no">${pad(i + 1)}</span>
      <div>
        <h4>${esc(c.word)}<em>${esc(c.key)}</em></h4>
        <p>${nl2br(c.text)}</p>
      </div>
    </li>`).join('');

  // 配信リンク（TuneCore / LinkCore）
  const listen = S.listen || {};
  const SONG_STORES = [['apple', 'Apple Music'], ['spotify', 'Spotify'], ['amazon', 'Amazon Music'], ['youtube', 'YouTube']];
  const songLinks = (title) => {
    const s = (listen.songs || {})[title] || {};
    const links = SONG_STORES.filter(([k]) => s[k]).map(([k, name]) => storeBtn(name, s[k]));
    return links.length ? '<span class="store-links__k">Listen on</span>' + links.join('') : '';
  };
  const stores = (listen.stores || []).filter((s) => s.url);
  const storeLinks = (label = 'Listen on') => stores.length
    ? `<span class="store-links__k">${esc(label)}</span>` + stores.map((s) => storeBtn(s.name, s.url)).join('')
    : '';
  $('#worksListen').innerHTML = storeLinks();

  // members
  $('#membersGrid').innerHTML = S.members.map((m, i) => {
    const tags = [m.role, m.age ? `${m.age}歳` : ''].filter(Boolean).map((t) => `<span>${esc(t)}</span>`).join('');
    return `
    <article class="member">
      <div class="member__photo-wrap" data-reveal="clip">${photo(m.photo, 'Member Photo', '縦長 4:5').replace('class="ph"', 'class="ph" data-parallax="-0.06"')}</div>
      <div class="member__info" data-reveal>
        <span class="member__no">${pad(i + 1)}</span>
        <div>
          ${m.reading ? `<p class="member__reading">${esc(m.reading)}</p>` : ''}
          <h3 class="member__name">${esc(m.name)}</h3>
          <p class="member__part">${esc(m.part)}</p>
          ${tags ? `<div class="member__tags">${tags}</div>` : ''}
        </div>
        ${m.bio ? `<p class="member__bio">${nl2br(m.bio)}</p>` : ''}
      </div>
    </article>`;
  }).join('');

  // works（Music Video と Song に分けて表示）
  const workCard = (w, i) => {
    const id = ytId(w.url);
    return `
    <article class="work" data-reveal style="--d:${(i % 5) * 0.08}s">
      <a class="work__media" href="${esc(w.url)}" target="_blank" rel="noopener" data-yt="${id}" data-cursor="Play" aria-label="${esc(w.title)} を再生">
        <img src="${(window.LM_THUMBS || {})[id] || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}" alt="" loading="lazy">
        <span class="work__play">Play</span>
      </a>
      <div class="work__meta">
        <span class="work__no">${pad(w._no)}</span>
        <h3 class="work__title">${esc(w.title)}</h3>
      </div>
    </article>`;
  };
  // Song を「サムネイルの横に歌詞ボタン（タップで歌詞のページを開く）」で並べる版（songLyrics 指定時）
  const lyricIndex = (title) => (S.lyrics || []).findIndex((l) => l.title === title);
  const songCard = (w, i) => {
    const id = ytId(w.url);
    const li = lyricIndex(w.title);
    const links = songLinks(w.title);
    return `
    <article class="song" data-reveal style="--d:${(i % 3) * 0.08}s">
      <a class="work__media" href="${esc(w.url)}" target="_blank" rel="noopener" data-yt="${id}" data-cursor="Play" aria-label="${esc(w.title)} を再生">
        <img src="${(window.LM_THUMBS || {})[id] || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}" alt="" loading="lazy">
        <span class="work__play">Play</span>
      </a>
      <div class="song__body">
        <div class="song__head"><span class="work__no">${pad(w._no)}</span><h3 class="song__title">${esc(w.title)}</h3></div>
        ${links ? `<div class="store-links song__links">${links}</div>` : ''}
        ${li >= 0 ? `<button class="song__toggle" type="button" data-lyric="${li}" data-cursor="Read">Lyrics<i aria-hidden="true"></i></button>` : ''}
      </div>
    </article>`;
  };
  // 公開日（MV は MV公開日、Song は初回配信日）。活動歴に無いものは一番新しい扱い
  const workDate = (w) => {
    const t = w.type === 'Music Video' ? 'MV' : 'RELEASE';
    const e = timeline.find((x) => x.type === t && x.title === w.title);
    return e ? e._d : new Date(8.64e15);
  };
  const workGroups = [];
  S.works.forEach((w, i) => {
    let g = workGroups.find((x) => x.type === w.type);
    if (!g) workGroups.push((g = { type: w.type, items: [] }));
    g.items.push({ ...w, _d: workDate(w), _i: i });
  });
  // 番号は古い順に 01, 02…、表示は新しい順（歌詞と同じ）
  workGroups.forEach((g) => {
    g.items.sort((a, b) => a._d - b._d || b._i - a._i);
    g.items.forEach((w, k) => { w._no = k + 1; });
    g.items.reverse();
  });
  // Music Video を一番上に
  workGroups.sort((a, b) => (b.type === 'Music Video') - (a.type === 'Music Video'));
  $('#worksRows').innerHTML = workGroups.map((g) => `
    <div class="work-row" style="--cols:${g.items.length <= 5 ? g.items.length : (g.items.length % 3 === 0 ? 3 : g.items.length % 4 === 0 ? 4 : 5)}">
      <div class="work-row__head" data-reveal>
        <h3 class="work-row__title">${esc(g.type)}</h3>
        <span class="work-row__count">${pad(g.items.length)}</span>
      </div>
      ${OPTS.songLyrics && g.type !== 'Music Video'
        ? `<div class="song-list">${g.items.map(songCard).join('')}</div>`
        : `<div class="work-row__grid">${g.items.map(workCard).join('')}</div>`}
    </div>`).join('');
  $$('.work__media img').forEach((img) => {
    img.addEventListener('load', () => {
      if (img.naturalWidth <= 120 && !img.dataset.fb) { img.dataset.fb = 1; img.src = img.src.replace('maxresdefault', 'hqdefault'); }
    });
    img.addEventListener('error', () => { if (!img.dataset.fb) { img.dataset.fb = 1; img.src = img.src.replace('maxresdefault', 'hqdefault'); } });
  });

  // schedule
  const dateCell = (e) => {
    const d = e._d;
    if (e.dateLabel) {
      const isJa = /[^\x00-\x7F]/.test(e.dateLabel);
      return `<span class="d${isJa ? ' ja' : ''}">${esc(e.dateLabel)}</span><span class="y">${d.getFullYear()}</span>`;
    }
    return `<span class="d">${pad(d.getMonth() + 1)}.${pad(d.getDate())}</span><span class="y">${d.getFullYear()}<br>${WEEK[d.getDay()]}</span>`;
  };
  const scheduleRow = (e, i) => `
    <li class="row" data-reveal style="--d:${i * 0.08}s">
      <div class="row__date">${dateCell(e)}</div>
      <div class="row__main">
        <h4 class="row__title">${esc(e.title)}</h4>
        ${e.note ? `<p class="row__note">${esc(e.note)}</p>` : ''}
      </div>
      <div class="row__side">${e.ticket
        ? `<a href="${esc(e.ticket)}" target="_blank" rel="noopener" data-cursor="Open">Tickets${EXT}</a>`
        : '<span>Details TBA</span>'}</div>
    </li>`;
  const fillRows = (el, list) => {
    el.innerHTML = list.length ? list.map(scheduleRow).join('') : '<li class="rows__empty" data-reveal>Coming soon.</li>';
  };
  fillRows($('#scheduleLive'), upcoming.filter((e) => e.type === 'LIVE'));

  // history (past, grouped by year)
  const TYPE_LABEL = { RELEASE: 'Release', MV: 'Music Video', LIVE: L.live, EVENT: 'Event' };
  const years = {};
  past.forEach((e) => { (years[e._d.getFullYear()] ||= []).push(e); });
  $('#historyYears').innerHTML = Object.keys(years).sort().map((y) => `
    <div class="year" data-year="${y}">
      <p class="year__label">${y}</p>
      <ol class="year__list">${years[y].map((e) => `
        <li class="h-item" data-type="${e.type}" data-reveal>
          <time>${pad(e._d.getMonth() + 1)}.${pad(e._d.getDate())}</time>
          <span class="tag">${TYPE_LABEL[e.type] || e.type}</span>
          <span class="t">${esc(e.title)}${e.note ? `<em>${esc(e.note)}</em>` : ''}</span>
        </li>`).join('')}
      </ol>
    </div>`).join('');

  // lyrics（配信日の古い順に番号を振り、新しい曲を上に表示）
  const firstRelease = {};
  timeline.filter((e) => e.type === 'RELEASE').forEach((e) => { if (!(e.title in firstRelease)) firstRelease[e.title] = e._d; });
  const lyricOrder = S.lyrics
    .map((l, i) => ({ l, i, d: firstRelease[l.title] || new Date(8.64e15) }))
    .sort((a, b) => a.d - b.d || a.i - b.i);
  lyricOrder.forEach((o, k) => { o.no = k + 1; });
  if ($('#lyricsList')) $('#lyricsList').innerHTML = [...lyricOrder].reverse().map((o, k) => `
    <li data-reveal style="--d:${k * 0.06}s">
      <button class="lyric-row" type="button" data-lyric="${o.i}" data-cursor="Read">
        <span class="no">${pad(o.no)}</span>
        <span class="t">${esc(o.l.title)}</span>
        <span class="first">${esc(String(o.l.text).split('\n')[0])}</span>
        <span class="go">Read</span>
      </button>
    </li>`).join('');

  // contact / sns
  const mail = S.contact.email;
  $('#contactText').textContent = S.contact.text;
  $('#contactMail').textContent = mail;
  $('#contactMail').href = `mailto:${mail}`;
  $$('[data-bind-mail]').forEach((a) => { a.textContent = mail; a.href = `mailto:${mail}`; });
  $('#storeRows').innerHTML = stores.map((s, i) => `
    <li data-reveal style="--d:${i * 0.07}s"><a href="${esc(s.url)}" target="_blank" rel="noopener" data-cursor="Listen">
      ${OPTS.storeIcons && ICON[s.name]
        ? `<span class="n n--icon">${ICON[s.name]}<span class="sns-name">${esc(s.name)}</span></span><span class="h">${esc(s.name)}</span>`
        : `<span class="n">${esc(s.name)}</span><span class="h">${esc(S.bandName)}</span>`}<span class="ar">${EXT}</span>
    </a></li>`).join('');
  if (!stores.length) $$('#storeRows, #storeRows + *').forEach((el) => el.remove());
  const SNS_ICON = ICON;
  $('#snsRows').innerHTML = S.sns.map((s, i) => `
    <li data-reveal style="--d:${i * 0.07}s"><a href="${esc(s.url)}" target="_blank" rel="noopener" data-cursor="Open" aria-label="${esc(s.name)}">
      ${SNS_ICON[s.name] ? `<span class="n n--icon">${SNS_ICON[s.name]}<span class="sns-name">${esc(s.name)}</span></span>` : `<span class="n">${esc(s.name)}</span>`}<span class="h">${esc(s.handle)}</span><span class="ar">${EXT}</span>
    </a></li>`).join('');
  $$('[data-sns-list]').forEach((ul) => {
    ul.innerHTML = [...stores, ...S.sns].map((s) => (OPTS.storeIcons && ICON[s.name]
      ? `<li><a class="foot-ico" href="${esc(s.url)}" target="_blank" rel="noopener" title="${esc(s.name)}" aria-label="${esc(s.name)}">${ICON[s.name]}</a></li>`
      : `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`)).join('');
  });

  guardPhotos();

  /* ============================================================
     SPLIT TEXT
     ============================================================ */
  $$('[data-split]').forEach((el) => {
    const chars = [...el.textContent];
    el.innerHTML = chars.map((c, i) => `<span class="split-char" style="--ci:${i}"><span>${c === ' ' ? '&nbsp;' : esc(c)}</span></span>`).join('');
  });
  $$('.loader__name span').forEach((s, i) => s.style.setProperty('--i', i));

  /* ============================================================
     SMOOTH SCROLL (Lenis)
     ============================================================ */
  let lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
  }
  const scrollToEl = (target) => {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  const lockScroll = (on) => {
    document.body.classList.toggle('is-locked', on);
    if (lenis) on ? lenis.stop() : lenis.start();
  };

  /* ============================================================
     LOADER
     ============================================================ */
  const loader = $('#loader');
  let seen = false;
  try { seen = sessionStorage.getItem('lm-loaded') === '1'; } catch (e) { /* ignore */ }

  const ready = () => {
    document.body.classList.add('is-ready');
    $$('.hero [data-split]').forEach((el) => el.classList.add('split-in'));
  };

  if (seen || reduceMotion) {
    loader.classList.add('is-gone');
    ready();
  } else {
    lockScroll(true);
    const start = performance.now();
    const DURATION = Number(loader.dataset.duration) || 2900;  // 演出の長さ（ページごとに data-duration で指定可）
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      if (p < 1) requestAnimationFrame(tick);
      else {
        loader.classList.add('is-done');
        setTimeout(ready, Number(loader.dataset.ready) || 350);
        setTimeout(() => { loader.classList.add('is-gone'); lockScroll(false); }, Number(loader.dataset.exit) || 1250);
        try { sessionStorage.setItem('lm-loaded', '1'); } catch (e) { /* ignore */ }
      }
    };
    requestAnimationFrame(tick);
  }

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
  $$('[data-reveal]').forEach((el) => revealIO.observe(el));

  /* ============================================================
     THEME SWITCH (black / white)
     ============================================================ */
  const themeIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) document.body.dataset.theme = en.target.dataset.theme;
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  $$('main [data-theme], footer[data-theme]').forEach((el) => themeIO.observe(el));

  /* ============================================================
     MENU
     ============================================================ */
  const menuBtn = $('#menuBtn');
  $$('.menu__list li').forEach((li, i) => li.querySelector('a').style.setProperty('--i', i));
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    $('#menu').setAttribute('aria-hidden', !open);
    $('.header__menu-label').textContent = open ? 'Close' : 'Menu';
    lockScroll(open);
  };
  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));

  $$('[data-scroll]').forEach((a) => a.addEventListener('click', (ev) => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    ev.preventDefault();
    const wasOpen = document.body.classList.contains('menu-open');
    if (wasOpen) setMenu(false);
    setTimeout(() => scrollToEl(href === '#top' ? document.body : href), wasOpen ? 450 : 0);
  }));

  /* ============================================================
     YOUTUBE (クリックで再生)
     ============================================================ */
  // ファイルを直接開いている（file://）場合や埋め込み不可の公開先では、リンクのまま YouTube を開く
  const canEmbed = location.protocol !== 'file:' && !window.LM_NO_EMBED;
  const playVideo = (media, ev) => {
    const id = media.dataset.yt;
    if (!canEmbed || !id) return;
    ev.preventDefault();
    if (media.classList.contains('is-playing')) return;
    $$('.work__media.is-playing').forEach((m) => {
      m.classList.remove('is-playing');
      m.querySelector('iframe')?.remove();
    });
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    media.appendChild(iframe);
    media.classList.add('is-playing');
    media.removeAttribute('data-cursor');
  };
  $$('.work__media').forEach((m) => m.addEventListener('click', (e) => playVideo(m, e)));

  /* ============================================================
     HISTORY FILTER
     ============================================================ */
  $$('#historyFilter button').forEach((btn) => btn.addEventListener('click', () => {
    $$('#historyFilter button').forEach((b) => b.classList.toggle('is-active', b === btn));
    const f = btn.dataset.filter;
    $$('.year').forEach((y) => {
      let shown = 0;
      $$('.h-item', y).forEach((it) => {
        const ok = f === 'ALL' || it.dataset.type === f;
        it.hidden = !ok;
        if (ok) { shown++; it.classList.add('is-in'); }
      });
      y.hidden = shown === 0;
    });
    if (lenis) lenis.resize();
    measure();
  }));

  /* ============================================================
     LYRICS MODAL
     ============================================================ */
  const modal = $('#lyricModal');
  const modalScroll = $('#lyricScroll');
  let modalIO = null;
  let lastFocus = null;
  const openLyric = (i) => {
    const l = S.lyrics[i];
    lastFocus = document.activeElement;
    const no = (lyricOrder.find((o) => o.i === i) || {}).no || i + 1;
    $('#lyricNo').textContent = `${pad(no)} / ${pad(S.lyrics.length)}`;
    $('#lyricTitle').textContent = l.title;
    $('#lyricListen').innerHTML = songLinks(l.title) || storeLinks();
    // 背景：その曲のジャケット（Song のサムネイル、なければ MV）を白黒で
    const work = S.works.find((w) => w.title === l.title && w.type !== 'Music Video') || S.works.find((w) => w.title === l.title);
    const thumbImg = work && $(`.work__media[data-yt="${ytId(work.url)}"] img`);
    const bg = $('#lyricBg');
    bg.style.backgroundImage = 'none';
    if (thumbImg) {
      const t = new Image();
      t.onload = () => {
        const src = t.naturalWidth > 120 ? t.src : t.src.replace('maxresdefault', 'hqdefault');
        bg.style.backgroundImage = `url("${src}")`;
      };
      t.src = thumbImg.currentSrc || thumbImg.src;
    }
    $('#lyricText').innerHTML = String(l.text).trim().split(/\n\s*\n/).map((st) => `<p>${nl2br(st)}</p>`).join('');
    modalScroll.scrollTop = 0;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    modalIO?.disconnect();
    modalIO = new IntersectionObserver((ens) => ens.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add('is-in');
    }), { root: modalScroll, rootMargin: '0px 0px -8% 0px' });
    setTimeout(() => $$('#lyricText p').forEach((p) => modalIO.observe(p)), 500);
    setTimeout(() => $('#lyricClose').focus({ preventScroll: true }), 100);
  };
  const closeLyric = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    lastFocus?.focus({ preventScroll: true });
  };
  $$('[data-lyric]').forEach((b) => b.addEventListener('click', () => openLyric(Number(b.dataset.lyric))));
  $('#lyricClose').addEventListener('click', closeLyric);
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (modal.classList.contains('is-open')) closeLyric();
    else if (document.body.classList.contains('menu-open')) setMenu(false);
  });

  /* ============================================================
     COPY MAIL
     ============================================================ */
  $('#copyMail').addEventListener('click', async (ev) => {
    const btn = ev.currentTarget;
    try {
      await navigator.clipboard.writeText(mail);
      btn.textContent = 'Copied';
    } catch (e) {
      const range = document.createRange();
      range.selectNodeContents($('#contactMail'));
      getSelection().removeAllRanges();
      getSelection().addRange(range);
      btn.textContent = 'Selected';
    }
    btn.classList.add('is-done');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('is-done'); }, 1800);
  });

  /* ============================================================
     CURSOR
     ============================================================ */
  if (finePointer && !reduceMotion) {
    const cur = $('#cursor');
    const label = $('.cursor__label', cur);
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; cur.classList.add('is-visible'); }, { passive: true });
    document.addEventListener('mouseleave', () => cur.classList.remove('is-visible'));
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor], a, button');
      const txt = t?.closest('[data-cursor]')?.dataset.cursor || '';
      cur.classList.toggle('is-hover', !!t && !txt);
      cur.classList.toggle('has-label', !!txt);
      label.textContent = txt;
    });
    const loop = () => {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cur.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ============================================================
     SCROLL-DRIVEN: progress / header / parallax / next live
     ============================================================ */
  const header = $('#header');
  const bar = $('#progressBar');
  const parallaxEls = $$('[data-parallax]');
  const pill = $('#nextPill');
  const heroEl = $('.hero');
  const scheduleEl = $('#schedule');

  let vh = innerHeight, docH = 0, heroBottom = 0, heroScroll = 1, lastP = -1;

  function measure() {
    vh = innerHeight;
    docH = document.documentElement.scrollHeight - vh;
    heroBottom = heroEl.offsetHeight;
    heroScroll = Math.max(heroBottom - vh, 1);
  }

  let lastY = scrollY;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

  function frame() {
    const y = scrollY;
    const dy = y - lastY;

    // progress
    bar.style.transform = `scaleX(${docH > 0 ? clamp(y / docH, 0, 1) : 0})`;

    // header hide/show
    if (!document.body.classList.contains('menu-open')) {
      if (y > vh * 0.6 && dy > 2) header.classList.add('is-hidden');
      else if (dy < -2 || y < vh * 0.6) header.classList.remove('is-hidden');
    }

    if (!reduceMotion) {
      // parallax
      parallaxEls.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const sp = parseFloat(el.dataset.parallax);
        const off = (r.top + r.height / 2 - vh / 2) * sp;
        el.style.transform = `translate3d(0, ${-off}px, 0)`;
      });
    }

    // トップの演出：スクロールに合わせて写真が円に閉じ、細胞（子宮）へ帰っていく
    const hp = Math.round(clamp(y / heroScroll, 0, 1) * 1000) / 1000;
    if (hp !== lastP) {
      lastP = hp;
      heroEl.style.setProperty('--p', hp);
      heroEl.style.setProperty('--ph', clamp(1 - Math.abs(hp - 0.62) * 4, 0, 1).toFixed(3));
    }

    // next live pill
    if (!pill.hidden) {
      const sr = scheduleEl.getBoundingClientRect();
      const show = y > heroBottom - 40 && !(sr.top < vh && sr.bottom > 0) && y < docH - 40;
      pill.classList.toggle('is-shown', show);
    }


    lastY = y;
    requestAnimationFrame(frame);
  }

  if (lenis) {
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  measure();
  requestAnimationFrame(frame);
  addEventListener('resize', () => { measure(); if (lenis) lenis.resize(); });
  addEventListener('load', measure);
  if (document.fonts) document.fonts.ready.then(measure);
  setTimeout(measure, 1500);
})();
