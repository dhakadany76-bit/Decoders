import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Sprout,
  Droplets,
  Thermometer,
  Sun,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Sliders,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { SupportedLanguage, WeatherData } from '../types';

export interface YieldForecastProps {
  language: SupportedLanguage;
  currentCrop?: string;
  weatherData?: WeatherData | null;
  district?: string;
}

// Soil Type Options
export type SoilType = 'alluvial' | 'black_cotton' | 'sandy_loam' | 'clay_loam';

interface CropYieldProfile {
  cropId: string;
  nameHi: string;
  namePa: string;
  nameEn: string;
  standardYieldQtlAcre: number; // Regional average yield in Quintal/Acre
  mspPerQtl: number; // Minimum Support Price in INR
  idealTempMin: number;
  idealTempMax: number;
  idealMoisture: number; // in %
  growthWeeks: number;
  stages: {
    week: number;
    stageNameHi: string;
    stageNamePa: string;
    stageNameEn: string;
    historicalBiomass: number; // index 0-100
  }[];
}

const CROP_PROFILES: Record<string, CropYieldProfile> = {
  Wheat: {
    cropId: 'Wheat',
    nameHi: 'गेहूं (Wheat Sharbati)',
    namePa: 'ਕਣਕ',
    nameEn: 'Wheat (Triticum)',
    standardYieldQtlAcre: 18.5,
    mspPerQtl: 2275,
    idealTempMin: 12,
    idealTempMax: 25,
    idealMoisture: 65,
    growthWeeks: 18,
    stages: [
      { week: 1, stageNameHi: 'अंकुरण (Germination)', stageNamePa: 'ਅੰਕੁਰਣ', stageNameEn: 'Germination', historicalBiomass: 5 },
      { week: 3, stageNameHi: 'मुकुट जड़ (Crown Root)', stageNamePa: 'ਤਾਜ ਜੜ੍ਹ', stageNameEn: 'CRI Stage', historicalBiomass: 14 },
      { week: 6, stageNameHi: 'कल्ले फूटना (Tillering)', stageNamePa: 'ਫੁਟਾਰਾ', stageNameEn: 'Tillering', historicalBiomass: 32 },
      { week: 9, stageNameHi: 'गांठ बनना (Jointing)', stageNamePa: 'ਗੰਢ ਬਣਨਾ', stageNameEn: 'Jointing', historicalBiomass: 54 },
      { week: 12, stageNameHi: 'बाली निकलना (Heading)', stageNamePa: 'ਸਿੱਟਾ ਨਿਕਲਣਾ', stageNameEn: 'Heading / Booting', historicalBiomass: 75 },
      { week: 15, stageNameHi: 'दूधिया दाना (Milking)', stageNamePa: 'ਦੁੱਧ ਅਵਸਥਾ', stageNameEn: 'Grain Filling', historicalBiomass: 90 },
      { week: 18, stageNameHi: 'पकाव व कटाई (Maturity)', stageNamePa: 'ਪਕਾਈ', stageNameEn: 'Harvest Maturity', historicalBiomass: 100 },
    ],
  },
  Mustard: {
    cropId: 'Mustard',
    nameHi: 'सरसों (Mustard Pusa Bold)',
    namePa: 'ਸਰ੍ਹੋਂ',
    nameEn: 'Mustard (Brassica)',
    standardYieldQtlAcre: 8.2,
    mspPerQtl: 5650,
    idealTempMin: 10,
    idealTempMax: 24,
    idealMoisture: 55,
    growthWeeks: 16,
    stages: [
      { week: 1, stageNameHi: 'अंकुरण (Emergence)', stageNamePa: 'ਅੰਕੁਰਣ', stageNameEn: 'Emergence', historicalBiomass: 6 },
      { week: 4, stageNameHi: 'शाखाएं (Branching)', stageNamePa: 'ਟਹਿਣੀਆਂ', stageNameEn: 'Branching', historicalBiomass: 26 },
      { week: 8, stageNameHi: 'फूल खिलना (Flowering)', stageNamePa: 'ਫੁੱਲ ਖਿੜਨਾ', stageNameEn: 'Flowering', historicalBiomass: 58 },
      { week: 12, stageNameHi: 'फली भरना (Pod Fill)', stageNamePa: 'ਫਲੀ ਭਰਨਾ', stageNameEn: 'Pod Development', historicalBiomass: 86 },
      { week: 16, stageNameHi: 'पकाव (Maturity)', stageNamePa: 'ਪਕਾਈ', stageNameEn: 'Maturity', historicalBiomass: 100 },
    ],
  },
  Soybean: {
    cropId: 'Soybean',
    nameHi: 'सोयाबीन (Soybean JS-9560)',
    namePa: 'ਸੋਇਆਬੀਨ',
    nameEn: 'Soybean (Glycine max)',
    standardYieldQtlAcre: 10.5,
    mspPerQtl: 4600,
    idealTempMin: 22,
    idealTempMax: 32,
    idealMoisture: 70,
    growthWeeks: 14,
    stages: [
      { week: 1, stageNameHi: 'उगाण (Emergence)', stageNamePa: 'ਅੰਕੁਰਣ', stageNameEn: 'Emergence', historicalBiomass: 8 },
      { week: 4, stageNameHi: 'वानस्पतिक (Vegetative)', stageNamePa: 'ਵਾਧਾ', stageNameEn: 'Vegetative', historicalBiomass: 34 },
      { week: 7, stageNameHi: 'पुष्पन (Flowering)', stageNamePa: 'ਫੁੱਲ', stageNameEn: 'Flowering', historicalBiomass: 62 },
      { week: 11, stageNameHi: 'फली दाना (Pod Filling)', stageNamePa: 'ਫਲੀ ਭਰਾਈ', stageNameEn: 'Pod Filling', historicalBiomass: 88 },
      { week: 14, stageNameHi: 'परिपक्वता (Harvest)', stageNamePa: 'ਕਟਾਈ', stageNameEn: 'Maturity', historicalBiomass: 100 },
    ],
  },
  Rice: {
    cropId: 'Rice',
    nameHi: 'धान / बासमती (Paddy Basmati)',
    namePa: 'ਝੋਨਾ (ਬਾਸਮਤੀ)',
    nameEn: 'Paddy / Basmati',
    standardYieldQtlAcre: 22.0,
    mspPerQtl: 2320,
    idealTempMin: 24,
    idealTempMax: 35,
    idealMoisture: 85,
    growthWeeks: 18,
    stages: [
      { week: 2, stageNameHi: 'रोपाई (Transplanting)', stageNamePa: 'ਲਵਾਈ', stageNameEn: 'Transplanting', historicalBiomass: 10 },
      { week: 5, stageNameHi: 'कल्ले फूटना (Tillering)', stageNamePa: 'ਫੁਟਾਰਾ', stageNameEn: 'Active Tillering', historicalBiomass: 35 },
      { week: 9, stageNameHi: 'गाभा बनना (Panicle)', stageNamePa: 'ਗੋਭ ਅਵਸਥਾ', stageNameEn: 'Panicle Initiation', historicalBiomass: 65 },
      { week: 13, stageNameHi: 'बाली व फूल (Flowering)', stageNamePa: 'ਬੂਰ ਪੈਣਾ', stageNameEn: 'Flowering', historicalBiomass: 85 },
      { week: 18, stageNameHi: 'पकी बाली (Harvest)', stageNamePa: 'ਕਟਾਈ', stageNameEn: 'Maturity', historicalBiomass: 100 },
    ],
  },
  Tomato: {
    cropId: 'Tomato',
    nameHi: 'टमाटर (Tomato Hybrid)',
    namePa: 'ਟਮਾਟਰ',
    nameEn: 'Tomato Hybrid',
    standardYieldQtlAcre: 95.0,
    mspPerQtl: 1400,
    idealTempMin: 18,
    idealTempMax: 29,
    idealMoisture: 60,
    growthWeeks: 16,
    stages: [
      { week: 2, stageNameHi: 'पौध स्थापना (Establishment)', stageNamePa: 'ਸਥਾਪਨਾ', stageNameEn: 'Establishment', historicalBiomass: 12 },
      { week: 6, stageNameHi: 'फूल आना (Flowering)', stageNamePa: 'ਫੁੱਲ', stageNameEn: 'Flowering', historicalBiomass: 40 },
      { week: 10, stageNameHi: 'फल विकास (Fruit Set)', stageNamePa: 'ਫਲ ਬਣਨਾ', stageNameEn: 'Fruit Set', historicalBiomass: 75 },
      { week: 16, stageNameHi: 'लाल फल चुनाई (Harvest)', stageNamePa: 'ਚੁਗਾਈ', stageNameEn: 'Harvest Picking', historicalBiomass: 100 },
    ],
  },
};

