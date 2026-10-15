/* ==========================================================================
   ✦  PERSONALIZE EVERYTHING HERE  ✦
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to make this website truly yours.

   How to use:
   1. Open this file in any text editor.
   2. Replace the sample text between quotes with your own words.
   3. Replace image paths once you add photos to  public/images/
      (e.g. "images/hero-couple.jpg").
   4. Save the file — the website updates automatically.

   ⚠ ABOUT THE SAMPLE CONTENT IN THIS FILE ⚠
   Everything written below is polished, editable SAMPLE content — invented
   stories, dates, captions, and images — so the website feels finished from
   the first click. None of it is your real history. Search this file for
   "SAMPLE" to find every block you should replace with your true memories.
   ========================================================================== */

export const site = {
  /* ---------- The two people this site belongs to ---------- */
  herName: 'Shimu',
  herFullName: 'Suraiya Sharmin Shimu',
  yourName: 'Mostak',

  /* Browser tab title */
  pageTitle: 'Happy Birthday, Shimu ❤️ | A Little Universe for You',
};

/* ==========================================================================
   1 · OPENING SCREEN
   ========================================================================== */
export const opening = {
  /* Small line above the headline */
  eyebrow: 'A little something made only for you',

  headline: 'For the girl who became one of my favorite parts of being alive.',

  birthdayLine: 'Happy Birthday, Shimu ❤️',

  buttonLabel: 'Open Your Little Universe',

  skipLabel: 'Skip the intro',

  /* Message shown briefly as the envelope opens (handwritten style) */
  envelopeNote: {
    greeting: 'To my Shimu,',
    body: 'Before the candles, before the cake — I just want you to know how deeply glad I am that you exist.',
    signOff: 'Yours, Mostak',
  },
};

/* ==========================================================================
   2 · THE BIRTHDAY LETTER
   Every paragraph is a separate string. Add, remove, or rewrite freely.
   ========================================================================== */
export const letter = {
  title: 'A Letter for You',
  /* Small handwritten annotation near the title */
  annotation: 'read this slowly — it is not going anywhere',

  greeting: 'To my Shimu,',

  paragraphs: [
    'Today is about celebrating you. But if I’m honest, a part of me also wants to celebrate all the little moments that brought you into my life.',
    'You have this quiet way of making ordinary days feel like they matter. A random conversation, a silly complaint about a long day, the way you laugh when something catches you off guard — I keep these moments longer than I probably admit. They are small, but they are mine, and they are ours.',
    'I do not always find the right words quickly. Sometimes it takes me a while to say what I feel. But I hope you know how special you are to me — not for one grand reason, but for a thousand small ones I keep noticing over time.',
    'Thank you for the memories we have already made. Thank you for the patience, the honesty, and the softness you bring into my life. Getting to share days with you — even the quiet, unremarkable ones — has made my world warmer than it was before you.',
    'I do not want to promise you a perfect future, because life does not work that way. What I can say is this: I want to keep growing, keep learning, and keep building something beautiful with you — slowly, honestly, and with care.',
    'And when the happy days come, I want to celebrate them beside you. When the difficult days come, I want to sit with you in them, listen, and find our way through together. You should never have to carry the hard parts alone.',
    'Your birthday feels like a quiet reminder from the universe — that it became a little more meaningful the day you came into it. I am so grateful that I get to know you, to care about you, and to share some of my story with yours.',
  ],

  closing: 'With all the love I sometimes struggle to put into words,',
  closingLine2: 'Yours, always.',
  signature: 'Mostak ❤️',

  /* Button labels */
  replayLabel: 'Replay this letter',
};

/* ==========================================================================
   3 · MEMORY LANE
   ⚠ SAMPLE STORIES & DATES — every entry below is invented as a polished
   starting point. Replace titles, captions, dates, and notes with your REAL
   memories before you send this to her. Keep 6–12 entries.
   ========================================================================== */
