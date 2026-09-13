import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface ScenicAnimationsProps {
  theme: 'light' | 'dark';
  enableAnimations?: boolean;
}

export const ScenicSkyAndFarmAnimations: React.FC<ScenicAnimationsProps> = ({
  theme,
  enableAnimations = true,
}) => {
  if (!enableAnimations) return null;

  // Generate random motes/fireflies once
  const motes = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (i * 5.5 + (i % 4) * 3) % 100,
      y: 15 + ((i * 7) % 70),
      size: 3 + (i % 4) * 2,
      duration: 5 + (i % 6) * 1.5,
      delay: (i * 0.7) % 4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden select-none">
      {/* 1. DRIFTING CLOUDS ACROSS THE SKY (Top 25% of viewport) */}
      <div className="absolute top-0 left-0 right-0 h-44 overflow-hidden opacity-75">
        {/* Cloud 1: Large soft white cloud moving slowly */}
        <motion.div
          className="absolute -top-6"
          initial={{ x: '-15%' }}
          animate={{ x: '115vw' }}
          transition={{
            duration: 85,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: 280, height: 90 }}
        >
          <svg viewBox="0 0 280 90" fill="none" className="w-full h-full">
            <path
              d="M30 65 Q45 35 80 40 Q105 15 140 25 Q175 10 210 30 Q240 25 255 50 Q275 65 250 80 L30 80 Q15 75 30 65 Z"
              fill={theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.55)'}
              filter="blur(4px)"
            />
          </svg>
        </motion.div>

        {/* Cloud 2: Fluffy middle altitude cloud */}
        <motion.div
          className="absolute top-12"
          initial={{ x: '-25%' }}
          animate={{ x: '120vw' }}
          transition={{
            duration: 65,
            repeat: Infinity,
            ease: 'linear',
            delay: 18,
          }}
          style={{ width: 220, height: 70 }}
        >
          <svg viewBox="0 0 220 70" fill="none" className="w-full h-full">
            <path
              d="M20 50 Q35 25 65 30 Q90 10 120 20 Q150 15 175 35 Q195 40 200 60 L20 60 Z"
              fill={theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.65)'}
              filter="blur(3px)"
            />
          </svg>
        </motion.div>

        {/* Cloud 3: High wispy cirrus cloud */}
        <motion.div
          className="absolute top-2"
          initial={{ x: '110vw' }}
          animate={{ x: '-20vw' }}
          transition={{
            duration: 110,
            repeat: Infinity,
            ease: 'linear',
            delay: 5,
          }}
          style={{ width: 340, height: 80 }}
        >
          <svg viewBox="0 0 340 80" fill="none" className="w-full h-full">
            <path
              d="M10 40 Q80 15 180 35 Q260 20 320 45 L330 60 Q240 50 150 65 Q60 55 10 40 Z"
              fill={theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.4)'}
              filter="blur(6px)"
            />
          </svg>
        </motion.div>
      </div>

      {/* 2. SOARING BIRDS FLOCK IN V-FORMATION GLIDING ACROSS HORIZON */}
      <motion.div
        className="absolute top-16"
        initial={{ x: '-10vw', y: 40 }}
        animate={{
          x: '110vw',
          y: [40, 25, 35, 20, 40],
        }}
        transition={{
          x: { duration: 38, repeat: Infinity, ease: 'linear', delay: 8 },
          y: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="flex items-center gap-3 scale-75 opacity-60">
          {/* Lead bird */}
          <motion.svg
            width="22"
            height="14"
            viewBox="0 0 24 16"
            fill="none"
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <path
              d="M2 10 Q7 2 12 8 Q17 2 22 10"
              stroke={theme === 'dark' ? '#94A3B8' : '#334155'}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.svg>
          {/* Wing bird 1 */}
          <motion.svg
            width="18"
            height="12"
            viewBox="0 0 24 16"
            fill="none"
            className="mt-3"
            animate={{ rotate: [3, -3, 3] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: 0.2 }}
          >
            <path
              d="M2 10 Q7 2 12 8 Q17 2 22 10"
              stroke={theme === 'dark' ? '#94A3B8' : '#334155'}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </motion.svg>
          {/* Wing bird 2 */}
          <motion.svg
            width="16"
            height="10"
            viewBox="0 0 24 16"
            fill="none"
            className="-mt-2"
            animate={{ rotate: [-2, 3, -2] }}
            transition={{ duration: 1.3, repeat: Infinity, delay: 0.4 }}
          >
            <path
              d="M2 10 Q7 2 12 8 Q17 2 22 10"
              stroke={theme === 'dark' ? '#94A3B8' : '#334155'}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
      </motion.div>

      {/* 3. DANCING FIREFLIES (Dark Mode) OR GOLDEN SUNLIT POLLEN (Light Mode) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {motes.map((mote) => (
          <motion.div
            key={mote.id}
            className="absolute rounded-full"
            style={{
              left: `${mote.x}%`,
              top: `${mote.y}%`,
              width: mote.size,
              height: mote.size,
              backgroundColor:
                theme === 'dark'
                  ? 'rgba(250, 204, 21, 0.85)' // Golden firefly
                  : 'rgba(245, 158, 11, 0.45)', // Sunlit golden pollen
              boxShadow:
                theme === 'dark'
                  ? '0 0 8px 2px rgba(250, 204, 21, 0.6), 0 0 16px rgba(34, 197, 94, 0.4)'
                  : '0 0 6px rgba(245, 158, 11, 0.35)',
            }}
            animate={{
              y: [-12, 12, -12],
              x: [-10, 10, -10],
              opacity: theme === 'dark' ? [0.2, 0.95, 0.3] : [0.15, 0.6, 0.15],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: mote.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: mote.delay,
            }}
          />
        ))}
      </div>

      {/* 4. ANIMATED HARVEST WIND RIPPLE (Gentle passing breeze over crops) */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 h-10 pointer-events-none opacity-40"
        animate={{
          x: ['-10%', '100%'],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 6,
        }}
      >
        <div className="w-96 h-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent blur-md" />
      </motion.div>

      {/* 5. LIVELY TRACTOR DRIVING HORIZON ON BOTTOM RIGHT */}
      <motion.div
        className="fixed bottom-3 right-6 z-20 hidden md:flex items-center gap-2 pointer-events-auto cursor-pointer group bg-white/80 dark:bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-300/60 dark:border-stone-700 shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="किसानों का सच्चा साथी - महिंद्रा व स्वराज ट्रैक्टर (Click for Tractor Cheer)"
        onClick={() => {
          // Playful visual bump
          const el = document.getElementById('tractor-smoke');
          if (el) {
            el.classList.add('animate-ping');
            setTimeout(() => el.classList.remove('animate-ping'), 600);
          }
        }}
      >
        {/* Animated Exhaust Smoke Puffs */}
        <div className="relative">
          <motion.div
            id="tractor-smoke"
            className="absolute -top-3 left-2 w-2 h-2 rounded-full bg-stone-400/60"
            animate={{
              y: [-2, -8],
              x: [-1, -4],
              scale: [0.6, 1.4],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          {/* Tractor SVG */}
          <svg width="28" height="22" viewBox="0 0 36 28" fill="none">
            {/* Body */}
            <path d="M4 14L10 14L12 8L20 8L20 14L28 14L28 20L4 20Z" fill="#DC2626" />
            <rect x="13" y="9" width="6" height="5" fill="#BAE6FD" rx="1" />
            {/* Silencer Pipe */}
            <line x1="11" y1="8" x2="11" y2="4" stroke="#475569" strokeWidth="1.8" />
            <line x1="11" y1="4" x2="13" y2="3" stroke="#475569" strokeWidth="1.8" />
            {/* Front Big Tire */}
            <circle cx="8" cy="20" r="5" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
            <circle cx="8" cy="20" r="2.5" fill="#E2E8F0" />
            {/* Rear Smaller Tire */}
            <circle cx="24" cy="21" r="3.5" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
            <circle cx="24" cy="21" r="1.8" fill="#E2E8F0" />
          </svg>
        </div>

        <div className="text-[11px] leading-tight font-bold text-stone-800 dark:text-stone-200">
          <span className="text-amber-600 dark:text-amber-400 block font-extrabold">किसान शक्ति</span>
          <span className="text-[9px] text-stone-500 dark:text-stone-400">खेत से मंडी 24x7</span>
        </div>
      </motion.div>
    </div>
  );
};
