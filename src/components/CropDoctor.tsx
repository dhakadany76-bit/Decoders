import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Stethoscope,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  ShieldCheck,
  FlaskConical,
  HelpCircle,
  Camera,
  RefreshCw,
  Volume2,
  VolumeX,
  Sparkles,
  Check,
  TrendingUp,
  Sliders,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { DiseaseDiagnosis, SupportedLanguage, WeatherData } from '../types';
import { PageWorkflowExplainer } from './PageWorkflowExplainer';
import { FarmLoader } from './FarmLoader';
import { YieldForecast } from './YieldForecast';

interface CropDoctorProps {
  language: SupportedLanguage;
  weatherData?: WeatherData | null;
  currentDistrict?: string;
}

const CROPS = [
  { id: 'Wheat', nameEn: 'Wheat (गेहूं)', nameHi: 'गेहूं (Wheat)', namePa: 'ਕਣਕ' },
  { id: 'Mustard', nameEn: 'Mustard (सरसों)', nameHi: 'सरसों (Mustard)', namePa: 'ਸਰ੍ਹੋਂ' },
  { id: 'Tomato', nameEn: 'Tomato (टमाटर)', nameHi: 'टमाटर (Tomato)', namePa: 'ਟਮਾਟਰ' },
  { id: 'Cotton', nameEn: 'Cotton (कपास)', nameHi: 'कपास (Cotton)', namePa: 'ਕਪਾਹ' },
  { id: 'Soybean', nameEn: 'Soybean (सोयाबीन)', nameHi: 'सोयाबीन (Soybean)', namePa: 'ਸੋਇਆਬੀਨ' },
  { id: 'Rice', nameEn: 'Rice / Paddy (धान)', nameHi: 'धान (Paddy)', namePa: 'ਝੋਨਾ' },
  { id: 'Potato', nameEn: 'Potato (आलू)', nameHi: 'आलू (Potato)', namePa: 'ਆਲੂ' },
];

const SAMPLE_DISEASE_LEAVES = [
  {
    crop: 'Wheat',
    labelHi: 'गेहूं पीला रतुआ (Yellow Rust)',
    imgUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80',
  },
  {
    crop: 'Mustard',
    labelHi: 'सरसों माहू कीट (Mustard Aphids)',
    imgUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80',
  },
  {
    crop: 'Tomato',
    labelHi: 'टमाटर अगेती झुलसा (Early Blight)',
    imgUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
  },
];

