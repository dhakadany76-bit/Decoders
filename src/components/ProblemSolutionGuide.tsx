import React, { useState } from 'react';
import {
  HelpCircle,
  Bug,
  Sprout,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface ProblemSolutionGuideProps {
  language: SupportedLanguage;
}

interface GuideItem {
  id: string;
  category: 'pest' | 'weed' | 'deficiency' | 'scheme';
  titleEn: string;
  titleHi: string;
  titlePa: string;
  problemEn: string;
  problemHi: string;
  solutionEn: string;
  solutionHi: string;
  organicTip?: string;
  link?: string;
}

const GUIDE_ITEMS: GuideItem[] = [
  {
    id: 'g1',
    category: 'pest',
    titleEn: 'Mustard Aphids (चेपा / माहू कीट)',
    titleHi: 'सरसों में माहू (चेपा कीट) प्रकोप',
    titlePa: 'ਸਰ੍ਹੋਂ ਦਾ ਤੇਲਾ (ਮਾਹੂ ਕੀਟ)',
    problemEn: 'Tiny green/black insects sucking sap from tender shoots, flowers, and pods, causing leaf curling and reduced oil yield.',
    problemHi: 'छोटे हरे/काले कीट जो कोमल तनों और फूलों का रस चूसते हैं, जिससे फलियां नहीं बनतीं और पैदावार घटती है।',
    solutionEn: 'Install 8-10 Yellow Sticky Traps per acre. If threshold exceeds 25-30 aphids/plant, spray Dimethoate 30% EC @ 1 ml/L or Thiamethoxam 25% WG @ 0.4 g/L.',
    solutionHi: 'प्रति एकड़ 8-10 पीले चिपचिपे कार्ड लगाएं। गंभीर प्रकोप होने पर थायमेथोक्सम 25% WG (0.4 ग्राम/लीटर) या नीम तेल (5 मिली/लीटर) का छिड़काव करें।',
    organicTip: 'Spray 5% Neem Seed Kernel Extract (NSKE) with soap water during early morning hours.',
  },
  {
    id: 'g2',
    category: 'weed',
    titleEn: 'Phalaris Minor / Gulli Danda in Wheat (गेहूं का मामा / गुल्ली डंडा)',
    titleHi: 'गेहूं में गुल्ली डंडा / मंडूसी खरपतवार',
    titlePa: 'ਕਣਕ ਵਿੱਚ ਗੁੱਲੀ ਡੰਡਾ / ਸਿੱਟੀ',
    problemEn: 'Aggressive grassy weed mimicking young wheat tillers that robs moisture, light, and 30-50% fertilizer nutrients.',
    problemHi: 'गेहूं जैसा दिखने वाला बारीक खरपतवार जो खेत की नमी और खाद छीनकर फसल को दबा देता है।',
    solutionEn: 'Apply Clodinafop-propargyl 15% WP @ 160g/acre or Sulfosulfuron 75% WG @ 13.5g/acre at 30-35 days after sowing with flat fan nozzle in 150L water.',
    solutionHi: 'बुवाई के 30-35 दिन बाद (पहली सिंचाई उपरांत) क्लोडिनाफॉप 15% WP @ 160 ग्राम या सल्फोसल्फ्यूरॉन 75% WG @ 13.5 ग्राम प्रति एकड़ फ्लैट फैन नोजल से छिड़कें।',
    organicTip: 'Practice zero-tillage with Happy Seeder and straw mulching to suppress weed seed germination.',
  },
  {
    id: 'g3',
    category: 'deficiency',
    titleEn: 'Zinc Deficiency / Khaira Disease in Paddy (धान में खैरा रोग व जिंक कमी)',
    titleHi: 'धान में जिंक की कमी (खैरा रोग)',
    titlePa: 'ਝੋਨੇ ਵਿੱਚ ਜ਼ਿੰਕ ਦੀ ਘਾਟ',
    problemEn: 'Rusty brown or bronze pigmentation appearing on leaves 2-3 weeks after transplanting, stunted tillering.',
    problemHi: 'रोपाई के 2-3 हफ्ते बाद निचली पत्तियों पर कत्थई/भूरे धब्बे उभरना और पौधों की बढ़वार रुक जाना।',
    solutionEn: 'Foliar spray of 0.5% Zinc Sulphate (5g/L) + 1% Urea (10g/L) or 2.5% Slaked lime water. Repeat after 10-12 days if required.',
    solutionHi: 'जिंक सल्फेट 21% (5 ग्राम प्रति लीटर) + यूरिया (10 ग्राम प्रति लीटर) मिलाकर पर्णीय छिड़काव करें।',
    organicTip: 'Incorporate 10 kg/acre Zinc-enriched compost during basal field preparation.',
  },
  {
    id: 'g4',
    category: 'pest',
    titleEn: 'Whitefly in Bt Cotton (सफेद मक्खी नियंत्रण)',
    titleHi: 'कपास में सफेद मक्खी एवं पत्ता मरोड़ रोकथाम',
    titlePa: 'ਕਪਾਹ ਵਿੱਚ ਚਿੱਟੀ ਮੱਖੀ',
    problemEn: 'Nymphs and adults secrete honeydew causing black sooty mold and transmitting Cotton Leaf Curl Virus (CLCuV).',
    problemHi: 'पत्तियों के नीचे सफेद मक्खी का रस चूसना, पत्तियों पर चिपचिपा काला फफूंद बनना और पत्ता मरोड़ वायरस फैलना।',
    solutionEn: 'Spray Diafenthiuron 50% WP @ 240g/acre or Pyriproxyfen 10% EC @ 400ml/acre. Avoid synthetic pyrethroids which cause whitefly flare-up.',
    solutionHi: 'डायफेंथियूरॉन 50% WP (1.2 ग्राम/लीटर) का छिड़काव करें। खेत के चारों तरफ पीले ट्रैप लगाएं और मेड़ों से खरपतवार नष्ट करें।',
    organicTip: 'Release beneficial predator bugs like Chrysoperla carnea (5000 eggs/acre).',
  },
  {
    id: 'g5',
    category: 'scheme',
    titleEn: 'PM-Kisan Samman Nidhi Yojana (पीएम किसान सम्मान निधि)',
    titleHi: 'पीएम किसान सम्मान निधि ₹6,000 वार्षिक सहायता',
    titlePa: 'ਪੀ.ਐੱਮ. ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ',
    problemEn: 'Direct income support of ₹6,000 per year transferred in three equal installments of ₹2,000 to eligible farmer families.',
    problemHi: 'पात्र किसान परिवारों के बैंक खाते में प्रत्यक्ष डीबीटी (DBT) के माध्यम से प्रतिवर्ष ₹6,000 (₹2,000 की 3 किस्तें) का अंतरण।',
    solutionEn: 'Complete e-KYC via PM-Kisan portal using Aadhaar OTP or facial authentication on mobile app. Link NPCI with bank account.',
    solutionHi: 'पीएम किसान पोर्टल (pmkisan.gov.in) पर आधार ओटीपी या फेस ऑथेंटिकेशन से ई-केवाईसी पूर्ण करें और बैंक खाता एनपीसीआई (NPCI) से लिंक रखें।',
    link: 'https://pmkisan.gov.in',
  },
  {
    id: 'g6',
    category: 'scheme',
    titleEn: 'PM Fasal Bima Yojana (प्रधानमंत्री फसल बीमा योजना - PMFBY)',
    titleHi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    titlePa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾ',
    problemEn: 'Crop loss insurance coverage against localized calamities, unseasonal rainfall, hailstorms, drought, and post-harvest losses.',
    problemHi: 'बेमौसम बारिश, ओलावृष्टि, सूखा या कीट प्रकोप से फसल नष्ट होने पर शत-प्रतिशत वित्तीय बीमा सुरक्षा।',
    solutionEn: 'Nominal farmer premium: 1.5% for Rabi crops, 2.0% for Kharif, 5.0% for commercial/horticulture crops. Intimate loss within 72 hours on Crop Insurance App.',
    solutionHi: 'रबी फसलों हेतु मात्र 1.5% और खरीफ हेतु 2.0% प्रीमियम। नुकसान होने के 72 घंटे के भीतर फसल बीमा ऐप या टोल-फ्री 14447 पर सूचना दें।',
    link: 'https://pmfby.gov.in',
  },
];

export const ProblemSolutionGuide: React.FC<ProblemSolutionGuideProps> = ({ language }) => {
  const [filter, setFilter] = useState<'all' | 'pest' | 'weed' | 'deficiency' | 'scheme'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('g1');

  const filtered = filter === 'all' ? GUIDE_ITEMS : GUIDE_ITEMS.filter((g) => g.category === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            {language === 'hi' ? 'समस्या एवं समाधान मार्गदर्शिका' : 'Agronomy Problem & Solution Guide'}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'hi'
              ? 'प्रमुख फसल कीट, खरपतवार, पोषण कमी व सरकारी योजनाएं'
              : 'Field Pathology, Weed Suppressants & Government Schemes'}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            {language === 'hi'
              ? 'भारतीय कृषि अनुसंधान परिषद (ICAR) और राज्य कृषि विश्वविद्यालयों द्वारा अनुमोदित वैज्ञानिक समाधान।'
              : 'Scientifically validated agronomy protocols formulated for Indian field crops and government digital public welfare.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {language === 'hi' ? 'सभी समाधान' : 'All Topics'}
          </button>
          <button
            onClick={() => setFilter('pest')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === 'pest'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {language === 'hi' ? 'कीट व रोग (Pests)' : 'Insects & Pests'}
          </button>
          <button
            onClick={() => setFilter('weed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === 'weed'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {language === 'hi' ? 'खरपतवार (Weeds)' : 'Weed Control'}
          </button>
          <button
            onClick={() => setFilter('deficiency')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === 'deficiency'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {language === 'hi' ? 'उर्वरक व पोषण (Nutrients)' : 'Nutrient Deficiencies'}
          </button>
          <button
            onClick={() => setFilter('scheme')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === 'scheme'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {language === 'hi' ? 'सरकारी योजनाएं (Schemes)' : 'Govt Schemes (PM-Kisan/PMFBY)'}
          </button>
        </div>
      </div>

      {/* Accordion Cards */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          const title = language === 'hi' ? item.titleHi : language === 'pa' ? item.titlePa : item.titleEn;
          const problem = language === 'hi' ? item.problemHi : item.problemEn;
          const solution = language === 'hi' ? item.solutionHi : item.solutionEn;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">
                    {item.category === 'pest' && <Bug className="w-4 h-4" />}
                    {item.category === 'weed' && <Sprout className="w-4 h-4" />}
                    {item.category === 'deficiency' && <ShieldCheck className="w-4 h-4" />}
                    {item.category === 'scheme' && <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs space-y-3 bg-slate-50/40">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">
                      {language === 'hi' ? 'समस्या का प्रभाव:' : 'Problem Identification:'}
                    </span>
                    <p className="text-slate-600 leading-relaxed">{problem}</p>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-800 block mb-1">
                      {language === 'hi' ? 'वैज्ञानिक एवं रासायनिक समाधान:' : 'Recommended Action / Technical Protocol:'}
                    </span>
                    <p className="text-slate-800 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                      {solution}
                    </p>
                  </div>

                  {item.organicTip && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 text-emerald-900 font-medium">
                      <span className="font-bold block mb-0.5">🌱 {language === 'hi' ? 'जैविक व प्राकृतिक टिप:' : 'Organic Alternative:'}</span>
                      {item.organicTip}
                    </div>
                  )}

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold"
                    >
                      <span>{language === 'hi' ? 'आधिकारिक पोर्टल पर जाएं' : 'Visit Official Portal'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
