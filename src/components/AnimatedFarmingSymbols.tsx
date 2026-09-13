import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SupportedLanguage } from '../types';

// 1. SWAYING GOLDEN WHEAT SHEAF
export const AnimatedWheatSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      animate={{
        rotate: [-6, 6, -6],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.2, rotate: 15 }}
      title="सुलगती सुनहरी फसल (Golden Wheat)"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        <defs>
          <linearGradient id="wheatGlow" x1="10" y1="40" x2="35" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>
        </defs>
        {/* Wheat Stem */}
        <path d="M16 44C20 34 24 24 30 10" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
        {/* Wheat Kernels with motion pulse */}
        <ellipse cx="26" cy="14" rx="3.5" ry="6" transform="rotate(35 26 14)" fill="url(#wheatGlow)" stroke="#78350F" strokeWidth="0.8" />
        <ellipse cx="32" cy="18" rx="3.5" ry="6" transform="rotate(-30 32 18)" fill="url(#wheatGlow)" stroke="#78350F" strokeWidth="0.8" />
        <ellipse cx="22" cy="22" rx="3.5" ry="6" transform="rotate(35 22 22)" fill="url(#wheatGlow)" stroke="#78350F" strokeWidth="0.8" />
        <ellipse cx="28" cy="26" rx="3.5" ry="6" transform="rotate(-30 28 26)" fill="url(#wheatGlow)" stroke="#78350F" strokeWidth="0.8" />
        <ellipse cx="18" cy="30" rx="3" ry="5.5" transform="rotate(35 18 30)" fill="url(#wheatGlow)" stroke="#78350F" strokeWidth="0.8" />
        <ellipse cx="24" cy="34" rx="3" ry="5.5" transform="rotate(-30 24 34)" fill="url(#wheatGlow)" stroke="#78350F" strokeWidth="0.8" />
        {/* Top Awn Whisker */}
        <path d="M30 10L36 4" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 12L36 8" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

// 2. FLUTTERING GREEN LEAF
export const AnimatedLeafSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      animate={{
        y: [-3, 3, -3],
        rotate: [-8, 8, -8],
        scale: [0.98, 1.04, 0.98],
      }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.25, rotate: -20 }}
      title="लहलहाती हरी पत्ती (Lush Green Leaf)"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        <defs>
          <linearGradient id="leafGrad" x1="10" y1="40" x2="38" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="60%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
        </defs>
        <path
          d="M10 38C10 38 12 20 28 12C36 8 40 8 40 8C40 8 38 16 32 26C24 38 10 38 10 38Z"
          fill="url(#leafGrad)"
          stroke="#166534"
          strokeWidth="1.2"
        />
        <path d="M10 38Q22 28 36 10" stroke="#DCFCE7" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18 31Q22 26 27 27" stroke="#DCFCE7" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M24 24Q28 20 33 21" stroke="#DCFCE7" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

// 3. MOVING FARM TRACTOR (with spinning wheels and bouncing body)
export const AnimatedTractorSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 38,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      animate={{
        y: [0, -2, 0, -1.5, 0],
      }}
      transition={{
        duration: 0.9,
        repeat: Infinity,
        ease: 'linear',
      }}
      whileHover={{ scale: 1.2 }}
      title="किसान का सच्चा साथी - ट्रैक्टर (Farm Tractor)"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        {/* Exhaust smoke puff */}
        <motion.circle
          cx="21"
          cy="7"
          r="2.5"
          fill="#94A3B8"
          opacity={0.7}
          animate={{ y: [-2, -8], opacity: [0.7, 0], scale: [1, 1.8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Silencer pipe */}
        <path d="M21 16L21 9" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
        {/* Tractor Body (Green/Emerald & Yellow) */}
        <path d="M14 26L34 26L34 16L24 16L17 21L14 26Z" fill="#15803D" stroke="#0F172A" strokeWidth="1.2" />
        {/* Cabin */}
        <path d="M34 26L48 26L48 14L34 14Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.2" />
        {/* Cabin Window */}
        <path d="M36 16H46V22H36Z" fill="#38BDF8" opacity="0.85" />
        {/* Roof */}
        <path d="M32 14L50 14" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        {/* Front Grill */}
        <path d="M14 22L11 26V30H15" stroke="#EAB308" strokeWidth="1.5" fill="#EAB308" />

        {/* Big Back Wheel (Spinning) */}
        <g transform="translate(42, 32)">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="0" cy="0" r="10" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="6" fill="#F59E0B" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="-6" y1="0" x2="6" y2="0" stroke="#0F172A" strokeWidth="1.5" />
          </motion.g>
        </g>

        {/* Small Front Wheel (Spinning) */}
        <g transform="translate(18, 35)">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="0" cy="0" r="6.5" fill="#1E293B" stroke="#0F172A" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="3.5" fill="#F59E0B" />
            <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="#0F172A" strokeWidth="1.2" />
            <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#0F172A" strokeWidth="1.2" />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
};

// 4. RADIANT ROTATING SUN
export const AnimatedSunSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      whileHover={{ scale: 1.25 }}
      title="ऊर्जावान सूर्य देव (Radiant Sunlight)"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        <defs>
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </radialGradient>
        </defs>
        {/* Rotating Sun Rays */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '24px', originY: '24px' }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="24"
              y1="6"
              x2="24"
              y2="10"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
        </motion.g>
        {/* Pulsing Sun Core */}
        <motion.circle
          cx="24"
          cy="24"
          r="10"
          fill="url(#sunCore)"
          animate={{ scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '24px', originY: '24px' }}
        />
      </svg>
    </motion.div>
  );
};

