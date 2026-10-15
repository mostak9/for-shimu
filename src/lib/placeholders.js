/**
 * Atmospheric placeholder images (ships with the site in /public/images).
 * When a personal photo is missing, the <Photo> component falls back to one of
 * these tasteful visuals with a clear "add your photo" tag — never fake photos
 * of the couple.
 */
export const ATMOSPHERIC_IMAGES = [
  'images/sunset-dreamy.jpg',
  'images/moonlit.jpg',
  'images/flowers-roses.jpg',
  'images/city-lights.jpg',
  'images/landscape-dream.jpg',
  'images/night-sky.jpg',
  'images/final-cinematic.jpg',
];

/** Deterministic atmospheric fallback for a given slot (keeps layout stable). */
export function atmosphericFor(index = 0) {
  return ATMOSPHERIC_IMAGES[index % ATMOSPHERIC_IMAGES.length];
}

/** Formats a config image path into the expected public path (for hint text). */
export function expectedPathLabel(src) {
  if (!src) return 'public/images/your-photo.jpg';
  return `public/${src.replace(/^\/+/, '')}`;
}