export const memories = {
  title: 'Little Moments, A Whole Lot of Love',
  subtitle:
    'A scrapbook of the chapters we have already written — and the ones still waiting for us.',
  annotation: 'tap any polaroid to see it larger',

  /* Category filter chips (must match `category` values below) */
  categories: [
    { id: 'all', label: 'All moments' },
    { id: 'beginning', label: 'The beginning' },
    { id: 'first-special', label: 'First special moments' },
    { id: 'funny', label: 'Funniest memories' },
    { id: 'everyday', label: 'Little conversations' },
    { id: 'missing', label: 'Missing each other' },
    { id: 'hard-days', label: 'Difficult days' },
    { id: 'laughter', label: 'Things that made us laugh' },
    { id: 'relive', label: 'Moments I wish I could relive' },
    { id: 'dreams', label: 'Dreams still waiting' },
  ],

  entries: [
    /* SAMPLE — replace with the true story of your beginning */
    {
      id: 'm1',
      category: 'beginning',
      dateLabel: 'August 20, 2022',
      title: 'The day everything quietly started',
      caption:
        'I still remember how ordinary that day was supposed to be. We talked for hours about nothing at all — and somehow “nothing at all” became the conversation I replayed the whole way home.',
      note: 'I think about that first conversation more than I admit.',
      image: 'images/spring-garden-path.jpg', /* ← replace with images/memory-01.jpg */
      rotation: -2.2,
    },
    /* SAMPLE — replace with the first moment she became more than ordinary */
    {
      id: 'm2',
      category: 'first-special',
      dateLabel: 'October 2, 2022',
      title: 'The first moment you felt like home',
      caption:
        'It was such a small thing — the way you listened, the way you laughed at something I said. But something in me quietly rearranged itself around that moment.',
      note: 'That was the night I started falling.',
      image: 'images/cherry-blossom.jpg', /* ← replace with images/memory-02.jpg */
      rotation: 1.8,
    },
    /* SAMPLE — replace with your funniest inside joke */
    {
      id: 'm3',
      category: 'funny',
      dateLabel: 'December 11, 2022',
      title: 'The laugh that broke the whole evening',
      caption:
        'You made that ridiculous face, I said something even worse, and we completely lost it. I remember thinking: I could listen to this laugh forever and never get bored.',
      note: 'We still laugh about it. We always will.',
      image: 'images/golden-bokeh-fair.jpg', /* ← replace with images/memory-03.jpg */
      rotation: -1.4,
    },
    /* SAMPLE — replace with a real everyday conversation that stayed with you */
    {
      id: 'm4',
      category: 'everyday',
      dateLabel: 'February 14, 2023',
      title: 'A perfectly ordinary conversation',
      caption:
        'Nothing happened that day. We talked about our days, sent each other silly things, stayed up a little too late. Somehow it is one of the memories I protect the most.',
      note: 'Ordinary with you is my favorite kind of extraordinary.',
      image: 'images/coffee-slow-morning.jpg', /* ← replace with images/memory-04.jpg */
      rotation: 2.4,
    },
    /* SAMPLE — replace with a real day of missing her */
    {
      id: 'm5',
      category: 'missing',
      dateLabel: 'April 30, 2023',
      title: 'One of the nights I missed you most',
      caption:
        'Distance has a way of making the heart honest. That night, all I wanted was to sit beside you in silence and let the world carry on without us.',
      note: 'Missing you is just loving you with nowhere to put it.',
      image: 'images/rainy-window.jpg', /* ← replace with images/memory-05.jpg */
      rotation: -2.8,
    },
    /* SAMPLE — replace with a difficult day you overcame together */
    {
      id: 'm6',
      category: 'hard-days',
      dateLabel: 'July 8, 2023',
      title: 'The day we got through it together',
      caption:
        'It was not an easy day. But we stayed honest, we stayed gentle, and we came out of it stronger than we went in. That is when I knew this was real.',
      note: 'We got through it. We always do.',
      image: 'images/vintage-letters.jpg', /* ← replace with images/memory-06.jpg */
      rotation: 1.2,
    },
    /* SAMPLE — replace with something that made you both laugh until it hurt */
    {
      id: 'm7',
      category: 'laughter',
      dateLabel: 'September 19, 2023',
      title: 'Laughing until it hurt',
      caption:
        'I don’t even remember who started it. I only remember my stomach hurting, tears on my face, and you looking at me like I was the funniest person alive.',
      note: 'You make the funniest faces. Never, ever stop.',
      image: 'images/candle-warm-dark.jpg', /* ← replace with images/memory-07.jpg */
      rotation: -1.9,
    },
    /* SAMPLE — replace with one moment you wish you could step back into */
    {
      id: 'm8',
      category: 'relive',
      dateLabel: 'November 25, 2023',
      title: 'A moment I wish I could relive',
      caption:
        'If I could step back into one single moment, it would be this one — the quiet part, where everything felt safe and simple and entirely ours.',
      note: 'If time machines existed, I would choose this one.',
      image: 'images/seashore-sunset.jpg', /* ← replace with images/memory-08.jpg */
      rotation: 2.1,
    },
    /* SAMPLE — replace with a real shared dream */
    {
      id: 'm9',
      category: 'dreams',
      dateLabel: 'Someday soon',
      title: 'The trip we keep talking about',
      caption:
        'We keep imagining it: new streets, unfamiliar skies, your hand in mine, and nowhere we need to rush to. It is still out there, patiently waiting for us.',
      note: 'Add this one to our someday list.',
      image: 'images/misty-mountains.jpg', /* ← replace with images/memory-09.jpg */
      rotation: -1.1,
    },
    /* SAMPLE — replace with a real shared dream */
    {
      id: 'm10',
      category: 'dreams',
      dateLabel: 'Someday soon',
      title: 'The little traditions we haven’t built yet',
      caption:
        'Slow mornings with no alarms. A hundred small things we haven’t done yet. A life built carefully, on purpose, together — one ordinary day at a time.',
      note: 'One day. We have all the time in the world.',
      image: 'images/starlit-road.jpg', /* ← replace with images/memory-10.jpg */
      rotation: 1.6,
    },
  ],
};