export const YieldForecast: React.FC<YieldForecastProps> = ({
  language,
  currentCrop = 'Wheat',
  weatherData,
  district = 'शिवपुरी (Shivpuri)',
}) => {
  // Selected Crop
  const [selectedCropId, setSelectedCropId] = useState<string>(
    CROP_PROFILES[currentCrop] ? currentCrop : 'Wheat'
  );

  // Agronomic Soil Parameters State
  const [soilType, setSoilType] = useState<SoilType>('black_cotton');
  const [soilMoisture, setSoilMoisture] = useState<number>(
    weatherData?.humidity ? Math.min(85, Math.max(45, weatherData.humidity)) : 62
  );
  const [npkLevel, setNpkLevel] = useState<'optimal' | 'low' | 'excess'>('optimal');
  const [irrigationStatus, setIrrigationStatus] = useState<'assured' | 'rainfed' | 'stress'>('assured');
  const [weatherRiskScenario, setWeatherRiskScenario] = useState<'favorable' | 'normal' | 'heatwave' | 'heavy_rain'>('normal');
  const [currentGrowthWeek, setCurrentGrowthWeek] = useState<number>(9); // Mid-season by default

  const profile = CROP_PROFILES[selectedCropId] || CROP_PROFILES.Wheat;

  // Compute dynamic forecast multiplier based on soil & weather parameters
  const {
    forecastMultiplier,
    soilImpactPct,
    weatherImpactPct,
    nutrientImpactPct,
    predictedYieldQtlAcre,
    confidencePct,
    estimatedGrossRevenue,
  } = useMemo(() => {
    let soilFactor = 1.0;
    // Soil type multiplier
    if (soilType === 'black_cotton') soilFactor = 1.08; // High water holding capacity
    else if (soilType === 'alluvial') soilFactor = 1.12; // Highly fertile loam
    else if (soilType === 'sandy_loam') soilFactor = 0.94;
    else if (soilType === 'clay_loam') soilFactor = 1.02;

    // Soil moisture deviation from crop ideal
    const moistureDiff = soilMoisture - profile.idealMoisture;
    let moistureFactor = 1.0 - Math.abs(moistureDiff) * 0.005;
    if (moistureDiff < -25) moistureFactor -= 0.12; // severe drought stress

    // NPK nutrient factor
    let nutrientFactor = 1.0;
    if (npkLevel === 'optimal') nutrientFactor = 1.06;
    else if (npkLevel === 'low') nutrientFactor = 0.82;
    else if (npkLevel === 'excess') nutrientFactor = 0.95; // vegetative overgrowth, lodging risk

    // Irrigation factor
    let irrFactor = 1.0;
    if (irrigationStatus === 'assured') irrFactor = 1.05;
    else if (irrigationStatus === 'rainfed') irrFactor = 0.92;
    else if (irrigationStatus === 'stress') irrFactor = 0.78;

    // Weather scenario factor
    let weatherFactor = 1.0;
    if (weatherRiskScenario === 'favorable') weatherFactor = 1.10;
    else if (weatherRiskScenario === 'normal') weatherFactor = 1.02;
    else if (weatherRiskScenario === 'heatwave') weatherFactor = 0.85; // Terminal heat stress on grain weight
    else if (weatherRiskScenario === 'heavy_rain') weatherFactor = 0.88; // Fungal rust and lodging risk

    const totalMultiplier = soilFactor * moistureFactor * nutrientFactor * irrFactor * weatherFactor;
    const finalYield = Math.round(profile.standardYieldQtlAcre * totalMultiplier * 10) / 10;

    const soilPct = Math.round((soilFactor * moistureFactor - 1) * 100);
    const weatherPct = Math.round((weatherFactor - 1) * 100);
    const nutrientPct = Math.round((nutrientFactor * irrFactor - 1) * 100);

    // Confidence metric (higher if closer to optimal range)
    const confidence = Math.min(96, Math.max(78, Math.round(92 - Math.abs(totalMultiplier - 1.0) * 20)));

    const revenue = Math.round(finalYield * profile.mspPerQtl);

    return {
      forecastMultiplier: totalMultiplier,
      soilImpactPct: soilPct,
      weatherImpactPct: weatherPct,
      nutrientImpactPct: nutrientPct,
      predictedYieldQtlAcre: finalYield,
      confidencePct: confidence,
      estimatedGrossRevenue: revenue,
    };
  }, [soilType, soilMoisture, npkLevel, irrigationStatus, weatherRiskScenario, profile]);

  // Construct chart time-series data from Week 1 to Week N
  const chartData = useMemo(() => {
    const data: Array<{
      weekLabel: string;
      weekNum: number;
      historicalCanopy: number;
      actualGrowth?: number;
      forecastCanopy?: number;
      lowerBound?: number;
      upperBound?: number;
      standardYieldBaseline: number;
      predictedYieldQtl?: number;
      stageDescription: string;
      isProjected: boolean;
    }> = [];

    const totalWeeks = profile.growthWeeks;

    for (let w = 1; w <= totalWeeks; w++) {
      // Find closest stage milestone
      const milestone = profile.stages.slice().reverse().find((s) => s.week <= w) || profile.stages[0];
      const stageName = language === 'hi' ? milestone.stageNameHi : milestone.stageNameEn;

      // Base historical biomass development (sigmoid curve)
      const progress = w / totalWeeks;
      const baseBiomass = Math.round(100 / (1 + Math.exp(-6 * (progress - 0.5))));

      const isCurrentOrPast = w <= currentGrowthWeek;
      const isCurrent = w === currentGrowthWeek;

      // Actual recorded historical growth up to current week
      const actual = isCurrentOrPast
        ? Math.round(baseBiomass * (1 + (forecastMultiplier - 1) * (w / totalWeeks)))
        : undefined;

      // Forecast trajectory starting from current week to harvest
      const forecastVal = w >= currentGrowthWeek
        ? Math.round(baseBiomass * forecastMultiplier)
        : undefined;

      // Upper & Lower confidence interval bands for projection
      const uncertainty = (w - currentGrowthWeek) * 2.2;
      const lower = w >= currentGrowthWeek ? Math.max(0, Math.round((forecastVal || baseBiomass) - uncertainty)) : undefined;
      const upper = w >= currentGrowthWeek ? Math.round((forecastVal || baseBiomass) + uncertainty) : undefined;

      // Projected yield milestone at harvest week
      const isHarvest = w === totalWeeks;

      data.push({
        weekLabel: language === 'hi' ? `सप्ताह ${w}` : `Wk ${w}`,
        weekNum: w,
        historicalCanopy: baseBiomass,
        actualGrowth: actual,
        forecastCanopy: forecastVal,
        lowerBound: lower,
        upperBound: upper,
        standardYieldBaseline: profile.standardYieldQtlAcre,
        predictedYieldQtl: isHarvest ? predictedYieldQtlAcre : undefined,
        stageDescription: isCurrent ? `${stageName} (वर्तमान)` : stageName,
        isProjected: w > currentGrowthWeek,
      });
    }

    return data;
  }, [profile, currentGrowthWeek, forecastMultiplier, predictedYieldQtlAcre, language]);

  // Difference vs standard regional yield
  const yieldDelta = Math.round((predictedYieldQtlAcre - profile.standardYieldQtlAcre) * 10) / 10;
  const isGain = yieldDelta >= 0;

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {language === 'hi'
                ? 'कृषि वैज्ञानिक उपज पूर्वानुमान • Recharts AI'
                : 'Scientific Crop Yield Forecast & Analytics'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'hi'
              ? 'फसल विकास व संभावित पैदावार पूर्वानुमान (Yield Forecast)'
              : 'Growth Trajectory & Predictive Harvest Yield Model'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
            {language === 'hi'
              ? 'मिट्टी की नमी, उर्वरक (NPK), सिंचाई और मौसम की स्थिति के आधार पर सप्ताह-दर-सप्ताह फसल वृद्धि और कटाई पर अनुमानित पैदावार का सटीक पूर्वानुमान।'
              : 'Simulate crop biomass development and harvest yields in Quintals/Acre by calibrating real-time soil moisture, nutrient balance, and atmospheric climate risks.'}
          </p>
        </div>

        {/* Crop Selection Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {Object.values(CROP_PROFILES).map((c) => (
            <button
              key={c.cropId}
              onClick={() => setSelectedCropId(c.cropId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                selectedCropId === c.cropId
                  ? 'bg-emerald-700 text-white shadow-xs font-extrabold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? c.nameHi : c.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards: Predicted Yield, Baseline Benchmark, Potential Revenue & Confidence */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* 1. Predicted Yield */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-2xl p-4 border border-emerald-200 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
            {language === 'hi' ? 'अनुमानित पैदावार' : 'Predicted Harvest Yield'}
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-950 font-mono">
              {predictedYieldQtlAcre}
            </span>
            <span className="text-xs font-bold text-emerald-800">
              {language === 'hi' ? 'कुंतल / एकड़' : 'Qtl / Acre'}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold">
            {isGain ? (
              <span className="text-emerald-700 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{yieldDelta} कुं. (+{Math.round((yieldDelta / profile.standardYieldQtlAcre) * 100)}%)
              </span>
            ) : (
              <span className="text-amber-700 flex items-center">
                <TrendingDown className="w-3.5 h-3.5" />
                {yieldDelta} कुं. ({Math.round((yieldDelta / profile.standardYieldQtlAcre) * 100)}%)
              </span>
            )}
            <span className="text-stone-500 font-normal">औसत से</span>
          </div>
        </div>

        {/* 2. Regional Baseline Benchmark */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            {language === 'hi' ? 'क्षेत्रीय औसत पैदावार' : 'Regional Baseline Yield'}
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-stone-800 font-mono">
              {profile.standardYieldQtlAcre}
            </span>
            <span className="text-xs font-semibold text-stone-600">
              {language === 'hi' ? 'कुंतल / एकड़' : 'Qtl / Acre'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-stone-500 font-medium">
            {district} कृषि विभाग डेटा
          </div>
        </div>

        {/* 3. Estimated MSP Gross Revenue */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200">
          <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
            {language === 'hi' ? 'संभावित आय (MSP दर पर)' : 'Projected Gross Value (MSP)'}
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-950 font-mono">
              ₹{estimatedGrossRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-amber-800">/ एकड़</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-800 font-semibold">
            MSP: ₹{profile.mspPerQtl}/कुंतल
          </div>
        </div>

        {/* 4. Model Confidence & Health Score */}
        <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200">
          <span className="text-[11px] font-bold text-sky-900 uppercase tracking-wider block">
            {language === 'hi' ? 'पूर्वानुमान सटीकता' : 'Forecast Confidence'}
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-sky-950 font-mono">
              {confidencePct}%
            </span>
            <span className="text-xs font-bold text-sky-700">सटीकता</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-sky-800 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>ICAR एग्रो-मैट्रिक मॉडल</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Growth & Yield Chart (Recharts ComposedChart) */}
      <div className="bg-stone-50/70 rounded-3xl p-4 sm:p-6 border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>
                {language === 'hi'
                  ? `${profile.nameHi} - वानस्पतिक वृद्धि व पैदावार वक्र`
                  : `${profile.nameEn} - Canopy Growth & Yield Trajectory`}
              </span>
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'hi'
                ? `सप्ताह 1 से सप्ताह ${profile.growthWeeks} तक का ऐतिहासिक बायोमास इंडेक्स और कटाई पर संभावित पैदावार (सप्ताह ${currentGrowthWeek} वर्तमान स्थिति)`
                : `Week 1 to Week ${profile.growthWeeks} biomass canopy progress with confidence prediction bands.`}
            </p>
          </div>

          {/* Current Stage Indicator */}
          <div className="bg-white px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 shadow-2xs self-start sm:self-auto">
            <span className="text-stone-400 font-normal mr-1">वर्तमान चरण:</span>
            <span className="text-emerald-800">
              सप्ताह {currentGrowthWeek} ({chartData.find((d) => d.weekNum === currentGrowthWeek)?.stageDescription})
            </span>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="w-full h-[320px] sm:h-[380px] select-none">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: -10 }}
            >
              <defs>
                {/* Confidence Interval Upper/Lower Area Gradient */}
                <linearGradient id="forecastBandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.04} />
                </linearGradient>
                {/* Historical Area Gradient */}
                <linearGradient id="historicalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

              <XAxis
                dataKey="weekLabel"
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />

              <YAxis
                yAxisId="left"
                domain={[0, 120]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: language === 'hi' ? 'वृद्धि सूचकांक (0-100)' : 'Growth Index (Biomass %)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#64748b',
                  fontSize: 10,
                  offset: 15,
                }}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const dataPoint = payload[0]?.payload;
                    return (
                      <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-emerald-300 text-xs space-y-1.5 min-w-[210px]">
                        <div className="flex items-center justify-between font-black text-stone-900 border-b border-stone-100 pb-1.5">
                          <span>{label} ({dataPoint?.stageDescription})</span>
                          <span className="text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px]">
                            {dataPoint?.isProjected ? 'पूर्वानुमान' : 'वास्तविक'}
                          </span>
                        </div>

                        {dataPoint?.actualGrowth !== undefined && (
                          <div className="flex items-center justify-between text-emerald-900 font-bold">
                            <span>वास्तविक वृद्धि:</span>
                            <span className="font-mono">{dataPoint.actualGrowth}%</span>
                          </div>
                        )}

                        {dataPoint?.forecastCanopy !== undefined && (
                          <div className="flex items-center justify-between text-emerald-700 font-bold">
                            <span>अनुमानित वृद्धि:</span>
                            <span className="font-mono">{dataPoint.forecastCanopy}%</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-stone-500">
                          <span>ऐतिहासिक मानक:</span>
                          <span className="font-mono">{dataPoint?.historicalCanopy}%</span>
                        </div>

                        {dataPoint?.lowerBound !== undefined && dataPoint?.upperBound !== undefined && (
                          <div className="flex items-center justify-between text-[11px] text-stone-600 bg-stone-50 p-1 rounded-md">
                            <span>संभावित दायरा:</span>
                            <span className="font-mono font-bold text-emerald-800">
                              {dataPoint.lowerBound}% - {dataPoint.upperBound}%
                            </span>
                          </div>
                        )}

                        {dataPoint?.predictedYieldQtl && (
                          <div className="pt-1 border-t border-emerald-100 flex items-center justify-between text-emerald-950 font-black">
                            <span>अंतिम पैदावार:</span>
                            <span className="font-mono text-sm text-emerald-800">
                              {dataPoint.predictedYieldQtl} Qtl/Acre
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }}
              />

              {/* Baseline Historical Benchmark Area */}
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="historicalCanopy"
                name={language === 'hi' ? 'ऐतिहासिक मानक वृद्धि' : 'Historical Benchmark'}
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="url(#historicalGrad)"
              />

              {/* Upper & Lower Confidence Interval Band Area */}
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="upperBound"
                name={language === 'hi' ? 'पूर्वानुमान दायरा (Confidence Band)' : 'Projection Range'}
                stroke="#10b981"
                strokeWidth={1}
                strokeDasharray="2 2"
                fill="url(#forecastBandGrad)"
              />

              {/* Actual Recorded Growth Line (up to current week) */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="actualGrowth"
                name={language === 'hi' ? 'वर्तमान वास्तविक वृद्धि' : 'Observed Growth'}
                stroke="#047857"
                strokeWidth={3.5}
                dot={{ r: 4, fill: '#047857', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 6 }}
              />

              {/* Future Forecast Trajectory Line */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="forecastCanopy"
                name={language === 'hi' ? 'भविष्य पूर्वानुमान (AI Prediction)' : 'AI Forecast'}
                stroke="#059669"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ r: 3, fill: '#059669' }}
              />

              {/* Reference Vertical Line indicating Current Week */}
              <ReferenceLine
                yAxisId="left"
                x={`सप्ताह ${currentGrowthWeek}`}
                stroke="#e11d48"
                strokeWidth={2}
                strokeDasharray="3 3"
                label={{
                  value: language === 'hi' ? 'आज (Now)' : 'Current Stage',
                  fill: '#e11d48',
                  fontSize: 10,
                  position: 'top',
                  fontWeight: 'bold',
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Agronomic Parameter Sliders & Scenarios */}
      <div className="bg-stone-50 rounded-3xl p-5 sm:p-6 border border-stone-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-800" />
            <h4 className="text-sm sm:text-base font-extrabold text-stone-900">
              {language === 'hi'
                ? 'सिमुलेशन नियंत्रण: मिट्टी, उर्वरक व मौसम पैरामीटर बदलें'
                : 'Interactive Agronomic Calibrator: Adjust Soil & Weather Variables'}
            </h4>
          </div>
          <button
            onClick={() => {
              setSoilType('black_cotton');
              setSoilMoisture(profile.idealMoisture);
              setNpkLevel('optimal');
              setIrrigationStatus('assured');
              setWeatherRiskScenario('normal');
              setCurrentGrowthWeek(9);
            }}
            className="text-xs font-bold text-stone-500 hover:text-stone-800 flex items-center gap-1 transition cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'डिफ़ॉल्ट रिसेट करें' : 'Reset Defaults'}</span>
          </button>
        </div>

        {/* 4 Interactive Knobs / Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Soil Type */}
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'hi' ? 'मिट्टी का प्रकार (Soil)' : 'Soil Type'}</span>
              </span>
            </div>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value as SoilType)}
              className="w-full text-xs font-bold bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-2 text-stone-800 cursor-pointer focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="black_cotton">काली मिट्टी (Black Cotton - उच्च नमी)</option>
              <option value="alluvial">जलोढ़ दोमट (Alluvial Loam - उत्तम)</option>
              <option value="sandy_loam">बलुई दोमट (Sandy Loam)</option>
              <option value="clay_loam">चिकनी दोमट (Clay Loam)</option>
            </select>
            <div className="text-[11px] text-stone-500 font-medium">
              प्रभाव: <span className="font-bold text-emerald-800">+{soilImpactPct}% उपज अंतर</span>
            </div>
          </div>

          {/* 2. Soil Moisture Slider */}
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-600" />
                <span>{language === 'hi' ? 'मिट्टी में नमी (Moisture)' : 'Soil Moisture'}</span>
              </span>
              <span className="font-mono text-emerald-800 font-black">{soilMoisture}%</span>
            </div>
            <input
              type="range"
              min={25}
              max={95}
              step={1}
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-bold">
              <span>सूखा (25%)</span>
              <span className="text-emerald-700">आदर्श ({profile.idealMoisture}%)</span>
              <span>अधिक जल (95%)</span>
            </div>
          </div>

          {/* 3. NPK Fertilizer Balance */}
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'hi' ? 'उर्वरक पोषण (NPK)' : 'Nutrient / NPK'}</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {(['low', 'optimal', 'excess'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setNpkLevel(lvl)}
                  className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer text-center ${
                    npkLevel === lvl
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {lvl === 'low' ? 'कमी (Low)' : lvl === 'optimal' ? 'संतुलित' : 'अधिक (Excess)'}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-stone-500 font-medium">
              पोषण प्रभाव: <span className="font-bold text-emerald-800">{nutrientImpactPct > 0 ? `+${nutrientImpactPct}` : nutrientImpactPct}%</span>
            </div>
          </div>

          {/* 4. Weather Scenario Simulation */}
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'hi' ? 'मौसम परिदृश्य (Climate)' : 'Weather Scenario'}</span>
              </span>
            </div>
            <select
              value={weatherRiskScenario}
              onChange={(e) => setWeatherRiskScenario(e.target.value as any)}
              className="w-full text-xs font-bold bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-2 text-stone-800 cursor-pointer focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="favorable">अनुकूल मौसम (Favorable - +10%)</option>
              <option value="normal">सामान्य मानसून (Normal Seasonal)</option>
              <option value="heatwave">तापमान वृद्धि / हीटवेव (-15%)</option>
              <option value="heavy_rain">असमय अतिवृष्टि / ओलावृष्टि (-12%)</option>
            </select>
            <div className="text-[11px] text-stone-500 font-medium">
              जलवायु जोखिम: <span className="font-bold text-amber-800">{weatherImpactPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Agronomic Advisory Cards based on Simulated Yield */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5 space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>
            {language === 'hi'
              ? 'पैदावार बढ़ाने के लिए वैज्ञानिक कृषि परामर्श (ICAR Recommendations)'
              : 'Actionable Agronomic Interventions to Maximize Yield'}
          </span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Tip 1 */}
          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs space-y-1">
            <span className="font-extrabold text-emerald-900 block">
              {language === 'hi' ? '💧 सिंचाई प्रबंधन' : 'Irrigation Scheduling'}
            </span>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              {soilMoisture < 50
                ? 'वर्तमान नमी कम है। दानों में वजन बढ़ाने के लिए बाली निकलते समय 4-5 सेमी की हल्की सिंचाई तत्काल करें।'
                : 'वर्तमान नमी संतोषजनक है। अधिक जलभराव से बचें ताकि जड़ों में फफूंद न लगे।'}
            </p>
          </div>

          {/* Tip 2 */}
          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs space-y-1">
            <span className="font-extrabold text-emerald-900 block">
              {language === 'hi' ? '🌾 सूक्ष्म पोषक तत्व छिड़काव' : 'Micronutrient Foliar Spray'}
            </span>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              {npkLevel === 'low'
                ? '0.5% जिंक सल्फेट + 2% यूरिया घोल का पर्णीय छिड़काव करें। इससे प्रति एकड़ 1.5 कुंतल अतिरिक्त पैदावार मिल सकती है।'
                : 'एनपीके (19:19:19) का 1 किलो/एकड़ की दर से स्प्रे करें। दानों का भराव चमकदार और भारी होगा।'}
            </p>
          </div>

          {/* Tip 3 */}
          <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs space-y-1">
            <span className="font-extrabold text-emerald-900 block">
              {language === 'hi' ? '🛡️ मौसम सुरक्षा अलर्ट' : 'Weather Risk Mitigation'}
            </span>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              {weatherRiskScenario === 'heatwave'
                ? 'अगेती गर्मी से बचाव के लिए पोटैशियम नाइट्रेट (13:0:45) का 1.5% छिड़काव करें ताकि पौधों में नमी बनी रहे।'
                : 'आगामी 7 दिनों में मौसम अनुकूल है। रोग निगरानी रखें और कीटनाशक छिड़काव सुबह 8-11 बजे के बीच करें।'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
