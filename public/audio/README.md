# 🎵 Your Song Goes Here

Drop your song file in this folder as:

```
public/audio/our-song.mp3
```

That's it — the player on the site will find it automatically.

## Rules of the song

- **It never autoplays.** It only plays when she presses play.
- Play/pause, a seek bar, mute, and volume are all built in.
- Any common audio format works if you also update the extension in
  `src/config/content.js` (`song.src`), e.g. `audio/our-song.m4a`.
- You can also paste a direct, CORS-friendly `https://` audio URL into
  `song.src` instead of a file.

## If the file is missing

The music section shows a friendly note explaining where to put the song.
Nothing else on the site breaks.

## Copyright

Use a song file you have the right to use (a personal copy is fine for a
private gift website like this one — just don't re-publish it publicly
with the music bundled in).
