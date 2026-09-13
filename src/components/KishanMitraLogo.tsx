import React from 'react';

interface KishanMitraLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'horizontal';
  showText?: boolean;
  textColor?: 'dark' | 'light';
  className?: string;
}

export const KishanMitraLogo: React.FC<KishanMitraLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  showText = true,
  textColor = 'dark',
  className = '',
}) => {
  const iconSizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textHeadingSizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };

  const textSubheadingSizeMap = {
    xs: 'text-[9px]',
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  };

  // The emblem: Left golden hand + Right green hand cupping a sprouting seedling & golden wheat ear
  const emblemSvg = (
    <svg
      viewBox="0 0 100 100"
      className={`${iconSizeMap[size]} shrink-0 drop-shadow-xs transition-transform duration-300 group-hover:scale-105`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kishan Mitra Logo"
    >
      <defs>
        {/* Golden Hand Gradient */}
        <linearGradient id="goldenHandGrad" x1="20" y1="80" x2="45" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>

        {/* Green Hand Gradient */}
        <linearGradient id="greenHandGrad" x1="80" y1="80" x2="55" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14532D" />
          <stop offset="50%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>

        {/* Central Sprout Green Gradient */}
        <linearGradient id="sproutGrad" x1="50" y1="65" x2="45" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>

        {/* Wheat Golden Gradient */}
        <linearGradient id="wheatGrad" x1="55" y1="45" x2="65" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FDE047" />
        </linearGradient>
      </defs>

      {/* LEFT GOLDEN HAND (Curved cupping hand from bottom left to center) */}
      <path
        d="M 28 40 C 26 44 26 50 30 57 C 35 65 42 70 50 72 C 43 71 34 68 28 60 C 23 53 21 44 24 37 C 25 35 27 34 29 35 C 30 36 30 38 28 40 Z"
        fill="url(#goldenHandGrad)"
      />
      <path
        d="M 22 41 C 21 47 23 55 28 62 C 34 70 42 75 51 76 C 42 76 31 72 23 63 C 16 54 16 43 20 35 C 22 31 26 31 27 34 C 28 36 25 38 22 41 Z"
        fill="url(#goldenHandGrad)"
      />
      {/* Palm body */}
      <path
        d="M 23 37 C 22 44 24 53 30 62 C 36 71 45 76 52 76 C 43 75 32 69 26 59 C 21 50 20 40 23 37 Z"
        fill="#F59E0B"
      />

      {/* RIGHT GREEN HAND (Curved cupping hand from bottom right to center) */}
      <path
        d="M 72 40 C 74 44 74 50 70 57 C 65 65 58 70 50 72 C 57 71 66 68 72 60 C 77 53 79 44 76 37 C 75 35 73 34 71 35 C 70 36 70 38 72 40 Z"
        fill="url(#greenHandGrad)"
      />
      <path
        d="M 78 41 C 79 47 77 55 72 62 C 66 70 58 75 49 76 C 58 76 69 72 77 63 C 84 54 84 43 80 35 C 78 31 74 31 73 34 C 72 36 75 38 78 41 Z"
        fill="url(#greenHandGrad)"
      />
      {/* Palm body */}
      <path
        d="M 77 37 C 78 44 76 53 70 62 C 64 71 55 76 48 76 C 57 75 68 69 74 59 C 79 50 80 40 77 37 Z"
        fill="#16A34A"
      />

      {/* CENTRAL STEM & SPROUT */}
      {/* Main central green stem */}
      <path
        d="M 50 70 Q 49 50 48 33"
        stroke="url(#sproutGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Left Leaf 1 (lower) */}
      <path
        d="M 48 50 C 40 47 36 41 39 37 C 43 35 47 41 48 48 Z"
        fill="url(#sproutGrad)"
      />

      {/* Left Leaf 2 (upper) */}
      <path
        d="M 48 38 C 40 33 38 26 43 23 C 48 22 50 28 48 35 Z"
        fill="url(#sproutGrad)"
      />

      {/* Topmost central tip leaf */}
      <path
        d="M 48 30 C 46 22 48 16 50 16 C 52 16 53 23 49 30 Z"
        fill="#22C55E"
      />

      {/* GOLDEN WHEAT EAR (on the right of stem, curving upward) */}
      {/* Wheat stem line */}
      <path
        d="M 49 50 Q 54 42 61 30"
        stroke="#D97706"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Wheat grains (stylized oval grains) */}
      {/* Grain 1 */}
      <path
        d="M 50 45 C 54 42 58 43 56 46 C 54 49 51 47 50 45 Z"
        fill="url(#wheatGrad)"
      />
      {/* Grain 2 */}
      <path
        d="M 53 40 C 58 37 62 38 60 41 C 58 44 54 42 53 40 Z"
        fill="url(#wheatGrad)"
      />
      {/* Grain 3 */}
      <path
        d="M 56 35 C 61 31 65 32 63 36 C 61 39 57 37 56 35 Z"
        fill="url(#wheatGrad)"
      />
      {/* Grain 4 */}
      <path
        d="M 59 30 C 64 25 67 27 65 30 C 63 33 60 32 59 30 Z"
        fill="url(#wheatGrad)"
      />
      {/* Wheat tip grain / awn */}
      <path
        d="M 61 27 C 65 21 68 22 66 25 C 64 27 62 27 61 27 Z"
        fill="#FDE047"
      />
      {/* Wheat whisker/awn line */}
      <path
        d="M 65 23 L 70 17"
        stroke="#D97706"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'icon-only' || !showText) {
    return <div className={`inline-flex items-center justify-center ${className}`}>{emblemSvg}</div>;
  }

  if (variant === 'full') {
    // Centered stacked layout like the screenshot card
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        {emblemSvg}
        <div className="mt-1 flex flex-col items-center">
          <span
            className={`font-extrabold tracking-tight leading-none ${textHeadingSizeMap[size]} ${
              textColor === 'light' ? 'text-emerald-300' : 'text-emerald-800'
            }`}
          >
            किसान<span className={textColor === 'light' ? 'text-amber-300' : 'text-emerald-700'}>Mitra</span>
          </span>
          <span
            className={`font-semibold tracking-wide leading-tight ${textSubheadingSizeMap[size]} ${
              textColor === 'light' ? 'text-emerald-200/90' : 'text-emerald-700'
            }`}
          >
            Kishan Mitra
          </span>
        </div>
      </div>
    );
  }

  // Horizontal layout for navbar / header / cards
  return (
    <div className={`inline-flex items-center gap-2.5 group ${className}`}>
      {emblemSvg}
      <div className="flex flex-col justify-center leading-tight">
        <span
          className={`font-extrabold tracking-tight ${textHeadingSizeMap[size]} ${
            textColor === 'light' ? 'text-white' : 'text-stone-900'
          }`}
        >
          <span className={textColor === 'light' ? 'text-emerald-400' : 'text-emerald-700'}>किसान</span>
          <span className={textColor === 'light' ? 'text-amber-300' : 'text-emerald-800'}>Mitra</span>
        </span>
        <span
          className={`font-semibold tracking-wider uppercase text-[10px] sm:text-xs ${
            textColor === 'light' ? 'text-emerald-200/80' : 'text-emerald-600'
          }`}
        >
          Kishan Mitra
        </span>
      </div>
    </div>
  );
};
