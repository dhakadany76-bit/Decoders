import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CalendarCheck,
  Scale,
  Stethoscope,
  TrendingUp,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Droplets,
  Sprout,
  ShieldAlert,
  Sun,
  CloudRain,
  ExternalLink,
  Smartphone,
  MousePointer2,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface DailyFarmingTipsProps {
  language: SupportedLanguage;
  onNavigateTab?: (tab: 'procurement' | 'marketplace' | 'mandi' | 'weather' | 'doctor' | 'advisor' | 'ledger' | 'radar' | 'guide') => void;
}

interface SeasonalTip {
  id: string;
  season: 'kharif' | 'rabi' | 'zaid' | 'weather_alert';
  seasonBadgeHi: string;
  seasonBadgeEn: string;
  titleHi: string;
  titleEn: string;
  categoryHi: string;
  categoryEn: string;
  categoryIcon: any;
  summaryHi: string;
  summaryEn: string;
  dosageHi: string;
  dosageEn: string;
  bestTimeHi: string;
  bestTimeEn: string;
  audioSpeechHi: string;
  audioSpeechEn: string;
  priority: 'high' | 'normal';
}

interface ScreenRecordDemo {
  id: string;
  titleHi: string;
  titleEn: string;
  targetTab: 'procurement' | 'marketplace' | 'doctor' | 'mandi';
  targetTabLabelHi: string;
  targetTabLabelEn: string;
  durationSec: number;
  steps: {
    second: number;
    actionHi: string;
    actionEn: string;
    tipHi: string;
    tipEn: string;
  }[];
}

