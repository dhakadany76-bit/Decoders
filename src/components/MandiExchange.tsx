import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Building2,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  RefreshCw,
  ExternalLink,
  MapPin,
  Scale,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { BuyerItem, StateExchangeItem, SupportedLanguage, MandiPriceItem, DistrictLocation } from '../types';
import { INITIAL_MANDI_PRICES } from '../mockData';
import { PageWorkflowExplainer } from './PageWorkflowExplainer';
import { FarmLoader } from './FarmLoader';
import { MandiCrowdMap } from './MandiCrowdMap';

interface MandiExchangeProps {
  language: SupportedLanguage;
  userDistrict?: DistrictLocation;
  onSelectMandiForSlot?: (mandiName: string, cropName: string) => void;
}

export const MandiExchange: React.FC<MandiExchangeProps> = ({
  language,
  userDistrict,
  onSelectMandiForSlot,
}) => {
  const [buyers, setBuyers] = useState<BuyerItem[]>([]);
  const [states, setStates] = useState<StateExchangeItem[]>([]);
  const [mandiPrices, setMandiPrices] = useState<MandiPriceItem[]>(INITIAL_MANDI_PRICES);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'mandi_rates' | 'map' | 'buyers' | 'states'>('map');
  const [searchCommodity, setSearchCommodity] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [buyersRes, statesRes] = await Promise.all([
        fetch('/api/buyers'),
        fetch('/api/dpg/state-exchange'),
      ]);

      if (buyersRes.ok) {
        const bData = await buyersRes.json();
        setBuyers(bData.buyers || []);
      }

      if (statesRes.ok) {
        const sData = await statesRes.json();
        setStates(sData.states || []);
      }
    } catch (err) {
      console.error('Failed to load Mandi/DPG data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPrices = mandiPrices.filter((item) => {
    const matchesSearch =
      item.commodity.toLowerCase().includes(searchCommodity.toLowerCase()) ||
      item.marketName.toLowerCase().includes(searchCommodity.toLowerCase()) ||
      item.district.toLowerCase().includes(searchCommodity.toLowerCase());
    const matchesState = selectedState === 'All' || item.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="space-y-6">
      {/* Workflow Explainer */}
      <PageWorkflowExplainer pageType="mandi_prices" language={language} />

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-300 mb-2">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Agmarknet & data.gov.in Official Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'hi'
                ? 'लाइव मंडी भाव एवं प्रत्यक्ष क्रेता नेटवर्क'
                : language === 'pa'
                ? 'ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਅਤੇ ਖਰੀਦਦਾਰ ਨੈੱਟਵਰਕ'
                : 'Live Mandi Prices & Direct Procurement Exchange'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl">
              {language === 'hi'
                ? 'भारत सरकार के आधिकारिक मंडी आंकड़ों के आधार पर फसलों के न्यूनतम, मॉडल व अधिकतम भाव देखें।'
                : 'Real-time official APMC auction prices compared with Government Minimum Support Price (MSP).'}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={fetchData}
            className="px-3.5 py-2 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 rounded-xl transition flex items-center gap-2 text-xs font-bold border border-stone-200"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{language === 'hi' ? 'ताजा करें' : 'Refresh'}</span>
          </motion.button>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-stone-100">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'map'
                ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-400'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? '🗺️ मंडी मानचित्र व लाइव भीड़' : '🗺️ Live Mandi Map & Crowds'}</span>
            <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-1.5 py-0.5 rounded-full">
              Live Bids
            </span>
          </button>
          <button
            onClick={() => setActiveTab('mandi_rates')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'mandi_rates'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{language === 'hi' ? 'लाइव मंडी भाव (Agmarknet Rates)' : 'Live APMC Mandi Rates'}</span>
          </button>
          <button
            onClick={() => setActiveTab('buyers')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'buyers'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{language === 'hi' ? 'सत्यापित मिलर्स व खरीदार' : 'Verified Buyers & Millers'}</span>
          </button>
          <button
            onClick={() => setActiveTab('states')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'states'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>{language === 'hi' ? 'राज्यवार खाद्यान्न ग्रिड (DPG Grid)' : 'Interstate Balance Grid'}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <FarmLoader
          variant="grain"
          size="lg"
          language={language}
          message={
            language === 'hi'
              ? 'मंडी भाव व सत्यापित क्रेता नेटवर्क लोड हो रहा है...'
              : language === 'pa'
              ? 'ਮੰਡੀ ਭਾਅ ਅਤੇ ਖਰੀਦਦਾਰ ਨੈੱਟਵਰਕ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...'
              : 'Fetching APMC Mandi Rates & Verified Buyer Exchange...'
          }
          subMessage={
            language === 'hi'
              ? 'Agmarknet व DPG इंटरस्टेट सरप्लस डेटा का सीधा सिंक्रोनाइज़ेशन'
              : 'Live real-time feed from Agmarknet, eNAM & Interstate Foodgrain Grid'
          }
        />
      ) : (
        <>
          {/* TAB 1: LIVE APMC MANDI RATES */}
      {activeTab === 'mandi_rates' && (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchCommodity}
                onChange={(e) => setSearchCommodity(e.target.value)}
                placeholder={language === 'hi' ? 'फसल, मंडी या जिला खोजें...' : 'Search crop, mandi or district...'}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-stone-600 shrink-0">
                {language === 'hi' ? 'राज्य:' : 'State:'}
              </span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold bg-white"
              >
                <option value="All">{language === 'hi' ? 'सभी राज्य' : 'All States'}</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>
          </div>

          {/* Map Teaser Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm border border-emerald-800/40">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? '🗺️ स्मार्ट विक्रेता मानचित्र (Mandi Crowd Map)' : '🗺️ Smart Selling Location Map'}</span>
              </span>
              <p className="text-xs text-stone-200">
                {language === 'hi'
                  ? 'देखें किस मंडी में ट्रैक्टरों की कतार सबसे छोटी है और मिलर्स का उच्चतम सक्रिय बोली भाव क्या चल रहा है।'
                  : 'Check which APMC yard has the shortest weighbridge queue and highest active price bidding signals.'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('map')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 shrink-0 transition cursor-pointer"
            >
              <span>{language === 'hi' ? 'लाइव मैप खोलें' : 'Launch Interactive Map'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mandi Rates Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrices.map((item) => {
              const diffFromMsp = item.modalPrice - item.mspRate;
              const isAboveMsp = diffFromMsp >= 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {item.variety}
                        </span>
                        <h4 className="font-extrabold text-stone-900 text-base mt-1 leading-tight">
                          {item.commodity}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold">
                        {item.trend === 'up' ? (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-0.5">
                            <ArrowUpRight className="w-3.5 h-3.5" /> +₹{item.changeAmount}
                          </span>
                        ) : item.trend === 'down' ? (
                          <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-0.5">
                            <ArrowDownRight className="w-3.5 h-3.5" /> ₹{item.changeAmount}
                          </span>
                        ) : (
                          <span className="text-stone-600 bg-stone-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                            <Minus className="w-3.5 h-3.5" /> स्थिर
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{item.marketName}, {item.district} ({item.state})</span>
                    </p>

                    {/* Rates Grid */}
                    <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200/80 grid grid-cols-3 text-center gap-1">
                      <div>
                        <span className="text-[10px] text-stone-500 block uppercase font-bold">न्यूनतम</span>
                        <span className="text-xs font-bold text-stone-800">₹{item.minPrice}</span>
                      </div>
                      <div className="border-x border-stone-200">
                        <span className="text-[10px] text-emerald-800 block uppercase font-extrabold">मॉडल भाव</span>
                        <span className="text-sm font-black text-emerald-900">₹{item.modalPrice}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block uppercase font-bold">अधिकतम</span>
                        <span className="text-xs font-bold text-stone-800">₹{item.maxPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* MSP Benchmark Comparison */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500">
                      सरकारी MSP: <span className="font-bold text-stone-800">₹{item.mspRate}/Qtl</span>
                    </span>
                    <span
                      className={`font-extrabold px-2 py-0.5 rounded ${
                        isAboveMsp
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isAboveMsp ? `+₹${diffFromMsp} MSP से अधिक` : `-₹${Math.abs(diffFromMsp)} MSP से कम`}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: INTERACTIVE LEAFLET MANDI MAP & CROWDS */}
      {activeTab === 'map' && (
        <MandiCrowdMap
          language={language}
          userDistrict={userDistrict}
          onSelectMandiForSlot={onSelectMandiForSlot}
        />
      )}

      {/* TAB 2: BUYERS */}
      {activeTab === 'buyers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buyers.map((buyer) => (
            <div
              key={buyer.id}
              className="p-5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 shadow-sm transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-stone-900 text-base">{buyer.buyerName}</span>
                      {buyer.verified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{buyer.location} ({buyer.distanceKm} km)</span>
                    </p>
                  </div>

                  <span className="text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded">
                    ★ {buyer.rating}
                  </span>
                </div>

                <div className="mt-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-500 block">मांगी गई फसल:</span>
                    <span className="text-xs font-bold text-emerald-950">{buyer.cropRequested}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 block">ऑफर बोली भाव:</span>
                    <span className="text-base font-black text-emerald-800">
                      ₹{buyer.bidPricePerQuintal}/Qtl
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-xs text-stone-600">
                  <span>मांग मात्रा: {buyer.quantityDemanded}</span>
                  <span className="font-bold text-emerald-700">{buyer.premiumAboveMsp}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-medium">
                  {buyer.paymentTerms}
                </span>
                <a
                  href={`tel:${buyer.contactPhone}`}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'सीधा संपर्क' : 'Call Buyer'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: INTERSTATE EXCHANGE */}
      {activeTab === 'states' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {states.map((st) => (
              <div
                key={st.stateCode}
                className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                      {st.stateCode}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        st.statusType === 'surplus'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {st.surplusStatus}
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-900 text-base">{st.stateName}</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    प्रमुख फसल: <span className="font-semibold text-stone-800">{st.primaryCrop}</span>
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    कुल क्षेत्र: {(st.totalCultivatedAreaHectares / 100000).toFixed(1)} लाख हेक्टेयर
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>सिंक: {st.lastTelemetrySync}</span>
                  <span className="font-bold text-emerald-700">मृदा स्कोर: {st.soilHealthScore}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
};