/* ==========================================================================
   4 · PHOTO GALLERY
   ⚠ SAMPLE CAPTIONS — replace with your real ones.
   Image paths currently point at the included dreamy artwork so every frame
   looks finished. Swap each one for a real photo in public/images/.
   ========================================================================== */
export const gallery = {
  title: 'The Photographs We Keep',
  subtitle: 'Frames from a story I never want to stop telling.',

  /* Big opening photograph — use your favorite picture of you two */
  hero: {
    image: 'images/sunset-dreamy.jpg', /* ← replace with images/hero-couple.jpg */
    caption: 'The photo I would save before anything else',
    note: 'the first one I’d grab in a fire',
  },

  /* Polaroid collage */
  collageTitle: 'Pinned to the wall of my favorite memories',
  collage: [
    {
      id: 'g1',
      image: 'images/flowers-roses.jpg', /* ← replace with images/photo-01.jpg */
      caption: 'You made me stop and notice the flowers',
      date: 'one gentle spring',
      rotation: -3.5,
    },
    {
      id: 'g2',
      image: 'images/city-lights.jpg', /* ← replace with images/photo-02.jpg */
      caption: 'The city looked like us that night',
      date: 'a night in winter',
      rotation: 2.2,
    },
    {
      id: 'g3',
      image: 'images/landscape-dream.jpg', /* ← replace with images/photo-03.jpg */
      caption: 'Somewhere quiet, completely lost — and happy about it',
      date: 'that long weekend',
      rotation: -1.6,
    },
    {
      id: 'g4',
      image: 'images/night-sky.jpg', /* ← replace with images/photo-04.jpg */
      caption: 'Under the same sky, thinking the same things',
      date: 'a clear midnight',
      rotation: 3.1,
    },
    {
      id: 'g5',
      image: 'images/final-cinematic.jpg', /* ← replace with images/photo-05.jpg */
      caption: 'The end of a very good day',
      date: 'golden hour',
      rotation: -2.4,
    },
    {
      id: 'g6',
      image: 'images/cherry-blossom.jpg', /* ← replace with images/photo-06.jpg */
      caption: 'Everything felt new that afternoon',
      date: 'the first spring',
      rotation: 1.4,
    },
  ],

  /* Film strip row */
  filmStripTitle: 'A reel of ordinary days I want to keep forever',
  filmStrip: [
    {
      id: 'f1',
      image: 'images/coffee-slow-morning.jpg', /* ← replace with images/photo-07.jpg */
      caption: 'slow mornings',
    },
    {
      id: 'f2',
      image: 'images/rainy-window.jpg', /* ← replace with images/photo-08.jpg */
      caption: 'rainy-day phone calls',
    },
    {
      id: 'f3',
      image: 'images/golden-bokeh-fair.jpg', /* ← replace with images/photo-09.jpg */
      caption: 'the night we stayed out too late',
    },
    {
      id: 'f4',
      image: 'images/seashore-sunset.jpg', /* ← replace with images/photo-10.jpg */
      caption: 'waves & promises',
    },
    {
      id: 'f5',
      image: 'images/candle-warm-dark.jpg', /* ← replace with images/photo-11.jpg */
      caption: 'warm & unhurried',
    },
  ],

  /* Scrapbook with handwritten captions */
  scrapbookTitle: 'Notes I would have written in the margins',
  scrapbook: [
    {
      id: 's1',
      image: 'images/vintage-letters.jpg', /* ← replace with images/photo-12.jpg */
      caption:
        'I wrote this one three times before I stopped editing. Some things don’t need perfect words — they just need to be said.',
      date: 'a quiet evening',
    },
    {
      id: 's2',
      image: 'images/misty-mountains.jpg', /* ← replace with images/photo-13.jpg */
      caption: 'We stood here and said nothing for a while. It was perfect.',
      date: 'the morning after',
    },
    {
      id: 's3',
      image: 'images/starlit-road.jpg', /* ← replace with images/photo-14.jpg */
      caption: 'Somewhere on the way home, I looked at you and thought: yes. this is my person.',
      date: 'a long drive',
    },
    {
      id: 's4',
      image: 'images/spring-garden-path.jpg', /* ← replace with images/photo-15.jpg */
      caption: 'The small things are the whole thing. This is one of them.',
      date: 'a soft afternoon',
    },
  ],

  /* Special centered portrait */
  favorite: {
    title: 'My Favorite View Is You',
    image: 'images/moonlit.jpg', /* ← replace with images/favorite-photo.jpg */
    caption: 'My favorite view is still you',
    note: 'I could look at you like this for a very long time.',
    annotation: 'this one is my favorite — you already know why',
  },
};

