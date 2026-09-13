import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Droplets, Lightbulb, Sprout } from 'lucide-react';
import { SupportedLanguage } from '../types';

export interface FarmLoaderProps {
  /**
   * Animation style:
   * - 'plant': smooth sprouting and growing green plant with swaying leaves & dewdrops
   * - 'grain': rotating golden ear of wheat with shimmering sunburst aura
   * - 'both': combined sprouting plant with golden wheat crown
   */
  variant?: 'plant' | 'grain' | 'both';
  /**
   * Sizing scale
   */
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  /**
   * Primary loading text displayed to the farmer
   */
  message?: string;
  /**
   * Secondary subtitle or telemetry status
   */
  subMessage?: string;
  /**
   * Whether to rotate farmer tips while waiting to keep the wait engaging
   */
  showTips?: boolean;
  /**
   * Language for tips and messages
   */
  language?: SupportedLanguage;
  /**
   * Optional custom container class
   */
  className?: string;
}

const ROTATING_FARM_TIPS = [
  {
    hi: '💡 टिप: बुवाई के 20-25 दिन बाद पहली हल्की सिंचाई (CRI स्टेज) कल्लों का फुटाव बढ़ाती है।',
    pa: '💡 ਸੁਝਾਅ: ਬਿਜਾਈ ਦੇ 20-25 ਦਿਨਾਂ ਬਾਅਦ ਪਹਿਲੀ ਸਿੰਚਾਈ ਨਾਲ ਫਸਲ ਦਾ ਫੁਟਾਰਾ ਚੰਗਾ ਹੁੰਦਾ ਹੈ।',
    en: '💡 Tip: First light irrigation at CRI stage (20-25 days) maximizes tillering count.'
  },
  {
    hi: '💡 टिप: कीटनाशक का छिड़काव हमेशा सुबह ओस सूखने के बाद या शाम 4 से 6 बजे के बीच करें।',
    pa: '💡 ਸੁਝਾਅ: ਕੀਟਨਾਸ਼ਕ ਦਾ ਛਿੜਕਾਅ ਸਵੇਰੇ ਤਰੇਲ ਸੁੱਕਣ ਤੋਂ ਬਾਅਦ ਜਾਂ ਸ਼ਾਮ ਵੇਲੇ ਕਰੋ।',
    en: '💡 Tip: Spray foliar nutrients in calm winds either mid-morning or late afternoon.'
  },
  {
    hi: '💡 टिप: नीम तेल का नियमित छिड़काव कीटों को अंडे देने से रोकता है और फसल सुरक्षित रखता है।',
    pa: '💡 ਸੁਝਾਅ: ਨਿੰਮ ਦੇ ਤੇਲ ਦਾ ਨਿਯਮਤ ਛਿੜਕਾਅ ਕੀੜਿਆਂ ਤੋਂ ਕੁਦਰਤੀ ਸੁਰੱਖਿਆ ਦਿੰਦਾ ਹੈ।',
    en: '💡 Tip: 5ml/L neem oil spray deters pest oviposition naturally without chemical residues.'
  },
  {
    hi: '💡 टिप: मंडी जाने से पहले न्यूनतम समर्थन मूल्य (MSP) और मॉडल भाव की जांच अवश्य करें।',
    pa: '💡 ਸੁਝਾਅ: ਮੰਡੀ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਐਮਐਸਪੀ ਅਤੇ ਮਾਡਲ ਭਾਅ ਦੀ ਜਾਂਚ ਜ਼ਰੂਰ ਕਰੋ।',
    en: '💡 Tip: Always benchmark your local private buyer offers against official APMC Modal MSP.'
  },
  {
    hi: '💡 टिप: खेत में ड्रिप सिंचाई या मल्चिंग अपनाने से 40-50% तक पानी की बचत होती है।',
    pa: '💡 ਸੁਝਾਅ: ਤੁਪਕਾ ਸਿੰਚਾਈ ਜਾਂ ਮਲਚਿੰਗ ਨਾਲ 50% ਪਾਣੀ ਦੀ ਬਚਤ ਹੁੰਦੀ ਹੈ।',
    en: '💡 Tip: Drip fertigation and organic mulching reduce evaporation by up to 50%.'
  }
];

