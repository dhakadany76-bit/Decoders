import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ChevronUp, Sparkles, Navigation, PhoneCall, HelpCircle, Compass } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface ScrollToTopProps {
  language: SupportedLanguage;
  activeTab?: string;
  onNavigateTab?: (tab: any) => void;
  onOpenTour?: () => void;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  language,
  activeTab,
  onNavigateTab,
  onOpenTour,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickNav, setShowQuickNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 - 100)
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
        setScrollProgress(progress);
      }

      // Show when scrolled down more than 260px
      if (scrollTop > 260) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowQuickNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Keyboard shortcut listener ('t' or 'T' when not typing in an input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey) {
        scrollToTop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circular progress math
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  const tooltipLabels = {
    hi: {
      action: 'ऊपर जाएं',
      shortcut: 'कीबोर्ड: T दबाएं',
      navTitle: 'त्वरित नेविगेशन',
      kisanCare: 'किसान हेल्पलाइन 1800-180-1551',
    },
    pa: {
      action: 'ਉੱਪਰ ਜਾਓ',
      shortcut: 'ਕੀਬੋਰਡ: T ਦਬਾਓ',
      navTitle: 'ਤੇਜ਼ ਨੈਵੀਗੇਸ਼ਨ',
      kisanCare: 'ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ 1800-180-1551',
    },
    en: {
      action: 'Scroll to Top',
      shortcut: 'Shortcut: Press T',
      navTitle: 'Quick Jump',
      kisanCare: 'Kisan Helpline 1800-180-1551',
    },
  };

  const labels = tooltipLabels[language] || tooltipLabels.hi;

  return (
    <>
      {/* 1. Ultra-thin Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600 shadow-sm"
          style={{ width: `${scrollProgress}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>

      {/* 2. Floating Action Controller */}
      <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-2.5">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 26,
              }}
              className="flex items-center gap-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Optional Quick Navigation Drawer / Popover */}
              {showQuickNav && onNavigateTab && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-200/80 p-3 w-64 text-xs z-50 text-stone-800"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 font-black text-stone-900">
                    <span className="flex items-center gap-1.5 text-emerald-800">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{labels.navTitle}</span>
                    </span>
                    <span className="text-[10px] text-stone-400 font-semibold">{scrollProgress}% Scrolled</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                    <button
                      onClick={() => {
                        onNavigateTab('procurement');
                        scrollToTop();
                      }}
                      className={`p-2 text-left rounded-xl font-bold transition flex items-center gap-1.5 ${
                        activeTab === 'procurement'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-stone-50 hover:bg-emerald-50 text-stone-700'
                      }`}
                    >
                      <span>🌾</span>
                      <span className="truncate">{language === 'hi' ? 'खरीद स्लॉट' : 'Procurement'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigateTab('marketplace');
                        scrollToTop();
                      }}
                      className={`p-2 text-left rounded-xl font-bold transition flex items-center gap-1.5 ${
                        activeTab === 'marketplace'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-stone-50 hover:bg-emerald-50 text-stone-700'
                      }`}
                    >
                      <span>⚖️</span>
                      <span className="truncate">{language === 'hi' ? 'सीधा बाज़ार' : 'Marketplace'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigateTab('mandi');
                        scrollToTop();
                      }}
                      className={`p-2 text-left rounded-xl font-bold transition flex items-center gap-1.5 ${
                        activeTab === 'mandi'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-stone-50 hover:bg-emerald-50 text-stone-700'
                      }`}
                    >
                      <span>📊</span>
                      <span className="truncate">{language === 'hi' ? 'मंडी भाव' : 'Mandi Rates'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigateTab('weather');
                        scrollToTop();
                      }}
                      className={`p-2 text-left rounded-xl font-bold transition flex items-center gap-1.5 ${
                        activeTab === 'weather'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-stone-50 hover:bg-emerald-50 text-stone-700'
                      }`}
                    >
                      <span>⛅</span>
                      <span className="truncate">{language === 'hi' ? 'मौसम सलाह' : 'Weather'}</span>
                    </button>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500 font-medium">
                    {onOpenTour ? (
                      <button
                        onClick={() => {
                          setShowQuickNav(false);
                          onOpenTour();
                        }}
                        className="flex items-center gap-1 text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-lg font-bold transition"
                      >
                        <Compass className="w-3 h-3 text-amber-700" />
                        <span>{language === 'hi' ? 'ऐप टूर' : language === 'pa' ? 'ਐਪ ਟੂਰ' : 'App Tour'}</span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <PhoneCall className="w-3 h-3" />
                        1800-180-1551
                      </span>
                    )}
                    <button
                      onClick={scrollToTop}
                      className="text-emerald-800 font-bold hover:underline flex items-center gap-0.5"
                    >
                      <ArrowUp className="w-3 h-3" />
                      {labels.action}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Extended Pill on Hover (Desktop & Mobile Touch) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 12, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="hidden sm:flex items-center gap-2 bg-stone-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-stone-700/60 text-xs select-none pointer-events-none"
                  >
                    <span className="font-bold tracking-wide">{labels.action}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                      {scrollProgress}%
                    </span>
                    <span className="text-[10px] text-stone-400 hidden md:inline">
                      {labels.shortcut}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Floating Button with Progress Ring */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={scrollToTop}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setShowQuickNav(!showQuickNav);
                  }}
                  id="btn-scroll-to-top"
                  aria-label={labels.action}
                  className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white text-emerald-900 shadow-xl border-2 border-emerald-500/60 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-emerald-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50 active:bg-emerald-50"
                >
                  {/* Subtle pulsing background glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/50 via-amber-50/40 to-transparent pointer-events-none" />

                  {/* SVG Circular Scroll Progress Ring */}
                  <svg
                    className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                    viewBox="0 0 52 52"
                  >
                    {/* Background track circle */}
                    <circle
                      cx="26"
                      cy="26"
                      r={radius}
                      className="stroke-stone-200/80"
                      strokeWidth="3"
                      fill="transparent"
                    />
                    {/* Dynamic Progress indicator stroke */}
                    <motion.circle
                      cx="26"
                      cy="26"
                      r={radius}
                      className="stroke-emerald-600"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      fill="transparent"
                      strokeDasharray={circumference}
                      style={{
                        strokeDashoffset,
                        transition: 'stroke-dashoffset 0.15s ease-out',
                      }}
                    />
                  </svg>

                  {/* Animated Arrow Icon with Gentle Float */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <ArrowUp className="w-5 h-5 text-emerald-800 group-hover:text-emerald-950 stroke-[2.5]" />
                    </motion.div>
                    {/* Tiny percentage display on mobile */}
                    <span className="text-[9px] font-extrabold text-emerald-700 leading-none mt-[-2px] tracking-tight">
                      {scrollProgress}%
                    </span>
                  </div>
                </motion.button>

                {/* Optional mini quick menu trigger badge */}
                {onNavigateTab && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowQuickNav(!showQuickNav);
                    }}
                    title={labels.navTitle}
                    className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] flex items-center justify-center border border-white shadow-xs hover:bg-amber-400 transition"
                  >
                    ☰
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