/* ==========================================================================
   5 · PROMISES
   Each card flips open on tap/click. Add or remove as many as you like.
   ========================================================================== */
export const promises = {
  title: 'If I Could Promise You a Thousand Things…',
  subtitle: 'Tap each little envelope. I wrote these slowly, and I meant every one.',
  cardLabel: 'Tap to open',

  cards: [
    {
      id: 'p1',
      shortTitle: 'To listen',
      text: 'I promise to listen, even when finding the right words is difficult.',
    },
    {
      id: 'p2',
      shortTitle: 'To respect',
      text: 'I promise to respect your feelings, even when we see things differently.',
    },
    {
      id: 'p3',
      shortTitle: 'To celebrate',
      text: 'I promise to celebrate your little victories as much as your biggest achievements.',
    },
    {
      id: 'p4',
      shortTitle: 'To learn',
      text: 'I promise to keep learning how to love you better.',
    },
    {
      id: 'p5',
      shortTitle: 'To make space',
      text: 'I promise to make space for your dreams, your independence, and your happiness.',
    },
    {
      id: 'p6',
      shortTitle: 'To be patient',
      text: 'I promise that difficult days will be met with patience, honest conversations, and care.',
    },
    {
      id: 'p7',
      shortTitle: 'To keep choosing',
      text: 'I promise to keep choosing honesty, effort, and understanding.',
    },
    {
      id: 'p8',
      shortTitle: 'To stay present',
      text: 'I promise to be beside you on the loud, happy days — and on the quiet, heavy ones too.',
    },
    {
      id: 'p9',
      shortTitle: 'To protect this',
      text: 'I promise to treat what we share with tenderness, never taking it for granted.',
    },
    {
      id: 'p10',
      shortTitle: 'To grow with you',
      text: 'I promise to keep growing as a person — so that the me of next year can love you even better than the me of today.',
    },
  ],

  finalPromise: {
    title: 'One Last Promise',
    text: 'I cannot promise that every day will be perfect. But I can promise to keep showing up, to keep learning, and to keep treating what we share with care. When life gets difficult, I want us to face it with honesty, patience, and love. You don’t have to be happy every moment to be loved by me.',
  },
};

