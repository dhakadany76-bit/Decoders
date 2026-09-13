import React from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  CalendarCheck,
  QrCode,
  Truck,
  DollarSign,
  TrendingUp,
  Camera,
  Bot,
  Scale,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface PageWorkflowExplainerProps {
  pageType: 'procurement' | 'marketplace' | 'mandi_prices' | 'ai_advisor' | 'crop_doctor' | 'farm_ledger' | 'satellite_radar';
  language: SupportedLanguage;
}

export const PageWorkflowExplainer: React.FC<PageWorkflowExplainerProps> = ({ pageType, language }) => {
  const [isPlayingVoice, setIsPlayingVoice] = React.useState(false);

  const workflowConfigs = {
    procurement: {
      title: language === 'hi' ? 'सरकारी मंडी स्लॉट बुकिंग कैसे काम करता है?' : language === 'pa' ? 'ਸਰਕਾਰੀ ਮੰਡੀ ਸਲਾਟ ਬੁਕਿੰਗ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ?' : 'How Mandi Slot Booking Works',
      subtitle: language === 'hi' ? 'बिना लाइन में खड़े हुए, तय समय पर मंडी पहुंचें और सीधे न्यूनतम समर्थन मूल्य (MSP) पाएं' : language === 'pa' ? 'ਬਿਨਾਂ ਲਾਈਨ ਵਿਚ ਖੜ੍ਹੇ ਹੋਏ ਸਮੇਂ ਸਿਰ ਮੰਡੀ ਪਹੁੰਚੋ ਅਤੇ ਸਿੱਧਾ MSP ਮੁੱਲ ਪ੍ਰਾਪਤ ਕਰੋ' : 'Skip long waiting queues. Book your procurement appointment and get verified DBT payment.',
      colorTheme: 'from-emerald-700 via-emerald-600 to-green-700',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      voiceText: language === 'hi' 
        ? 'मंडी स्लॉट बुकिंग: सबसे पहले अपनी नजदीकी मंडी और फसल चुनें। फिर अपनी सुविधा का समय चुनें। आपको एक डिजिटल टोकन और क्यूआर कोड मिलेगा। उस समय पर मंडी जाएं, सीधे तौल कराएं और 24 घंटे में बैंक खाते में पैसा पाएं।'
        : 'Mandi Slot Booking: Choose your nearby mandi and crop. Select your preferred date and time slot. Get your digital gate pass with QR code, arrive on time with zero queue, weigh produce and receive direct bank transfer within 24 hours.',
      steps: [
        {
          stepNumber: '1',
          icon: CalendarCheck,
          title: language === 'hi' ? 'मंडी व फसल चुनें' : language === 'pa' ? 'ਮੰਡੀ ਅਤੇ ਫ਼ਸਲ ਚੁਣੋ' : 'Choose Mandi & Crop',
          desc: language === 'hi' ? 'अपनी उपज (गेहूं, सरसों आदि) और तारीख दर्ज करें' : 'Select your crop, quantity, and date'
        },
        {
          stepNumber: '2',
          icon: QrCode,
          title: language === 'hi' ? 'समय स्लॉट व टोकन' : language === 'pa' ? 'ਸਲਾਟ ਅਤੇ ਟੋਕਨ' : 'Select Slot & Get Pass',
          desc: language === 'hi' ? 'सुबह या दोपहर का समय चुनें, तुरंत QR पास मिलेगा' : 'Pick preferred slot and receive digital gate pass'
        },
        {
          stepNumber: '3',
          icon: Truck,
          title: language === 'hi' ? 'सीधे गेट एंट्री व तुलाई' : language === 'pa' ? 'ਗੇਟ ਐਂਟਰੀ ਅਤੇ ਤੁਲਾਈ' : 'Express Mandi Entry',
          desc: language === 'hi' ? 'मंडी गेट पर बिना लाइन के सीधे तौल कराएं' : 'Zero waiting time. Quick weighbridge verification'
        },
        {
          stepNumber: '4',
          icon: DollarSign,
          title: language === 'hi' ? 'सीधा DBT भुगतान' : language === 'pa' ? 'ਸਿੱਧਾ ਖਾਤੇ ਵਿੱਚ ਭੁਗਤਾਨ' : 'Direct Bank Payout',
          desc: language === 'hi' ? '24 घंटे के भीतर सरकारी MSP सीधे बैंक खाते में' : 'Direct DBT transfer credited to your bank account'
        }
      ]
    },
    marketplace: {
      title: language === 'hi' ? 'सीधा किसान बाज़ार (Direct Marketplace) कैसे काम करता है?' : language === 'pa' ? 'ਕਿਸਾਨ ਸਿੱਧਾ ਬਾਜ਼ਾਰ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ?' : 'How Direct Marketplace & Bidding Works',
      subtitle: language === 'hi' ? 'बिचौलियों और कमीशन के बिना, अपनी मनपसंद कीमत पर सीधे बड़े खरीदारों और मिलों को बेचें' : language === 'pa' ? 'ਬਿਨਾਂ ਆੜ੍ਹਤੀਆਂ ਦੇ ਸਿੱਧਾ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਉੱਚੀ ਕੀਮਤ ਤੇ ਵੇਚੋ' : 'Eliminate middlemen cuts. Sell directly to verified millers and retailers with live competitive bidding.',
      colorTheme: 'from-amber-600 via-amber-700 to-orange-700',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      voiceText: language === 'hi'
        ? 'सीधा किसान बाज़ार: अपनी फसल की मात्रा और मनपसंद आधार मूल्य डालें। देश भर के सत्यापित खरीदार आपकी फसल पर लाइव बोली लगाएंगे। सबसे ऊंची बोली स्वीकार करें और बिना किसी कमीशन के पूरा पैसा सीधे बैंक में पाएं।'
        : 'Direct Marketplace: List your crop with your minimum base price. Verified buyers bid live. Accept the highest bid, arrange pickup, and receive 100 percent payment with zero middleman deductions.',
      steps: [
        {
          stepNumber: '1',
          icon: TrendingUp,
          title: language === 'hi' ? 'फसल लिस्ट करें' : language === 'pa' ? 'ਫ਼ਸਲ ਦਰਜ ਕਰੋ' : 'Post Your Harvest',
          desc: language === 'hi' ? 'मात्रा और अपना न्यूनतम आधार भाव तय करें' : 'Set your crop variety, quantity & minimum reserve price'
        },
        {
          stepNumber: '2',
          icon: Scale,
          title: language === 'hi' ? 'खरीदारों की लाइव बोली' : language === 'pa' ? 'ਖਰੀਦਦਾਰਾਂ ਦੀ ਬੋਲੀ' : 'Live Competitive Bids',
          desc: language === 'hi' ? 'सत्यापित मिलर्स और व्यापारी अधिक भाव की बोली लगाते हैं' : 'Verified buyers compete, bidding at or above MSP'
        },
        {
          stepNumber: '3',
          icon: CheckCircle2,
          title: language === 'hi' ? 'सर्वश्रेष्ठ बोली स्वीकारें' : language === 'pa' ? 'ਵਧੀਆ ਬੋਲੀ ਮਨਜ਼ੂਰ ਕਰੋ' : 'Accept Top Offer',
          desc: language === 'hi' ? 'मनपसंद दाम मिलने पर 1-क्लिक में सौदा पक्का करें' : 'Choose the best buyer with top rating and price'
        },
        {
          stepNumber: '4',
          icon: ShieldCheck,
          title: language === 'hi' ? 'सुरक्षित भुगतान व रेटिंग' : language === 'pa' ? 'ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ' : 'Zero Commission Pay',
          desc: language === 'hi' ? 'सीधे बैंक में पैसा और दोनों पक्षों की निष्पक्ष समीक्षा' : '100% money in bank and transparent trade rating'
        }
      ]
    },
    mandi_prices: {
      title: language === 'hi' ? 'लाइव मंडी भाव (Agmarknet & e-NAM) कैसे देखें?' : language === 'pa' ? 'ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਕਿਵੇਂ ਵੇਖੋ?' : 'How Live Mandi Price Discovery Works',
      subtitle: language === 'hi' ? 'भारत सरकार के Agmarknet व data.gov.in से हर 15 मिनट में ताज़ा न्यूनतम, अधिकतम व मॉडल भाव' : 'Live official APMC mandi rates updated across all Indian districts with MSP benchmarks.',
      colorTheme: 'from-blue-700 via-teal-700 to-emerald-800',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
      voiceText: language === 'hi'
        ? 'लाइव मंडी भाव: यहाँ आप अपने जिले और राज्य की सभी प्रमुख मंडियों के ताज़ा भाव देख सकते हैं। हरा निशान भाव बढ़ने का और लाल निशान भाव गिरने का संकेत है। सरकारी न्यूनतम समर्थन मूल्य से तुलना भी देख सकते हैं।'
        : 'Live Mandi Prices: View official APMC rates across districts. Compare current modal prices against Government MSP so you never sell at a loss.',
      steps: [
        {
          stepNumber: '1',
          icon: CalendarCheck,
          title: language === 'hi' ? 'जिला व फसल चुनें' : 'Filter Crop & Mandi',
          desc: language === 'hi' ? 'गेहूं, सरसों, सोयाबीन आदि का चयन करें' : 'Select commodity, state and district'
        },
        {
          stepNumber: '2',
          icon: TrendingUp,
          title: language === 'hi' ? 'मॉडल भाव व रुझान' : 'Modal Price & Trend',
          desc: language === 'hi' ? 'आज का सबसे आम भाव और बाजार की तेजी-मंदी' : 'See maximum, modal, and minimum auction rates'
        },
        {
          stepNumber: '3',
          icon: ShieldCheck,
          title: language === 'hi' ? 'सरकारी MSP से तुलना' : 'MSP Benchmark Comparison',
          desc: language === 'hi' ? 'जांचें कि भाव सरकारी समर्थन मूल्य से कितना ऊपर है' : 'Verify if trade price is higher than Govt MSP'
        }
      ]
    },
    ai_advisor: {
      title: language === 'hi' ? 'कृषि मित्र AI सलाहकार से बातचीत कैसे करें?' : 'How to Use AI Agronomy Advisor',
      subtitle: language === 'hi' ? 'बोलकर या लिखकर पूछें - मौसम, खाद की मात्रा, फसल के रोग और सरकारी योजनाओं की पूरी जानकारी' : 'Ask questions in your mother tongue using voice or text for instant agronomic advice.',
      colorTheme: 'from-emerald-800 via-green-700 to-teal-800',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      voiceText: language === 'hi'
        ? 'कृषि मित्र एआई सलाहकार: माइक बटन दबाकर बोलें या नीचे दिए गए बटन पर क्लिक करें। आपको तुरंत अपनी भाषा में सही सलाह, खाद की सही मात्रा और जैविक उपाय मिलेंगे।'
        : 'AI Advisor: Speak into the mic or tap quick prompts. Receive scientifically validated agronomic advice and pest solutions.',
      steps: [
        {
          stepNumber: '1',
          icon: Bot,
          title: language === 'hi' ? 'प्रश्न बोलें या लिखें' : 'Speak or Type',
          desc: language === 'hi' ? 'माइक दबाकर अपनी भाषा में पूछें' : 'Use voice mic or tap quick questions'
        },
        {
          stepNumber: '2',
          icon: Info,
          title: language === 'hi' ? 'स्थानीय मौसम व मिट्टी विश्लेषण' : 'Localized Agro Analysis',
          desc: language === 'hi' ? 'आपके जिले के मौसम व मिट्टी अनुसार सलाह' : 'AI factors your local district soil & rain'
        },
        {
          stepNumber: '3',
          icon: CheckCircle2,
          title: language === 'hi' ? 'जैविक व रासायनिक समाधान' : 'Actionable Protocols',
          desc: language === 'hi' ? 'नीम तेल, जैविक खाद व सही दवाई की खुराक' : 'Get organic remedies and dosage guidelines'
        }
      ]
    },
    crop_doctor: {
      title: language === 'hi' ? 'फसल डॉक्टर (फोटो से रोग पहचान) कैसे काम करता है?' : 'How AI Crop Doctor Works',
      subtitle: language === 'hi' ? 'खराब पत्ते की फोटो खींचें और 3 सेकंड में रोग का नाम व सटीक उपचार जानें' : 'Take a photo of diseased leaf for instant multi-model diagnosis and prescription.',
      colorTheme: 'from-teal-800 via-emerald-700 to-emerald-900',
      badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
      voiceText: language === 'hi'
        ? 'फसल डॉक्टर: अपने खेत में खराब या पीले पत्ते की साफ फोटो खींचें। 3 सेकंड में हमारा विजन एआई रोग पहचान कर जैविक दवा और सही छिड़काव का तरीका बताएगा।'
        : 'Crop Doctor: Snap or upload a photo of infected leaves. Our Vision AI identifies diseases in 3 seconds with exact organic and chemical treatments.',
      steps: [
        {
          stepNumber: '1',
          icon: Camera,
          title: language === 'hi' ? 'पत्ते की फोटो लें' : 'Upload Leaf Photo',
          desc: language === 'hi' ? 'मोबाइल कैमरे से पत्ते की साफ फोटो खींचें' : 'Capture clear close-up of affected leaf'
        },
        {
          stepNumber: '2',
          icon: Bot,
          title: language === 'hi' ? '3 सेकंड में AI जांच' : 'Vision AI Analysis',
          desc: language === 'hi' ? 'फंगस, कीट या पोषक तत्व की कमी की पहचान' : 'Pinpoints fungal, bacterial or pest damage'
        },
        {
          stepNumber: '3',
          icon: CheckCircle2,
          title: language === 'hi' ? 'सटीक उपचार नुस्खा' : 'Prescription Remedy',
          desc: language === 'hi' ? 'घरेलू जैविक नुस्खे और अनुमोदित दवा की मात्रा' : 'Step-by-step organic spray and dosage'
        }
      ]
    },
    farm_ledger: {
      title: language === 'hi' ? 'खेत बहीखाता (आय-व्यय हिसाब) कैसे रखें?' : 'How Farm Ledger Works',
      subtitle: language === 'hi' ? 'बीज, खाद, डीजल, मजदूरी और फसल बिक्री का आसान हिसाब - जानें अपनी असली शुद्ध कमाई' : 'Track farming expenses and harvest income to see your true net profit.',
      colorTheme: 'from-amber-700 via-orange-700 to-emerald-800',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      voiceText: language === 'hi'
        ? 'खेत बहीखाता: बीज, खाद, डीजल या मजदूरी का खर्च जोड़ें। फसल बिक्री की आय दर्ज करें। यह ऐप आपको बताएगा कि आपकी असली शुद्ध बचत कितनी हुई।'
        : 'Farm Ledger: Add inputs cost like seeds, fertilizer, labor and diesel. Record your crop sale revenue. Instantly view your net seasonal profit.',
      steps: [
        {
          stepNumber: '1',
          icon: DollarSign,
          title: language === 'hi' ? 'खर्च दर्ज करें' : 'Record Expenses',
          desc: language === 'hi' ? 'बीज, खाद, जुताई, मजदूरी का बिल जोड़ें' : 'Log input costs with category tags'
        },
        {
          stepNumber: '2',
          icon: TrendingUp,
          title: language === 'hi' ? 'फसल आय दर्ज करें' : 'Record Harvest Income',
          desc: language === 'hi' ? 'मंडी या खरीदार से मिला कुल रुपया जोड़ें' : 'Log crop sales revenue from Mandi/Market'
        },
        {
          stepNumber: '3',
          icon: ShieldCheck,
          title: language === 'hi' ? 'शुद्ध मुनाफा देखें' : 'View Net Profit',
          desc: language === 'hi' ? 'शुद्ध बचत और प्रति एकड़ लाभ की गणना' : 'Real-time profit margins and season summary'
        }
      ]
    },
    satellite_radar: {
      title: language === 'hi' ? 'उपग्रह मौसम राडार कैसे देखें?' : 'How Satellite Radar Works',
      subtitle: language === 'hi' ? 'लाइव बारिश, बादलों की स्थिति और अगले 48 घंटे की सिंचाई व छिड़काव खिड़की' : 'Live animated precipitation, cloud cover, and safe spraying advisory.',
      colorTheme: 'from-sky-800 via-teal-800 to-emerald-800',
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
      voiceText: language === 'hi'
        ? 'मौसम राडार: अपने क्षेत्र में बारिश की संभावना और हवा की रफ्तार देखें। हरा रंग सुरक्षित छिड़काव का समय दिखाता है।'
        : 'Weather Radar: View live animated radar for rainfall and wind speed. Check if today is optimal for pesticide spraying.',
      steps: [
        {
          stepNumber: '1',
          icon: CalendarCheck,
          title: language === 'hi' ? 'मौसम टेलीमेट्री' : 'Live Telemetry',
          desc: language === 'hi' ? 'तापमान, नमी व हवा की गति' : 'Real-time temperature and humidity'
        },
        {
          stepNumber: '2',
          icon: TrendingUp,
          title: language === 'hi' ? 'राडार वर्षा परत' : 'Animated Rain Layer',
          desc: language === 'hi' ? 'बादलों व वर्षा का लाइव नक्शा' : 'Precipitation radar animation'
        },
        {
          stepNumber: '3',
          icon: ShieldCheck,
          title: language === 'hi' ? 'छिड़काव व सिंचाई सलाह' : 'Spray & Irrigation Window',
          desc: language === 'hi' ? 'दवा धुलने से बचाएं, पानी की बचत करें' : 'Safe foliar spray and tube-well schedule'
        }
      ]
    }
  };

  const currentConfig = workflowConfigs[pageType] || workflowConfigs.procurement;

  const handleSpeakAloud = () => {
    if (!('speechSynthesis' in window)) return;
    
    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentConfig.voiceText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.92; // slightly slower for rural clarity
    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);

    setIsPlayingVoice(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/90 via-amber-50/50 to-green-50/90 shadow-sm"
    >
      <div className="p-4 sm:p-5">
        {/* Top bar with audio speaker button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-300">
              {language === 'hi' ? 'कार्य प्रणाली निर्देश' : language === 'pa' ? 'ਕੰਮ ਕਰਨ ਦਾ ਤਰੀਕਾ' : 'How This Page Works'}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSpeakAloud}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all ${
              isPlayingVoice
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
            title="Listen Aloud / बोलकर सुनें"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingVoice ? 'animate-spin' : ''}`} />
            <span>
              {isPlayingVoice
                ? (language === 'hi' ? 'आवाज़ बंद करें' : 'Stop Audio')
                : (language === 'hi' ? '🔊 बोलकर सुनें' : language === 'pa' ? '🔊 ਬੋਲ ਕੇ ਸੁਣੋ' : '🔊 Listen Aloud')}
            </span>
          </motion.button>
        </div>

        {/* Title and description */}
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <span>{currentConfig.title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed max-w-3xl">
            {currentConfig.subtitle}
          </p>
        </div>

        {/* Animated 3 or 4 step visual diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {currentConfig.steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="relative rounded-xl bg-white/90 p-3.5 border border-emerald-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm group-hover:bg-emerald-700 transition-colors">
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        Step {step.stepNumber}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-800 leading-tight">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-stone-600 mt-1 leading-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator between steps on desktop */}
                {idx < currentConfig.steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-emerald-400 pointer-events-none">
                    <ArrowRight className="w-4 h-4 bg-white rounded-full" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
