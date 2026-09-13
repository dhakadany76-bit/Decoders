import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import goldenHarvestBg from '../assets/images/golden_harvest_bg_1789287946587.jpg';
import nightFarmBg from '../assets/images/night_farm_sky_bg_1789287961528.jpg';
import lushGreenBg from '../assets/images/lush_green_paddy_bg_1789287974915.jpg';
import mandiMarketBg from '../assets/images/mandi_grain_market_1789289050064.jpg';
import tractorFieldBg from '../assets/images/tractor_farming_field_1789289065829.jpg';
import bountifulHarvestBg from '../assets/images/bountiful_wheat_harvest_1789289080100.jpg';

export type FarmSceneType =
  | 'golden_harvest'
  | 'lush_green'
  | 'night_sky'
  | 'mandi_market'
  | 'tractor_field'
  | 'bountiful_harvest'
  | 'dynamic';

export type VisibilityLevel = 'vivid' | 'balanced' | 'soft';

interface AgriculturalBackgroundProps {
  theme: 'light' | 'dark';
  scene?: FarmSceneType;
  visibilityLevel?: VisibilityLevel;
  blurAmount?: number;
  timeOfDayPhase?: 'dawn' | 'day' | 'dusk' | 'night';
}

export const AgriculturalBackground: React.FC<AgriculturalBackgroundProps> = ({
  theme,
  scene = 'dynamic',
  visibilityLevel = 'vivid',
  blurAmount = 0,
  timeOfDayPhase = 'day',
}) => {
  // Determine actual image source based on theme, scene, and time of day
  const getBackgroundImage = () => {
    if (scene === 'mandi_market') return mandiMarketBg;
    if (scene === 'tractor_field') return tractorFieldBg;
    if (scene === 'bountiful_harvest') return bountifulHarvestBg;
    if (scene === 'lush_green') return lushGreenBg;
    if (scene === 'golden_harvest') return goldenHarvestBg;
    if (scene === 'night_sky') return nightFarmBg;

    // Dynamic defaults based on theme and time of day:
    if (theme === 'dark' || timeOfDayPhase === 'night') {
      return nightFarmBg;
    }
    if (timeOfDayPhase === 'dusk') {
      return tractorFieldBg;
    }
    if (timeOfDayPhase === 'dawn') {
      return goldenHarvestBg;
    }
    return goldenHarvestBg;
  };

  const currentImage = getBackgroundImage();

  // Opacity overlays based on chosen visibility level
  const getLightGradient = () => {
    switch (visibilityLevel) {
      case 'vivid': // Ultra visible image
        return 'linear-gradient(180deg, rgba(254, 252, 246, 0.22) 0%, rgba(247, 250, 245, 0.32) 40%, rgba(243, 248, 242, 0.42) 100%)';
      case 'soft':
        return 'linear-gradient(180deg, rgba(254, 252, 246, 0.65) 0%, rgba(247, 250, 245, 0.75) 40%, rgba(243, 248, 242, 0.82) 100%)';
      case 'balanced':
      default:
        return 'linear-gradient(180deg, rgba(254, 252, 246, 0.36) 0%, rgba(247, 250, 245, 0.46) 40%, rgba(243, 248, 242, 0.56) 100%)';
    }
  };

  const getDarkGradient = () => {
    switch (visibilityLevel) {
      case 'vivid': // Deep night sky and starry horizon glowing through
        return 'linear-gradient(180deg, rgba(10, 15, 13, 0.32) 0%, rgba(13, 22, 18, 0.44) 40%, rgba(9, 14, 12, 0.58) 100%)';
      case 'soft':
        return 'linear-gradient(180deg, rgba(10, 15, 13, 0.72) 0%, rgba(13, 22, 18, 0.80) 40%, rgba(9, 14, 12, 0.88) 100%)';
      case 'balanced':
      default:
        return 'linear-gradient(180deg, rgba(10, 15, 13, 0.46) 0%, rgba(13, 22, 18, 0.58) 40%, rgba(9, 14, 12, 0.70) 100%)';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. High-Resolution Photographic Farm Scenery with Smooth Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform-gpu saturate-110 contrast-105"
          style={{
            backgroundImage: `url(${currentImage})`,
            filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
          }}
        />
      </AnimatePresence>

      {/* 2. Frosted Scrim Overlay Tuned for Ultra-Crisp Visibility */}
      {theme === 'light' ? (
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: getLightGradient(),
          }}
        />
      ) : (
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: getDarkGradient(),
          }}
        />
      )}

      {/* 3. Subtle Warm Vignette to Frame the Content Beautifully */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            theme === 'dark'
              ? 'inset 0 0 100px rgba(0,0,0,0.5)'
              : 'inset 0 0 80px rgba(16, 185, 129, 0.06)',
        }}
      />
    </div>
  );
};
