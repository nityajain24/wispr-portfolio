// "Let's go" entry gate, modelled on Flow: tap the on-screen fn key (or hold it), the browser
// listens, and what it hears types out into the box. The box is a real input, so typing the
// phrase, or dictating it with the real Flow fn key, works too. Where the browser can't listen,
// tapping the key moves focus to the box instead.

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  onaudiostart: (() => void) | null;
};

const PHRASE = /\blet'?s go\b|\blet us go\b|\bletsgo\b/;
const normalise = (s: string) =>
  s.toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z' ]+/g, ' ').replace(/\s+/g, ' ').trim();
const HOLD_MS = 350; // a press longer than this is hold-to-talk; shorter is a tap that toggles
const IDLE_MS = 8000; // stop listening after this long without new words

const root = document.documentElement;
(window as any).__gateReady = true;

const gate = document.getElementById('gate');
if (gate && root.classList.contains('gate-on')) init(gate);

function init(gate: HTMLElement) {
  const key = gate.querySelector<HTMLButtonElement>('#gate-key')!;
  const form = gate.querySelector<HTMLFormElement>('#gate-form')!;
  const field = gate.querySelector<HTMLInputElement>('#gate-field')!;
  const status = gate.querySelector<HTMLElement>('#gate-status')!;
  const skip = gate.querySelector<HTMLButtonElement>('#gate-skip')!;
  const mic = gate.querySelector<HTMLElement>('#gate-mic')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  let canListen = !!Ctor;
  let rec: Recognition | null = null;
  let listening = false;
  let pressedAt = 0;
  let heard = '';
  let opened = false;
  let idle = 0;
  let audioOn = false; // true once the mic is actually live (after any permission prompt)

  const say = (msg: string) => { status.textContent = msg; };
  const note = (msg: string) => { mic.textContent = msg; mic.hidden = !msg; };

  // Desktop: focus the box, so holding the real fn key with Wispr Flow types straight into it.
  // Phones: focus the key instead, so the keyboard doesn't pop up on arrival.
  const desktop = matchMedia('(hover: hover) and (pointer: fine)').matches;
  // Flow's default shortcut: fn on Mac, Ctrl + Win on Windows. Phones keep the plain placeholder.
  const ua = ((navigator as any).userAgentData?.platform || navigator.platform || navigator.userAgent || '').toLowerCase();
  const hotkey = ua.includes('mac') ? 'your real fn key' : ua.includes('win') ? 'Ctrl + Win' : '';
  if (desktop) { if (hotkey) field.placeholder = `Have Flow? Hold ${hotkey}`; field.focus({ preventScroll: true }); }
  else key.focus({ preventScroll: true });

  /* Tell people about the microphone before the browser asks. */
  const MIC_ASK = 'fn uses your microphone. Your browser will ask first, tap Allow.';
  const MIC_BLOCKED = 'Microphone is blocked for this site. Allow it from the icon in the address bar, or type below.';
  if (!canListen) { gate.classList.add('no-voice'); note('Voice needs Chrome, Edge or Safari. Type it below instead.'); }
  else {
    note(MIC_ASK);
    try {
      navigator.permissions?.query({ name: 'microphone' as PermissionName }).then((st) => {
        const show = () => note(st.state === 'granted' ? '' : st.state === 'denied' ? MIC_BLOCKED : MIC_ASK);
        show();
        st.onchange = show;
      }).catch(() => {});
    } catch {}
  }

  /* Typewriter: the box catches up with the transcript a few letters at a time, the way
     Flow's text lands. Interim corrections rewind to the shared prefix and retype. */
  let target = '';
  let tick = 0;
  function typeTo(text: string) {
    target = text;
    if (reduced) { field.value = target; check(); return; }
    if (tick) return;
    tick = window.setInterval(() => {
      const cur = field.value;
      let n = 0;
      while (n < cur.length && n < target.length && cur[n] === target[n]) n++;
      if (n < cur.length) field.value = cur.slice(0, n);
      else if (cur.length < target.length) field.value = target.slice(0, cur.length + 2);
      else { clearInterval(tick); tick = 0; check(); }
      field.scrollLeft = field.scrollWidth;
    }, 28);
  }

  function check() {
    if (PHRASE.test(normalise(field.value))) open();
  }

  function open() {
    if (opened) return;
    opened = true;
    listening = false;
    clearTimeout(idle);
    try { rec?.abort(); } catch {}
    try { sessionStorage.setItem('entered', '1'); } catch {}
    gate.classList.remove('listening');
    say('');
    field.blur();

    const r = key.getBoundingClientRect();
    gate.style.setProperty('--x', `${r.left + r.width / 2}px`);
    gate.style.setProperty('--y', `${r.top + r.height / 2}px`);

    const finish = () => {
      root.classList.remove('gate-on');
      gate.classList.add('leaving');
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true });
      setTimeout(() => gate.remove(), reduced ? 160 : 460);
    };

    // Let the last letters land before the ink spreads.
    const delay = reduced ? 0 : 350;
    setTimeout(() => {
      if (reduced) finish();
      else { gate.classList.add('filling'); setTimeout(finish, 1300); }
    }, delay);
  }

  function bumpIdle() {
    clearTimeout(idle);
    idle = window.setTimeout(stop, IDLE_MS);
  }

  function start() {
    if (opened || listening) return;
    if (!canListen) { field.focus(); say('Type “Let’s go” and press Enter.'); return; }
    listening = true;
    audioOn = false;
    heard = '';
    field.value = '';
    target = '';
    gate.classList.add('listening');
    key.setAttribute('aria-pressed', 'true');
    say('Listening…');
    bumpIdle();
    rec = new Ctor() as Recognition;
    rec.lang = 'en-IN';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onaudiostart = () => { audioOn = true; bumpIdle(); note(''); };
    rec.onresult = (e: any) => {
      let text = '';
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript + ' ';
      heard = text.trim();
      if (!heard) return;
      bumpIdle();
      typeTo(heard);
      if (PHRASE.test(normalise(heard))) { typeTo(heard); stopRecognition(); }
    };
    rec.onerror = (e: any) => {
      console.warn('[gate] speech error:', e.error);
      // No mic or no speech service: don't strand anyone; fall back to typing in the box.
      const msg: Record<string, string> = {
        'not-allowed': MIC_BLOCKED,
        'service-not-allowed': 'Voice is turned off in this browser. Type “Let’s go” below.',
        'audio-capture': 'No microphone found. Type “Let’s go” below.',
        network: 'Voice isn’t available in this browser right now. Type “Let’s go” below.',
      };
      if (msg[e.error]) {
        canListen = false;
        gate.classList.add('no-voice');
        listening = false;
        gate.classList.remove('listening');
        key.setAttribute('aria-pressed', 'false');
        note(msg[e.error]);
        say('');
        field.focus();
      }
    };
    rec.onend = () => {
      if (opened || !canListen) return;
      if (listening) { try { rec?.start(); } catch {} return; }
      gate.classList.remove('listening');
      key.setAttribute('aria-pressed', 'false');
      if (PHRASE.test(normalise(heard))) return;
      say(heard ? 'Almost. Tap fn and try “Let’s go.”' : 'Didn’t catch that. Tap fn and try again.');
    };
    try { rec.start(); } catch { stop(); }
  }

  function stopRecognition() {
    listening = false;
    clearTimeout(idle);
    try { rec?.stop(); } catch {}
  }

  function stop() {
    if (!listening) return;
    stopRecognition();
    gate.classList.remove('listening');
    key.setAttribute('aria-pressed', 'false');
  }

  // Tap toggles listening; a long press is hold-to-talk and stops on release.
  function press() {
    if (listening) { pressedAt = 0; stop(); return; }
    pressedAt = Date.now();
    start();
  }
  function release() {
    // A real hold stops on release, but only once the mic was live: letting go while the
    // permission prompt is up would otherwise end listening before it began.
    if (pressedAt && Date.now() - pressedAt > HOLD_MS && audioOn) stop();
    else if (listening) say('Listening… tap fn when you’re done.');
    pressedAt = 0;
  }

  key.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    key.setPointerCapture(e.pointerId);
    press();
  });
  key.addEventListener('pointerup', release);
  key.addEventListener('pointercancel', release);
  key.addEventListener('contextmenu', (e) => e.preventDefault());
  key.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(); }
  });
  key.addEventListener('keyup', (e) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); release(); }
  });

  // Typing, pasting or real Flow dictation into the box.
  field.addEventListener('input', () => { if (!listening) check(); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (PHRASE.test(normalise(field.value))) open();
    else say('Almost. It opens on “Let’s go.”');
  });
  skip.addEventListener('click', open);
}
