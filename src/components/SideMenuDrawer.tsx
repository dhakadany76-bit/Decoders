import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CalendarCheck,
  Scale,
  Globe2,
  CloudSun,
  Stethoscope,
  MessageSquare,
  BookOpen,
  Radio,
  HelpCircle,
  LogIn,
  LogOut,
  UserCheck,
  Building,
  Truck,
  PhoneCall,
  SunMedium,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { SupportedLanguage, UserRole } from '../types';
import { KishanMitraLogo } from './KishanMitraLogo';
import {
  AnimatedWheatSymbol,
  AnimatedLeafSymbol,
  AnimatedTractorSymbol,
  AnimatedSunSymbol,
} from './AnimatedFarmingSymbols';
import { FarmSceneType, VisibilityLevel } from './AgriculturalBackground';
import goldenHarvestBg from '../assets/images/golden_harvest_bg_1789287946587.jpg';
import { Sun, Moon, Sparkles, Eye, Image as ImageIcon } from 'lucide-react';

interface UserProfile {
  name: string;
  phoneOrEmail: string;
  role: UserRole;
  isLoggedIn: boolean;
  avatarUrl?: string;
  district?: string;
}

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  userRole: UserRole;
  onUserRoleChange: (role: UserRole) => void;
  userProfile: UserProfile;
  onOpenLogin: () => void;
  onLogout: () => void;
  sunlightMode: boolean;
  onToggleSunlightMode: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  currentScene?: FarmSceneType;
  onChangeScene?: (scene: FarmSceneType) => void;
  visibilityLevel?: VisibilityLevel;
  onChangeVisibility?: (level: VisibilityLevel) => void;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  language,
  onLanguageChange,
  userRole,
  onUserRoleChange,
  userProfile,
  onOpenLogin,
  onLogout,
  sunlightMode,
  onToggleSunlightMode,
  theme = 'light',
  onToggleTheme,
  currentScene = 'golden_harvest',
  onChangeScene,
  visibilityLevel = 'vivid',
  onChangeVisibility,
}) => {
  const menuItems = [
    {
      id: 'procurement',
      icon: CalendarCheck,
      labelHi: 'स्लॉट व गेट पास',
      labelEn: 'Procurement Slots & Gate Pass',
      labelPa: 'ਖਰੀਦ ਸਲਾਟ ਅਤੇ ਗੇਟ ਪਾਸ',
      badge: 'SIH26033',
      desc: 'APMC तुलाई कतार बिना स्लॉट बुकिंग',
    },
    {
      id: 'marketplace',
      icon: Scale,
      labelHi: 'सीधा बाज़ार (Bids)',
      labelEn: 'Direct Marketplace',
      labelPa: 'ਸਿੱਧਾ ਬਾਜ਼ਾਰ (ਬੋਲੀ)',
      badge: '0% Middleman',
      desc: 'मिलर्स और व्यापारियों से सीधी बोली',
    },
    {
      id: 'mandi',
      icon: Globe2,
      labelHi: 'मंडी भाव व लाइव मैप',
      labelEn: 'Mandi Rates & Live Map',
      labelPa: 'ਮੰਡੀ ਭਾਅ ਅਤੇ ਲਾਈਵ ਨਕਸ਼ਾ',
      badge: 'Live Crowd',
      desc: 'एगमार्कनेट दरें व मंडी भीड़ रडार',
    },
    {
      id: 'weather',
      icon: CloudSun,
      labelHi: 'मौसम व कृषि अलर्ट',
      labelEn: 'Weather & Agroadvisory',
      labelPa: 'ਮੌਸਮ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸਲਾਹ',
      badge: 'IMD Live',
      desc: '7-दिवसीय वर्षा पूर्वानुमान व फसल सलाह',
    },
    {
      id: 'doctor',
      icon: Stethoscope,
      labelHi: 'फसल डॉक्टर AI',
      labelEn: 'Crop Doctor & Yield AI',
      labelPa: 'ਫਸਲ ਡਾਕਟਰ ਏ.ਆਈ',
      badge: 'Vision AI',
      desc: 'पत्ती स्कैन कर रोग व उपज प्रभाव जानें',
    },
    {
      id: 'advisor',
      icon: MessageSquare,
      labelHi: 'किसान AI सलाहकार',
      labelEn: 'Kishan AI Advisor',
      labelPa: 'ਕਿਸਾਨ ਏ.ਆਈ ਸਲਾਹਕਾਰ',
      badge: 'Voice Support',
      desc: 'बोलकर पूछें खाद, बीज व रोग उपचार',
    },
    {
      id: 'ledger',
      icon: BookOpen,
      labelHi: 'खेत बहीखाता (P&L)',
      labelEn: 'Farm Ledger & Accounts',
      labelPa: 'ਖੇਤ ਬਹੀ ਖਾਤਾ',
      badge: 'Voice Audio',
      desc: 'लागत, बिक्री व शुद्ध मुनाफा ट्रैक करें',
    },
    {
      id: 'radar',
      icon: Radio,
      labelHi: 'उपग्रह रडार (NDVI)',
      labelEn: 'Satellite Radar Map',
      labelPa: 'ਉਪਗ੍ਰਹਿ ਰਾਡਾਰ ਨਕਸ਼ਾ',
      badge: 'Sentinel-2',
      desc: 'खेत की हरियाली व नमी विश्लेषण',
    },
    {
      id: 'guide',
      icon: HelpCircle,
      labelHi: 'समस्या और समाधान',
      labelEn: 'Troubleshooting Guide',
      labelPa: 'ਸਮੱਸਿਆ ਅਤੇ ਹੱਲ',
      badge: 'Offline FAQ',
      desc: 'सामान्य किसान समस्याओं के त्वरित हल',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Sliding Left Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-50 w-84 sm:w-96 max-w-[90vw] h-full bg-stone-900 text-stone-100 flex flex-col shadow-2xl border-r border-stone-800 overflow-hidden"
          >
            {/* Drawer Header with Scenic Farm Photo */}
            <div className="relative border-b border-stone-800 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${goldenHarvestBg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/85 to-stone-900/80" />

              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KishanMitraLogo size="sm" textColor="light" />
                </div>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer border border-stone-700"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* User Profile Card in Drawer */}
            <div className="p-4 bg-stone-950/60 border-b border-stone-800/80">
              {userProfile.isLoggedIn ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 text-white font-extrabold flex items-center justify-center text-base shadow-sm shrink-0">
                      {userProfile.name ? userProfile.name[0]?.toUpperCase() : 'K'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-white truncate">
                          {userProfile.name}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-[11px] text-stone-400 truncate">
                        {userProfile.phoneOrEmail}
                      </p>
                      <span className="inline-block mt-0.5 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                        {userProfile.role === 'farmer' ? '🌾 किसान (Farmer)' : userProfile.role === 'buyer' ? '🏢 व्यापारी (Buyer)' : '🚚 ट्रांसपोर्टर (Transporter)'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onLogout();
                    }}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-rose-900/60 text-stone-400 hover:text-rose-300 transition text-xs flex items-center gap-1 shrink-0 cursor-pointer"
                    title="लॉगआउट करें"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-200">
                        {language === 'hi' ? 'स्वागत है!' : 'Welcome!'}
                      </span>
                      <p className="text-[11px] text-stone-400">
                        {language === 'hi' ? 'खाता एक्सेस करने हेतु लॉगिन करें' : 'Sign in to access your farm portal'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <AnimatedWheatSymbol size={22} />
                      <AnimatedLeafSymbol size={22} />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenLogin();
                    }}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{language === 'hi' ? 'लॉगिन / साइन-अप करें' : 'Login / Sign Up'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Scrollable Navigation Menu */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 px-3 pt-2 block">
                {language === 'hi' ? 'मुख्य कृषि सेवाएँ (Services)' : 'Farm Services Navigation'}
              </span>

              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const label = language === 'hi' ? item.labelHi : language === 'pa' ? item.labelPa : item.labelEn;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-500'
                        : 'hover:bg-stone-800/80 text-stone-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-emerald-700 text-amber-300'
                            : 'bg-stone-800 text-emerald-400 group-hover:bg-stone-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm truncate">
                            {label}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded-full font-black uppercase shrink-0 ${
                                isActive
                                  ? 'bg-amber-400 text-stone-950'
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800/70'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-stone-400 truncate mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-amber-300 translate-x-1' : 'text-stone-600 group-hover:text-stone-400'
                      }`}
                    />
                  </button>
                );
              })}

              {/* Direct Link to Login Screen */}
              <button
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-stone-800/80 text-amber-300 hover:text-amber-200 transition flex items-center justify-between border border-amber-500/20 bg-amber-950/20 cursor-pointer mt-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-900/60 text-amber-300 flex items-center justify-center shrink-0">
                    <LogIn className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs">
                      {language === 'hi' ? '🔑 लॉगिन स्क्रीन (Welcome Page)' : '🔑 Open Login Screen'}
                    </span>
                    <p className="text-[10px] text-stone-400">
                      {language === 'hi' ? 'स्क्रीनशॉट अनुसार आधुनिक लॉगिन दृश्य' : 'Sign in as Farmer, Buyer or Transporter'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>

              {/* Role Switcher in Drawer */}
              <div className="mt-4 p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block mb-2">
                  {language === 'hi' ? 'उपयोगकर्ता भूमिका बदलें (Role)' : 'Switch Operating Role'}
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => onUserRoleChange('farmer')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      userRole === 'farmer'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>किसान</span>
                  </button>
                  <button
                    onClick={() => onUserRoleChange('buyer')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      userRole === 'buyer'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>खरीदार</span>
                  </button>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block mb-2">
                  {language === 'hi' ? 'भाषा का चयन (Language)' : 'Select Language'}
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'hi', label: 'हिंदी' },
                    { id: 'en', label: 'English' },
                    { id: 'pa', label: 'ਪੰਜਾਬੀ' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => onLanguageChange(l.id as any)}
                      className={`py-1 rounded-lg text-xs font-bold transition ${
                        language === l.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark & Light Theme Switcher */}
              {onToggleTheme && (
                <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block mb-2 flex items-center justify-between">
                    <span>{language === 'hi' ? 'थीम मोड (Dark / Light)' : 'Appearance Theme'}</span>
                    <span className="text-amber-400 text-[9px] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{theme === 'dark' ? 'रात्रि दृश्य' : 'दिन का दृश्य'}</span>
                    </span>
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={theme === 'dark' ? onToggleTheme : undefined}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        theme === 'light'
                          ? 'bg-amber-400 text-stone-950 font-black shadow-xs'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>{language === 'hi' ? 'दिन (Light)' : 'Light'}</span>
                    </button>
                    <button
                      onClick={theme === 'light' ? onToggleTheme : undefined}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-emerald-700 text-white font-black shadow-xs ring-1 ring-emerald-400'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      <Moon className="w-4 h-4 text-amber-300" />
                      <span>{language === 'hi' ? 'रात (Dark)' : 'Dark'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Background Farm Scene Selector with 6 Scenes */}
              {onChangeScene && (
                <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'खेत पृष्ठभूमि दृश्य (6 दृश्य)' : 'Farm Scenery (6 Scenes)'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    <button
                      onClick={() => onChangeScene('golden_harvest')}
                      className={`p-1.5 rounded-lg font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                        currentScene === 'golden_harvest'
                          ? 'bg-amber-500 text-stone-950 font-black'
                          : 'bg-stone-800 text-stone-400 hover:text-amber-300'
                      }`}
                    >
                      <span className="text-base">🌾</span>
                      <span className="text-[10px] truncate w-full text-center">गेहूं फसल</span>
                    </button>

                    <button
                      onClick={() => onChangeScene('mandi_market')}
                      className={`p-1.5 rounded-lg font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                        currentScene === 'mandi_market'
                          ? 'bg-amber-500 text-stone-950 font-black'
                          : 'bg-stone-800 text-stone-400 hover:text-amber-300'
                      }`}
                    >
                      <span className="text-base">🏬</span>
                      <span className="text-[10px] truncate w-full text-center">अनाज मंडी</span>
                    </button>

                    <button
                      onClick={() => onChangeScene('tractor_field')}
                      className={`p-1.5 rounded-lg font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                        currentScene === 'tractor_field'
                          ? 'bg-amber-500 text-stone-950 font-black'
                          : 'bg-stone-800 text-stone-400 hover:text-amber-300'
                      }`}
                    >
                      <span className="text-base">🚜</span>
                      <span className="text-[10px] truncate w-full text-center">ट्रैक्टर खेत</span>
                    </button>

                    <button
                      onClick={() => onChangeScene('bountiful_harvest')}
                      className={`p-1.5 rounded-lg font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                        currentScene === 'bountiful_harvest'
                          ? 'bg-amber-500 text-stone-950 font-black'
                          : 'bg-stone-800 text-stone-400 hover:text-amber-300'
                      }`}
                    >
                      <span className="text-base">🤲</span>
                      <span className="text-[10px] truncate w-full text-center">दाने व उपज</span>
                    </button>

                    <button
                      onClick={() => onChangeScene('lush_green')}
                      className={`p-1.5 rounded-lg font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                        currentScene === 'lush_green'
                          ? 'bg-emerald-600 text-white font-black'
                          : 'bg-stone-800 text-stone-400 hover:text-emerald-300'
                      }`}
                    >
                      <span className="text-base">🌱</span>
                      <span className="text-[10px] truncate w-full text-center">धान हरियाली</span>
                    </button>

                    <button
                      onClick={() => onChangeScene('night_sky')}
                      className={`p-1.5 rounded-lg font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                        currentScene === 'night_sky'
                          ? 'bg-indigo-700 text-white font-black'
                          : 'bg-stone-800 text-stone-400 hover:text-indigo-300'
                      }`}
                    >
                      <span className="text-base">🌙</span>
                      <span className="text-[10px] truncate w-full text-center">चांदनी रात</span>
                    </button>
                  </div>

                  {/* Visibility Level Controller */}
                  {onChangeVisibility && (
                    <div className="pt-2 border-t border-stone-800">
                      <div className="flex items-center justify-between text-[11px] font-bold text-stone-300 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-emerald-400" />
                          <span>{language === 'hi' ? 'तस्वीर दृश्यता (Visibility)' : 'Visibility'}</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 bg-stone-900 p-1 rounded-xl">
                        {(['vivid', 'balanced', 'soft'] as VisibilityLevel[]).map((level) => (
                          <button
                            key={level}
                            onClick={() => onChangeVisibility(level)}
                            className={`py-1 rounded-lg text-[10px] font-black transition cursor-pointer ${
                              visibilityLevel === level
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'text-stone-400 hover:text-stone-200'
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
                </div>
              )}

              {/* Outdoor Sunlight Mode */}
              <button
                onClick={onToggleSunlightMode}
                className={`w-full p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                  sunlightMode
                    ? 'bg-amber-400 text-stone-950 border-amber-500'
                    : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <SunMedium className="w-4 h-4 text-amber-400" />
                  <span>{language === 'hi' ? 'तेज धूप / हाई-कंट्रास्ट मोड' : 'Outdoors High-Contrast Mode'}</span>
                </div>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-stone-900/40">
                  {sunlightMode ? 'चालू (ON)' : 'बंद (OFF)'}
                </span>
              </button>

              {/* Kisan Call Centre Helpline */}
              <a
                href="tel:18001801551"
                className="block p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/70 text-emerald-200 hover:bg-emerald-900/80 transition"
              >
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      किसान कॉल सेंटर (Toll-Free)
                    </span>
                    <span className="text-sm font-black text-amber-300">1800-180-1551</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Drawer Footer with Animated Symbols */}
            <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
              <div className="flex items-center gap-2">
                <AnimatedTractorSymbol size={22} />
                <AnimatedSunSymbol size={18} />
                <span>Kishan Mitra v2.4</span>
              </div>
              <span className="text-emerald-400 font-semibold">eNAM & SIH26033</span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