// 5. DEWDROP / RAINDROP WITH RIPPLE
export const AnimatedDropletSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 30,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      animate={{
        y: [-2, 3, -2],
      }}
      transition={{
        duration: 2.6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.25 }}
      title="अमृत समान जल बूंद (Dewdrop & Rain)"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        <defs>
          <linearGradient id="dropGrad" x1="12" y1="8" x2="28" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>
        {/* Water Drop */}
        <path
          d="M20 6C20 6 10 18 10 24C10 29.52 14.48 34 20 34C25.52 34 30 29.52 30 24C30 18 20 6 20 6Z"
          fill="url(#dropGrad)"
          stroke="#0284C7"
          strokeWidth="1.2"
        />
        {/* Specular highlight */}
        <ellipse cx="16" cy="21" rx="2" ry="4" transform="rotate(-30 16 21)" fill="white" opacity="0.8" />
        {/* Bottom ripple animation */}
        <motion.ellipse
          cx="20"
          cy="36"
          rx="8"
          ry="2"
          stroke="#38BDF8"
          strokeWidth="1.2"
          fill="none"
          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
};

// 6. SPROUTING SEEDLING
export const AnimatedSproutSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      animate={{
        scale: [0.95, 1.08, 0.95],
        rotate: [-3, 3, -3],
      }}
      transition={{
        duration: 3.4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.3 }}
      title="उगता हुआ नन्हा पौधा (Sprouting Seedling)"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        {/* Soil mound */}
        <path d="M8 36C14 33 30 33 36 36" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
        {/* Stem */}
        <path d="M22 36V18" stroke="#16A34A" strokeWidth="2.8" strokeLinecap="round" />
        {/* Left Leaf */}
        <motion.path
          d="M22 24C15 22 10 16 14 12C18 12 21 18 22 24Z"
          fill="#22C55E"
          stroke="#15803D"
          strokeWidth="1.2"
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '22px', originY: '24px' }}
        />
        {/* Right Leaf */}
        <motion.path
          d="M22 20C29 18 34 12 30 8C26 8 23 14 22 20Z"
          fill="#4ADE80"
          stroke="#15803D"
          strokeWidth="1.2"
          animate={{ rotate: [4, -4, 4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '22px', originY: '20px' }}
        />
      </svg>
    </motion.div>
  );
};