export const DailyFarmingTips: React.FC<DailyFarmingTipsProps> = ({ language, onNavigateTab }) => {
  // Season selector tab
  const [selectedSeason, setSelectedSeason] = useState<'rabi' | 'kharif' | 'zaid' | 'weather_alert'>('rabi');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Screen Record Video Simulation State
  const [selectedDemoId, setSelectedDemoId] = useState<string>('procurement_demo');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0); // 0 to 100%
  const [videoCurrentTime, setVideoCurrentTime] = useState(0); // in seconds
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [isExpandedGuide, setIsExpandedGuide] = useState(true);

  // Curated seasonal farming advice
  const SEASONAL_TIPS: SeasonalTip[] = [
    {
      id: 'rabi_wheat_1',
      season: 'rabi',
      seasonBadgeHi: 'रबी सीजन (गेहूं, सरसों, चना)',
      seasonBadgeEn: 'Rabi Season (Wheat, Mustard, Gram)',
      titleHi: 'गेहूं में पहली सिंचाई (CRI स्टेज) और यूरिया प्रबंधन',
      titleEn: 'Wheat First Irrigation (CRI Stage) & Urea Management',
      categoryHi: 'सिंचाई व पोषण',
      categoryEn: 'Irrigation & Nutrition',
      categoryIcon: Droplets,
      summaryHi: 'बुवाई के 20-25 दिन बाद क्राउन रूट (CRI) बनते समय पहली हल्की सिंचाई अवश्य करें। सिंचाई के तुरंत बाद प्रति एकड़ 40-45 किग्रा यूरिया और 5 किग्रा जिंक सल्फेट दें ताकि कल्लों का भरपूर फुटाव हो सके।',
      summaryEn: 'Apply first light irrigation 20-25 days after sowing during Crown Root Initiation (CRI) stage. Follow immediately with 45kg urea and 5kg zinc sulfate per acre for vigorous tillering.',
      dosageHi: '45 किग्रा यूरिया + 5 किग्रा जिंक सल्फेट प्रति एकड़',
      dosageEn: '45 kg Urea + 5 kg Zinc Sulfate per acre',
      bestTimeHi: 'दोपहर बाद हल्की धूप में',
      bestTimeEn: 'Late afternoon in light sunlight',
      audioSpeechHi: 'रबी सलाह: गेहूं की बुवाई के 20 से 25 दिन बाद क्राउन रूट बनते समय पहली हल्की सिंचाई अवश्य करें। इसके बाद प्रति एकड़ 45 किग्रा यूरिया और 5 किग्रा जिंक डालें।',
      audioSpeechEn: 'Rabi Advice: Irrigate wheat 20-25 days after sowing at CRI stage. Apply 45 kg urea and 5 kg zinc per acre.',
      priority: 'high'
    },
    {
      id: 'rabi_mustard_2',
      season: 'rabi',
      seasonBadgeHi: 'रबी सीजन (सरसों व तिलहन)',
      seasonBadgeEn: 'Rabi Season (Mustard & Oilseeds)',
      titleHi: 'सरसों में माहू (एफिड) कीट से बचाव और गंधक (सल्फर) प्रयोग',
      titleEn: 'Mustard Aphid Defense & Sulfur Application',
      categoryHi: 'कीट व रोग नियंत्रण',
      categoryEn: 'Pest Defense',
      categoryIcon: ShieldAlert,
      summaryHi: 'बादल छाने पर सरसों में माहू (चेपा) कीट का प्रकोप बढ़ता है। शुरुआती अवस्था में 5 मिली नीम तेल प्रति लीटर पानी का छिड़काव करें। तेल की मात्रा और दाने की चमक बढ़ाने के लिए 10 किग्रा सल्फर प्रति एकड़ डालें।',
      summaryEn: 'Overcast weather promotes aphid infestation in mustard. Spray neem oil at 5ml/L at early signs. Broadcast 10kg bentonite sulfur per acre to elevate oil content and grain shine.',
      dosageHi: 'नीम तेल 5ml/लीटर पानी अथवा इमिडाक्लोप्रिड 0.5ml/लीटर',
      dosageEn: 'Neem Oil 5ml/L or Imidacloprid 0.5ml/L',
      bestTimeHi: 'शाम 4 से 6 बजे के बीच शांत मौसम में',
      bestTimeEn: 'Between 4 PM and 6 PM in calm wind',
      audioSpeechHi: 'सरसों सलाह: माहू कीट से बचाव के लिए 5 मिली नीम तेल प्रति लीटर पानी में मिलाकर शाम के समय छिड़कें। सल्फर डालने से तेल की पैदावार बढ़ती है।',
      audioSpeechEn: 'Mustard Advice: Spray neem oil at 5ml per liter in the evening against aphids. Add sulfur to boost oil yield.',
      priority: 'high'
    },
    {
      id: 'rabi_gram_3',
      season: 'rabi',
      seasonBadgeHi: 'रबी सीजन (चना व दलहन)',
      seasonBadgeEn: 'Rabi Season (Chickpea / Gram)',
      titleHi: 'चने में खूंटाई (Nipping) और फली छेदक सुंडी रोकथाम',
      titleEn: 'Gram Nipping & Pod Borer Prevention',
      categoryHi: 'उत्पादन बढ़ोतरी',
      categoryEn: 'Yield Maximization',
      categoryIcon: Sprout,
      summaryHi: 'बुवाई के 30-35 दिन बाद चने के पौधों की ऊपरी 2-3 सेमी शाखाएं तोड़ दें (खूंटाई करें)। इससे साइड से नई शाखाएं ज्यादा फूटेंगी और दाने 25% तक अधिक निकलेंगे। फूल आने से पहले फेरोमोन ट्रैप लगाएं।',
      summaryEn: 'Perform nipping of top 2-3 cm shoot tips 30-35 days after sowing. This triggers lateral branches and increases pod count by up to 25%. Install pheromone traps before flowering.',
      dosageHi: 'खूंटाई + 5 फेरोमोन ट्रैप प्रति एकड़',
      dosageEn: 'Nipping + 5 Pheromone Traps per acre',
      bestTimeHi: 'सुबह ओस सूखने के बाद',
      bestTimeEn: 'Morning after dew evaporates',
      audioSpeechHi: 'चना सलाह: 30 दिन बाद चने की ऊपर की शाखाएं तोड़ें ताकि ज्यादा डालियां और फलियां आएं। खेत में फेरोमोन ट्रैप जरूर लगाएं।',
      audioSpeechEn: 'Gram Advice: Nip top branches after 30 days to multiply tillers. Install pheromone traps for caterpillar defense.',
      priority: 'normal'
    },
    {
      id: 'kharif_paddy_1',
      season: 'kharif',
      seasonBadgeHi: 'खरीफ सीजन (धान व मक्का)',
      seasonBadgeEn: 'Kharif Season (Paddy & Maize)',
      titleHi: 'धान में तना छेदक (Stem Borer) और शीथ ब्लाइट रोकथाम',
      titleEn: 'Paddy Stem Borer & Sheath Blight Protection',
      categoryHi: 'फसल सुरक्षा',
      categoryEn: 'Crop Protection',
      categoryIcon: ShieldAlert,
      summaryHi: 'धान के खेतों में पानी का स्तर 3-5 सेमी स्थिर रखें। मृत गोभ दिखने पर ट्राइकोग्रामा परजीवी कार्ड लगाएं या जैव कीटनाशक का प्रयोग करें। नाइट्रोजन की अतिरिक्त मात्रा न दें ताकि फंगस न फैले।',
      summaryEn: 'Maintain 3-5 cm shallow standing water. At sight of dead hearts, apply Trichogramma egg parasitoids or bio-pesticides. Avoid excess nitrogen which fuels fungal sheath blight.',
      dosageHi: 'ट्राइकोग्रामा कार्ड 50,000 अंडे/एकड़',
      dosageEn: 'Trichogramma Cards (50,000 eggs/acre)',
      bestTimeHi: 'सुबह 8 बजे से पहले',
      bestTimeEn: 'Early morning before 8 AM',
      audioSpeechHi: 'खरीफ सलाह: धान में तना छेदक की रोकथाम के लिए ट्राइकोग्रामा कार्ड लगाएं। जरूरत से ज्यादा यूरिया न डालें।',
      audioSpeechEn: 'Kharif Advice: Use Trichogramma bio-cards for stem borer in paddy. Avoid surplus nitrogen.',
      priority: 'high'
    },
    {
      id: 'zaid_veg_1',
      season: 'zaid',
      seasonBadgeHi: 'जायद / ग्रीष्म कालीन (सब्जियां व तरबूज)',
      seasonBadgeEn: 'Zaid / Summer (Melons & Vegetables)',
      titleHi: 'गर्मी में ड्रिप सिंचाई और मल्चिंग से 50% पानी की बचत',
      titleEn: 'Drip Irrigation & Mulching in Summer',
      categoryHi: 'जल संरक्षण',
      categoryEn: 'Water Conservation',
      categoryIcon: Sun,
      summaryHi: 'भीषण गर्मी में सब्जियों और बेल वाली फसलों में सिल्वर-ब्लैक प्लास्टिक मल्चिंग बिछाएं। इससे मिट्टी की नमी बची रहती है, खरपतवार नहीं उगते और फसल 15 दिन पहले तैयार होती है।',
      summaryEn: 'Apply silver-black polythene mulch in cucurbits and vegetables. Reduces evaporation by 50%, keeps soil cool, eliminates weeds, and hastens fruiting by 15 days.',
      dosageHi: '25 माइक्रोन प्लास्टिक मल्च + ड्रिप सिस्टम',
      dosageEn: '25-micron Mulch Film + Drip Lateral',
      bestTimeHi: 'पौधा रोपाई के समय',
      bestTimeEn: 'During seed sowing / transplanting',
      audioSpeechHi: 'जायद सलाह: गर्मियों में तरबूज और सब्जियों पर मल्चिंग शीट लगाएं जिससे पानी की बचत हो और पैदावार दोगुनी हो।',
      audioSpeechEn: 'Zaid Advice: Use mulch sheets and drip irrigation to save 50% water during peak summer heat.',
      priority: 'normal'
    },
    {
      id: 'weather_alert_today',
      season: 'weather_alert',
      seasonBadgeHi: 'मौसम आधारित आज की तत्काल सलाह',
      seasonBadgeEn: 'Real-Time Weather Micro-Advisory',
      titleHi: 'हवा की गति 14 km/h: कीटनाशक छिड़काव की सर्वोत्तम खिड़की',
      titleEn: 'Wind Speed 14 km/h: Safe Foliar Spray Window',
      categoryHi: 'मौसम खिड़की',
      categoryEn: 'Weather Window',
      categoryIcon: CloudRain,
      summaryHi: 'आगामी 24 घंटे में भारी बारिश का कोई पूर्वानुमान नहीं है। यदि आप खरपतवार नाशक या फफूंद नाशक का छिड़काव करना चाहते हैं, तो आज दोपहर 3 बजे से शाम 6 बजे का समय सबसे उपयुक्त रहेगा।',
      summaryEn: 'No severe rain event expected for next 24 hours. Optimal micro-climate window for foliar nutrient and pest spray between 3 PM and 6 PM today.',
      dosageHi: 'दवा के साथ स्टिकर/स्प्रेडर अवश्य मिलाएं',
      dosageEn: 'Add non-ionic wetting surfactant to spray',
      bestTimeHi: 'आज दोपहर 3 से 6 बजे',
      bestTimeEn: 'Today 3:00 PM to 6:00 PM',
      audioSpeechHi: 'मौसम अलर्ट: आज बारिश की संभावना नहीं है। दोपहर 3 से 6 बजे के बीच कीटनाशक या खाद का छिड़काव सुरक्षित रहेगा।',
      audioSpeechEn: 'Weather Alert: Calm weather today. Optimal spraying window is 3 PM to 6 PM with surfactant.',
      priority: 'high'
    }
  ];

  // Screen Record Simulation Video Scenarios
  const SCREEN_DEMOS: ScreenRecordDemo[] = [
    {
      id: 'procurement_demo',
      titleHi: 'सरकारी मंडी स्लॉट बुकिंग व डिजिटल QR गेट पास',
      titleEn: 'Mandi Slot Booking & Digital QR Gate Pass',
      targetTab: 'procurement',
      targetTabLabelHi: 'स्लॉट बुकिंग पेज खोलें',
      targetTabLabelEn: 'Open Slot Booking Page',
      durationSec: 12,
      steps: [
        {
          second: 0,
          actionHi: 'मंडी और अपनी उपज (जैसे गेहूं MSP ₹2,275) का चयन करें',
          actionEn: 'Select target APMC Mandi and crop (Wheat MSP ₹2,275)',
          tipHi: 'टिप: अपने गांव से नजदीकी सरकारी खरीद केंद्र चुनें ताकि परिवहन खर्च न्यूनतम रहे।',
          tipEn: 'Tip: Select nearest procurement center to minimize tractor diesel and transport costs.'
        },
        {
          second: 3,
          actionHi: 'कैलेंडर से मनपसंद तारीख और सुबह/दोपहर का समय स्लॉट चुनें',
          actionEn: 'Pick preferred date & convenient morning or afternoon slot',
          tipHi: 'टिप: सुबह 10 बजे का स्लॉट सबसे तेज तौल कराता है।',
          tipEn: 'Tip: Morning 10 AM slot has the fastest weighbridge clearance.'
        },
        {
          second: 7,
          actionHi: 'मात्रा (क्विंटल) दर्ज करें और "स्लॉट बुक करें" पर क्लिक करें',
          actionEn: 'Enter quantity (Quintals) and click "Confirm Booking"',
          tipHi: 'टिप: कुल अनुमानित सरकारी MSP भुगतान तुरंत स्क्रीन पर दिखता है।',
          tipEn: 'Tip: Total guaranteed MSP payout is calculated and verified upfront.'
        },
        {
          second: 10,
          actionHi: 'डिजिटल गेट पास QR कोड जनरेट हुआ - गेट पर बिना लाइन के सीधी एंट्री!',
          actionEn: 'Digital Gate Pass QR generated - Express Mandi Entry without waiting!',
          tipHi: 'टिप: इस QR कोड को मोबाइल में रखें या प्रिंट कर लें। गेट पर स्कैन होते ही तौल शुरू हो जाएगी।',
          tipEn: 'Tip: Save this QR code on phone. Scanning at entry bypasses regular truck queue.'
        }
      ]
    },
    {
      id: 'marketplace_demo',
      titleHi: 'सीधा किसान बाज़ार - 0% बिचौलिया कमीशन व लाइव बोली',
      titleEn: 'Direct Marketplace - 0% Middleman & Live Bidding',
      targetTab: 'marketplace',
      targetTabLabelHi: 'सीधा बाज़ार पेज खोलें',
      targetTabLabelEn: 'Open Direct Marketplace',
      durationSec: 12,
      steps: [
        {
          second: 0,
          actionHi: 'अपनी फसल, किस्म और न्यूनतम आधार मूल्य (Reserve Price) दर्ज करें',
          actionEn: 'List your harvest with variety and base reserve price',
          tipHi: 'टिप: आधार मूल्य हमेशा मंडी MSP से ₹50-100 अधिक रखें ताकि प्रतिस्पर्धी बोली मिले।',
          tipEn: 'Tip: Set reserve price slightly above MSP to invite high competitive miller bids.'
        },
        {
          second: 4,
          actionHi: 'सत्यापित मिलर्स व व्यापारियों द्वारा लाइव बोलियां आना शुरू',
          actionEn: 'Verified millers and flour mills place live bids in real-time',
          tipHi: 'टिप: खरीदार की रेटिंग और दूरी देखकर सर्वश्रेष्ठ बोली का चुनाव करें।',
          tipEn: 'Tip: Review buyer star-ratings and payment track records before deciding.'
        },
        {
          second: 8,
          actionHi: 'सर्वोच्च बोली (उदा. ₹2,480/क्विंटल) पर "सौदा स्वीकार करें" दबाएं',
          actionEn: 'Click "Accept Deal" on the highest offer (e.g. ₹2,480/qtl)',
          tipHi: 'टिप: सौदा पक्का होते ही 0% कमीशन के साथ पूरी रकम सुरक्षित हो जाती है।',
          tipEn: 'Tip: Zero middleman deductions. Full agreed amount is locked for seller.'
        },
        {
          second: 11,
          actionHi: 'डिजिटल रसीद जारी - बैंक खाते में सीधा DBT भुगतान प्राप्त करें',
          actionEn: 'Digital receipt generated - 100% Direct DBT payment in bank',
          tipHi: 'टिप: तौल होते ही बैंक खाते में सीधे पैसे ट्रांसफर हो जाते हैं।',
          tipEn: 'Tip: Weighing verified, instant direct bank transfer completed.'
        }
      ]
    },
    {
      id: 'crop_doctor_demo',
      titleHi: 'फसल डॉक्टर AI - पत्ते की फोटो खींचें और 3 सेकंड में उपचार पाएं',
      titleEn: 'Crop Doctor AI - Leaf Photo to Instant Cure in 3s',
      targetTab: 'doctor',
      targetTabLabelHi: 'फसल डॉक्टर खोलें',
      targetTabLabelEn: 'Open Crop Doctor AI',
      durationSec: 12,
      steps: [
        {
          second: 0,
          actionHi: 'मोबाइल कैमरे से खराब या पीले पत्ते की साफ फोटो खींचें या अपलोड करें',
          actionEn: 'Snap or upload clear close-up photo of affected plant leaf',
          tipHi: 'टिप: पत्ते की दोनों तरफ (ऊपर व नीचे) साफ रोशनी में फोटो लें।',
          tipEn: 'Tip: Capture leaf in natural daylight for accurate visual feature detection.'
        },
        {
          second: 3,
          actionHi: 'विजन AI स्कैनिंग लेज़र पत्ते की बारीकियों की जांच कर रहा है',
          actionEn: 'Vision AI neural model scans leaf veins, spots and chlorosis',
          tipHi: 'टिप: यह सिस्टम 45+ भारतीय फसलों के 120+ रोगों की सटीक पहचान करता है।',
          tipEn: 'Tip: Pre-trained on 120+ Indian crop fungal, bacterial & pest pathologies.'
        },
        {
          second: 7,
          actionHi: 'रोग की पहचान: पीला रतुआ (Yellow Rust) - 96% सटीकता',
          actionEn: 'Diagnosis detected: Yellow Rust (Puccinia striiformis) - 96% Confidence',
          tipHi: 'टिप: रोग की गंभीरता और फैलाव की गति तुरंत स्क्रीन पर दिखती है।',
          tipEn: 'Tip: Disease severity level and speed of contagion are indicated immediately.'
        },
        {
          second: 10,
          actionHi: 'घरेलू जैविक नुस्खा + सही रासायनिक खुराक + बोलकर ऑडियो सुनें',
          actionEn: 'Organic neem recipe + recommended spray dose + voice readout',
          tipHi: 'टिप: "बोलकर सुनें" बटन दबाएं और फोन से पूरा नुस्खा अपनी भाषा में सुनें।',
          tipEn: 'Tip: Tap Speaker icon to hear dosage and preparation instructions aloud.'
        }
      ]
    },
    {
      id: 'mandi_rates_demo',
      titleHi: 'लाइव मंडी भाव व Agmarknet / e-NAM मूल्य तुलना',
      titleEn: 'Live Mandi Prices & Agmarknet Benchmark',
      targetTab: 'mandi',
      targetTabLabelHi: 'मंडी भाव पेज खोलें',
      targetTabLabelEn: 'Open Mandi Rates',
      durationSec: 12,
      steps: [
        {
          second: 0,
          actionHi: 'राज्य व जिला चुनें (उदा. मध्य प्रदेश, इंदौर या शिवपुरी मंडी)',
          actionEn: 'Select State and District (e.g. MP, Indore or Shivpuri)',
          tipHi: 'टिप: भारत सरकार के data.gov.in से हर 15 मिनट में आंकड़े अपडेट होते हैं।',
          tipEn: 'Tip: Live telemetry synced every 15 minutes from official Agmarknet APMC servers.'
        },
        {
          second: 4,
          actionHi: 'आज का न्यूनतम, मॉडल (Modal) और अधिकतम भाव देखें',
          actionEn: 'Inspect Minimum, Modal (most traded) and Maximum auction prices',
          tipHi: 'टिप: मॉडल भाव ही वास्तविक व्यापारिक दर होती है, इसी के आधार पर सौदा करें।',
          tipEn: 'Tip: The Modal Price reflects the true bulk transaction rate in the yard.'
        },
        {
          second: 8,
          actionHi: 'सरकारी समर्थन मूल्य (MSP) से तुलना करें - हरा तीर अधिक लाभ दर्शाता है',
          actionEn: 'Compare against Govt MSP - Green indicator shows premium gain',
          tipHi: 'टिप: यदि निजी बाज़ार भाव MSP से कम है तो तुरंत सरकारी स्लॉट बुक करें।',
          tipEn: 'Tip: If local private rate drops below MSP, immediately book Govt Slot.'
        },
        {
          second: 11,
          actionHi: 'आगामी 3 दिन का मूल्य पूर्वानुमान देखें और सही दिन माल बेचें',
          actionEn: 'View 3-day arrival and price forecast to pick the best day to sell',
          tipHi: 'टिप: जब आवक कम हो तब मंडी में ले जाएं, भाव ₹50-100 अधिक मिलेंगे।',
          tipEn: 'Tip: Sell on low-arrival days to secure peak bidding competition.'
        }
      ]
    }
  ];

  // Active Demo selection
  const activeDemo = SCREEN_DEMOS.find(d => d.id === selectedDemoId) || SCREEN_DEMOS[0];

  // Current Video Step based on videoCurrentTime
  const currentVideoStep = activeDemo.steps.reduce((prev, curr) => {
    return videoCurrentTime >= curr.second ? curr : prev;
  }, activeDemo.steps[0]);

  // Video playback loop simulator
  useEffect(() => {
    let interval: any = null;
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setVideoCurrentTime((prev) => {
          const next = prev + 0.5 * videoSpeed;
          if (next >= activeDemo.durationSec) {
            return 0; // loop
          }
          return next;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoPlaying, videoSpeed, activeDemo.durationSec]);

  // Calculate percentage
  useEffect(() => {
    setVideoProgress((videoCurrentTime / activeDemo.durationSec) * 100);
  }, [videoCurrentTime, activeDemo.durationSec]);

  // Filter seasonal tips
  const filteredTips = SEASONAL_TIPS.filter(t => t.season === selectedSeason);
  const activeTip = filteredTips[currentTipIndex % filteredTips.length] || SEASONAL_TIPS[0];

  // Voice narration for tips
  const handleReadTipAloud = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = language === 'hi' ? activeTip.audioSpeechHi : activeTip.audioSpeechEn;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.92;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="mb-6 rounded-3xl overflow-hidden border-2 border-emerald-300/80 bg-gradient-to-b from-stone-50 via-white to-emerald-50/40 shadow-md">
      {/* 1. Header Banner with Gentle Pulse Beacon */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 sm:p-5 relative overflow-hidden">
        {/* Subtle decorative background waves */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-emerald-700/20 blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -top-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Pulsing Beacon Icon */}
            <div className="relative flex items-center justify-center">
              {/* Animated Gentle Pulse Rings */}
              <motion.span
                animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-12 h-12 rounded-2xl bg-amber-400/40"
              />
              <motion.span
                animate={{ scale: [1, 1.25, 1], opacity: [0.9, 0.2, 0.9] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute w-10 h-10 rounded-2xl bg-emerald-400/40"
              />
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-600 flex items-center justify-center shadow-md text-stone-950 font-black">
                <Lightbulb className="w-6 h-6 text-stone-950 animate-bounce" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-amber-400 text-stone-950 px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-stone-900 animate-ping" />
                  <span>{language === 'hi' ? 'दैनिक कृषि सलाह' : 'Daily Farming Tips'}</span>
                </span>
                <span className="text-xs text-emerald-200 font-semibold hidden sm:inline">
                  • {language === 'hi' ? 'आज का वैज्ञानिक मार्गदर्शन' : 'Scientific Field Guidance'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white mt-1">
                {language === 'hi'
                  ? 'मौसमी कृषि सलाह व उपयोग मार्गदर्शिका (Live Screen Guide)'
                  : 'Seasonal Advisory & Animated Screen Usage Guide'}
              </h2>
            </div>
          </div>

          {/* Quick Collapse / Expand & Audio Narration */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleReadTipAloud}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition border ${
                isPlayingAudio
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title="बोलकर सुनें"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? (language === 'hi' ? 'आवाज़ बंद करें' : 'Stop') : (language === 'hi' ? 'सलाह सुनें' : 'Listen')}</span>
            </motion.button>

            <button
              onClick={() => setIsExpandedGuide(!isExpandedGuide)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/20 transition"
            >
              {isExpandedGuide
                ? (language === 'hi' ? 'संक्षिप्त करें ▲' : 'Minimize ▲')
                : (language === 'hi' ? 'विस्तार देखें ▼' : 'Expand Guide ▼')}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpandedGuide && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 space-y-6"
          >
            {/* 2. Seasonal Advice Selector & Active Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
              {/* Season Selection Chips */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                  <button
                    onClick={() => {
                      setSelectedSeason('rabi');
                      setCurrentTipIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shrink-0 ${
                      selectedSeason === 'rabi'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <span>🌾 रबी फसल (गेहूं, सरसों, चना)</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSeason('kharif');
                      setCurrentTipIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shrink-0 ${
                      selectedSeason === 'kharif'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <span>🌱 खरीफ (धान, सोयाबीन)</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSeason('zaid');
                      setCurrentTipIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shrink-0 ${
                      selectedSeason === 'zaid'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <span>🍉 जायद (सब्जियां व तरबूज)</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSeason('weather_alert');
                      setCurrentTipIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shrink-0 ${
                      selectedSeason === 'weather_alert'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>🌦️ आज का मौसम अलर्ट</span>
                  </button>
                </div>

                {/* Next / Previous Tip Navigation */}
                {filteredTips.length > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setCurrentTipIndex((prev) => (prev > 0 ? prev - 1 : filteredTips.length - 1))
                      }
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                      title="पिछली सलाह"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-stone-500 px-1">
                      {(currentTipIndex % filteredTips.length) + 1} / {filteredTips.length}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentTipIndex((prev) => (prev + 1) % filteredTips.length)
                      }
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                      title="अगली सलाह"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Active Seasonal Tip Card */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-8 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <activeTip.categoryIcon className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? activeTip.categoryHi : activeTip.categoryEn}</span>
                    </span>
                    <span className="text-[11px] font-medium text-stone-500">
                      {language === 'hi' ? activeTip.seasonBadgeHi : activeTip.seasonBadgeEn}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                    {language === 'hi' ? activeTip.titleHi : activeTip.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {language === 'hi' ? activeTip.summaryHi : activeTip.summaryEn}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs">
                    <div className="bg-amber-50 border border-amber-200 text-amber-950 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        <strong className="font-bold">{language === 'hi' ? 'अनुशंसित मात्रा: ' : 'Dose: '}</strong>
                        {language === 'hi' ? activeTip.dosageHi : activeTip.dosageEn}
                      </span>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        <strong className="font-bold">{language === 'hi' ? 'सर्वोत्तम समय: ' : 'Best Time: '}</strong>
                        {language === 'hi' ? activeTip.bestTimeHi : activeTip.bestTimeEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Prompt */}
                <div className="lg:col-span-4 bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50/50 rounded-xl border border-emerald-200 p-3.5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold text-xs mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{language === 'hi' ? 'किसान मित्र विशेष टिप' : 'Agronomist Pro Tip'}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {language === 'hi'
                        ? 'फसल में किसी भी रोग का लक्षण दिखने पर पत्ते की फोटो खींचकर हमारे फसल डॉक्टर एआई से तुरंत सटीक इलाज जानें।'
                        : 'If you spot yellowing or rust spots, take a quick photo with Crop Doctor AI for verified organic cures.'}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigateTab && onNavigateTab('doctor')}
                    className="mt-3 w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'फसल डॉक्टर में पत्ता जांचें' : 'Scan Leaf with Crop Doctor'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. "Animated Usage Images / Site Screen Record Videos" Section */}
            <div className="bg-stone-900 text-stone-100 rounded-3xl p-4 sm:p-6 shadow-xl border border-stone-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-800">
                      ● REC • {language === 'hi' ? 'साइट स्क्रीन रिकॉर्ड वीडियो ट्यूटोरियल' : 'Site Screen Recording Simulator'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-1">
                    {language === 'hi'
                      ? 'पोर्टल कैसे चलाएं? (जीवंत स्क्रीन रिकॉर्डिंग व टिप्स)'
                      : 'Interactive Site Screen Recording & Step-by-Step Tips'}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {language === 'hi'
                      ? 'देखें कि कैसे 1-क्लिक में स्लॉट बुक करें, सीधी बोली स्वीकारें या फसल की बीमारी पहचानें'
                      : 'Live visual screen recording showing exact cursor clicks, slot booking, and direct bidding.'}
                  </p>
                </div>

                {/* Demo Selector Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                  {SCREEN_DEMOS.map((demo) => {
                    const isSelected = demo.id === selectedDemoId;
                    return (
                      <button
                        key={demo.id}
                        onClick={() => {
                          setSelectedDemoId(demo.id);
                          setVideoCurrentTime(0);
                          setIsVideoPlaying(true);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 shadow-md scale-[1.02]'
                            : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                        }`}
                      >
                        <span>{language === 'hi' ? demo.titleHi.split(' - ')[0] : demo.titleEn.split(' - ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Screen Record Simulator Device Frame */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* Left: Animated Browser / Screen Recording Mockup */}
                <div className="lg:col-span-8 bg-stone-950 rounded-2xl border border-stone-700 overflow-hidden shadow-2xl flex flex-col">
                  {/* Browser Mockup Top Bar */}
                  <div className="bg-stone-800/90 px-3.5 py-2 flex items-center justify-between border-b border-stone-700 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-stone-400 font-mono ml-2 hidden sm:inline">
                        https://krishisetu.gov.in/{activeDemo.targetTab}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-amber-400 border border-stone-700">
                        00:{Math.floor(videoCurrentTime).toString().padStart(2, '0')} / 00:
                        {activeDemo.durationSec}
                      </span>
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        LIVE REC
                      </span>
                    </div>
                  </div>

                  {/* Simulated Screen Recording Canvas */}
                  <div className="p-4 sm:p-6 bg-gradient-to-br from-stone-900 via-stone-950 to-slate-950 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between relative overflow-hidden">
                    {/* Background grid texture simulating live application UI */}
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                    {/* SCENARIO 1: Procurement Slot Booking Screen Simulation */}
                    {activeDemo.id === 'procurement_demo' && (
                      <div className="relative z-10 space-y-3">
                        {/* Mandi Selection Bar */}
                        <div className="bg-stone-800/90 border border-emerald-500/40 rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                              🏢
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">शिवपुरी APMC मंडी खरीद केंद्र</p>
                              <p className="text-[10px] text-emerald-400">गेहूं समर्थन मूल्य (MSP): ₹2,275 / क्विंटल</p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-700">
                            कोटा उपलब्ध: 3,400 Qtl
                          </span>
                        </div>

                        {/* Slot Grid Simulation */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          <div className="bg-stone-800/70 border border-stone-700 rounded-xl p-2.5 text-center">
                            <p className="text-[11px] text-stone-400 font-medium">08:00 AM - 09:30 AM</p>
                            <p className="text-xs text-rose-400 font-bold mt-0.5">फुल (Booked)</p>
                          </div>
                          <motion.div
                            animate={{
                              borderColor: videoCurrentTime >= 3 && videoCurrentTime <= 7 ? '#10b981' : '#374151',
                              scale: videoCurrentTime >= 3 && videoCurrentTime <= 7 ? [1, 1.03, 1] : 1
                            }}
                            className="bg-emerald-950/60 border-2 rounded-xl p-2.5 text-center relative shadow-sm"
                          >
                            <p className="text-[11px] text-emerald-300 font-bold">10:00 AM - 11:30 AM</p>
                            <p className="text-xs text-emerald-400 font-black mt-0.5">✓ स्लॉट उपलब्ध</p>
                            {videoCurrentTime >= 3 && videoCurrentTime <= 7 && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute -top-2 -right-2 bg-amber-400 text-stone-950 text-[9px] font-black px-1.5 py-0.5 rounded-full"
                              >
                                SELECTED
                              </motion.div>
                            )}
                          </motion.div>
                          <div className="bg-stone-800/70 border border-stone-700 rounded-xl p-2.5 text-center hidden sm:block">
                            <p className="text-[11px] text-stone-400 font-medium">12:00 PM - 01:30 PM</p>
                            <p className="text-xs text-emerald-400 font-bold mt-0.5">उपलब्ध</p>
                          </div>
                        </div>

                        {/* Animated Simulated Cursor & Action Button */}
                        <div className="relative pt-2">
                          <motion.button
                            animate={{
                              scale: videoCurrentTime >= 6 && videoCurrentTime <= 9 ? [1, 0.96, 1] : 1,
                              backgroundColor: videoCurrentTime >= 7 ? '#059669' : '#047857'
                            }}
                            className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-white flex items-center justify-center gap-2 shadow-lg"
                          >
                            <CalendarCheck className="w-4 h-4" />
                            <span>
                              {videoCurrentTime >= 7 ? '✓ स्लॉट बुक हो गया!' : 'पुष्टि करें व डिजिटल गेट पास पाएं'}
                            </span>
                          </motion.button>

                          {/* Animated Screen Record Mouse Cursor Pointer */}
                          {videoCurrentTime >= 4 && videoCurrentTime <= 8 && (
                            <motion.div
                              initial={{ x: 80, y: -40, opacity: 0 }}
                              animate={{ x: 180, y: -10, opacity: 1 }}
                              transition={{ duration: 0.8 }}
                              className="absolute pointer-events-none text-amber-300 flex items-center gap-1.5 z-20"
                            >
                              <MousePointer2 className="w-6 h-6 fill-amber-400 drop-shadow-md" />
                              <span className="bg-amber-400 text-stone-950 font-black text-[10px] px-1.5 py-0.5 rounded shadow">
                                CLICK
                              </span>
                            </motion.div>
                          )}
                        </div>

                        {/* Digital Gate Pass Result Pop-up (at second 9+) */}
                        {videoCurrentTime >= 9 && (
                          <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-stone-900 border-2 border-emerald-500 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xl"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
                                <QrCode className="w-10 h-10 text-stone-950" />
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-amber-400">टोकन: KS-MP-2026-9421</span>
                                <h4 className="text-xs font-black text-white">डिजिटल गेट पास जारी!</h4>
                                <p className="text-[10px] text-emerald-400">तौल समय: 10:00 AM • बिना लाइन एंट्री</p>
                              </div>
                            </div>
                            <span className="text-[10px] bg-emerald-600 text-white font-black px-2.5 py-1 rounded-lg">
                              EXPRESS PASS
                            </span>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* SCENARIO 2: Direct Marketplace & Bidding Simulation */}
                    {activeDemo.id === 'marketplace_demo' && (
                      <div className="relative z-10 space-y-3">
                        <div className="bg-stone-800/90 border border-amber-500/40 rounded-xl p-3 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-amber-400 font-bold uppercase">किसान लिस्टिंग</span>
                            <h4 className="text-xs font-bold text-white">शरबती गेहूं (ग्रेड A+) • 75 क्विंटल</h4>
                            <p className="text-[10px] text-stone-400">आधार मूल्य (Reserve): ₹2,350 / Qtl</p>
                          </div>
                          <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                            0% कमीशन
                          </span>
                        </div>

                        {/* Live Bids Simulation */}
                        <div className="space-y-1.5">
                          <p className="text-[11px] font-bold text-stone-300 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>लाइव बोलियां (Live Bidding Stream):</span>
                          </p>

                          <div className="bg-stone-800/70 border border-stone-700 rounded-xl p-2.5 flex items-center justify-between">
                            <div>
                              <p className="text-xs font-bold text-white">ITC फूड्स एवं फ्लोर मिल्स</p>
                              <p className="text-[10px] text-stone-400">सत्यापित क्रेता ★ 4.9 • 45 km</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-stone-300">₹2,420 / Qtl</span>
                          </div>

                          <motion.div
                            animate={{
                              borderColor: videoCurrentTime >= 4 ? '#f59e0b' : '#374151',
                              backgroundColor: videoCurrentTime >= 4 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(38, 38, 38, 0.7)'
                            }}
                            className="border-2 rounded-xl p-2.5 flex items-center justify-between transition-colors"
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-black text-amber-300">अग्रवाल एग्रो प्रोसेसिंग</span>
                                <span className="text-[9px] bg-amber-400 text-stone-950 font-black px-1 rounded">
                                  TOP BID
                                </span>
                              </div>
                              <p className="text-[10px] text-emerald-400 font-bold">+₹130 ऊपर सरकारी MSP से</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-black text-amber-300">₹2,480</span>
                              <span className="text-[10px] text-stone-400">/Qtl</span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Accept Button & Payment Result */}
                        {videoCurrentTime >= 8 && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-950 border border-emerald-500 rounded-xl p-2.5 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <div>
                                <p className="text-xs font-black text-white">सौदा पक्का! ₹1,86,000 DBT ट्रांसफर</p>
                                <p className="text-[10px] text-emerald-300">सीधे बैंक खाते में • शून्य बिचौलिया कटौती</p>
                              </div>
                            </div>
                            <span className="text-[10px] bg-emerald-500 text-stone-950 font-black px-2 py-0.5 rounded">
                              PAID
                            </span>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* SCENARIO 3: Crop Doctor Leaf Disease AI Scan Simulation */}
                    {activeDemo.id === 'crop_doctor_demo' && (
                      <div className="relative z-10 space-y-3">
                        <div className="bg-stone-800/90 border border-teal-500/40 rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                              🍃
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">गेहूं का प्रभावित पत्ता (Wheat Leaf Scan)</p>
                              <p className="text-[10px] text-teal-300">कैमरा रेजोल्यूशन: 1080p • धूप में लिया गया</p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-700">
                            AI विजन सक्रिय
                          </span>
                        </div>

                        {/* Simulated Scanning Leaf Container with Laser Line */}
                        <div className="relative bg-stone-950 border border-stone-800 rounded-xl h-28 overflow-hidden flex items-center justify-center">
                          <span className="text-5xl select-none">🌾🍂</span>

                          {/* Animated Scanning Laser Beam */}
                          <motion.div
                            animate={{ y: [-40, 40, -40] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981]"
                          />

                          {/* Bounding box detection annotation */}
                          {videoCurrentTime >= 4 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute border-2 border-dashed border-amber-400 rounded-lg p-1 w-24 h-16 flex items-start justify-end"
                            >
                              <span className="text-[9px] bg-amber-400 text-stone-950 font-black px-1 rounded">
                                Rust Spot 96%
                              </span>
                            </motion.div>
                          )}
                        </div>

                        {/* Instant Diagnosis Card */}
                        {videoCurrentTime >= 7 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-stone-900 border border-emerald-500 rounded-xl p-3 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-amber-300">रोग: पीला रतुआ (Yellow Rust)</span>
                              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold">
                                96% मैच
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-300 leading-tight">
                              उपचार: 5ml नीम तेल + प्रोपिकोनाजोल 1ml प्रति लीटर पानी का छिड़काव करें।
                            </p>
                            <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                              <Volume2 className="w-3 h-3 animate-pulse" />
                              <span>बोलकर ऑडियो नुस्खा तैयार है</span>
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* SCENARIO 4: Mandi Rates & MSP Benchmark Simulation */}
                    {activeDemo.id === 'mandi_rates_demo' && (
                      <div className="relative z-10 space-y-3">
                        <div className="bg-stone-800/90 border border-blue-500/40 rounded-xl p-3 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-blue-400 font-bold uppercase">लाइव मंडी रिपोर्ट</span>
                            <h4 className="text-xs font-bold text-white">इंदौर APMC मंडी • गेहूं (लोकवन)</h4>
                            <p className="text-[10px] text-stone-400">Agmarknet Sync: 15 मिनट पूर्व</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                            तेज मांग ▲
                          </span>
                        </div>

                        {/* Price Matrix */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-stone-800/70 border border-stone-700 rounded-xl p-2">
                            <p className="text-[10px] text-stone-400">न्यूनतम भाव</p>
                            <p className="text-xs font-mono font-bold text-stone-300">₹2,150</p>
                          </div>
                          <div className="bg-emerald-950/70 border-2 border-emerald-500 rounded-xl p-2">
                            <p className="text-[10px] text-emerald-300 font-bold">मॉडल भाव (Modal)</p>
                            <p className="text-sm font-mono font-black text-emerald-400">₹2,420</p>
                          </div>
                          <div className="bg-stone-800/70 border border-stone-700 rounded-xl p-2">
                            <p className="text-[10px] text-stone-400">अधिकतम भाव</p>
                            <p className="text-xs font-mono font-bold text-stone-300">₹2,610</p>
                          </div>
                        </div>

                        {/* Comparison with MSP */}
                        <div className="bg-stone-900 border border-stone-700 rounded-xl p-2.5 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-stone-400">सरकारी न्यूनतम समर्थन मूल्य (MSP)</p>
                            <p className="text-xs font-black text-white">₹2,275 / क्विंटल</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                              +₹145 अधिक लाभ
                            </span>
                            <p className="text-[9px] text-stone-400 mt-0.5">निजी मंडी में बेचना फायदेमंद</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timeline Scrubber & Controls Bar */}
                    <div className="relative z-10 pt-4 border-t border-stone-800 mt-2">
                      <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden relative cursor-pointer">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-2.5 text-xs text-stone-400">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white transition"
                            title={isVideoPlaying ? 'Pause' : 'Play'}
                          >
                            {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => setVideoCurrentTime(0)}
                            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white transition"
                            title="Replay from start"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setVideoSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 0.75 : 1))}
                            className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-[10px] font-bold text-stone-300 font-mono"
                          >
                            {videoSpeed}x गति
                          </button>
                        </div>

                        <span className="text-[11px] font-medium text-stone-400">
                          {isVideoPlaying ? '▶ ऑटो-प्ले हो रहा है' : '⏸ रुका हुआ'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Step-by-Step Annotated Walkthrough & Pro Tips */}
                <div className="lg:col-span-4 bg-stone-800/80 rounded-2xl border border-stone-700 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                        स्क्रीन एक्शन व किसान टिप
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">
                        Step {activeDemo.steps.indexOf(currentVideoStep) + 1} / {activeDemo.steps.length}
                      </span>
                    </div>

                    {/* Current Step Action Headline */}
                    <div className="bg-stone-900 rounded-xl p-3.5 border border-stone-700 mb-3">
                      <p className="text-[11px] text-amber-400 font-bold">वर्तमान स्क्रीन चरण:</p>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
                        {language === 'hi' ? currentVideoStep.actionHi : currentVideoStep.actionEn}
                      </h4>
                    </div>

                    {/* Pro Tip Box with Pulse Accent */}
                    <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-xl p-3.5 relative overflow-hidden">
                      <div className="flex items-center gap-1.5 text-emerald-300 font-black text-xs mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>{language === 'hi' ? 'विशेष व्यावहारिक टिप:' : 'Practical Pro Tip:'}</span>
                      </div>
                      <p className="text-xs text-stone-200 leading-relaxed font-medium">
                        {language === 'hi' ? currentVideoStep.tipHi : currentVideoStep.tipEn}
                      </p>
                    </div>

                    {/* Interactive Clickable Step Sequence */}
                    <div className="mt-4 space-y-1.5">
                      <p className="text-[10px] font-bold text-stone-400 uppercase">समय रेखा (Scrub to Step):</p>
                      {activeDemo.steps.map((st, i) => {
                        const isCurrent = currentVideoStep.second === st.second;
                        return (
                          <button
                            key={i}
                            onClick={() => setVideoCurrentTime(st.second)}
                            className={`w-full text-left p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                              isCurrent
                                ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                                : 'bg-stone-900/60 hover:bg-stone-700 text-stone-300'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-stone-800 text-center leading-5 text-[10px] shrink-0">
                              {i + 1}
                            </span>
                            <span className="truncate flex-1">
                              {language === 'hi' ? st.actionHi : st.actionEn}
                            </span>
                            <span className="text-[9px] font-mono opacity-80">
                              00:{st.second.toString().padStart(2, '0')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Direct Action Link to the Real Site Page */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigateTab && onNavigateTab(activeDemo.targetTab)}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    <span>{language === 'hi' ? activeDemo.targetTabLabelHi : activeDemo.targetTabLabelEn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
