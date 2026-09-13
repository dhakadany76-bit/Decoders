import React from 'react';
import {
  CloudRain,
  Wind,
  Droplets,
  Sun,
  Thermometer,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  CloudSun,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { WeatherData, SupportedLanguage } from '../types';
import { PageWorkflowExplainer } from './PageWorkflowExplainer';
import { FarmLoader } from './FarmLoader';

interface WeatherWidgetProps {
  weather: WeatherData | null;
  loading: boolean;
  language: SupportedLanguage;
  onRefresh: () => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  weather,
  loading,
  language,
  onRefresh
}) => {
  if (loading && !weather) {
    return (
      <div className="space-y-6">
        <PageWorkflowExplainer pageType="weather_forecast" language={language} />
        <FarmLoader
          variant="plant"
          size="lg"
          language={language}
          message={
            language === 'hi'
              ? 'उपग्रह मौसम व कृषि वेधशाला डेटा लोड हो रहा है...'
              : language === 'pa'
              ? 'ਮੌਸਮ ਉਪਗ੍ਰਹਿ ਡੇਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...'
              : 'Fetching Live Agromet Satellite Telemetry...'
          }
          subMessage={
            language === 'hi'
              ? 'तापमान, आर्द्रता, वर्षा पूर्वानुमान व हवा की दिशा सिंक हो रही है'
              : 'Syncing temperature, humidity, precipitation probability & wind vectors'
          }
        />
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="space-y-6">
        <PageWorkflowExplainer pageType="weather_forecast" language={language} />
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center">
          <p className="text-slate-600">
            {language === 'hi' ? 'मौसम डेटा अनुपलब्ध है' : language === 'pa' ? 'ਮੌਸਮ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ' : 'Weather telemetry unavailable.'}
          </p>
          <button
            onClick={onRefresh}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
          >
            {language === 'hi' ? 'पुनः प्रयास करें' : language === 'pa' ? 'ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ' : 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  const advisory = weather.agriAdvisory;

  return (
    <div className="space-y-6">
      {/* Workflow Explainer */}
      <PageWorkflowExplainer pageType="weather_forecast" language={language} />

      {/* Current Conditions Card */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                {weather.provider}
              </span>
              <span className="text-xs text-slate-300">
                {weather.source}
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{weather.locationName}</h2>
            <p className="text-emerald-200 text-sm mt-0.5 font-medium">
              {language === 'hi' && weather.conditionHi ? weather.conditionHi : weather.condition}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-5xl font-black tracking-tighter">
                {weather.temperature}°<span className="text-2xl font-normal text-emerald-300">C</span>
              </div>
              <div className="text-xs text-slate-300 mt-1">
                {language === 'hi' ? 'महसूस होता है' : language === 'pa' ? 'ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ' : 'Feels like'} {weather.feelsLike}°C • Min: {weather.tempMin}° / Max: {weather.tempMax}°
              </div>
            </div>
            <button
              onClick={onRefresh}
              title="Refresh telemetry"
              className="p-2.5 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl text-white transition border border-white/15"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15 text-sm">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 backdrop-blur-xs border border-white/10">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-300">{language === 'hi' ? 'बारिश की संभावना' : language === 'pa' ? 'ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ' : 'Rain Prob.'}</p>
              <p className="text-base font-bold text-white">{weather.rainfallProbability}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 backdrop-blur-xs border border-white/10">
            <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-300">{language === 'hi' ? 'नमी (Humidity)' : language === 'pa' ? 'ਨਮੀ' : 'Humidity'}</p>
              <p className="text-base font-bold text-white">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 backdrop-blur-xs border border-white/10">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-300">{language === 'hi' ? 'हवा की गति' : language === 'pa' ? 'ਹਵਾ ਦੀ ਗਤੀ' : 'Wind Speed'}</p>
              <p className="text-base font-bold text-white">{weather.windSpeed} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 backdrop-blur-xs border border-white/10">
            <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-300">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-300">{language === 'hi' ? 'धूप व यूवी सूचकांक' : language === 'pa' ? 'ਯੂਵੀ ਇੰਡੈਕਸ' : 'UV Index'}</p>
              <p className="text-base font-bold text-white">{weather.uvIndex} / 10</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Agro-Advisory Cards (Spray Window, Irrigation, Thermal) */}
      {advisory && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Spray Window */}
          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {language === 'hi' ? 'छिड़काव अनुकूलता' : language === 'pa' ? 'ਸਪਰੇਅ ਦਾ ਸਮਾਂ' : 'Spray Window'}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                advisory.sprayWindow.badgeColor === 'green'
                  ? 'bg-emerald-100 text-emerald-800'
                  : advisory.sprayWindow.badgeColor === 'amber'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {advisory.sprayWindow.status}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {language === 'hi' && advisory.sprayWindow.textHi
                ? advisory.sprayWindow.textHi
                : advisory.sprayWindow.text}
            </p>
          </div>

          {/* Irrigation Advisory */}
          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {language === 'hi' ? 'सिंचाई सलाह' : language === 'pa' ? 'ਸਿੰਚਾਈ ਸਲਾਹ' : 'Irrigation Advisory'}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                advisory.irrigationAdvisory.badgeColor === 'emerald'
                  ? 'bg-emerald-100 text-emerald-800'
                  : advisory.irrigationAdvisory.badgeColor === 'amber'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {advisory.irrigationAdvisory.needed ? 'Irrigate' : 'Pause'}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {language === 'hi' && advisory.irrigationAdvisory.textHi
                ? advisory.irrigationAdvisory.textHi
                : advisory.irrigationAdvisory.text}
            </p>
          </div>

          {/* Thermal Stress */}
          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {language === 'hi' ? 'तापमान तनाव' : language === 'pa' ? 'ਤਾਪਮਾਨ ਪ੍ਰਭਾਵ' : 'Thermal Growth'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
                {advisory.thermalStress.level}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {language === 'hi' && advisory.thermalStress.textHi
                ? advisory.thermalStress.textHi
                : advisory.thermalStress.text}
            </p>
          </div>
        </div>
      )}

      {/* Hourly Forecast */}
      {weather.hourly && weather.hourly.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CloudSun className="w-4 h-4 text-emerald-600" />
              {language === 'hi' ? 'अगले 12 घंटे का पूर्वानुमान' : language === 'pa' ? 'ਅਗਲੇ 12 ਘੰਟੇ ਦਾ ਮੌਸਮ' : 'Next 12 Hours Forecast'}
            </h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {weather.hourly.map((h, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-24 p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center text-center"
              >
                <span className="text-xs font-medium text-slate-500">{h.time}</span>
                <span className="text-lg font-bold text-slate-900 my-1">{h.temp}°</span>
                <div className="flex items-center gap-1 text-[11px] text-blue-600 font-medium">
                  <CloudRain className="w-3 h-3" />
                  {h.rainProb}%
                </div>
                <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">{h.condition}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7-Day Outlook */}
      {weather.daily && weather.daily.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              {language === 'hi' ? '7-दिवसीय कृषि-मौसम पूर्वानुमान' : language === 'pa' ? '7-ਦਿਨਾਂ ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ' : '7-Day Agro-Meteorological Outlook'}
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {weather.daily.map((d, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                <div className="w-24 font-semibold text-slate-900">{d.day}</div>
                <div className="flex-1 text-slate-600 text-xs hidden sm:block">
                  {language === 'hi' && d.conditionHi ? d.conditionHi : d.condition}
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-medium w-16 text-right">
                  <CloudRain className="w-3.5 h-3.5 inline" />
                  <span>{d.rainProb}%</span>
                </div>
                <div className="w-28 text-right font-medium text-slate-700">
                  <span className="text-slate-900 font-bold">{d.tempMax}°</span> / {d.tempMin}°C
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