/* ==========================================================================
   6 · BIRTHDAY CAKE
   ========================================================================== */
export const cake = {
  title: 'Make a wish, birthday girl.',
  subtitle: 'Tap each candle — take your time, the wish matters more than the smoke.',
  blowAllLabel: 'Blow out all the candles',
  relightLabel: 'Light the candles again',

  /* Reveal text after all candles are out */
  wishMessage:
    'Whatever this new chapter brings, I hope it gives you more reasons to smile, more courage to chase your dreams, and more moments that make you feel truly loved.',

  candleCount: 5,
};

/* ==========================================================================
   7 · HIDDEN LOVE NOTES
   `locked: true` notes unlock automatically as she explores the site.
   Edit `unlockAfter` = how many sections must be opened before it unlocks.
   ========================================================================== */
export const notes = {
  title: 'Little Things I Want You to Remember',
  subtitle: 'Some of these I have said before. Some I think quietly, often.',
  tapHint: 'tap to open',

  lockedHint: 'This one unlocks as you wander through more of our story',
  unlockToast: 'A new note just unlocked somewhere below…',

  items: [
    {
      id: 'n1',
      kind: 'note',
      text: 'You don’t have to be perfect to be precious to me.',
      locked: false,
    },
    {
      id: 'n2',
      kind: 'star',
      text: 'I hope you never forget how much your dreams matter.',
      locked: false,
    },
    {
      id: 'n3',
      kind: 'note',
      text: 'On the days you doubt yourself, I hope you remember how capable you are.',
      locked: false,
    },
    {
      id: 'n4',
      kind: 'polaroid',
      text: 'Some of my favorite moments are the ordinary ones that include you.',
      locked: false,
    },
    {
      id: 'n5',
      kind: 'star',
      text: 'You deserve gentleness, happiness, respect, and peace.',
      locked: false,
    },
    {
      id: 'n6',
      kind: 'note',
      text: 'Even on days when I cannot be beside you physically, I hope you feel cared for.',
      locked: false,
    },
    {
      id: 'n7',
      kind: 'envelope',
      text: 'If I could give you one thing, it would be the ability to see yourself the way I see you.',
      locked: true,
      unlockAfter: 3,
    },
    {
      id: 'n8',
      kind: 'star',
      text: 'Thank you for every version of yourself you have trusted me with.',
      locked: true,
      unlockAfter: 5,
    },
    {
      id: 'n9',
      kind: 'envelope',
      text: 'Whatever this year becomes — I am already proud of who you are becoming.',
      locked: true,
      unlockAfter: 7,
    },
  ],
};

/* ==========================================================================
   8 · TIME CAPSULE
   A letter from today, for your future selves.
   ========================================================================== */
