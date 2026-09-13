import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CloudSun,
  Stethoscope,
  MessageSquare,
  MapPin,
  Globe2,
  BookOpen,
  HelpCircle,
  Radio,
  Search,
  Crosshair,
  CalendarCheck,
  Scale,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  UserCheck,
  Building,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
  PhoneCall,
  SunMedium,
  Volume2,
  Compass,
  Menu,
  LogIn,
  User,
} from 'lucide-react';
import { WeatherData, SupportedLanguage, UserRole } from './types';
import { WeatherWidget } from './components/WeatherWidget';
import { CropDoctor } from './components/CropDoctor';
import { AiAdvisorChat } from './components/AiAdvisorChat';
import { SatelliteRadarMap } from './components/SatelliteRadarMap';
import { MandiExchange } from './components/MandiExchange';
import { FarmLedger } from './components/FarmLedger';
import { ProblemSolutionGuide } from './components/ProblemSolutionGuide';
import { ProcurementBookingView } from './components/ProcurementBookingView';
import { DirectMarketplaceView } from './components/DirectMarketplaceView';
import { DailyFarmingTips } from './components/DailyFarmingTips';
import { FarmLoader } from './components/FarmLoader';
import { ScrollToTop } from './components/ScrollToTop';
import { AppTourModal } from './components/AppTourModal';
import { KishanMitraLogo } from './components/KishanMitraLogo';
import { SideMenuDrawer } from './components/SideMenuDrawer';
import { LoginPage } from './components/LoginPage';
import { AgriculturalBackground, FarmSceneType, VisibilityLevel } from './components/AgriculturalBackground';
import { AgriculturalHeroCard } from './components/AgriculturalHeroCard';
import { ScenicSkyAndFarmAnimations } from './components/ScenicSkyAndFarmAnimations';
import { ThemeModeToggle } from './components/ThemeModeToggle';
import {
  AmbientFloatingFarmSymbols,
  AnimatedFarmSymbolsBar,
  AnimatedWheatSymbol,
  AnimatedLeafSymbol,
  AnimatedTractorSymbol,
  AnimatedSunSymbol,
  AnimatedButterflySymbol,
  AnimatedWindTurbineSymbol,
  AnimatedFarmerNamaste,
} from './components/AnimatedFarmingSymbols';

interface DistrictLocation {
  name: string;
  state: string;
  lat: number;
  lon: number;
}

const POPULAR_DISTRICTS: DistrictLocation[] = [
  { name: 'Shivpuri', state: 'Madhya Pradesh', lat: 25.4244, lon: 77.6601 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577 },
  { name: 'Ludhiana', state: 'Punjab', lat: 30.901, lon: 75.8573 },
  { name: 'Karnal', state: 'Haryana', lat: 29.6857, lon: 76.9905 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739 },
];

