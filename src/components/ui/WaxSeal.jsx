/**
 * WaxSeal — a little burgundy wax seal with an embossed heart.
 * Used on envelopes, promise cards, and the sealed time capsule.
 */
export default function WaxSeal({
  size = 56,
  label,
  className = '',
  broken = false,
}) {
  return (
    <div
      className={`wax-seal relative flex select-none items-center justify-center rounded-full ${className} ${
        broken ? 'opacity-80' : ''
      }`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" width={size * 0.52} height={size * 0.52} fill="none">
        <path
          d="M24 38c-6.2-5-14.5-10.2-14.5-18.2C9.5 13.6 13.7 10 18.3 10c2.8 0 5 1.3 5.7 3 .7-1.7 2.9-3 5.7-3 4.6 0 8.8 3.6 8.8 9.8 0 8-8.3 13.2-14.5 18.2z"
          fill="rgba(255,225,225,0.28)"
          stroke="rgba(255,235,235,0.5)"
          strokeWidth="1.1"
        />
      </svg>
      {label && (
        <span className="absolute inset-0 flex items-center justify-center font-hand text-sm text-cream/80">
          {label}
        </span>
      )}
    </div>
  );
}