export const timeCapsule = {
  title: 'Letters From Today to Our Tomorrow',
  subtitle:
    'Write something to the two of us, a few years from now. It stays saved on this device — private, quiet, yours.',

  letterLabel: 'A letter for our future selves',

  /* Prompt cards shown beside the letter — SAMPLE answers, replace freely */
  prompts: [
    {
      id: 't1',
      title: 'What I hope we learn together',
      example: 'Patience — with the world, and especially with ourselves.',
    },
    {
      id: 't2',
      title: 'Places we dream of visiting',
      example: 'A quiet seaside town. A city that never sleeps. Somewhere with mountains and no phone signal.',
    },
    {
      id: 't3',
      title: 'Small things we want to experience',
      example: 'Slow mornings. Cooking something badly together. A thousand more pointless, perfect conversations.',
    },
    {
      id: 't4',
      title: 'The relationship we want to keep building',
      example: 'Honest. Gentle. Full of laughter. A place where we can both be fully ourselves.',
    },
    {
      id: 't5',
      title: 'A message we might smile at later',
      example: 'If you are reading this years from now — I hope we still tease each other like this.',
    },
  ],

  /* SAMPLE starter text inside the editable letter — she can rewrite it live */
  draft:
    'Dear future us,\n\nIf you are reading this, I hope we are somewhere warm — maybe the same place, maybe somewhere new. I hope we still make each other laugh at the stupidest things.\n\nWhat I hope we learned: patience — especially with ourselves. What I hope we saw: every place on our someday list, and a hundred we haven’t dreamed of yet. What I hope we kept: slow mornings, honest conversations, and the quiet habit of choosing each other on ordinary days.\n\nWhatever changed between now and then, I hope we were gentle with it.\n\nWith love,\nMostak',

  sealButton: 'Seal This Memory',
  unsealButton: 'Open it again',
  sealedNote: 'Sealed and saved on this device. Only you two can read it — whenever you are ready.',
  draftNote: 'Your writing is saved on this device as you type.',
  privacyNote:
    'This letter is stored only in your browser (localStorage). It is never sent anywhere — this website has no server. Please do not write anything here that you would not want only on this device.',
};

/* ==========================================================================
   9 · OUR SONG
   Add a song file at:  public/audio/our-song.mp3
   (or paste a direct, CORS-friendly audio URL below).
   The song NEVER autoplays — it only plays when she chooses.
   ========================================================================== */
export const song = {
  enabled: true,
  title: 'Our Song',
  subtitle: 'For the ordinary moments that somehow feel like everything.',
  src: 'audio/our-song.mp3', /* ← replace with your file (public/audio/our-song.mp3) or a full https:// URL */
  songName: 'Perfect — Ed Sheeran', /* SAMPLE — replace with your song */
  note: 'every time I hear this now, I think of you',

  missingTitle: 'The song is not here yet',
  missingText:
    'Drop your song file into  public/audio/our-song.mp3  (or set a URL in src/config/content.js) and it will appear here — ready whenever she presses play.',
};

/* ==========================================================================
   10 · FINAL SCREEN
   ========================================================================== */
export const finalScreen = {
  background: 'images/final-cinematic.jpg', /* ← replace with images/hero-couple.jpg to use your own photo behind the finale */

  headline: 'One birthday. A thousand little memories. And so many chapters still unwritten.',

  paragraphs: [
    'Happy Birthday, my Shimu.',
    'If I could give you one thing beyond everything else, it would be the ability to see yourself through the moments when I see you with so much affection, respect, and admiration.',
    'I hope this year brings you closer to the person you dream of becoming. I hope you laugh freely, feel peaceful, achieve things that make you proud, and find happiness in the smallest parts of life.',
    'And wherever life takes us, I hope we keep finding our way toward honest conversations, gentle understanding, and the little moments that make love feel like home.',
    'Thank you for being part of my story.',
    'Today, tomorrow, and through all the ordinary days in between, I want to keep making beautiful memories with you.',
    'Happy Birthday, Shimu.',
  ],

  closing: 'With love,',
  signature: 'Mostak ❤️',

  replayButton: 'Replay Our Little Story',

  /* Tiny line under the replay button */
  footerNote: 'made with real time, real thought, and a great deal of love',
};