// 7. FLUTTERING HONEYBEE (Pollinator)
export const AnimatedBeeSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      animate={{
        x: [-3, 3, -3],
        y: [-4, 4, -4],
        rotate: [-6, 6, -6],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.35 }}
      title="मधुमक्खी - परागण मित्र (Pollinating Bee)"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        {/* Left Wing fluttering */}
        <motion.ellipse
          cx="17"
          cy="14"
          rx="5"
          ry="9"
          transform="rotate(-35 17 14)"
          fill="#BAE6FD"
          opacity="0.8"
          stroke="#0284C7"
          strokeWidth="1"
          animate={{ scaleY: [0.6, 1.2, 0.6] }}
          transition={{ duration: 0.18, repeat: Infinity }}
        />
        {/* Right Wing fluttering */}
        <motion.ellipse
          cx="27"
          cy="14"
          rx="5"
          ry="9"
          transform="rotate(35 27 14)"
          fill="#BAE6FD"
          opacity="0.8"
          stroke="#0284C7"
          strokeWidth="1"
          animate={{ scaleY: [1.2, 0.6, 1.2] }}
          transition={{ duration: 0.18, repeat: Infinity }}
        />
        {/* Bee Body (Yellow & Black stripes) */}
        <ellipse cx="22" cy="24" rx="11" ry="8" fill="#FACC15" stroke="#713F12" strokeWidth="1.2" />
        <path d="M19 17V31" stroke="#0F172A" strokeWidth="2.5" />
        <path d="M25 17V31" stroke="#0F172A" strokeWidth="2.5" />
        {/* Stinger */}
        <path d="M33 24L37 24" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
        {/* Antennae */}
        <path d="M12 21Q8 16 10 13" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12 25Q8 28 10 31" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

// 8. GOLDEN RUPEE HARVEST COIN
export const AnimatedRupeeCoinSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      animate={{
        rotateY: [0, 180, 360],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.25 }}
      title="समृद्ध किसान - लाभकारी मूल्य (Profitable MSP Return)"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        <defs>
          <linearGradient id="coinGrad" x1="4" y1="4" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <circle cx="22" cy="22" r="18" fill="url(#coinGrad)" stroke="#78350F" strokeWidth="1.8" />
        <circle cx="22" cy="22" r="15" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        {/* Rupee Symbol ₹ */}
        <text
          x="22"
          y="28"
          fontSize="18"
          fontWeight="900"
          fontFamily="sans-serif"
          textAnchor="middle"
          fill="#78350F"
        >
          ₹
        </text>
      </svg>
    </motion.div>
  );
};

export const AnimatedRupeeSymbol = AnimatedRupeeCoinSymbol;

