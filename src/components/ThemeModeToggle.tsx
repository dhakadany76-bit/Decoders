import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Sparkles, Image as ImageIcon, Eye, ChevronDown } from 'lucide-react';
import { FarmSceneType, VisibilityLevel } from './AgriculturalBackground';
import { SupportedLanguage } from '../types';

interface ThemeModeToggleProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  currentScene: FarmSceneType;
  onChangeScene: (scene: FarmSceneType) => void;
  language: SupportedLanguage;
  showSceneSelector?: boolean;
  visibilityLevel?: VisibilityLevel;
  onChangeVisibility?: (level: VisibilityLevel) => void;
}

export const ThemeModeToggle: React.FC<ThemeModeToggleProps> = ({
  theme,
  onToggleTheme,
  currentScene,
  onChangeScene,
  language,
  showSceneSelector = false,
  visibilityLevel = 'vivid',
  onChangeVisibility,
}) => {
  const isDark = theme === 'dark';
  const [showDropdown, setShowDropdown] = useState(false);

  const scenes: Array<{ id: FarmSceneType; labelHi: string; labelEn: string; icon: string }> = [
    { id: 'golden_harvest', labelHi: 'गेहूं फसल', labelEn: 'Golden Wheat', icon: '🌾' },
    { id: 'mandi_market', labelHi: 'अनाज मंडी', labelEn: 'APMC Mandi', icon: '🏬' },
    { id: 'tractor_field', labelHi: 'खेत व ट्रैक्टर', labelEn: 'Tractor Field', icon: '🚜' },
    { id: 'bountiful_harvest', labelHi: 'अनाज दाने', labelEn: 'Bountiful Grains', icon: '🤲' },
    { id: 'lush_green', labelHi: 'धान हरियाली', labelEn: 'Green Paddy', icon: '🌱' },
    { id: 'night_sky', labelHi: 'चांदनी खेत', labelEn: 'Night Farm', icon: '🌙' },
  ];

  return (
    <div className="flex items-center gap-1.5 relative">
      {/* Primary 1-Click Dark/Light Mode Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.04 }}
        onClick={onToggleTheme}
        className={`relative px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
          isDark
            ? 'bg-stone-900/90 hover:bg-stone-800 text-amber-300 border-amber-500/40 shadow-amber-950/20'
            : 'bg-white/95 hover:bg-amber-50 text-stone-900 border-amber-300 shadow-amber-500/10'
        }`}
        title={
          isDark
            ? 'दिन का दृश्य चालू करें (Switch to Day/Light Mode)'
            : 'रात्रि का दृश्य चालू करें (Switch to Night/Dark Mode)'
        }
        aria-label="Toggle Dark and Light Mode"
      >
        {/* Animated Icon Container */}
        <motion.div
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="relative w-4 h-4 flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-amber-300 fill-amber-300/30" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-400" />
          )}
        </motion.div>

        {/* Dual-language label */}
        <div className="flex flex-col items-start leading-none text-left">
          <span className="text-[11px] font-extrabold flex items-center gap-1">
            <span>{isDark ? 'रात्रि दृश्य' : 'दिन का दृश्य'}</span>
            <Sparkles className={`w-2.5 h-2.5 ${isDark ? 'text-amber-300' : 'text-amber-500'}`} />
          </span>
          <span className="text-[9px] opacity-75 font-medium">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
      </motion.button>

      {/* Background Visual Scenery Menu Button */}
      {showSceneSelector && (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-amber-300 border-stone-200 dark:border-stone-700 hover:border-amber-400"
            title="खेत का आकर्षक दृश्य बदलें / Choose Farm Scenery"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">
              {language === 'hi' ? 'खेत दृश्य' : 'Scenery'}
            </span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </button>

          {/* Dropdown Menu for all 6 Agricultural Scenes and Visibility */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-64 p-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 z-50 text-xs"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 dark:border-stone-800">
                  <span className="font-extrabold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                    <span>{language === 'hi' ? 'खेत पृष्ठभूमि दृश्य' : 'Farm Scenery'}</span>
                  </span>
                  <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-full font-black">
                    6 दृश्य
                  </span>
                </div>

                {/* Scenery Grid */}
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  {scenes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onChangeScene(s.id);
                        setShowDropdown(false);
                      }}
                      className={`p-2 rounded-xl text-left font-bold transition flex items-center gap-2 cursor-pointer ${
                        currentScene === s.id
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'bg-stone-100 dark:bg-stone-800/80 hover:bg-amber-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span className="text-base">{s.icon}</span>
                      <span className="text-[11px] truncate leading-tight">
                        {language === 'hi' ? s.labelHi : s.labelEn}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Visibility Intensity Switcher */}
                {onChangeVisibility && (
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex items-center justify-between text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-emerald-600" />
                        <span>{language === 'hi' ? 'तस्वीर दृश्यता (Visibility)' : 'Visibility'}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                      {(['vivid', 'balanced', 'soft'] as VisibilityLevel[]).map((level) => (
                        <button
                          key={level}
                          onClick={() => onChangeVisibility(level)}
                          className={`py-1 rounded-lg text-[10px] font-black transition ${
                            visibilityLevel === level
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                          }`}
                        >
                          {level === 'vivid'
                            ? language === 'hi'
                              ? 'स्पष्ट'
                              : 'Vivid'
                            : level === 'balanced'
                            ? language === 'hi'
                              ? 'मध्यम'
                              : 'Balanced'
                            : language === 'hi'
                            ? 'हल्का'
                            : 'Soft'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
