import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Compass,
  PhoneCall,
  SunMedium,
  Check,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { SupportedLanguage } from '../types';

export interface AppTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  onNavigateToTab?: (tab: any) => void;
}

interface TourStep {
  id: string;
  stepNumber: number;
  tabKey?: string;
  badge: {
    hi: string;
    pa: string;
    en: string;
  };
  title: {
    hi: string;
    pa: string;
    en: string;
  };
  tagline: {
    hi: string;
    pa: string;
    en: string;
  };
  description: {
    hi: string;
    pa: string;
    en: string;
  };
  points: {
    hi: string[];
    pa: string[];
    en: string[];
  };
  spokenText: {
    hi: string;
    pa: string;
    en: string;
  };
  actionLabel: {
    hi: string;
    pa: string;
    en: string;
  };
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    stepNumber: 1,
    badge: {
      hi: 'शुरुआत • परिचय',
      pa: 'ਜਾਣ-ਪਛਾਣ',
      en: 'Step 1 • Welcome',
    },
    title: {
      hi: 'कृषि सेतु में आपका स्वागत है',
      pa: 'ਕ੍ਰਿਸ਼ੀ ਸੇਤੂ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
      en: 'Welcome to Krishi Setu & Kisan Mitra',
    },
    tagline: {
      hi: '100% पारदर्शी • कोई बिचौलिया कमीशन नहीं',
      pa: '100% ਪਾਰਦਰਸ਼ੀ • ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ',
      en: '100% Transparent • Zero Broker Commission',
    },
    description: {
      hi: 'यह पोर्टल विशेष रूप से किसान भाइयों के लिए बनाया गया है ताकि आपको बिना लाइन लगे सरकारी खरीद, सीधे खरीदार, और सही भाव मिल सकें। किसी तकनीक की जानकारी की ज़रूरत नहीं है—सब कुछ बहुत सरल और स्पष्ट है!',
      pa: 'ਇਹ ਪੋਰਟਲ ਖਾਸ ਤੌਰ \'ਤੇ ਕਿਸਾਨ ਭਰਾਵਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ ਤਾਂ ਜੋ ਤੁਹਾਨੂੰ ਬਿਨਾਂ ਲਾਈਨ ਲੱਗੇ ਸਰਕਾਰੀ ਖਰੀਦ ਅਤੇ ਸਹੀ ਮੁੱਲ ਮਿਲ ਸਕੇ।',
      en: 'A dedicated platform crafted for farmers. Book government mandi procurement slots from home, sell crops directly to verified millers with zero middleman commission, and protect your harvest.',
    },
    points: {
      hi: [
        'ट्रैक्टर की लंबी लाइनों से मुक्ति—घर बैठे टोकन पाएं',
        '0% दलाली—सीधे बड़े खरीदारों से बेहतर भाव लें',
        'मौसम की बारिश चेतावनी और पत्ते की बीमारी का तुरंत इलाज',
      ],
      pa: [
        'ਮੰਡੀ ਦੀਆਂ ਲੰਬੀਆਂ ਲਾਈਨਾਂ ਤੋਂ ਮੁਕਤੀ—ਘਰ ਬੈਠੇ ਟੋਕਨ ਲਵੋ',
        '0% ਕਮਿਸ਼ਨ—ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਤੋਂ ਚੰਗਾ ਮੁੱਲ ਲਵੋ',
        'ਮੌਸਮ ਚੇਤਾਵਨੀ ਅਤੇ ਬਿਮਾਰੀ ਦਾ ਤੁਰੰਤ ਹੱਲ',
      ],
      en: [
        'Skip mandi tractor lines with digital gate passes',
        '0% middleman fees—negotiate directly with verified buyers',
        'Localized rainfall forecasts and instant leaf pathology AI',
      ],
    },
    spokenText: {
      hi: 'कृषि सेतु में आपका स्वागत है। यहाँ आप घर बैठे मंडी तौल का टोकन ले सकते हैं, सीधे खरीदारों को फसल बेच सकते हैं, और मौसम व बीमारी की सलाह पा सकते हैं।',
      pa: 'ਕ੍ਰਿਸ਼ੀ ਸੇਤੂ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਇੱਥੇ ਤੁਸੀਂ ਘਰ ਬੈਠੇ ਮੰਡੀ ਸਲਾਟ ਬੁੱਕ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਫਸਲ ਵੇਚ ਸਕਦੇ ਹੋ।',
      en: 'Welcome to Krishi Setu. You can book mandi weighbridge tokens from home, sell directly to verified buyers, and get live weather and crop health advice.',
    },
    actionLabel: {
      hi: 'टूर जारी रखें',
      pa: 'ਅੱਗੇ ਵਧੋ',
      en: 'Next Feature',
    },
  },
  {
    id: 'procurement',
    stepNumber: 2,
    tabKey: 'procurement',
    badge: {
      hi: 'सरकारी खरीद • MSP',
      pa: 'ਸਰਕਾਰੀ ਖਰੀਦ',
      en: 'Step 2 • Procurement',
    },
    title: {
      hi: 'मंडी स्लॉट बुकिंग व डिजिटल गेट पास',
      pa: 'ਮੰਡੀ ਸਲਾਟ ਬੁਕਿੰਗ ਅਤੇ ਗੇਟ ਪਾਸ',
      en: 'Mandi Slot Booking & Digital QR Pass',
    },
    tagline: {
      hi: 'मंडी में 2-3 दिन ट्रैक्टर खड़ा रखने का झंझट खत्म',
      pa: 'ਲੰਬੀਆਂ ਲਾਈਨਾਂ ਤੋਂ ਛੁਟਕਾਰਾ',
      en: 'Eliminate Multi-Day Weighbridge Traffic',
    },
    description: {
      hi: 'गेहूं, चना, सरसों या धान बेचने के लिए अपनी मनपसंद तारीख और समय चुनें। आपको मोबाइल पर बारकोड व गेट पास मिलेगा। मंडी पहुँचते ही आपका तौल बिना रुके प्राथमिकता से होगा।',
      pa: 'ਕਣਕ, ਝੋਨਾ ਜਾਂ ਸਰ੍ਹੋਂ ਵੇਚਣ ਲਈ ਆਪਣੀ ਮਨਪਸੰਦ ਤਰੀਕ ਅਤੇ ਸਮਾਂ ਚੁਣੋ। ਮੋਬਾਈਲ \'ਤੇ QR ਗੇਟ ਪਾਸ ਮਿਲੇਗਾ ਅਤੇ ਬਿਨਾਂ ਰੁਕੇ ਤੋਲ ਹੋਵੇਗਾ।',
      en: 'Select your preferred date and 2-hour arrival window for wheat, mustard, or paddy. Receive an instant verified digital QR Gate Pass on your phone for priority weighbridge entry.',
    },
    points: {
      hi: [
        'अपनी सुविधा से 2 घंटे का समय चुनें (सुबह 9-11 या दोपहर)',
        'फोन में डिजिटल टोकन दिखाएं और सीधे तौल कांटे पर जाएं',
        'तौल पूरा होते ही 48 घंटे में सीधा बैंक खाते में DBT भुगतान',
      ],
      pa: [
        'ਆਪਣੀ ਸਹੂਲਤ ਅਨੁਸਾਰ 2 ਘੰਟੇ ਦਾ ਸਲਾਟ ਚੁਣੋ',
        'ਮੋਬਾਈਲ ਟੋਕਨ ਨਾਲ ਸਿੱਧਾ ਕੰਡੇ \'ਤੇ ਐਂਟਰੀ ਪਾਓ',
        '48 ਘੰਟਿਆਂ ਵਿੱਚ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਸਿੱਧਾ DBT ਭੁਗਤਾਨ',
      ],
      en: [
        'Choose a 2-hour window matching your harvest haul schedule',
        'Show the digital QR pass at the mandi gate for zero-wait weighment',
        'Direct DBT bank transfer sent within 48 hours of weighment',
      ],
    },
    spokenText: {
      hi: 'कदम 2: मंडी खरीद स्लॉट बुकिंग। तारीख और समय का स्लॉट चुनें, मोबाइल में डिजिटल टोकन पाएं, और बिना लाइन लगे सीधे तौल करवाएं।',
      pa: 'ਕਦਮ 2: ਮੰਡੀ ਸਲਾਟ ਬੁਕਿੰਗ। ਤਰੀਕ ਅਤੇ ਸਮਾਂ ਚੁਣੋ, ਮੋਬਾਈਲ ਵਿੱਚ ਟੋਕਨ ਲਵੋ ਅਤੇ ਬਿਨਾਂ ਲਾਈਨ ਲੱਗੇ ਸਿੱਧਾ ਤੋਲ ਕਰਵਾਓ।',
      en: 'Step 2: Mandi slot booking. Pick a date and time, get your digital QR pass, and proceed directly to weighment without waiting in queues.',
    },
    actionLabel: {
      hi: 'खरीद स्लॉट अभी देखें',
      pa: 'ਖਰੀਦ ਸਲਾਟ ਦੇਖੋ',
      en: 'View Procurement Slots',
    },
  },
  {
    id: 'marketplace',
    stepNumber: 3,
    tabKey: 'marketplace',
    badge: {
      hi: 'सीधा व्यापार • 0% कमीशन',
      pa: 'ਸਿੱਧਾ ਵਪਾਰ',
      en: 'Step 3 • Direct Marketplace',
    },
    title: {
      hi: 'सीधा किसान बाज़ार (Direct Bidding)',
      pa: 'ਸਿੱਧਾ ਕਿਸਾਨ ਬਾਜ਼ਾਰ',
      en: 'Direct Farmer Marketplace (Live Bids)',
    },
    tagline: {
      hi: 'सत्यापित राइस मिलर, दाल मिलर व आटा मिलर',
      pa: 'ਵੱਡੇ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਸਿੱਧਾ ਸੌਦਾ',
      en: 'Zero Brokerage • Direct Processor Access',
    },
    description: {
      hi: 'यहाँ कोई आढ़तिया या बिचौलिया नहीं है। बड़े मिलर और व्यापारी आपकी फसल पर सीधी बोली लगाते हैं। दाम पसंद आने पर एक क्लिक में स्वीकार करें। पैसे सरकारी एस्क्रो सुरक्षा में रहते हैं।',
      pa: 'ਇੱਥੇ ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ ਹੈ। ਵੱਡੇ ਮਿਲਰ ਅਤੇ ਵਪਾਰੀ ਸਿੱਧੀ ਬੋਲੀ ਲਗਾਉਂਦੇ ਹਨ। ਪਸੰਦ ਆਉਣ \'ਤੇ ਸੌਦਾ ਮਨਜ਼ੂਰ ਕਰੋ ਅਤੇ ਪੂਰਾ ਪੈਸਾ ਸੁਰੱਖਿਅਤ ਪਾਓ।',
      en: 'Connect directly with certified food millers and institutional buyers. Review transparent live bids, accept the highest offer, and enjoy guaranteed escrow payments before produce dispatch.',
    },
    points: {
      hi: [
        'MSP से भी ऊपर ऊँचे दाम पाने का बेहतरीन अवसर',
        'खरीदार की अग्रिम राशि बैंक एस्क्रो में सुरक्षित जमा रहती है',
        'खेत से ही लोडिंग की सुविधा उपलब्ध',
      ],
      pa: [
        'MSP ਨਾਲੋਂ ਵੀ ਵੱਧ ਰੇਟ ਪ੍ਰਾਪਤ ਕਰਨ ਦਾ ਸੁਨਹਿਰੀ ਮੌਕਾ',
        'ਪੈਸਾ ਸਰਕਾਰੀ ਬੈਂਕ ਐਸਕਰੋ ਵਿੱਚ ਪਹਿਲਾਂ ਹੀ ਜਮ੍ਹਾ ਰਹਿੰਦਾ ਹੈ',
        'ਖੇਤ ਤੋਂ ਹੀ ਫਸਲ ਚੁੱਕਣ ਦੀ ਸਹੂਲਤ',
      ],
      en: [
        'Command premium prices above MSP for export & milling grades',
        'Buyer funds are pre-locked in secure escrow before pickup',
        'Optional farmgate collection with verified digital weigh slips',
      ],
    },
    spokenText: {
      hi: 'कदम 3: सीधा किसान बाज़ार। यहाँ बड़े मिलर आपकी फसल पर सीधी बोली लगाते हैं। शून्य प्रतिशत कमीशन और सुरक्षित बैंक भुगतान मिलता है।',
      pa: 'ਕਦਮ 3: ਸਿੱਧਾ ਕਿਸਾਨ ਬਾਜ਼ਾਰ। ਵੱਡੇ ਮਿਲਰ ਸਿੱਧੀ ਬੋਲੀ ਲਗਾਉਂਦੇ ਹਨ। ਜ਼ੀਰੋ ਕਮਿਸ਼ਨ ਅਤੇ ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ ਮਿਲਦਾ ਹੈ।',
      en: 'Step 3: Direct Farmer Marketplace. Millers and buyers bid openly for your harvest with zero commission and escrow-protected bank payouts.',
    },
    actionLabel: {
      hi: 'लाइव बोलियां देखें',
      pa: 'ਲਾਈਵ ਬੋਲੀਆਂ ਦੇਖੋ',
      en: 'View Live Buyer Bids',
    },
  },
  {
    id: 'mandi',
    stepNumber: 4,
    tabKey: 'mandi',
    badge: {
      hi: 'भाव की जानकारी • लाइव',
      pa: 'ਮੰਡੀ ਭਾਅ',
      en: 'Step 4 • Mandi Rates',
    },
    title: {
      hi: 'लाइव मंडी भाव व मूल्य रुझान',
      pa: 'ਲਾਈਵ ਮੰਡੀ ਰੇਟ ਅਤੇ ਰੁਝਾਨ',
      en: 'Live APMC Mandi Rates & Trends',
    },
    tagline: {
      hi: 'फसल बेचने से पहले सही दाम जानना आपका अधिकार है',
      pa: 'ਫਸਲ ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਸਹੀ ਰੇਟ ਜਾਣੋ',
      en: 'Empower Yourself with Transparent Prices',
    },
    description: {
      hi: 'शिवपुरी, इंदौर, नीमच, खन्ना, करनाल सहित देश की सभी प्रमुख मंडियों के आज के भाव देखें। हरा तीर बताता है कि भाव बढ़ रहे हैं, जिससे आप सही समय पर फसल बेचकर अधिकतम मुनाफा कमा सकें।',
      pa: 'ਸਾਰੀਆਂ ਪ੍ਰਮੁੱਖ ਮੰਡੀਆਂ ਦੇ ਅੱਜ ਦੇ ਤਾਜ਼ਾ ਰੇਟ ਦੇਖੋ। ਹਰਾ ਨਿਸ਼ਾਨ ਦੱਸਦਾ ਹੈ ਕਿ ਰੇਟ ਵਧ ਰਹੇ ਹਨ ਤਾਂ ਜੋ ਤੁਸੀਂ ਸਹੀ ਸਮੇਂ ਵੇਚ ਸਕੋ।',
      en: 'Compare today’s authentic arrivals and modal rates across APMC mandis. Visual momentum gauges signal whether prices are rising or declining so you never undersell your hard work.',
    },
    points: {
      hi: [
        'मध्य प्रदेश, पंजाब, राजस्थान, हरियाणा की मंडियों के आज के दाम',
        'सरकारी न्यूनतम समर्थन मूल्य (MSP) से तुलना',
        '7 दिन के मूल्य रुझान (बाज़ार में तेजी या मंदी)',
      ],
      pa: [
        'ਪੰਜਾਬ, ਹਰਿਆਣਾ ਅਤੇ ਮੱਧ ਪ੍ਰਦੇਸ਼ ਦੀਆਂ ਮੰਡੀਆਂ ਦੇ ਅੱਜ ਦੇ ਰੇਟ',
        'ਸਰਕਾਰੀ MSP ਨਾਲ ਸਿੱਧੀ ਤੁਲਨਾ',
        '7 ਦਿਨਾਂ ਦੇ ਰੁਝਾਨ (ਤੇਜ਼ੀ ਜਾਂ ਮੰਦੀ)',
      ],
      en: [
        'Daily modal prices from major agricultural hubs across India',
        'Instant MSP benchmark showing your profit margin above floor price',
        '7-day rate trajectory indicators (Bullish vs Bearish momentum)',
      ],
    },
    spokenText: {
      hi: 'कदम 4: लाइव मंडी भाव। आसपास की सभी मंडियों के आज के ताज़ा भाव देखें और जानें कि दाम बढ़ रहे हैं या घट रहे हैं।',
      pa: 'ਕਦਮ 4: ਲਾਈਵ ਮੰਡੀ ਭਾਅ। ਆਸ-ਪਾਸ ਦੀਆਂ ਮੰਡੀਆਂ ਦੇ ਤਾਜ਼ਾ ਰੇਟ ਦੇਖੋ ਅਤੇ ਪਤਾ ਕਰੋ ਕਿ ਮੁੱਲ ਵਧ ਰਿਹਾ ਹੈ ਜਾਂ ਘਟ ਰਿਹਾ ਹੈ।',
      en: 'Step 4: Live Mandi Rates. View real-time daily auction rates and trends across all major agricultural mandis.',
    },
    actionLabel: {
      hi: 'मंडी भाव चेक करें',
      pa: 'ਮੰਡੀ ਭਾਅ ਦੇਖੋ',
      en: 'Check Mandi Rates',
    },
  },
  {
    id: 'doctor',
    stepNumber: 5,
    tabKey: 'doctor',
    badge: {
      hi: 'फसल सुरक्षा • AI डॉक्टर',
      pa: 'ਫਸਲ ਡਾਕਟਰ',
      en: 'Step 5 • Crop Doctor & Weather',
    },
    title: {
      hi: 'मौसम अलर्ट व फसल डॉक्टर AI',
      pa: 'ਮੌਸਮ ਚੇਤਾਵਨੀ ਅਤੇ ਫਸਲ ਡਾਕਟਰ',
      en: 'Agromet Weather & AI Crop Doctor',
    },
    tagline: {
      hi: 'पत्ते की फोटो खींचें • तुरंत बीमारी व दवा की मात्रा जानें',
      pa: 'ਬਿਮਾਰ ਪੱਤੇ ਦੀ ਫੋਟੋ ਖਿੱਚੋ • ਇਲਾਜ ਪਾਓ',
      en: 'Snap Sick Leaves • Instant ICAR Remedies',
    },
    description: {
      hi: 'खेत में फसल पर पीलापन, कीड़ा या धब्बा दिखे? बस मोबाइल कैमरे से फोटो लें। हमारा AI डॉक्टर 5 सेकंड में बीमारी का नाम और नीम तेल या सही दवाई का छिड़काव बता देगा। साथ ही बारिश का सटीक अनुमान देखें।',
      pa: 'ਫਸਲ ਦੇ ਬਿਮਾਰ ਪੱਤੇ ਦੀ ਫੋਟੋ ਖਿੱਚੋ। ਸਾਡਾ AI ਡਾਕਟਰ ਤੁਰੰਤ ਬਿਮਾਰੀ ਅਤੇ ਸਹੀ ਦਵਾਈ ਦੀ ਮਾਤਰਾ ਦੱਸੇਗਾ। ਨਾਲ ਹੀ ਮੀਂਹ ਦੀ ਚੇਤਾਵਨੀ ਦੇਖੋ।',
      en: 'Spot yellow spots, fungal blight, or stem borers? Take a quick photo of the leaf. The AI Crop Doctor identifies the ailment and prescribes ICAR-backed organic and medical treatments.',
    },
    points: {
      hi: [
        'मोबाइल कैमरे से पौधे के पत्ते की फोटो खींचकर जांचें',
        'घरेलू जैविक काढ़ा (नीम, छाछ) व अनुशंसित दवा की सटीक खुराक',
        'अगले 5 दिनों की बारिश, आंधी व तुषार की अग्रिम चेतावनी',
      ],
      pa: [
        'ਮੋਬਾਈਲ ਕੈਮਰੇ ਨਾਲ ਪੱਤੇ ਦੀ ਫੋਟੋ ਖਿੱਚ ਕੇ ਜਾਂਚ ਕਰੋ',
        'ਜੈਵਿਕ ਅਤੇ ਰਸਾਇਣਕ ਇਲਾਜ ਦੀ ਸਹੀ ਮਾਤਰਾ ਜਾਣੋ',
        '5 ਦਿਨਾਂ ਦੀ ਮੀਂਹ ਅਤੇ ਝੱਖੜ ਦੀ ਅਗਾਊਂ ਚੇਤਾਵਨੀ',
      ],
      en: [
        'Instant leaf diagnosis by camera capture or gallery upload',
        'Precise organic (neem oil) and chemical dosage per acre',
        '5-day localized rainfall, temperature, and frost warnings',
      ],
    },
    spokenText: {
      hi: 'कदम 5: मौसम और फसल डॉक्टर AI। बीमार पत्ते की फोटो खींचें और 5 सेकंड में सही दवाई का नाम जानें। साथ ही बारिश की चेतावनी देखें।',
      pa: 'ਕਦਮ 5: ਮੌਸਮ ਅਤੇ ਫਸਲ ਡਾਕਟਰ। ਪੱਤੇ ਦੀ ਫੋਟੋ ਖਿੱਚੋ ਅਤੇ ਤੁਰੰਤ ਦਵਾਈ ਜਾਣੋ। ਨਾਲ ਹੀ ਮੀਂਹ ਦੀ ਚੇਤਾਵਨੀ ਦੇਖੋ।',
      en: 'Step 5: Weather and AI Crop Doctor. Snap a leaf photo to diagnose plant ailments instantly and view localized rain forecasts.',
    },
    actionLabel: {
      hi: 'फसल डॉक्टर खोलें',
      pa: 'ਫਸਲ ਡਾਕਟਰ ਖੋਲ੍ਹੋ',
      en: 'Open Crop Doctor',
    },
  },
  {
    id: 'accessibility',
    stepNumber: 6,
    tabKey: 'procurement',
    badge: {
      hi: 'सरल नियंत्रण • 24x7 हेल्पलाइन',
      pa: 'ਸੌਖੇ ਨਿਯੰਤਰਣ',
      en: 'Step 6 • Easy Controls & Help',
    },
    title: {
      hi: 'धूप मोड, भाषा और किसान हेल्पलाइन',
      pa: 'ਧੁੱਪ ਮੋਡ, ਭਾਸ਼ਾ ਅਤੇ ਹੈਲਪਲਾਈਨ',
      en: 'Outdoor Sunlight Mode & 24x7 Helpline',
    },
    tagline: {
      hi: 'खेत की तेज़ धूप में भी साफ दिखेगा • टोल फ्री 1800-180-1551',
      pa: 'ਤੇਜ਼ ਧੁੱਪ ਵਿੱਚ ਵੀ ਸਾਫ਼ ਦਿਖਾਈ ਦੇਵੇਗਾ',
      en: 'High-Contrast for Open Fields & Instant Helpline',
    },
    description: {
      hi: 'खेत में काम करते समय ऊपर दिया "धूप मोड" चालू करें ताकि तेज़ धूप में भी सब कुछ बड़े और गहरे अक्षरों में साफ दिखे। भाषा बदलने के लिए हिन्दी, ਪੰਜਾਬੀ या English चुनें। कोई भी शंका हो तो 1800-180-1551 पर मुफ्त कॉल करें!',
      pa: 'ਤੇਜ਼ ਧੁੱਪ ਵਿੱਚ "ਧੁੱਪ ਮੋਡ" ਚਾਲੂ ਕਰੋ। ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ। ਕਿਸੇ ਵੀ ਸਹਾਇਤਾ ਲਈ 1800-180-1551 \'ਤੇ ਮੁਫ਼ਤ ਕਾਲ ਕਰੋ।',
      en: 'Activate "Sunlight Mode" at the top for ultra-high contrast in open sunny fields. Switch seamlessly between Hindi, Punjabi, and English. If you ever need help, tap the toll-free 1800-180-1551 hotline.',
    },
    points: {
      hi: [
        '☀️ धूप मोड: खुली धूप में भी आँखों पर बिना ज़ोर दिए साफ पढ़ाई',
        '🗣️ हिन्दी, ਪੰਜਾਬੀ या English: एक क्लिक में भाषा बदलें',
        '📞 1800-180-1551: 22 भाषाओं में सरकारी किसान कॉल सेंटर',
      ],
      pa: [
        '☀️ ਧੁੱਪ ਮੋਡ: ਖੁੱਲ੍ਹੀ ਧੁੱਪ ਵਿੱਚ ਵੀ ਬਿਲਕੁਲ ਸਾਫ਼ ਪੜ੍ਹਾਈ',
        '🗣️ ਹਿੰਦੀ, ਪੰਜਾਬੀ ਜਾਂ ਅੰਗਰੇਜ਼ੀ: ਇੱਕ ਕਲਿੱਕ \'ਤੇ ਭਾਸ਼ਾ ਬਦਲੋ',
        '📞 1800-180-1551: ਸਰਕਾਰੀ ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ ਸੇਵਾ',
      ],
      en: [
        '☀️ Sunlight Mode: Boosted font weight & deep contrast for glare',
        '🗣️ Instant language switching across Hindi, Punjabi, & English',
        '📞 1800-180-1551: Toll-free agronomist support in 22 languages',
      ],
    },
    spokenText: {
      hi: 'कदम 6: धूप मोड और हेल्पलाइन। खेत की धूप में धूप मोड चालू करें। भाषा बदलें और किसी भी सवाल के लिए 1800-180-1551 पर मुफ्त कॉल करें। बधाई, अब आप कृषि सेतु चलाना सीख चुके हैं!',
      pa: 'ਕਦਮ 6: ਧੁੱਪ ਮੋਡ ਅਤੇ ਹੈਲਪਲਾਈਨ। ਤੇਜ਼ ਧੁੱਪ ਵਿੱਚ ਧੁੱਪ ਮੋਡ ਚਾਲੂ ਕਰੋ। ਕਿਸੇ ਵੀ ਮਦਦ ਲਈ 1800-180-1551 \'ਤੇ ਕਾਲ ਕਰੋ।',
      en: 'Step 6: Sunlight mode and helpline. Toggle sunlight mode in bright fields, switch languages anytime, and dial 1800-180-1551 for free support. You are all set to use Krishi Setu!',
    },
    actionLabel: {
      hi: 'टूर पूरा करें (Done)',
      pa: 'ਟੂਰ ਸਮਾਪਤ ਕਰੋ',
      en: 'Finish & Start Farming',
    },
  },
];