export const CropDoctor: React.FC<CropDoctorProps> = ({
  language,
  weatherData,
  currentDistrict = 'शिवपुरी (Shivpuri)',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'diagnose' | 'yield_forecast'>('diagnose');
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof SAMPLE_DISEASE_LEAVES[0]) => {
    setSelectedCrop(sample.crop);
    setImagePreview(sample.imgUrl);
    setImageBase64(sample.imgUrl);
  };

  const runDiagnosis = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/gemini/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: selectedCrop,
          imageBase64: imageBase64 || undefined,
          language,
        }),
      });

      if (!res.ok) throw new Error('Diagnosis service failed');
      const data = await res.json();
      if (data.result) {
        setDiagnosis(data.result);
      } else {
        throw new Error('No diagnostic data returned');
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Error diagnosing crop disease');
    } finally {
      setLoading(false);
    }
  };

  const toggleSpeakDiagnosis = () => {
    if (!('speechSynthesis' in window) || !diagnosis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const spokenText = `${diagnosis.diseaseName}. ${diagnosis.summary}. जैविक उपाय: ${diagnosis.organicRemedies.join(', ')}. रासायनिक उपाय: ${diagnosis.chemicalRemedies.join(', ')}`;
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Explainer */}
      <PageWorkflowExplainer pageType="crop_doctor" language={language} />

      {/* Sub-Navigation Switcher between AI Diagnostics & Yield Forecast */}
      <div className="flex items-center gap-2 p-1.5 bg-stone-100/90 rounded-2xl border border-stone-200 self-start w-fit">
        <button
          onClick={() => setActiveSubTab('diagnose')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition cursor-pointer ${
            activeSubTab === 'diagnose'
              ? 'bg-white text-emerald-900 shadow-sm border border-stone-200/80'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-emerald-700" />
          <span>{language === 'hi' ? '🔬 पत्ती रोग निदान' : '🔬 AI Photo Pathology'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('yield_forecast')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition cursor-pointer ${
            activeSubTab === 'yield_forecast'
              ? 'bg-white text-emerald-900 shadow-sm border border-stone-200/80'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-700" />
          <span>{language === 'hi' ? '📈 उपज पूर्वानुमान' : '📈 Yield Forecast Model'}</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
            Recharts
          </span>
        </button>
      </div>

      {activeSubTab === 'yield_forecast' ? (
        /* Recharts-Powered Scientific Yield Forecast Component */
        <YieldForecast
          language={language}
          currentCrop={selectedCrop}
          weatherData={weatherData}
          district={currentDistrict}
        />
      ) : (
        <>
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'एआई फसल पैथोलॉजी' : 'AI Crop Pathology & Remedy'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'hi'
                ? 'रोग निदान एवं त्वरित फसल उपचार'
                : 'Crop Disease Diagnosis & Treatment Hub'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl">
              {language === 'hi'
                ? 'रोगग्रस्त पत्ती की फोटो अपलोड करें। एआई तुरंत रोग की पहचान कर जैविक और सटीक रासायनिक खुराक सुझाएगा।'
                : 'Upload leaf photo for instant pathological diagnostics, biological remedies, and chemical dosage.'}
            </p>
          </div>
        </div>

        {/* 1. Crop Selection Selector */}
        <div className="mt-5 pt-4 border-t border-stone-100">
          <label className="block text-xs font-bold text-stone-700 mb-2.5">
            {language === 'hi' ? '1. अपनी प्रभावित फसल चुनें' : '1. Select Affected Crop'}
          </label>
          <div className="flex flex-wrap gap-2">
            {CROPS.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  selectedCrop === crop.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                {language === 'hi' ? crop.nameHi : crop.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Sample disease options */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <span className="text-[11px] font-bold text-stone-500 block mb-2">
            {language === 'hi' ? 'या तुरंत परीक्षण के लिए नमूना पत्ती चुनें:' : 'Or tap sample leaf to test instantly:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_DISEASE_LEAVES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSample(sample)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{sample.labelHi}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upload & Action */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-stone-300 rounded-2xl p-5 hover:border-emerald-500 transition bg-stone-50 flex flex-col items-center justify-center text-center">
            {imagePreview ? (
              <div className="relative w-full max-h-48 overflow-hidden rounded-xl flex items-center justify-center">
                <img src={imagePreview} alt="Leaf Preview" className="max-h-48 object-cover rounded-xl" />
                <button
                  onClick={() => {
                    setImageBase64(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-stone-900/80 text-white text-xs px-2.5 py-1 rounded-lg"
                >
                  हटाएं (Remove)
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <UploadCloud className="w-10 h-10 text-emerald-600 mb-2" />
                <span className="text-xs font-bold text-stone-800">
                  {language === 'hi' ? 'पत्ती की तस्वीर अपलोड करें (कैमरा या गैलरी)' : 'Upload Leaf Photo (Camera / Gallery)'}
                </span>
                <span className="text-[11px] text-stone-500 mt-1">PNG, JPG फोटो स्वीकार्य</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="flex flex-col justify-center bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>{language === 'hi' ? 'त्वरित एआई निदान' : 'Instant AI Diagnosis'}</span>
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              {language === 'hi'
                ? `चयनित फसल: ${selectedCrop}। सीधे एआई से जांच शुरू करें या फोटो जोड़ें।`
                : `Target Crop: ${selectedCrop}. Start instant pathology analysis.`}
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={runDiagnosis}
              disabled={loading}
              className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'hi' ? 'निदान हो रहा है...' : 'Analyzing Leaf Pathology...'}</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-4 h-4" />
                  <span>{language === 'hi' ? 'रोग का पता लगाएं एवं उपाय देखें' : 'Run Pathology Diagnosis'}</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="mt-5">
            <FarmLoader
              variant="plant"
              size="md"
              language={language}
              message={
                language === 'hi'
                  ? 'पत्ते की संरचना व रोग लक्षणों का एआई स्कैन हो रहा है...'
                  : language === 'pa'
                  ? 'ਪੱਤੇ ਦੇ ਲੱਛਣਾਂ ਦੀ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...'
                  : 'Analyzing leaf tissue & fungal pathology...'
              }
              subMessage={
                language === 'hi'
                  ? 'ICAR पैथोलॉजी डेटाबेस से मिलान कर जैविक उपचार खोजा जा रहा है'
                  : 'Cross-referencing agronomic pathology datasets for organic remedies'
              }
            />
          </div>
        )}
      </div>

      {/* Diagnosis Results */}
      {diagnosis && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm space-y-5"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    diagnosis.severity === 'High'
                      ? 'bg-rose-100 text-rose-800'
                      : diagnosis.severity === 'Moderate'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {diagnosis.severity} Severity
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  सटीकता (Confidence): {diagnosis.confidence}%
                </span>
              </div>
              <h3 className="text-xl font-black text-stone-900 mt-1">
                {diagnosis.diseaseName}
              </h3>
              <p className="text-xs text-emerald-700 font-bold mt-0.5">
                प्रभावित फसल: {diagnosis.cropAffected}
              </p>
            </div>

            {/* Listen button for audio accessibility */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleSpeakDiagnosis}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm border ${
                isSpeaking
                  ? 'bg-rose-600 text-white border-rose-700'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>आवाज रोकें</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>बोलकर सुनें (Listen)</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Summary */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
            {diagnosis.summary}
          </div>

          {/* Grid of Symptoms & Remedies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Symptoms */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{language === 'hi' ? 'मुख्य लक्षण (Symptoms)' : 'Identified Symptoms'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {diagnosis.symptoms.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organic Remedies */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-3">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'जैविक व देसी उपाय' : 'Organic & Bio Control'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {diagnosis.organicRemedies.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chemical Treatments */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5 mb-3">
                <FlaskConical className="w-4 h-4 text-blue-600" />
                <span>{language === 'hi' ? 'रासायनिक उपचार (सही खुराक)' : 'Approved Chemical Dosage'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {diagnosis.chemicalRemedies.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prevention Tips */}
          {diagnosis.preventionTips && diagnosis.preventionTips.length > 0 && (
            <div className="bg-stone-50 rounded-xl border border-stone-200 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'भविष्य में रोकथाम के उपाय' : 'Prevention & Agronomic Practices'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                {diagnosis.preventionTips.map((tip, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action to simulate yield impact in Recharts Forecast */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>
                  {language === 'hi'
                    ? 'इस रोग का संभावित पैदावार पर प्रभाव व पूर्वानुमान'
                    : 'Simulate Harvest Yield Impact of this Pathology'}
                </span>
              </span>
              <p className="text-[11px] text-stone-600">
                {language === 'hi'
                  ? 'मिट्टी की नमी और मौसम के आधार पर पैदावार नुकसान का Recharts ग्राफ़ देखें।'
                  : 'Project harvest losses in the scientific growth model based on current soil and climate.'}
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('yield_forecast')}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition shadow-2xs cursor-pointer"
            >
              <span>{language === 'hi' ? 'उपज पूर्वानुमान खोलें' : 'View Yield Model'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Quick Teaser / Banner to Access Yield Forecast Directly */}
      <div className="bg-gradient-to-r from-stone-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>{language === 'hi' ? 'Recharts पावर्ड कृषि पूर्वानुमान' : 'Recharts Agronomic Engine'}</span>
          </div>
          <h4 className="text-base sm:text-lg font-black tracking-tight">
            {language === 'hi'
              ? 'फसल विकास व पैदावार पूर्वानुमान मॉडल (Yield Forecast)'
              : 'Growth Trajectory & Predictive Harvest Yield Model'}
          </h4>
          <p className="text-xs text-stone-300 leading-relaxed">
            {language === 'hi'
              ? 'अपनी मिट्टी के प्रकार (काली, जलोढ़), नमी प्रतिशत, NPK संतुलित पोषण और बदलते मौसम के आधार पर प्रति एकड़ पैदावार और न्यूनतम समर्थन मूल्य (MSP) आमदनी का ग्राफ़ देखें।'
              : 'Calibrate soil moisture, NPK fertilizers, and temperature scenarios to visualize harvest quintals per acre on interactive Recharts time-series.'}
          </p>
        </div>
        <button
          onClick={() => {
            setActiveSubTab('yield_forecast');
            window.scrollTo({ top: 180, behavior: 'smooth' });
          }}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-md shrink-0 cursor-pointer"
        >
          <TrendingUp className="w-4 h-4 text-stone-950" />
          <span>{language === 'hi' ? 'पूर्वानुमान ग्राफ़ देखें' : 'Launch Forecast Simulator'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  )}
</div>
);
};
