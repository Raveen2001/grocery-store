export default function Logo({ size = 40 }: { size?: number }) {
  const padding = size * 0.18;
  const iconSize = size - padding * 2;
  return (
    <div
      className="bg-brand-600 rounded-xl flex items-center justify-center shrink-0"
      style={{ width: size, height: size, padding }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cart basket */}
        <path
          d="M6.5 6.5H21L19 14H8L6.5 6.5Z"
          fill="rgba(255,255,255,0.25)"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Cart handle */}
        <path
          d="M6.5 6.5L5.5 3H2"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bottom line to wheels */}
        <path
          d="M8 14L7 17H19"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Wheels */}
        <circle cx="9.5" cy="20" r="1.5" fill="white" />
        <circle cx="17.5" cy="20" r="1.5" fill="white" />
        {/* Leaf accent */}
        <path
          d="M14 4C14 4 16.5 2 19 2C19 4.5 17 7 14 7C14 7 14 5.5 14 4Z"
          fill="#86efac"
          stroke="#86efac"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 6.5C15.5 5 17 3.5 18.5 2.5"
          stroke="white"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