export const AppTourModal: React.FC<AppTourModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateToTab,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);

  const step = TOUR_STEPS[currentStepIndex];

  // Check speech synthesis support on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setHasSpeechSupport(false);
    }
  }, []);

  // Stop speech when modal closes or unmounts
  useEffect(() => {
    if (!isOpen) {
      stopVoice();
      setCurrentStepIndex(0);
    }
  }, [isOpen]);

  // Stop speech when step changes
  useEffect(() => {
    stopVoice();
  }, [currentStepIndex]);

  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleToggleVoice = () => {
    if (!hasSpeechSupport) return;

    if (isSpeaking) {
      stopVoice();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const textToSpeak = step.spokenText[language] || step.spokenText.hi;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Language code configuration
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';
      utterance.rate = 0.95; // Slightly slower for clarity in rural contexts
      utterance.pitch = 1.0;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } catch {
      setIsSpeaking(false);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    stopVoice();
    localStorage.setItem('krishi_setu_tour_completed', 'true');
    onClose();
  };

  const handleJumpToTab = () => {
    stopVoice();
    if (step.tabKey && onNavigateToTab) {
      onNavigateToTab(step.tabKey);
    }
    localStorage.setItem('krishi_setu_tour_completed', 'true');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-2 border-emerald-400 overflow-hidden relative my-auto"
        >
          {/* Top Progress & Navigation Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-700 text-white px-5 sm:px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold text-sm text-amber-200">
                🌱
              </span>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold block leading-none">
                  {step.badge[language] || step.badge.hi}
                </span>
                <span className="text-xs sm:text-sm font-black text-white">
                  {language === 'hi' ? 'किसान मार्गदर्शन टूर' : language === 'pa' ? 'ਕਿਸਾਨ ਮਾਰਗਦਰਸ਼ਨ ਟੂਰ' : 'Farmer Quick Tour'}
                </span>
              </div>
            </div>

            {/* Step Counter & Close */}
            <div className="flex items-center gap-3">
              <div className="text-xs font-mono font-bold bg-black/25 px-2.5 py-1 rounded-full text-amber-300 border border-white/20">
                {currentStepIndex + 1} / {TOUR_STEPS.length}
              </div>

              <button
                onClick={handleComplete}
                className="p-1.5 rounded-full text-emerald-100 hover:text-white hover:bg-white/10 transition"
                title="Close Tour"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-stone-100 h-1.5 flex">
            {TOUR_STEPS.map((s, idx) => (
              <div
                key={s.id}
                className={`h-full flex-1 transition-all duration-300 ${
                  idx <= currentStepIndex ? 'bg-emerald-600' : 'bg-stone-200'
                }`}
              />
            ))}
          </div>

          {/* Body Content Area */}
          <div className="p-5 sm:p-7 space-y-5">
            {/* Step Dynamic Illustration & Visual Micro-Animation */}
            <div className="rounded-2xl bg-gradient-to-b from-emerald-50/80 via-white to-amber-50/40 p-4 border border-emerald-100 shadow-inner min-h-[170px] sm:min-h-[190px] flex items-center justify-center relative overflow-hidden">
              {/* Background ambient particles */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

              {/* Step 1 Illustration: Sprouting Harvest & Sun */}
              {step.id === 'welcome' && (
                <div className="flex flex-col items-center justify-center text-center space-y-2 relative z-10">
                  <div className="relative">
                    {/* Glowing Aura */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                      className="absolute -inset-4 bg-amber-300/40 rounded-full blur-xl"
                    />

                    {/* Wheat & Seedling Icons */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 text-white flex items-center justify-center text-3xl sm:text-4xl shadow-md border-2 border-white"
                    >
                      🌾
                    </motion.div>

                    {/* Floating badges */}
                    <motion.div
                      animate={{ scale: [0.95, 1.05, 0.95] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="absolute -bottom-2 -right-3 bg-emerald-800 text-amber-200 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300 shadow-xs"
                    >
                      0% बिचौलिया
                    </motion.div>
                  </div>

                  <p className="text-xs font-bold text-emerald-950 mt-1 max-w-sm">
                    {language === 'hi'
                      ? 'भारत सरकार समर्थित राष्ट्रीय किसान व पारदर्शी मंडी पोर्टल'
                      : 'National Government-supported Transparent Mandi Platform'}
                  </p>
                </div>
              )}

              {/* Step 2 Illustration: Weighbridge & Digital QR Gate */}
              {step.id === 'procurement' && (
                <div className="w-full max-w-md flex items-center justify-around relative z-10">
                  {/* Tractor approaching */}
                  <motion.div
                    animate={{ x: [-20, 0, -20] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-2xl shadow-sm border border-emerald-500">
                      🚜
                    </div>
                    <span className="text-[10px] font-extrabold text-stone-700 mt-1">
                      {language === 'hi' ? 'ट्रैक्टर ट्रॉली' : 'Tractor Haul'}
                    </span>
                  </motion.div>

                  {/* Scanning Gate Beam */}
                  <div className="relative flex flex-col items-center px-4">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3], height: ['10%', '100%', '10%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                      className="absolute w-1 bg-emerald-500 shadow-sm top-0 rounded-full"
                    />
                    <div className="w-12 h-12 rounded-xl bg-white border-2 border-emerald-600 flex items-center justify-center text-emerald-800 shadow-md">
                      <span className="text-xl">📱</span>
                    </div>
                    <span className="text-[9px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md mt-1 border border-emerald-300">
                      QR टोकन
                    </span>
                  </div>

                  {/* Priority Gate */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center text-2xl shadow-sm border-2 border-amber-300 font-bold">
                      ⚖️
                    </div>
                    <span className="text-[10px] font-extrabold text-stone-700 mt-1">
                      {language === 'hi' ? 'तौल कांटा' : 'Weighbridge'}
                    </span>
                  </motion.div>
                </div>
              )}

              {/* Step 3 Illustration: Direct Millers & Escrow Handshake */}
              {step.id === 'marketplace' && (
                <div className="w-full max-w-md flex items-center justify-between px-2 sm:px-6 relative z-10">
                  {/* Farmer Card */}
                  <div className="flex flex-col items-center bg-white p-2.5 rounded-2xl border border-emerald-300 shadow-xs w-28 text-center">
                    <span className="text-2xl">👨‍🌾</span>
                    <span className="text-[11px] font-black text-emerald-950 mt-0.5">किसान भाई</span>
                    <span className="text-[9px] text-stone-500">100% पूरा भाव</span>
                  </div>

                  {/* Energy Line with Floating Money Coin */}
                  <div className="flex-1 flex flex-col items-center justify-center px-2 relative">
                    <div className="w-full h-1 bg-emerald-300 rounded-full" />
                    <motion.div
                      animate={{ x: [-25, 25, -25] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                      className="absolute bg-amber-400 text-stone-950 font-black text-xs px-2 py-0.5 rounded-full shadow-xs border border-amber-500 flex items-center gap-0.5"
                    >
                      <span>₹ DBT</span>
                    </motion.div>
                    <span className="text-[9px] font-bold text-emerald-800 mt-3 flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      सुरक्षित एस्क्रो
                    </span>
                  </div>

                  {/* Buyer Card */}
                  <div className="flex flex-col items-center bg-white p-2.5 rounded-2xl border border-amber-300 shadow-xs w-28 text-center">
                    <span className="text-2xl">🏭</span>
                    <span className="text-[11px] font-black text-amber-950 mt-0.5">राइस/दाल मिलर</span>
                    <span className="text-[9px] text-stone-500">सत्यापित खरीदार</span>
                  </div>
                </div>
              )}

              {/* Step 4 Illustration: Mandi Rate Ticker & Trendline */}
              {step.id === 'mandi' && (
                <div className="w-full max-w-md flex flex-col items-center space-y-2 relative z-10">
                  <div className="bg-white rounded-2xl border-2 border-emerald-300 p-3 shadow-md w-full max-w-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🌾</span>
                      <div>
                        <span className="font-black text-stone-900 text-xs block">गेहूं (Wheat Sharbati)</span>
                        <span className="text-[10px] text-stone-500">शिवपुरी मंडी (MP)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-emerald-800 font-mono block">₹2,425/Qtl</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.2 rounded-md inline-block">
                        +₹40 (तेज़ी) ▲
                      </span>
                    </div>
                  </div>

                  {/* Simulated Sparkline Bar */}
                  <div className="flex items-center gap-1.5 w-full max-w-sm px-2">
                    <span className="text-[10px] font-bold text-stone-500">MSP बेंचमार्क: ₹2,275</span>
                    <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full w-[85%]" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-700">+₹150 लाभ</span>
                  </div>
                </div>
              )}

              {/* Step 5 Illustration: Leaf Disease Scanner & Weather Cloud */}
              {step.id === 'doctor' && (
                <div className="w-full max-w-md flex items-center justify-around relative z-10">
                  {/* Scanning Leaf */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-emerald-500 p-1.5 flex items-center justify-center shadow-md relative overflow-hidden">
                      <span className="text-3xl">🍃</span>
                      {/* Laser scanner line */}
                      <motion.div
                        animate={{ y: [-24, 24, -24] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                        className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-sm"
                      />
                    </div>
                    <span className="text-[10px] font-black text-emerald-900 mt-1">
                      {language === 'hi' ? 'पत्ता रोग स्कैन' : 'Leaf Scan'}
                    </span>
                  </div>

                  <div className="text-lg text-stone-400">➔</div>

                  {/* AI Prescription Bottle */}
                  <div className="flex flex-col items-center bg-white p-2.5 rounded-2xl border border-emerald-300 shadow-xs text-center w-32">
                    <span className="text-xl">🧴</span>
                    <span className="text-[10px] font-black text-emerald-900 mt-0.5">नीम तेल (5ml/L)</span>
                    <span className="text-[9px] text-stone-500">ICAR प्रमाणित इलाज</span>
                  </div>

                  {/* Weather Cloud */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center text-xl shadow-xs border border-sky-300">
                      🌦️
                    </div>
                    <span className="text-[9px] font-bold text-sky-900 mt-1">
                      {language === 'hi' ? 'बारिश अलर्ट' : 'Rain Alert'}
                    </span>
                  </div>
                </div>
              )}

              {/* Step 6 Illustration: Sunlight Mode & Toll-free Helpline */}
              {step.id === 'accessibility' && (
                <div className="w-full max-w-md flex items-center justify-around relative z-10">
                  {/* Sunlight mode chip */}
                  <div className="flex flex-col items-center bg-amber-100/90 border-2 border-amber-400 p-2.5 rounded-2xl shadow-xs text-center">
                    <SunMedium className="w-7 h-7 text-amber-600 animate-spin" style={{ animationDuration: '10s' }} />
                    <span className="text-[10px] font-black text-stone-900 mt-1">धूप मोड</span>
                    <span className="text-[9px] text-stone-600">खुले खेत में स्पष्ट</span>
                  </div>

                  {/* Languages Bubble */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="px-2 py-0.5 bg-white border border-stone-200 rounded-md text-[10px] font-bold text-stone-800 shadow-2xs">
                      हिन्दी
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-700 text-white rounded-md text-[10px] font-bold shadow-2xs">
                      ਪੰਜਾਬੀ
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-stone-200 rounded-md text-[10px] font-bold text-stone-800 shadow-2xs">
                      English
                    </span>
                  </div>

                  {/* Helpline Phone */}
                  <div className="flex flex-col items-center bg-emerald-50 border-2 border-emerald-400 p-2.5 rounded-2xl shadow-xs text-center">
                    <motion.div
                      animate={{ rotate: [-8, 8, -8] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                    >
                      <PhoneCall className="w-7 h-7 text-emerald-700" />
                    </motion.div>
                    <span className="text-[10px] font-black text-emerald-950 mt-1">1800-180-1551</span>
                    <span className="text-[9px] text-emerald-700">24x7 टोल-फ्री</span>
                  </div>
                </div>
              )}
            </div>

            {/* Step Heading & Tagline */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-tight">
                  {step.title[language] || step.title.hi}
                </h3>

                {/* Voice Narration Button for Farmers with Limited Literacy */}
                {hasSpeechSupport && (
                  <button
                    onClick={handleToggleVoice}
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition shadow-2xs cursor-pointer ${
                      isSpeaking
                        ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-300 font-extrabold animate-pulse'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                    title="Listen to this explanation in voice"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>बोलना बंद करें</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{language === 'hi' ? 'बोलकर सुनें' : language === 'pa' ? 'ਸੁਣੋ' : 'Listen'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1">
                {step.tagline[language] || step.tagline.hi}
              </p>
            </div>

            {/* Plain-Language Explanation */}
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
              {step.description[language] || step.description.hi}
            </p>

            {/* 3 High-Impact Bullet Points */}
            <div className="space-y-2 bg-stone-50/80 rounded-2xl p-3 sm:p-4 border border-stone-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block">
                {language === 'hi' ? 'मुख्य विशेषताएं एवं लाभ:' : language === 'pa' ? 'ਮੁੱਖ ਲਾਭ:' : 'Key Highlights:'}
              </span>
              {(step.points[language] || step.points.hi).map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="bg-stone-50 px-5 sm:px-7 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Direct Feature Jump (If tabKey exists) */}
            <div>
              {step.tabKey && (
                <button
                  onClick={handleJumpToTab}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{step.actionLabel[language] || step.actionLabel.hi}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Right: Prev & Next Navigation Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 transition flex items-center gap-1 shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{language === 'hi' ? 'पिछला' : language === 'pa' ? 'ਪਿੱਛੇ' : 'Previous'}</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-800 transition flex items-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer flex-1 sm:flex-initial justify-center"
              >
                <span>
                  {currentStepIndex === TOUR_STEPS.length - 1
                    ? (language === 'hi' ? 'टूर समाप्त करें' : language === 'pa' ? 'ਸਮਾਪਤ' : 'Finish Tour')
                    : (language === 'hi' ? 'अगला कदम' : language === 'pa' ? 'ਅਗਲਾ' : 'Next Step')}
                </span>
                {currentStepIndex === TOUR_STEPS.length - 1 ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