export function App() {
  const [language, setLanguage] = useState<SupportedLanguage>('hi');
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('kishanmitra_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });
  const [currentScene, setCurrentScene] = useState<FarmSceneType>('golden_harvest');
  const [visibilityLevel, setVisibilityLevel] = useState<VisibilityLevel>(() => {
    const saved = localStorage.getItem('kishanmitra_visibility');
    if (saved === 'vivid' || saved === 'balanced' || saved === 'soft') return saved;
    return 'vivid';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('kishanmitra_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('kishanmitra_visibility', visibilityLevel);
  }, [visibilityLevel]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [currentDistrict, setCurrentDistrict] = useState<DistrictLocation>(POPULAR_DISTRICTS[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [showLoaderShowcase, setShowLoaderShowcase] = useState(false);
  const [showcaseVariant, setShowcaseVariant] = useState<'plant' | 'grain' | 'both'>('plant');
  const [showcaseSize, setShowcaseSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [sunlightMode, setSunlightMode] = useState(false);
  const [showHelplineModal, setShowHelplineModal] = useState(false);
  const [showAppTour, setShowAppTour] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    phoneOrEmail: string;
    role: UserRole;
    isLoggedIn: boolean;
    district?: string;
  }>({
    name: 'रमेश कुमार (किसान)',
    phoneOrEmail: 'ramesh.farmer@kishanmitra.in',
    role: 'farmer',
    isLoggedIn: true,
    district: 'Shivpuri',
  });

  // Auto-launch guided app tour on farmer's first visit
  useEffect(() => {
    const tourCompleted = localStorage.getItem('krishi_setu_tour_completed');
    if (!tourCompleted) {
      const timer = setTimeout(() => {
        setShowAppTour(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Tab state
  const [activeTab, setActiveTab] = useState<
    'procurement' | 'marketplace' | 'mandi' | 'weather' | 'doctor' | 'advisor' | 'ledger' | 'radar' | 'guide'
  >('procurement');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Time of day calculation for farmer-friendly dynamic color & atmosphere
  const [timeOfDay, setTimeOfDay] = useState<{
    phase: 'dawn' | 'day' | 'dusk' | 'night';
    labelHi: string;
    labelEn: string;
    greetingHi: string;
  }>({
    phase: 'day',
    labelHi: 'दोपहर (सूरज की रोशनी)',
    labelEn: 'Midday Sunlight',
    greetingHi: 'शुभ दिन',
  });

  useEffect(() => {
    const updateTimePhase = () => {
      const hour = new Date().getHours();
      if (hour >= 4 && hour < 9) {
        setTimeOfDay({
          phase: 'dawn',
          labelHi: 'भोर (अमृत वेला)',
          labelEn: 'Dawn & Morning Dew',
          greetingHi: 'सुप्रभात किसान भाई',
        });
      } else if (hour >= 9 && hour < 17) {
        setTimeOfDay({
          phase: 'day',
          labelHi: 'दिन / दोपहर',
          labelEn: 'Working Day',
          greetingHi: 'शुभ दोपहर किसान साथी',
        });
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay({
          phase: 'dusk',
          labelHi: 'गोधूलि वेला / शाम',
          labelEn: 'Sunset & Dusk',
          greetingHi: 'शुभ संध्या',
        });
      } else {
        setTimeOfDay({
          phase: 'night',
          labelHi: 'रात्रि (विश्राम समय)',
          labelEn: 'Night Rest',
          greetingHi: 'शुभ रात्रि',
        });
      }
    };

    updateTimePhase();
    const timer = setInterval(updateTimePhase, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather telemetry from backend
  const fetchWeather = useCallback(async (loc: DistrictLocation) => {
    setWeatherLoading(true);
    try {
      const res = await fetch(
        `/api/weather?lat=${loc.lat}&lon=${loc.lon}&q=${encodeURIComponent(loc.name)}&lang=${language}`
      );
      if (!res.ok) throw new Error('Weather fetch error');
      const json = await res.json();
      if (json.success && json.data) {
        setWeatherData(json.data);
      }
    } catch (err) {
      console.warn('Weather load notice:', err);
    } finally {
      setWeatherLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchWeather(currentDistrict);
  }, [currentDistrict, fetchWeather]);

  // Handle Geolocation
  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: DistrictLocation = {
            name: 'Local Farm Field',
            state: 'Current GPS',
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          setCurrentDistrict(loc);
        },
        (err) => {
          console.warn('Geolocation denied or unavailable:', err);
        }
      );
    }
  };

  // Search geocoding
  const handleSearch = async (val: string) => {
    setSearchQuery(val);
    if (val.trim().length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      const res = await fetch(`/api/weather/geocode?q=${encodeURIComponent(val)}`);
      if (res.ok) {
        const json = await res.json();
        setSearchResults(json.results || []);
        setShowSearchDropdown(true);
      }
    } catch (e) {
      console.warn('Geocode search failed', e);
    }
  };

  // Tabs definition
  const NAV_TABS = [
    {
      id: 'procurement',
      icon: CalendarCheck,
      labelHi: 'स्लॉट व गेट पास',
      labelEn: 'Procurement Slots',
      badge: 'SIH26033',
    },
    {
      id: 'marketplace',
      icon: Scale,
      labelHi: 'सीधा बाज़ार (Bids)',
      labelEn: 'Direct Market',
      badge: '0% Middleman',
    },
    {
      id: 'mandi',
      icon: Globe2,
      labelHi: 'मंडी भाव व मैप',
      labelEn: 'Mandi Rates & Map',
      badge: 'Live Map',
    },
    {
      id: 'weather',
      icon: CloudSun,
      labelHi: 'मौसम व सलाह',
      labelEn: 'Weather & Alerts',
    },
    {
      id: 'doctor',
      icon: Stethoscope,
      labelHi: 'फसल डॉक्टर AI',
      labelEn: 'Crop Doctor',
    },
    {
      id: 'advisor',
      icon: MessageSquare,
      labelHi: 'कृषि सलाहकार',
      labelEn: 'AI Advisor',
    },
    {
      id: 'ledger',
      icon: BookOpen,
      labelHi: 'खेत बहीखाता',
      labelEn: 'Farm Ledger',
    },
    {
      id: 'radar',
      icon: Radio,
      labelHi: 'उपग्रह राडार',
      labelEn: 'Satellite Radar',
    },
    {
      id: 'guide',
      icon: HelpCircle,
      labelHi: 'समस्या-समाधान',
      labelEn: 'Crop Guide',
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-emerald-200 transition-colors duration-300 relative ${
      theme === 'dark' ? 'dark text-stone-100' : 'text-stone-900'
    }`}>
      {/* 1. High-Resolution Photographic Agricultural Background (Wheat fields, Lush Greenery, or Night Sky) */}
      <AgriculturalBackground
        theme={theme}
        scene={currentScene}
        visibilityLevel={visibilityLevel}
        timeOfDayPhase={timeOfDay.phase}
      />

      {/* 2. Scenic Sky & Live Farm Animations (Drifting Clouds, Flying Birds, Fireflies/Pollen, Tractor) */}
      <ScenicSkyAndFarmAnimations theme={theme} />

      {/* Live Animated Farm Vitality Symbols Ticker */}
      <div className="relative z-10">
        <AnimatedFarmSymbolsBar language={language} />
      </div>

      {/* Top Banner with Dynamic Animated Gradient */}
      <div className="animated-farm-gradient text-white text-xs py-1.5 px-4 shadow-xs relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping" />
            <span className="font-extrabold tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>
                {language === 'hi'
                  ? 'किसानMitra (Kishan Mitra) - राष्ट्रीय पारदर्शी खरीद, सीधी बोली व ई-मंडी ग्रिड'
                  : 'Kishan Mitra (किसानMitra) - National Transparent Procurement & Direct Farm Exchange'}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-emerald-100 text-[11px] font-medium">
            {/* Time of Day Indicator */}
            <div className="flex items-center gap-1 bg-black/20 px-2.5 py-0.5 rounded-full border border-white/20">
              {timeOfDay.phase === 'dawn' && <Sunrise className="w-3 h-3 text-amber-300" />}
              {timeOfDay.phase === 'day' && <Sun className="w-3 h-3 text-amber-300" />}
              {timeOfDay.phase === 'dusk' && <Sunset className="w-3 h-3 text-orange-300" />}
              {timeOfDay.phase === 'night' && <Moon className="w-3 h-3 text-indigo-200" />}
              <span>{language === 'hi' ? timeOfDay.labelHi : timeOfDay.labelEn}</span>
            </div>

            <button
              onClick={() => setShowLoaderShowcase(true)}
              className="bg-emerald-800/80 hover:bg-emerald-900 text-amber-200 border border-amber-300/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold transition shadow-xs cursor-pointer"
              title="Preview FarmLoader Component"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>🌱 FarmLoader</span>
            </button>

            {/* Guided Tour Trigger Button in Top Ribbon */}
            <button
              onClick={() => setShowAppTour(true)}
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 text-[11px] transition shadow-xs cursor-pointer"
              title="Guided App Tour for Farmers"
            >
              <Compass className="w-3 h-3 text-stone-950" />
              <span>{language === 'hi' ? '🧭 ऐप टूर' : language === 'pa' ? '🧭 ਐਪ ਟੂਰ' : '🧭 App Tour'}</span>
            </button>

            <span className="hidden sm:inline">0% बिचौलिया कमीशन</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">डिजिटल गेट पास QR</span>
          </div>
        </div>
      </div>

      {/* Main App Header */}
      <header className="farm-glass bg-white/90 dark:bg-stone-900/90 border-b border-stone-200/80 dark:border-stone-800 sticky top-0 z-40 shadow-xs backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Logo & Identity with Left-Side Menu Toggle (Three Horizontal Lines) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Left Side Menu Toggle with Three Horizontal Lines (☰) */}
              <button
                onClick={() => setIsSideMenuOpen(true)}
                className="p-2 -ml-1 rounded-xl bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-amber-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-300 transition flex items-center justify-center cursor-pointer shadow-2xs group"
                title="नेविगेशन मेनू खोलें (तीन रेखाएँ) / Open Side Menu"
                aria-label="Open Left Side Menu"
              >
                <Menu className="w-5 h-5 text-emerald-800 dark:text-amber-300 group-hover:scale-110 transition-transform" />
              </button>

              {/* Site Logo with the new Kishan Mitra emblem */}
              <div
                onClick={() => setActiveTab('procurement')}
                className="cursor-pointer"
                title="Kishan Mitra Home"
              >
                <KishanMitraLogo size="sm" variant="horizontal" />
              </div>

              {/* Animated Farming Symbols beside logo */}
              <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-stone-200 dark:border-stone-700">
                <AnimatedWheatSymbol size={22} />
                <AnimatedLeafSymbol size={20} />
                <AnimatedTractorSymbol size={24} />
                <AnimatedSunSymbol size={20} />
                <AnimatedButterflySymbol size={22} />
              </div>
            </div>

            {/* Mobile Actions: Dark/Light Mode, Role, Sunlight, Helpline, Tour & Login */}
            <div className="flex md:hidden items-center gap-1.5">
              <ThemeModeToggle
                theme={theme}
                onToggleTheme={toggleTheme}
                currentScene={currentScene}
                onChangeScene={setCurrentScene}
                language={language}
                showSceneSelector={true}
                visibilityLevel={visibilityLevel}
                onChangeVisibility={setVisibilityLevel}
              />

              <button
                onClick={() => setShowLoginPage(true)}
                className="p-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition shadow-xs cursor-pointer flex items-center gap-1"
                title="लॉगिन / Login"
              >
                <LogIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowHelplineModal(true)}
                className="p-1.5 rounded-lg bg-emerald-50 dark:bg-stone-800 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-stone-700"
                title="Kisan Helpline"
              >
                <PhoneCall className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowAppTour(true)}
                className="p-1.5 rounded-lg bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-stone-700"
                title="Guided App Tour"
              >
                <Compass className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              </button>
            </div>
          </div>

          {/* Search & Location Bar */}
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:bg-white transition">
                <Search className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'मंडी या जिला खोजें (उदा. शिवपुरी, इंदौर, करनाल, लुधियाना)...'
                      : 'Search district or mandi...'
                  }
                  className="w-full bg-transparent text-xs sm:text-sm text-stone-800 focus:outline-none font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchDropdown(false);
                    }}
                    className="text-stone-400 hover:text-stone-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-stone-200 shadow-lg z-50 overflow-hidden text-xs">
                  {searchResults.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentDistrict({
                          name: item.name,
                          state: item.state,
                          lat: item.lat,
                          lon: item.lon,
                        });
                        setSearchQuery('');
                        setShowSearchDropdown(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-emerald-50 flex items-center justify-between border-b border-stone-100 last:border-none"
                    >
                      <span className="font-semibold text-stone-800">{item.display}</span>
                      <span className="text-[10px] text-stone-400">
                        {item.lat.toFixed(2)}, {item.lon.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* GPS Auto-detect button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleUseCurrentLocation}
              title="Use current GPS location"
              className="p-2.5 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 rounded-xl transition border border-stone-300 flex items-center justify-center shrink-0"
            >
              <Crosshair className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Desktop Role & Language Switcher */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Role Switcher */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <span className="text-[10px] font-bold text-stone-400 px-1 uppercase">भूमिका:</span>
              <button
                onClick={() => setUserRole('farmer')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  userRole === 'farmer'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>किसान (Farmer)</span>
              </button>
              <button
                onClick={() => setUserRole('retailer')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  userRole === 'retailer'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>खरीदार (Buyer)</span>
              </button>
              <button
                onClick={() => setUserRole('mandi_officer')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  userRole === 'mandi_officer'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>मंडी अधिकारी</span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
              {(['hi', 'pa', 'en'] as SupportedLanguage[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    language === l ? 'bg-white dark:bg-stone-700 text-emerald-800 dark:text-amber-300 shadow-xs' : 'text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {l === 'hi' ? 'हिन्दी' : l === 'pa' ? 'ਪੰਜਾਬੀ' : 'English'}
                </button>
              ))}
            </div>

            {/* Prominent Dark/Light Theme Mode Toggle & Farm Scenery Selector */}
            <ThemeModeToggle
              theme={theme}
              onToggleTheme={toggleTheme}
              currentScene={currentScene}
              onChangeScene={setCurrentScene}
              language={language}
              showSceneSelector={true}
              visibilityLevel={visibilityLevel}
              onChangeVisibility={setVisibilityLevel}
            />

            {/* Friendly Farmer Namaste Avatar Button */}
            <AnimatedFarmerNamaste
              language={language}
              onClick={() => setShowHelplineModal(true)}
            />

            {/* Outdoor Sunlight Mode (High-Contrast for Open Fields) */}
            <button
              onClick={() => setSunlightMode(!sunlightMode)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-2xs ${
                sunlightMode
                  ? 'bg-amber-400 text-stone-950 border-amber-500 font-extrabold ring-2 ring-amber-300'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700'
              }`}
              title="Toggle Outdoor High-Contrast Sunlight Mode for Open Fields"
            >
              <SunMedium className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{language === 'hi' ? (sunlightMode ? 'धूप मोड: चालू' : 'धूप मोड') : (sunlightMode ? 'Sunlight: ON' : 'Sunlight Mode')}</span>
            </button>

            {/* Kisan Emergency Helpline Trigger */}
            <button
              onClick={() => setShowHelplineModal(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
              title="National Kisan Call Center & Mandi Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>1800-180-1551</span>
            </button>

            {/* Guided Farmer App Tour Trigger */}
            <button
              onClick={() => setShowAppTour(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
              title="Guided Step-by-Step App Tour for Farmers"
            >
              <Compass className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>{language === 'hi' ? 'मार्गदर्शन टूर' : language === 'pa' ? 'ਐਪ ਟੂਰ' : 'App Tour'}</span>
            </button>

            {/* Login / User Profile Trigger Button (Screenshot-matched) */}
            <button
              onClick={() => setShowLoginPage(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-2xs cursor-pointer ${
                userProfile.isLoggedIn
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800 ring-1 ring-emerald-400/40'
                  : 'bg-white hover:bg-stone-50 text-stone-900 border-stone-300'
              }`}
              title="लॉगिन करें / खाता प्रबंधन / Login"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-300" />
              <span className="truncate max-w-[120px]">
                {userProfile.isLoggedIn ? userProfile.name.split(' ')[0] : (language === 'hi' ? 'लॉगिन' : 'Login')}
              </span>
            </button>
          </div>
        </div>

        {/* Popular Districts Quick Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center gap-2 overflow-x-auto scrollbar-none border-t border-stone-100 dark:border-stone-800 text-xs">
          <span className="text-stone-500 dark:text-stone-400 text-[11px] font-bold shrink-0 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-amber-300" />
            <span>{language === 'hi' ? 'त्वरित मंडी केंद्र:' : 'Active Agro Hubs:'}</span>
          </span>
          {POPULAR_DISTRICTS.map((dist) => (
            <button
              key={dist.name}
              onClick={() => setCurrentDistrict(dist)}
              className={`shrink-0 px-2.5 py-0.5 rounded-lg text-xs font-bold transition ${
                currentDistrict.name === dist.name
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 shadow-2xs'
                  : 'bg-stone-50 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300'
              }`}
            >
              {dist.name} ({dist.state.slice(0, 2)})
            </button>
          ))}
        </div>
      </header>

      {/* Main Navigation Tabs with Sliding Layout Animation */}
      <nav className="farm-glass bg-white/90 dark:bg-stone-900/90 border-b border-stone-200/80 dark:border-stone-800 shadow-xs sticky top-[77px] z-30 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1.5 overflow-x-auto scrollbar-none py-2">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'text-white'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {/* Active animated background pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-xl bg-emerald-800 dark:bg-emerald-700 shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-4 h-4" />
                  <span>{language === 'hi' ? tab.labelHi : tab.labelEn}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-black uppercase tracking-wider ${
                        isActive ? 'bg-amber-400 text-stone-900' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area with Smooth Page Transition */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {activeTab === 'procurement' && (
              <div className="space-y-6">
                <AgriculturalHeroCard
                  bannerType="procurement"
                  titleHi="सरकारी खरीद व ई-मंडी गेट पास स्लॉट बुकिंग"
                  titleEn="Direct APMC Procurement & Mandi Gate Pass"
                  subtitleHi="बिना लंबी कतार, सीधे एमएसपी (MSP) दर पर पारदर्शी खरीद, डिजिटल टोकन व 48 घंटे में सीधा बैंक डीबीटी भुगतान।"
                  subtitleEn="Transparent token reservation, moisture grading verification, and guaranteed direct benefit transfer."
                  badgeHi="पारदर्शी सरकारी खरीद"
                  badgeEn="Direct APMC Settlement"
                  language={language}
                  metrics={[
                    { labelHi: 'एमएसपी गेहूं दर', labelEn: 'Wheat MSP', value: '₹2,425 / क्विंटल', color: 'text-amber-300' },
                    { labelHi: 'औसत मंडी गेट समय', labelEn: 'Avg Gate Time', value: '< 15 मिनट', color: 'text-emerald-300' },
                    { labelHi: 'सक्रिय खरीद केंद्र', labelEn: 'Active Centers', value: '1,420+ मंडियां', color: 'text-sky-300' },
                  ]}
                />
                <DailyFarmingTips
                  language={language}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
                <ProcurementBookingView
                  language={language}
                  userRole={userRole}
                  currentDistrict={currentDistrict.name}
                />
              </div>
            )}

            {activeTab === 'marketplace' && (
              <div className="space-y-6">
                <AgriculturalHeroCard
                  bannerType="marketplace"
                  titleHi="सीधा किसान बाज़ार व खरीदार सीधी बोली"
                  titleEn="Direct Farm Marketplace & Buyer Bidding"
                  subtitleHi="बिचौलियों और आढ़तियों के बिना अपनी उपज को सीधे देश भर के सत्यापित व्यापारियों और मिल मालिकों को उच्चतम मूल्य पर बेचें।"
                  subtitleEn="Direct farmer-to-buyer spot trading with zero middleman deductions and escrow-secured digital payments."
                  badgeHi="सीधा किसान व्यापार"
                  badgeEn="Zero Commission Trade"
                  language={language}
                  metrics={[
                    { labelHi: 'सीधी बोली मुनाफा', labelEn: 'Direct Margin', value: '+18% अधिक लाभ', color: 'text-emerald-300' },
                    { labelHi: 'सत्यापित खरीदार', labelEn: 'Verified Buyers', value: '5,800+ व्यापारी', color: 'text-amber-300' },
                    { labelHi: 'सुरक्षित एस्क्रो', labelEn: 'Escrow Security', value: '100% गारंटीड', color: 'text-sky-300' },
                  ]}
                />
                <DirectMarketplaceView
                  language={language}
                  userRole={userRole}
                  currentDistrict={currentDistrict.name}
                />
              </div>
            )}

            {activeTab === 'mandi' && (
              <div className="space-y-6">
                <AgriculturalHeroCard
                  bannerType="mandi"
                  titleHi="लाइव एगमार्कनेट मंडी भाव व आवक सूचकांक"
                  titleEn="Live Agmarknet Mandi Rates & APMC Grid"
                  subtitleHi="देश भर की 2,800+ एपीएमसी मंडियों के लाइव भाव, दैनिक आवक, मॉडल मूल्य व 7-दिवसीय मूल्य रुझान विश्लेषण।"
                  subtitleEn="Real-time APMC mandi price indices, daily arrivals, modal prices, and 7-day trend analytics."
                  badgeHi="लाइव मंडी भाव ग्रिड"
                  badgeEn="Live APMC Market Feed"
                  language={language}
                  metrics={[
                    { labelHi: 'ट्रैक की गई फसलें', labelEn: 'Crops Monitored', value: '120+ कृषि उपज', color: 'text-amber-300' },
                    { labelHi: 'दैनिक आवक डेटा', labelEn: 'Daily Arrivals', value: '2.4 लाख क्विंटल', color: 'text-emerald-300' },
                    { labelHi: 'भाव अपडेट दर', labelEn: 'Update Interval', value: 'प्रति 10 मिनट', color: 'text-sky-300' },
                  ]}
                />
                <MandiExchange
                  language={language}
                  userDistrict={currentDistrict}
                  onSelectMandiForSlot={(mandiName, cropName) => {
                    setActiveTab('procurement');
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'weather' && (
              <div className="space-y-6">
                <AgriculturalHeroCard
                  bannerType="weather"
                  titleHi="सटीक कृषि मौसम पूर्वानुमान व सिंचाई सलाह"
                  titleEn="Agro-Weather Forecast & Smart Irrigation Advisory"
                  subtitleHi="आपके गांव और ब्लॉक स्तर पर अगले 7 दिनों की वर्षा, आर्द्रता, हवा की गति व कीटनाशक छिड़काव उपयुक्तता।"
                  subtitleEn="Hyperlocal rainfall predictions, wind speed tracking, and crop spray advisory alerts."
                  badgeHi="मौसम व सिंचाई मार्गदर्शन"
                  badgeEn="Weather & Irrigation Guide"
                  language={language}
                  metrics={[
                    { labelHi: 'वर्तमान तापमान', labelEn: 'Temperature', value: `${weatherData?.temperature ?? 28}°C`, color: 'text-amber-300' },
                    { labelHi: 'हवा में नमी', labelEn: 'Humidity', value: `${weatherData?.humidity ?? 55}%`, color: 'text-sky-300' },
                    { labelHi: 'वर्षा संभावना', labelEn: 'Rain Chance', value: '15% शुष्क', color: 'text-emerald-300' },
                  ]}
                />
                <WeatherWidget
                  weather={weatherData}
                  loading={weatherLoading}
                  language={language}
                  onRefresh={() => fetchWeather(currentDistrict)}
                />
              </div>
            )}

            {activeTab === 'doctor' && (
              <div className="space-y-6">
                <AgriculturalHeroCard
                  bannerType="crop_doctor"
                  titleHi="एआई फसल डॉक्टर व त्वरित रोग निदान"
                  titleEn="AI Crop Doctor & Pest Diagnosis"
                  subtitleHi="फसल की पत्ती, तने या फल की फोटो अपलोड करें और तुरंत सटीक बीमारी पहचान, जैविक उपचार व कीटनाशक मात्रा जानें।"
                  subtitleEn="Instant visual plant pathology, organic remedy prescriptions, and certified agrochemical dosages."
                  badgeHi="स्मार्ट फसल सुरक्षा"
                  badgeEn="Smart Plant Health"
                  language={language}
                  metrics={[
                    { labelHi: 'निदान सटीकता', labelEn: 'Diagnosis Accuracy', value: '98.4%', color: 'text-emerald-300' },
                    { labelHi: 'रोग डाटाबेस', labelEn: 'Diseases Indexed', value: '450+ फसल रोग', color: 'text-amber-300' },
                    { labelHi: 'जैविक समाधान', labelEn: 'Organic Remedies', value: '100% सुरक्षित', color: 'text-sky-300' },
                  ]}
                />
                <CropDoctor
                  language={language}
                  weatherData={weatherData}
                  currentDistrict={currentDistrict.name}
                />
              </div>
            )}

            {activeTab === 'advisor' && (
              <div className="space-y-6">
                <AgriculturalHeroCard
                  bannerType="general"
                  titleHi="किसान साथी एआई बहुभाषी कृषि सलाहकार"
                  titleEn="Kishan Sathi AI Multilingual Farming Advisor"
                  subtitleHi="अपनी भाषा में बोलकर या लिखकर खाद, बीज, मिट्टी परीक्षण, मौसम और सरकारी योजनाओं से संबंधित कोई भी सवाल पूछें।"
                  subtitleEn="Voice-enabled intelligent agro-consultant for crop advisory, soil testing, and government subsidies."
                  badgeHi="24x7 एआई कृषि मित्र"
                  badgeEn="24x7 AI Advisor"
                  language={language}
                  metrics={[
                    { labelHi: 'समर्थित भाषाएँ', labelEn: 'Languages', value: 'हिन्दी • ਪੰਜਾਬੀ • Eng', color: 'text-amber-300' },
                    { labelHi: 'उत्तर समय', labelEn: 'Response Time', value: '< 2 सेकंड', color: 'text-emerald-300' },
                    { labelHi: 'कृषि ज्ञान आधार', labelEn: 'Knowledge Base', value: 'ICAR & KVK मान्य', color: 'text-sky-300' },
                  ]}
                />
                <AiAdvisorChat language={language} district={currentDistrict.name} />
              </div>
            )}

            {activeTab === 'ledger' && (
              <div className="space-y-6">
                <AgriculturalHeroCard
                  bannerType="ledger"
                  titleHi="डिजिटल किसान खाता-बही व पारदर्शी आय-व्यय"
                  titleEn="Farm Ledger & Transparent Direct Benefit Transfer"
                  subtitleHi="बीज, खाद, सिंचाई, डीजल, मजदूरी के खर्चे और फसल बिक्री की शुद्ध कमाई का एक-एक पाई का हिसाब।"
                  subtitleEn="Track seasonal input expenses, gross crop revenues, and net farm profits with certified DBT receipts."
                  badgeHi="पारदर्शी आय-व्यय"
                  badgeEn="Transparent Farm Accounting"
                  language={language}
                  metrics={[
                    { labelHi: 'औसत लाभ वृद्धि', labelEn: 'Avg Margin Growth', value: '+22.4%', color: 'text-emerald-300' },
                    { labelHi: 'डिजिटल रसीदें', labelEn: 'Certified Invoices', value: 'जीएसटी/एपीएमसी मान्य', color: 'text-amber-300' },
                    { labelHi: 'डीबीटी ट्रैकिंग', labelEn: 'DBT Tracking', value: 'सीधा बैंक खाता', color: 'text-sky-300' },
                  ]}
                />
                <FarmLedger language={language} />
              </div>
            )}

            {activeTab === 'radar' && (
              <div className="space-y-6">
                <AgriculturalHeroCard
                  bannerType="weather"
                  titleHi="इसरो व मौसम उपग्रह कृषि राडार ग्रिड"
                  titleEn="ISRO & Doppler Satellite Agri-Radar"
                  subtitleHi="उपग्रह मेघ चित्र, वर्षा राडार डॉप्लर वेव व तापमान हीटमैप का वास्तविक समय में लाइव दृश्य।"
                  subtitleEn="Live satellite cloud patterns, Doppler precipitation tracking, and thermal heat maps."
                  badgeHi="लाइव उपग्रह दृश्य"
                  badgeEn="Live Satellite Radar"
                  language={language}
                  metrics={[
                    { labelHi: 'राडार रेज़ोल्यूशन', labelEn: 'Radar Resolution', value: '1 किमी सटीक', color: 'text-amber-300' },
                    { labelHi: 'उपग्रह स्रोत', labelEn: 'Satellite Source', value: 'INSAT-3D & IMD', color: 'text-emerald-300' },
                    { labelHi: 'अपडेट फ्रीक्वेंसी', labelEn: 'Refresh Rate', value: 'रियल-टाइम', color: 'text-sky-300' },
                  ]}
                />
                <SatelliteRadarMap
                  lat={currentDistrict.lat}
                  lon={currentDistrict.lon}
                  locationName={currentDistrict.name}
                  temperature={weatherData?.temperature ?? 28}
                  humidity={weatherData?.humidity ?? 55}
                  windSpeed={weatherData?.windSpeed ?? 10}
                  language={language}
                />
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="space-y-6">
                <AgriculturalHeroCard
                  bannerType="general"
                  titleHi="किसान समाधान व प्रक्रिया मार्गदर्शिका"
                  titleEn="Farmer Solution & Step-by-Step Workflow Guide"
                  subtitleHi="स्लॉट बुकिंग, टोकन डाउनलोड, मंडी में प्रवेश, गुणवत्ता जांच और डीबीटी भुगतान की पूरी प्रक्रिया समझें।"
                  subtitleEn="Visual step-by-step guidance for token pass generation, gate weighment, and bank settlement."
                  badgeHi="संपूर्ण प्रक्रिया सहायता"
                  badgeEn="Complete Process Guide"
                  language={language}
                />
                <ProblemSolutionGuide language={language} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Interactive FarmLoader Showcase & Component Playground */}
      <AnimatePresence>
        {showLoaderShowcase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border-2 border-emerald-300 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                    🌱
                  </div>
                  <div>
                    <h3 className="font-black text-stone-900 text-base">
                      FarmLoader Reusable Component
                    </h3>
                    <p className="text-xs text-stone-500">
                      Smooth animated green plant growing & rotating grain icon for engaging data wait states
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLoaderShowcase(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Controls Bar */}
              <div className="mt-4 p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-stone-700">
                  <div className="flex items-center gap-1.5">
                    <span>एनीमेशन प्रकार (Variant):</span>
                    {(['plant', 'grain', 'both'] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setShowcaseVariant(v)}
                        className={`px-3 py-1 rounded-xl text-xs transition ${
                          showcaseVariant === v
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-200'
                        }`}
                      >
                        {v === 'plant' ? '🌿 Growing Plant' : v === 'grain' ? '🌾 Rotating Grain' : '🌟 Combined'}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span>आकार (Size):</span>
                    {(['sm', 'md', 'lg'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setShowcaseSize(s)}
                        className={`px-2.5 py-1 rounded-lg text-xs transition ${
                          showcaseSize === s
                            ? 'bg-stone-800 text-white'
                            : 'bg-white hover:bg-stone-200 text-stone-600 border border-stone-200'
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Render Preview */}
              <div className="mt-4 min-h-[220px] flex items-center justify-center p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100">
                <FarmLoader
                  variant={showcaseVariant}
                  size={showcaseSize}
                  language={language}
                  showTips={true}
                  message={
                    showcaseVariant === 'plant'
                      ? (language === 'hi'
                          ? 'हरी कोपल अंकुरित हो रही है • फसल आंकड़े लोड हो रहे हैं...'
                          : 'Sprouting fresh agricultural telemetry & crop records...')
                      : showcaseVariant === 'grain'
                      ? (language === 'hi'
                          ? 'घूमती सुनहरी बाली • लाइव मंडी व खरीद आंकड़े लोड हो रहे हैं...'
                          : 'Syncing live APMC Mandi rates & procurement slots...')
                      : (language === 'hi'
                          ? 'राष्ट्रीय कृषि ग्रिड से रीयल-टाइम डेटा सिंक हो रहा है...'
                          : 'Synchronizing national agricultural data grid...')
                  }
                  subMessage={
                    language === 'hi'
                      ? 'किसानों को प्रतीक्षा के दौरान सटीक वैज्ञानिक सुझाव व मौसम टिप्स प्रदर्शित होते हैं'
                      : 'Farmers receive educational agronomic guidance while records are retrieved'
                  }
                />
              </div>

              {/* Action Close */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <p className="text-[11px] text-stone-500">
                  Used across Weather, APMC Mandi, Crop Doctor AI, & Booking states.
                </p>
                <button
                  onClick={() => setShowLoaderShowcase(false)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  {language === 'hi' ? 'समझ गया / बंद करें' : 'Done / Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Kisan Emergency & APMC Helpline Modal */}
      <AnimatePresence>
        {showHelplineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-emerald-400 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
                    📞
                  </div>
                  <div>
                    <h3 className="font-black text-stone-900 text-base">
                      {language === 'hi' ? 'किसान सहायता व आपातकालीन केंद्र' : 'National Farmer Support Desk'}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {language === 'hi'
                        ? '24x7 निःशुल्क कॉल सेंटर, मंडी विवाद निवारण व डीबीटी सहायता'
                        : '24x7 Toll-Free Call Center, APMC Dispute & DBT Support'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHelplineModal(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                {/* 1. Kisan Call Center */}
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-emerald-950 text-sm block">
                      {language === 'hi' ? 'किसान कॉल सेंटर (Kisan Call Center)' : 'Kisan Call Center'}
                    </span>
                    <span className="text-emerald-800 text-[11px]">
                      {language === 'hi' ? '22 भारतीय भाषाओं में कृषि वैज्ञानिकों से सीधी बात' : 'Toll-free expert advice in 22 languages'}
                    </span>
                  </div>
                  <a
                    href="tel:18001801551"
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-black text-xs shadow-xs transition shrink-0"
                  >
                    1800-180-1551
                  </a>
                </div>

                {/* 2. MSP & Procurement Grievance */}
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-amber-950 text-sm block">
                      {language === 'hi' ? 'मंडी खरीद व तौल शिकायत' : 'Mandi Weighbridge Grievance'}
                    </span>
                    <span className="text-amber-800 text-[11px]">
                      {language === 'hi' ? 'कांटा तौल, नमी विवाद या गेट पास में सहायता' : 'Weighment or Gate Pass issues'}
                    </span>
                  </div>
                  <a
                    href="tel:18001802060"
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black text-xs shadow-xs transition shrink-0"
                  >
                    1800-180-2060
                  </a>
                </div>

                {/* 3. DBT & Direct Settlement */}
                <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-sky-950 text-sm block">
                      {language === 'hi' ? 'डीबीटी बैंक खाता भुगतान सेल' : 'Direct DBT Settlement Cell'}
                    </span>
                    <span className="text-sky-800 text-[11px]">
                      {language === 'hi' ? 'आधार लिंक बैंक खाते में राशि 48 घंटे में' : 'Aadhaar DBT disbursement tracking'}
                    </span>
                  </div>
                  <span className="font-black text-sky-900 bg-white px-2.5 py-1 rounded-lg border border-sky-300">
                    dbt-agro@gov.in
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-medium">
                  {language === 'hi' ? 'मुफ्त कॉल: सुबह 6:00 से रात 10:00 तक' : 'Toll-free operational: 6 AM - 10 PM IST'}
                </span>
                <button
                  onClick={() => setShowHelplineModal(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  {language === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Guided App Tour Modal for Zero-Tech Farmers */}
      <AppTourModal
        isOpen={showAppTour}
        onClose={() => setShowAppTour(false)}
        language={language}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Scroll-To-Top Component with Circular Progress Ring & Smooth Slide-up */}
      <ScrollToTop
        language={language}
        activeTab={activeTab}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onOpenTour={() => setShowAppTour(true)}
      />

      {/* Footer with Transparency Seal & Kishan Mitra Branding */}
      <footer className="farm-glass bg-white/90 dark:bg-stone-900/90 border-t border-stone-200/80 dark:border-stone-800 mt-auto py-6 px-4 relative z-10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2.5">
            <KishanMitraLogo size="xs" variant="icon-only" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            <span className="font-bold text-stone-800 dark:text-stone-200">
              किसानMitra • Kishan Mitra Digital Agricultural Platform
            </span>
            <span className="hidden md:inline text-stone-500 dark:text-stone-400">• 100% Direct DBT Mandi Settlement</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1">
              <AnimatedWheatSymbol size={18} />
              <AnimatedLeafSymbol size={16} />
              <AnimatedTractorSymbol size={18} />
              <AnimatedButterflySymbol size={16} />
              <AnimatedWindTurbineSymbol size={16} />
            </div>
            <span className="bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-md text-stone-700 dark:text-stone-300 font-semibold">
              Agmarknet & data.gov.in Live APMC Sync
            </span>
            <span>•</span>
            <span className="bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-md text-stone-700 dark:text-stone-300 font-semibold">
              SIH26033 Engine
            </span>
          </div>
        </div>
      </footer>

      {/* Persistent Ambient Floating Farm Symbols across all pages (More than 5 animated symbols active) */}
      <AmbientFloatingFarmSymbols />

      {/* Left Side Menu Drawer with Three Horizontal Lines Toggle */}
      <SideMenuDrawer
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId as any)}
        language={language}
        onLanguageChange={(lang) => setLanguage(lang)}
        userRole={userRole}
        onUserRoleChange={(role) => setUserRole(role)}
        userProfile={userProfile}
        onOpenLogin={() => setShowLoginPage(true)}
        onLogout={() => {
          setUserProfile({
            name: 'किसान साथी',
            phoneOrEmail: '',
            role: 'farmer',
            isLoggedIn: false,
          });
        }}
        sunlightMode={sunlightMode}
        onToggleSunlightMode={() => setSunlightMode(!sunlightMode)}
        theme={theme}
        onToggleTheme={toggleTheme}
        currentScene={currentScene}
        onChangeScene={setCurrentScene}
        visibilityLevel={visibilityLevel}
        onChangeVisibility={setVisibilityLevel}
      />

      {/* Login Screen (matching user screenshot) */}
      <LoginPage
        isOpen={showLoginPage}
        onClose={() => setShowLoginPage(false)}
        language={language}
        onLoginSuccess={(profile) => {
          setUserProfile(profile);
          setUserRole(profile.role);
        }}
      />
    </div>
  );
}