export const FarmLoader: React.FC<FarmLoaderProps> = ({
  variant = 'plant',
  size = 'md',
  message,
  subMessage,
  showTips = true,
  language = 'hi',
  className = ''
}) => {
  const [tipIndex, setTipIndex] = useState(0);

  // Cycle tips every 3.5 seconds
  useEffect(() => {
    if (!showTips) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % ROTATING_FARM_TIPS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [showTips]);

  const defaultMessages = {
    hi: {
      plant: 'फसल डेटा अंकुरित हो रहा है...',
      grain: 'मंडी व कृषि आंकड़े लोड हो रहे हैं...',
      both: 'कृषि सेतु सर्वर से लाइव डेटा आ रहा है...'
    },
    pa: {
      plant: 'ਫਸਲ ਡੇਟਾ ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ...',
      grain: 'ਮੰਡੀ ਡੇਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
      both: 'ਲਾਈਵ ਜਾਣਕਾਰੀ ਆ ਰਹੀ ਹੈ...'
    },
    en: {
      plant: 'Sprouting fresh agricultural telemetry...',
      grain: 'Syncing live mandi & crop analytics...',
      both: 'Harvesting real-time farm records...'
    }
  };

  const activeMessage =
    message ||
    defaultMessages[language]?.[variant] ||
    defaultMessages.hi.plant;

  // Determine size scale factors
  const isSm = size === 'sm';
  const isLg = size === 'lg' || size === 'fullscreen';
  const svgSize = isSm ? 54 : isLg ? 160 : 110;

  // 1. RENDER: The Smooth Animated Sprouting Plant SVG
  const renderPlantAnimation = () => (
    <div className="relative flex items-center justify-center">
      {/* Background Soft Sun Glow & Expanding Halo */}
      <motion.div
        animate={{
          scale: [0.92, 1.15, 0.92],
          opacity: [0.35, 0.7, 0.35]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute rounded-full bg-gradient-to-tr from-amber-300/30 via-emerald-300/25 to-teal-400/20 blur-xl pointer-events-none"
        style={{
          width: svgSize * 1.3,
          height: svgSize * 1.3
        }}
      />

      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-sm"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="plantStemGrad" x1="80" y1="130" x2="80" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>

          <linearGradient id="leafLeftGrad" x1="50" y1="90" x2="80" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          <linearGradient id="leafRightGrad" x1="110" y1="75" x2="80" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          <linearGradient id="soilGrad" x1="40" y1="135" x2="120" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="sunbeamGrad" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Golden Sun & Radiant Halo Behind */}
        <motion.circle
          cx="80"
          cy="38"
          r="16"
          fill="#fef08a"
          opacity="0.85"
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.6, 0.95, 0.6]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Rotating Sun Rays */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '80px', originY: '38px' }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="80"
              y1="14"
              x2="80"
              y2="19"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${angle} 80 38)`}
              opacity="0.75"
            />
          ))}
        </motion.g>

        {/* Fertile Soil Mound Base */}
        <ellipse cx="80" cy="138" rx="42" ry="10" fill="url(#soilGrad)" opacity="0.95" />
        <ellipse cx="80" cy="136" rx="36" ry="6" fill="#a16207" opacity="0.45" />

        {/* Tiny soil nutrient particles */}
        <circle cx="68" cy="139" r="1.5" fill="#451a03" />
        <circle cx="92" cy="140" r="1.8" fill="#451a03" />
        <circle cx="82" cy="142" r="1.2" fill="#451a03" />

        {/* The Sprouting Main Stem (Grows from soil upwards with smooth stroke & height) */}
        <motion.path
          d="M 80 136 Q 78 95 80 50"
          stroke="url(#plantStemGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0.2 }}
          animate={{
            pathLength: [0.35, 1, 0.95],
            d: [
              'M 80 136 Q 78 95 80 50',
              'M 80 136 Q 84 92 80 44',
              'M 80 136 Q 76 96 80 48'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Left Leaf - Unfurls and sways gently */}
        <motion.g
          animate={{
            scale: [0.75, 1.08, 0.85],
            rotate: [-8, 6, -8]
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ originX: '79px', originY: '95px' }}
        >
          <path
            d="M 79 95 C 60 90 44 75 42 60 C 58 60 74 78 79 95 Z"
            fill="url(#leafLeftGrad)"
          />
          {/* Leaf central vein */}
          <path
            d="M 78 94 Q 63 80 46 64"
            stroke="#86efac"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          {/* Dewdrop on left leaf tip */}
          <motion.circle
            cx="44"
            cy="62"
            r="2.5"
            fill="#e0f2fe"
            stroke="#38bdf8"
            strokeWidth="0.8"
            animate={{
              scale: [0.8, 1.25, 0.8],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.g>

        {/* Right Leaf - Complementary sway and unfurl */}
        <motion.g
          animate={{
            scale: [0.7, 1.12, 0.8],
            rotate: [6, -10, 6]
          }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2
          }}
          style={{ originX: '81px', originY: '78px' }}
        >
          <path
            d="M 81 78 C 100 73 116 58 118 45 C 102 45 86 63 81 78 Z"
            fill="url(#leafRightGrad)"
          />
          {/* Right leaf vein */}
          <path
            d="M 82 77 Q 97 63 114 49"
            stroke="#bbf7d0"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          {/* Dewdrop on right leaf */}
          <motion.circle
            cx="116"
            cy="47"
            r="2.2"
            fill="#e0f2fe"
            stroke="#38bdf8"
            strokeWidth="0.8"
            animate={{
              scale: [1, 0.7, 1],
              opacity: [0.9, 0.4, 0.9]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }}
          />
        </motion.g>

        {/* Tender Top Bud / Crown Leaf Pair */}
        <motion.g
          animate={{
            scale: [0.6, 1.15, 0.75],
            y: [4, -3, 3]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ originX: '80px', originY: '50px' }}
        >
          {/* Top Left Tender Leaf */}
          <path
            d="M 80 50 C 73 40 68 32 72 26 C 78 26 81 38 80 50 Z"
            fill="#86efac"
          />
          {/* Top Right Tender Leaf */}
          <path
            d="M 80 50 C 87 40 92 32 88 26 C 82 26 79 38 80 50 Z"
            fill="#4ade80"
          />
        </motion.g>

        {/* Ambient Rising Dew Moisture Particles */}
        <motion.circle
          cx="70"
          cy="120"
          r="1.8"
          fill="#38bdf8"
          animate={{
            y: [-10, -65],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.1
          }}
        />
        <motion.circle
          cx="90"
          cy="110"
          r="1.5"
          fill="#6ee7b7"
          animate={{
            y: [-5, -55],
            opacity: [0, 0.9, 0]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.8
          }}
        />
      </svg>
    </div>
  );

  // 2. RENDER: The Rotating Golden Grain (Wheat Sheaf) SVG Animation
  const renderGrainAnimation = () => (
    <div className="relative flex items-center justify-center">
      {/* Golden Aura / Radiance */}
      <motion.div
        animate={{
          scale: [0.9, 1.2, 0.9],
          rotate: 360,
          opacity: [0.4, 0.75, 0.4]
        }}
        transition={{
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="absolute rounded-full bg-gradient-to-tr from-amber-400/30 via-yellow-300/30 to-emerald-400/20 blur-xl pointer-events-none"
        style={{
          width: svgSize * 1.35,
          height: svgSize * 1.35
        }}
      />

      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-sm"
      >
        <defs>
          <linearGradient id="goldGrainGrad1" x1="60" y1="40" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="goldGrainAura" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Outer Rotating Grain Halo Ring */}
        <motion.circle
          cx="80"
          cy="80"
          r="64"
          stroke="url(#goldGrainAura)"
          strokeWidth="2.5"
          strokeDasharray="6 10"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '80px', originY: '80px' }}
        />

        {/* Secondary Opposite Rotating Dotted Orbit */}
        <motion.circle
          cx="80"
          cy="80"
          r="54"
          stroke="#ca8a04"
          strokeWidth="1.5"
          strokeDasharray="3 8"
          fill="none"
          opacity="0.6"
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '80px', originY: '80px' }}
        />

        {/* Center Grain Sheaf with Organic Sway and Shimmer */}
        <motion.g
          animate={{
            rotate: [-7, 7, -7],
            scale: [0.96, 1.04, 0.96]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ originX: '80px', originY: '135px' }}
        >
          {/* Main Wheat Stalk */}
          <path
            d="M 80 142 Q 78 95 80 32"
            stroke="#d97706"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Golden Grains (Alternating pairs from top to bottom) */}
          {[
            { y: 35, angleL: -32, angleR: 32, scale: 0.8 },
            { y: 50, angleL: -36, angleR: 36, scale: 0.95 },
            { y: 65, angleL: -38, angleR: 38, scale: 1.05 },
            { y: 80, angleL: -40, angleR: 40, scale: 1.1 },
            { y: 95, angleL: -38, angleR: 38, scale: 1.0 },
            { y: 110, angleL: -34, angleR: 34, scale: 0.85 }
          ].map((tier, idx) => (
            <React.Fragment key={idx}>
              {/* Left Grain Seed */}
              <motion.g
                animate={{
                  scale: [tier.scale, tier.scale * 1.1, tier.scale]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.15
                }}
                transform={`translate(80, ${tier.y}) rotate(${tier.angleL})`}
              >
                <ellipse cx="-12" cy="0" rx="10" ry="5.5" fill="url(#goldGrainGrad1)" />
                {/* Grain crease */}
                <path d="M -19 0 L -5 0" stroke="#78350f" strokeWidth="1" opacity="0.6" />
                {/* Awn / whisker */}
                <path d="M -22 0 Q -32 -8 -40 -16" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
              </motion.g>

              {/* Right Grain Seed */}
              <motion.g
                animate={{
                  scale: [tier.scale, tier.scale * 1.1, tier.scale]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.15 + 0.1
                }}
                transform={`translate(80, ${tier.y}) rotate(${tier.angleR})`}
              >
                <ellipse cx="12" cy="0" rx="10" ry="5.5" fill="url(#goldGrainGrad1)" />
                {/* Grain crease */}
                <path d="M 5 0 L 19 0" stroke="#78350f" strokeWidth="1" opacity="0.6" />
                {/* Awn / whisker */}
                <path d="M 22 0 Q 32 -8 40 -16" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
              </motion.g>
            </React.Fragment>
          ))}

          {/* Top Grain Tip */}
          <ellipse cx="80" cy="24" rx="5" ry="9" fill="#fef08a" />
          <path d="M 80 15 L 80 2" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        {/* Shimmering Golden Light Sparks */}
        <motion.circle
          cx="62"
          cy="48"
          r="2.5"
          fill="#fef08a"
          animate={{
            scale: [0, 1.4, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: 0.2
          }}
        />
        <motion.circle
          cx="98"
          cy="72"
          r="2.2"
          fill="#fde047"
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.9, 0]
          }}
          transition={{
            duration: 2.1,
            repeat: Infinity,
            delay: 0.9
          }}
        />
      </svg>
    </div>
  );

  // 3. RENDER: Combined (Both) Animation
  const renderBothAnimation = () => (
    <div className="relative flex items-center justify-center">
      {/* Golden rotating halo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-28 h-28 rounded-full border-2 border-dashed border-amber-400/40 pointer-events-none"
      />
      {renderPlantAnimation()}
    </div>
  );

  // If size is 'sm', render inline compact loader
  if (isSm) {
    return (
      <div className={`inline-flex items-center gap-2.5 text-stone-700 font-semibold text-xs ${className}`}>
        {variant === 'grain' ? renderGrainAnimation() : renderPlantAnimation()}
        <span>{activeMessage}</span>
      </div>
    );
  }

  // Fullscreen modal / backdrop overlay mode
  if (size === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl border-2 border-emerald-300 shadow-2xl p-6 sm:p-8 max-w-md w-full text-center flex flex-col items-center"
        >
          {variant === 'grain'
            ? renderGrainAnimation()
            : variant === 'both'
            ? renderBothAnimation()
            : renderPlantAnimation()}

          <h3 className="text-base sm:text-lg font-black text-stone-900 mt-4">
            {activeMessage}
          </h3>

          {subMessage && (
            <p className="text-xs text-stone-500 mt-1 font-medium max-w-xs">
              {subMessage}
            </p>
          )}

          {/* Rotating Farmer Advisory Tip */}
          {showTips && (
            <div className="mt-5 w-full bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 min-h-[58px] flex items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs font-semibold text-emerald-950 leading-relaxed"
                >
                  {ROTATING_FARM_TIPS[tipIndex][language] || ROTATING_FARM_TIPS[tipIndex].hi}
                </motion.p>
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Standard Card / Section Loader (default 'md' or 'lg')
  return (
    <div
      className={`bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden ${className}`}
    >
      {/* Background organic light accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-emerald-100/40 to-transparent blur-xl pointer-events-none" />

      {/* Main Organic Visual Animation */}
      {variant === 'grain'
        ? renderGrainAnimation()
        : variant === 'both'
        ? renderBothAnimation()
        : renderPlantAnimation()}

      {/* Primary Message */}
      <h3 className="text-sm sm:text-base font-black text-stone-900 mt-4 relative z-10 tracking-tight">
        {activeMessage}
      </h3>

      {/* Subtitle / Telemetry Detail */}
      {subMessage && (
        <p className="text-xs text-stone-500 mt-1 font-medium relative z-10 max-w-sm">
          {subMessage}
        </p>
      )}

      {/* Engaging Rotating Farmer Advisory Tip */}
      {showTips && (
        <div className="mt-4 w-full max-w-md bg-stone-50 border border-emerald-200/80 rounded-2xl p-3 min-h-[54px] flex items-center justify-center text-center relative z-10 shadow-2xs">
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.22 }}
              className="text-xs font-semibold text-stone-800 leading-relaxed flex items-center justify-center gap-1.5"
            >
              <span>{ROTATING_FARM_TIPS[tipIndex][language] || ROTATING_FARM_TIPS[tipIndex].hi}</span>
            </motion.p>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