// 9. AMBIENT FLOATING FARM SYMBOLS (Visible & Floating all across every page)
// Provides more than 5 lively animated symbols floating gracefully
export const AmbientFloatingFarmSymbols: React.FC = () => {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const symbols = [
    {
      id: 1,
      name: 'सुलगती गेहूं बाली',
      Component: AnimatedWheatSymbol,
      initialPosition: { top: '16%', right: '3%' },
      message: '🌾 बंपर पैदावार: समय पर सिंचाई व सही पोषण से फसल रिकॉर्ड उत्पादन देगी!',
    },
    {
      id: 2,
      name: 'हरी पत्ती',
      Component: AnimatedLeafSymbol,
      initialPosition: { top: '34%', left: '2%' },
      message: '🍃 स्वस्थ फसल: क्लोरोफिल भरपूर है, फसल रोगमुक्त है!',
    },
    {
      id: 3,
      name: 'किसान ट्रैक्टर',
      Component: AnimatedTractorSymbol,
      initialPosition: { bottom: '22%', right: '4%' },
      message: '🚜 आधुनिक कृषि: यंत्रीकरण से समय की बचत और उपज की त्वरित ढुलाई!',
    },
    {
      id: 4,
      name: 'ऊर्जावान सूर्य',
      Component: AnimatedSunSymbol,
      initialPosition: { top: '10%', left: '4%' },
      message: '☀️ अनुकूल मौसम: धूप खिली हुई है, कटाई और सुखाने के लिए आदर्श दिन!',
    },
    {
      id: 5,
      name: 'अमृत जल बूंद',
      Component: AnimatedDropletSymbol,
      initialPosition: { bottom: '38%', left: '3%' },
      message: '💧 कुशल सिंचाई: टपक (Drip) सिंचाई से 60% पानी की बचत होती है!',
    },
    {
      id: 6,
      name: 'परागण मित्र मधुमक्खी',
      Component: AnimatedBeeSymbol,
      initialPosition: { top: '55%', right: '2%' },
      message: '🐝 जैव विविधता: परागण से सरसों और फलदार फसलों में 25% अधिक दाना बनता है!',
    },
    {
      id: 7,
      name: 'नन्हा अंकुर',
      Component: AnimatedSproutSymbol,
      initialPosition: { bottom: '12%', left: '2%' },
      message: '🌱 बीज उपचार: बीजामृत से उपचारित बीज 95% अंकुरण देते हैं!',
    },
    {
      id: 8,
      name: 'मुनाफ़ा सिक्का',
      Component: AnimatedRupeeCoinSymbol,
      initialPosition: { bottom: '18%', right: '2%' },
      message: '💰 सीधा लाभ: बिना बिचौलिए के MSP व प्रतिस्पर्धी बोली से सीधा बैंक खाते में भुगतान!',
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
      {symbols.map((item) => {
        const IconComponent = item.Component;
        return (
          <div
            key={item.id}
            style={item.initialPosition as any}
            className="pointer-events-auto absolute hidden lg:block opacity-85 hover:opacity-100 transition-opacity"
            onClick={() => {
              setActiveMessage(item.message);
              setTimeout(() => setActiveMessage(null), 5000);
            }}
          >
            <div className="relative group">
              <IconComponent size={34} className="hover:scale-125 transition-transform" />
              {/* Tooltip on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-stone-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md z-30">
                {item.name}
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating affirmation toast when farmer clicks any symbol */}
      {activeMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          className="pointer-events-auto fixed bottom-6 left-1/2 -translate-x-1/2 max-w-md w-11/12 bg-emerald-900/95 text-white p-3.5 rounded-2xl shadow-xl border border-emerald-400/40 text-xs sm:text-sm font-semibold flex items-center gap-3 backdrop-blur-md z-50"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center shrink-0">
            🌾
          </div>
          <p className="flex-1">{activeMessage}</p>
          <button
            onClick={() => setActiveMessage(null)}
            className="text-white/70 hover:text-white text-base font-black px-1.5"
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  );
};

// 10. ANIMATED FARM HEADER BANNER (Top Ticker with all active animated symbols)
export const AnimatedFarmSymbolsBar: React.FC<{ language: 'hi' | 'en' | 'pa' }> = ({ language }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-amber-950 text-white px-3 py-1.5 border-b border-emerald-800/50 shadow-inner flex items-center justify-between text-xs overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-3 sm:gap-6 shrink-0 mx-auto">
        <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>{language === 'hi' ? 'सजीव कृषि परिवेश' : language === 'pa' ? 'ਜੀਵੰਤ ਖੇਤੀ ਮਾਹੌਲ' : 'Live Farm Vitality'}</span>:
        </span>

        {/* 1. Sun */}
        <div className="flex items-center gap-1.5">
          <AnimatedSunSymbol size={20} />
          <span className="text-[11px] text-stone-200">{language === 'hi' ? 'तेज धूप (32°C)' : 'Clear Sunlight'}</span>
        </div>

        {/* 2. Wheat */}
        <div className="flex items-center gap-1.5">
          <AnimatedWheatSymbol size={20} />
          <span className="text-[11px] text-amber-200">{language === 'hi' ? 'रबी कटाई तैयार' : 'Rabi Ready'}</span>
        </div>

        {/* 3. Tractor */}
        <div className="flex items-center gap-1.5">
          <AnimatedTractorSymbol size={24} />
          <span className="text-[11px] text-stone-200">{language === 'hi' ? 'मंडी ढुलाई चालू' : 'Active Haulage'}</span>
        </div>

        {/* 4. Sprout */}
        <div className="flex items-center gap-1.5">
          <AnimatedSproutSymbol size={20} />
          <span className="text-[11px] text-emerald-300">{language === 'hi' ? 'मृदा स्वास्थ्य 92%' : 'Soil 92%'}</span>
        </div>

        {/* 5. Droplet */}
        <div className="flex items-center gap-1.5">
          <AnimatedDropletSymbol size={18} />
          <span className="text-[11px] text-sky-200">{language === 'hi' ? 'आर्द्रता 48%' : 'Humidity 48%'}</span>
        </div>

        {/* 6. Rupee Coin */}
        <div className="flex items-center gap-1.5">
          <AnimatedRupeeCoinSymbol size={20} />
          <span className="text-[11px] text-yellow-300 font-bold">{language === 'hi' ? 'MSP ₹2,425' : 'MSP ₹2,425'}</span>
        </div>

        {/* 7. Bee */}
        <div className="flex items-center gap-1.5 hidden md:flex">
          <AnimatedBeeSymbol size={20} />
          <span className="text-[11px] text-stone-300">{language === 'hi' ? 'सक्रिय परागण' : 'Pollination High'}</span>
        </div>

        {/* 8. Leaf */}
        <div className="flex items-center gap-1.5 hidden sm:flex">
          <AnimatedLeafSymbol size={20} />
          <span className="text-[11px] text-emerald-200">{language === 'hi' ? 'रोगमुक्त फसल' : 'Healthy Canopy'}</span>
        </div>

        {/* 9. Butterfly */}
        <div className="flex items-center gap-1.5 hidden lg:flex">
          <AnimatedButterflySymbol size={20} />
          <span className="text-[11px] text-pink-200">{language === 'hi' ? 'प्रकृति अनुकूल' : 'Eco-Balance'}</span>
        </div>

        {/* 10. Wind Turbine */}
        <div className="flex items-center gap-1.5 hidden xl:flex">
          <AnimatedWindTurbineSymbol size={20} />
          <span className="text-[11px] text-teal-200">{language === 'hi' ? 'हरित ऊर्जा' : 'Green Tech'}</span>
        </div>
      </div>
    </div>
  );
};

// 11. FLUTTERING BUTTERFLY SYMBOL
export const AnimatedButterflySymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = '',
}) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`}
      animate={{
        y: [-4, 4, -4],
        x: [-2, 2, -2],
        rotate: [-12, 12, -12],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.3, rotate: 25 }}
      title="तितली - प्राकृतिक परागण व समृद्धि (Butterfly)"
    >
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        {/* Left Wing */}
        <motion.path
          d="M18 18 C12 6, 2 8, 4 18 C6 24, 14 22, 18 18 Z"
          fill="#EC4899"
          stroke="#BE185D"
          strokeWidth="1"
          animate={{ scaleX: [1, 0.4, 1] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Right Wing */}
        <motion.path
          d="M18 18 C24 6, 34 8, 32 18 C30 24, 22 22, 18 18 Z"
          fill="#F472B6"
          stroke="#BE185D"
          strokeWidth="1"
          animate={{ scaleX: [1, 0.4, 1] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Body */}
        <ellipse cx="18" cy="18" rx="1.5" ry="7" fill="#831843" />
        {/* Antennae */}
        <path d="M18 11 Q15 6 13 7" stroke="#831843" strokeWidth="1" strokeLinecap="round" />
        <path d="M18 11 Q21 6 23 7" stroke="#831843" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

// 12. ROTATING GREEN ENERGY WIND TURBINE
export const AnimatedWindTurbineSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className}`} title="पवन चक्की - हरित सिंचाई (Clean Energy)">
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        {/* Pole */}
        <line x1="18" y1="16" x2="18" y2="34" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="34" x2="22" y2="34" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        {/* Hub */}
        <circle cx="18" cy="16" r="2.5" fill="#0EA5E9" />
        {/* Rotating Blades */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '18px', originY: '16px' }}
        >
          {/* Blade 1 */}
          <path d="M18 16 L17 4 Q18 2 19 4 L18 16 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.5" />
          {/* Blade 2 */}
          <path d="M18 16 L28 22 Q29 24 27 24 L18 16 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.5" />
          {/* Blade 3 */}
          <path d="M18 16 L8 22 Q7 24 9 24 L18 16 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.5" />
        </motion.g>
      </svg>
    </div>
  );
};

// 13. FRIENDLY FARMER NAMASTE WELCOME (Animated Interactive Avatar)
export const AnimatedFarmerNamaste: React.FC<{
  size?: number;
  language: SupportedLanguage;
  onClick?: () => void;
}> = ({ size = 36, language, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-stone-800 dark:hover:bg-stone-700 border border-amber-300 dark:border-amber-500/40 shadow-xs cursor-pointer flex items-center gap-1.5 text-xs font-bold text-amber-950 dark:text-amber-300"
      title="नमस्ते किसान साथी! सहायता के लिए यहाँ क्लिक करें (Click for Farmer Voice Greeting)"
    >
      <motion.span
        animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="text-lg"
      >
        🙏
      </motion.span>
      <span className="hidden sm:inline text-[11px]">
        {language === 'hi' ? 'नमस्ते किसान' : 'Namaste'}
      </span>
    </motion.button>
  );
};

