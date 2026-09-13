import React from 'react';
import { motion } from 'motion/react';
import goldenHarvestImg from '../assets/images/golden_harvest_bg_1789287946587.jpg';
import mandiMarketImg from '../assets/images/mandi_grain_market_1789289050064.jpg';
import tractorFieldImg from '../assets/images/tractor_farming_field_1789289065829.jpg';
import bountifulHarvestImg from '../assets/images/bountiful_wheat_harvest_1789289080100.jpg';
import lushGreenImg from '../assets/images/lush_green_paddy_bg_1789287974915.jpg';
import nightSkyImg from '../assets/images/night_farm_sky_bg_1789287961528.jpg';
import {
  AnimatedWheatSymbol,
  AnimatedTractorSymbol,
  AnimatedLeafSymbol,
  AnimatedSunSymbol,
  AnimatedRupeeCoinSymbol,
  AnimatedBeeSymbol,
  AnimatedButterflySymbol,
} from './AnimatedFarmingSymbols';
import { SupportedLanguage } from '../types';

export type AgriculturalBannerType =
  | 'procurement'
  | 'marketplace'
  | 'mandi'
  | 'weather'
  | 'crop_doctor'
  | 'ledger'
  | 'general';

interface AgriculturalHeroCardProps {
  bannerType: AgriculturalBannerType;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  badgeHi: string;
  badgeEn: string;
  language: SupportedLanguage;
  actionButton?: {
    labelHi: string;
    labelEn: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  metrics?: Array<{
    labelHi: string;
    labelEn: string;
    value: string;
    color?: string;
  }>;
}

export const AgriculturalHeroCard: React.FC<AgriculturalHeroCardProps> = ({
  bannerType,
  titleHi,
  titleEn,
  subtitleHi,
  subtitleEn,
  badgeHi,
  badgeEn,
  language,
  actionButton,
  metrics,
}) => {
  const getBannerImage = () => {
    switch (bannerType) {
      case 'procurement':
        return mandiMarketImg;
      case 'marketplace':
        return tractorFieldImg;
      case 'mandi':
        return mandiMarketImg;
      case 'weather':
        return nightSkyImg;
      case 'crop_doctor':
        return lushGreenImg;
      case 'ledger':
        return bountifulHarvestImg;
      case 'general':
      default:
        return goldenHarvestImg;
    }
  };

  const getSymbol = () => {
    switch (bannerType) {
      case 'procurement':
        return <AnimatedTractorSymbol size={28} />;
      case 'marketplace':
        return <AnimatedWheatSymbol size={28} />;
      case 'mandi':
        return <AnimatedRupeeCoinSymbol size={28} />;
      case 'weather':
        return <AnimatedSunSymbol size={28} />;
      case 'crop_doctor':
        return <AnimatedLeafSymbol size={28} />;
      case 'ledger':
        return <AnimatedRupeeCoinSymbol size={28} />;
      default:
        return <AnimatedWheatSymbol size={28} />;
    }
  };

  const bgImg = getBannerImage();

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md border border-amber-300/40 dark:border-stone-700 mb-6 select-none">
      {/* High-Resolution Photographic Agricultural Work Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(${bgImg})` }}
      />

      {/* Carefully graded high-contrast gradient overlay ensuring 100% crystal clear readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/80 to-stone-900/60 dark:from-stone-950/95 dark:via-stone-950/85 dark:to-stone-950/70" />

      {/* Decorative Agricultural Texture Accents */}
      <div className="absolute top-0 right-0 p-4 opacity-15 hidden md:block pointer-events-none">
        <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
          <circle cx="120" cy="40" r="70" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M10 100 Q80 20 160 100" stroke="#F59E0B" strokeWidth="3" />
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 p-5 sm:p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          {/* Top Badge with Animated Farming Symbol */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-300/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-2.5">
            {getSymbol()}
            <span>{language === 'hi' ? badgeHi : badgeEn}</span>
          </div>

          {/* Main Title in Hindi & English */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
            <span>{language === 'hi' ? titleHi : titleEn}</span>
            <span className="block text-amber-300 text-sm sm:text-base font-bold mt-0.5 opacity-90">
              {language === 'hi' ? titleEn : titleHi}
            </span>
          </h2>

          {/* Subtitle / Operational Instruction for Farmers */}
          <p className="mt-2 text-xs sm:text-sm text-stone-200/90 leading-relaxed max-w-xl">
            {language === 'hi' ? subtitleHi : subtitleEn}
          </p>

          {/* Optional Live Metric Badges */}
          {metrics && metrics.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-left"
                >
                  <div className="text-[10px] text-stone-300 font-medium">
                    {language === 'hi' ? m.labelHi : m.labelEn}
                  </div>
                  <div className={`text-sm sm:text-base font-black ${m.color || 'text-amber-300'}`}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button & Live Visual Stamp */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
          {actionButton && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={actionButton.onClick}
              className="px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-lg border border-amber-200 flex items-center gap-2 cursor-pointer"
            >
              {actionButton.icon}
              <span>{language === 'hi' ? actionButton.labelHi : actionButton.labelEn}</span>
            </motion.button>
          )}

          {/* Mini Live APMC Mandi / Kishan Stamp */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[11px] text-stone-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{language === 'hi' ? 'सीधा सरकारी व ई-मंडी जुड़ाव' : 'Live APMC & Direct Settlement'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
