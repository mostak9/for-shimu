# A Little Universe for Shimu 🌙

**Happy Birthday, Suraiya Sharmin Shimu — from Mostak.**

A private, cinematic digital love letter: a sealed letter under a night sky,
a handwritten birthday letter, a scrapbook of memories, a photo gallery,
promises sealed in wax, a birthday cake with candles, hidden love notes,
a time capsule for your future selves, your song, and a final promise of presence.

---

## ✦ Run it locally

```bash
npm install
npm run dev        # open the printed http://localhost:5173 link
```

Build the finished version (for deploying):

```bash
npm run build      # produces a static site in  dist/
npm run preview    # preview that build locally
```

---

## ✦ Make it yours — everything lives in ONE file

Open **`src/config/content.js`**. Every word, photo path, promise, note,
letter, and caption on the entire site is there, in plain language, with
comments. Some quick entry points:

| Section | In `content.js` | Notes |
|---|---|---|
| Names & page title | `site` | `herName`, `herFullName`, `yourName` |
| Opening screen | `opening` | Headline, button label, envelope note |
| The birthday letter | `letter` | `letter.paragraphs` is an array — add/remove/rewrite freely |
| Memory Lane timeline | `memories.entries` | Every entry is **clearly marked `[PLACEHOLDER]`** — replace with your real memories & dates |
| Photo gallery | `gallery` | Hero, collage, film strip, scrapbook, "My Favorite View Is You" |
| Promise cards | `promises.cards` | Add/remove/edit; `finalPromise` is the last envelope |
| Birthday cake | `cake` | Wish message, button labels, `candleCount` |
| Hidden love notes | `notes.items` | Edit texts; `locked` notes unlock as she explores |
| Time capsule | `timeCapsule` | Prompts + starter letter (she can also type her own) |
| Our song | `song` | Path/name/labels |
| Final screen | `finalScreen` | The closing letter & signature |

> **No fabricated memories ship in this site.** Sample memories, dates, and
> captions are all tagged `[PLACEHOLDER]` / `[ADD THE DATE]` so you always
> know what to replace.

### Photos

Put your photographs in **`public/images/`** — see
`public/images/README.md` for the exact file names used by the default
config (`hero-couple.jpg`, `memory-01.jpg`, `photo-01.jpg`, …).
Any photo you don't add shows an elegant atmospheric placeholder with a
small "Add your photo" tag — **nothing ever breaks**.

### Song

Drop your file at **`public/audio/our-song.mp3`** — see
`public/audio/README.md`. It will **never** autoplay; it only plays when
she presses play.

---

## ✦ What's built in

- **Cinematic opening** — animated night sky, sealed envelope with wax seal,
  handwritten reveal, skip-intro option
- **Typing letter** on paper with replay
- **Scrollable Memory Lane** with category filters, Polaroids, and a lightbox
- **Photo gallery** — hero shot, Polaroid collage, film strip, scrapbook,
  full-screen lightbox (← → / Esc), and "My Favorite View Is You"
- **Promise envelopes** that open on tap + "One Last Promise"
- **Interactive cake** — tap candles (mouse, touch, or keyboard), smoke wisps,
  golden particles, relight
- **Hidden notes** that gently unlock as she explores (no chores, no forms)
- **Time capsule** — editable future letter, wax-seal animation, saved in the
  browser only (`localStorage`). It is honest: nothing is "delivered" or
  scheduled to a future date.
- **Music player** + floating mini-player with visualizer
- **Final screen** with cinematic photo overlay and "Replay Our Little Story"
- Reading-progress bar, chapter navigation (desktop bar + mobile overlay menu),
  film grain, soft petals, light leaks, golden motes
- **Accessible**: keyboard-navigable, readable contrast, `prefers-reduced-motion`
  respected everywhere, focus rings, ARIA labels
- **Responsive**: mobile-first, touch-friendly, works on phones → desktops
- Local fonts (no CDN needed), custom favicon, meaningful `<title>`

---

## ✦ Where visitor data is stored

Only in **her own browser**, and only:

| Key | What |
|---|---|
| `shimu:visited-sections` | Which chapters she has opened (unlocks hidden notes) |
| `shimu:open-notes` | Which notes she has opened |
| `shimu:time-capsule-draft` | Her unsaved-to-anyone letter draft |
| `shimu:time-capsule-sealed` | Whether the letter is sealed |

There is **no server, no database, nothing is sent anywhere.**

---

## ✦ Publish it on GitHub (GitHub Pages)

The project comes **ready to publish**: a GitHub Actions workflow
(`.github/workflows/deploy.yml`) builds the site, runs the full interaction
test, and deploys it to GitHub Pages every time you push.

### Step 1 — Put the project on GitHub

On your own computer (or anywhere with git + your GitHub login):

```bash
# from inside this project folder
git init
git add .
git commit -m "A little universe for Shimu"

# create the repo and push in one command (GitHub CLI):
gh repo create little-universe-for-shimu --public --source . --push
```

No GitHub CLI? Do it by hand instead:

1. Go to [github.com/new](https://github.com/new) and create a repository named
   e.g. **`little-universe-for-shimu`** (Public — required for Pages on free
   accounts), **do not** add a README.
2. Then run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/little-universe-for-shimu.git
git branch -M main
git push -u origin main
```

*(You can also use **GitHub Desktop** — create the repo there and drag this
folder in, then publish.)*

### Step 2 — Turn on GitHub Pages (one time, 20 seconds)

In the new repo: **Settings → Pages → Build and deployment → Source** and
choose **"GitHub Actions"**.

### Step 3 — Wait for the green checkmark

Open the **Actions** tab — the workflow builds, tests, and publishes in about
a minute. Your site is then live at:

```
https://YOUR-USERNAME.github.io/little-universe-for-shimu/
```

From now on, **every `git push` republishes the site automatically.**

> **Heads-ups:**
> - On free GitHub accounts the repo must be **Public** (the site is a
>   unlisted link — anyone with the URL can open it). If you'd rather keep it
>   fully private, use Netlify or Vercel instead (below).
> - If the very first workflow run fails, double-check Step 2 (Source must be
>   "GitHub Actions"), then re-run the workflow from the Actions tab.

---

## ✦ Deploy elsewhere

The site is 100% static. Other easy options:

### Netlify (fastest, ~30 seconds)
1. Run `npm run build`.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the `dist` folder into the page.
4. You get a link like `https://your-name.netlify.app` — send it to her.

### Vercel
1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
4. Deploy — you get `https://your-project.vercel.app`.

> All the images, fonts, and audio are bundled inside the project — the
> deployed site works on any static host with **zero configuration**.

---

## ✦ A suggestion for the moment you give it to her

Send her the link with one line, something like:
*"I made you something. Take your time with it."*

Then let her wander at her own pace. The whole thing is designed to be
discovered slowly — the notes, the candles, the sealed promises, the letter
waiting at the end.

---

Made with real time, real thought, and a great deal of love.
