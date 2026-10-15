# 📸 Your Photographs Go Here

This folder holds every personal photo used on the site.

## Quick start

1. Drop your photos into this folder using the **exact file names** listed below
   (lowercase, no spaces), **or**
2. Open `src/config/content.js` and change each `image:` path to your own file name.

## File names used in the default config

| File name | Where it appears |
|---|---|
| `hero-couple.jpg` | Photo gallery — big hero photograph |
| `memory-01.jpg` … `memory-10.jpg` | Memory Lane timeline polaroids |
| `photo-01.jpg` … `photo-16.jpg` | Polaroid collage (01–06), film strip (07–12), scrapbook (13–16) |
| `favorite-photo.jpg` | "My Favorite View Is You" |
| *(optional)* `final-cinematic.jpg` | Already included as the cinematic finale background — replace it with a real photo of you two if you like |

## Tips

- **JPG or WebP**, around **1200–1600 px wide** is plenty (keeps the site fast).
- **Portraits, selfies, and landscapes all work** — frames use `object-fit: cover`
  in scrapbook slots and `contain` in the full-screen viewer, so nothing is
  awkwardly cropped when opened.
- Any photo you do **not** add simply shows an elegant atmospheric placeholder
  with a small "Add your photo" tag — nothing breaks, ever.
- The 8 `night-sky / sunset / flowers / …` images already in this folder are
  tasteful atmosphere art. Keep them, replace them, or delete them.

## Alt text & captions

Captions, dates, and notes are **not** in this folder — they live in
`src/config/content.js` next to each photo path. Edit them there.
