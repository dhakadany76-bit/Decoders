import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  TrendingUp,
  Clock,
  Truck,
  Users,
  ShieldCheck,
  Navigation,
  Compass,
  Layers,
  Sparkles,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Scale,
  DollarSign,
  Filter,
  Maximize2,
  Minimize2,
  RefreshCw,
  Info,
  Calendar,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SupportedLanguage, DistrictLocation } from '../types';

export interface MandiGeoItem {
  id: string;
  name: string;
  hindiName: string;
  punjabiName: string;
  district: string;
  state: string;
  lat: number;
  lon: number;
  commodities: string[];
  primaryCrop: string;
  // Crowd & Queue
  crowdLevel: 'low' | 'moderate' | 'high' | 'congested';
  currentQueueLengthTractors: number;
  estimatedWaitMinutes: number;
  gatePassClearanceRatePerHour: number;
  yardCapacityPct: number;
  operatingHours: string;
  gateStatus: 'open' | 'filling_fast' | 'diverted';
  // Active Bidding
  topBidPrice: number;
  modalPrice: number;
  mspPrice: number;
  activeBiddersCount: number;
  biddingTrend: 'surging' | 'steady' | 'cooling';
  priceChangeToday: number;
  lastBidTimestamp: string;
  topBuyerName: string;
  verifiedBuyerCompany: string;
  // Logistics
  helplinePhone: string;
  weighbridgeCount: number;
}

export const REGIONAL_MANDIS: MandiGeoItem[] = [
  {
    id: 'MND-SHIVPURI',
    name: 'Shivpuri APMC Krishi Upaj Mandi',
    hindiName: 'शिवपुरी कृषि उपज मंडी समिति (मुख्य प्रांगण)',
    punjabiName: 'ਸ਼ਿਵਪੁਰੀ ਮੁੱਖ ਅਨਾਜ ਮੰਡੀ',
    district: 'Shivpuri',
    state: 'Madhya Pradesh',
    lat: 25.4358,
    lon: 77.6635,
    commodities: ['Wheat', 'Mustard', 'Soybean', 'Groundnut'],
    primaryCrop: 'Wheat',
    crowdLevel: 'moderate',
    currentQueueLengthTractors: 28,
    estimatedWaitMinutes: 45,
    gatePassClearanceRatePerHour: 22,
    yardCapacityPct: 68,
    operatingHours: '08:00 AM - 06:00 PM',
    gateStatus: 'open',
    topBidPrice: 2980,
    modalPrice: 2750,
    mspPrice: 2425,
    activeBiddersCount: 24,
    biddingTrend: 'surging',
    priceChangeToday: 65,
    lastBidTimestamp: '2 मिनट पहले',
    topBuyerName: 'Amit Aggarwal',
    verifiedBuyerCompany: 'Aggarwal Flour Mills & Exports',
    helplinePhone: '07492-223410',
    weighbridgeCount: 4,
  },
  {
    id: 'MND-KOLARAS',
    name: 'Kolaras Sub-Mandi Yard',
    hindiName: 'कोलारस उप-मंडी प्रांगण',
    punjabiName: 'ਕੋਲਾਰਸ ਸਬ-ਮੰਡੀ ਯਾਰਡ',
    district: 'Shivpuri',
    state: 'Madhya Pradesh',
    lat: 25.2285,
    lon: 77.6033,
    commodities: ['Soybean', 'Wheat', 'Mustard', 'Gram'],
    primaryCrop: 'Soybean',
    crowdLevel: 'low',
    currentQueueLengthTractors: 6,
    estimatedWaitMinutes: 15,
    gatePassClearanceRatePerHour: 18,
    yardCapacityPct: 34,
    operatingHours: '08:30 AM - 05:30 PM',
    gateStatus: 'open',
    topBidPrice: 5350,
    modalPrice: 5150,
    mspPrice: 4892,
    activeBiddersCount: 16,
    biddingTrend: 'surging',
    priceChangeToday: 80,
    lastBidTimestamp: '5 मिनट पहले',
    topBuyerName: 'Suresh Singhal',
    verifiedBuyerCompany: 'Malwa Agro Oils Pvt Ltd',
    helplinePhone: '07494-245120',
    weighbridgeCount: 2,
  },
  {
    id: 'MND-POHARI',
    name: 'Pohari Krishi Mandi Samiti',
    hindiName: 'पोहरी कृषि उपज मंडी यार्ड',
    punjabiName: 'ਪੋਹਰੀ ਅਨਾਜ ਮੰਡੀ',
    district: 'Shivpuri',
    state: 'Madhya Pradesh',
    lat: 25.5342,
    lon: 77.3082,
    commodities: ['Mustard', 'Wheat', 'Sesame'],
    primaryCrop: 'Mustard',
    crowdLevel: 'low',
    currentQueueLengthTractors: 4,
    estimatedWaitMinutes: 10,
    gatePassClearanceRatePerHour: 14,
    yardCapacityPct: 28,
    operatingHours: '09:00 AM - 05:00 PM',
    gateStatus: 'open',
    topBidPrice: 6280,
    modalPrice: 6150,
    mspPrice: 5950,
    activeBiddersCount: 14,
    biddingTrend: 'surging',
    priceChangeToday: 110,
    lastBidTimestamp: '8 मिनट पहले',
    topBuyerName: 'Rajendra Gupta',
    verifiedBuyerCompany: 'Chambal Pure Mustard Mills',
    helplinePhone: '07492-261019',
    weighbridgeCount: 2,
  },
  {
    id: 'MND-KARERA',
    name: 'Karera APMC Mandi Yard',
    hindiName: 'करेरा कृषि मंडी प्रांगण',
    punjabiName: 'ਕਰੇਰਾ ਮੰਡੀ ਪ੍ਰਾਂਗਣ',
    district: 'Shivpuri',
    state: 'Madhya Pradesh',
    lat: 25.4619,
    lon: 78.1408,
    commodities: ['Groundnut', 'Wheat', 'Gram', 'Mustard'],
    primaryCrop: 'Groundnut',
    crowdLevel: 'high',
    currentQueueLengthTractors: 52,
    estimatedWaitMinutes: 110,
    gatePassClearanceRatePerHour: 20,
    yardCapacityPct: 86,
    operatingHours: '08:00 AM - 06:30 PM',
    gateStatus: 'filling_fast',
    topBidPrice: 6650,
    modalPrice: 6300,
    mspPrice: 6377,
    activeBiddersCount: 28,
    biddingTrend: 'steady',
    priceChangeToday: 35,
    lastBidTimestamp: '1 मिनट पहले',
    topBuyerName: 'Mahesh Sharma',
    verifiedBuyerCompany: 'Bundelkhand Solvent Extraction',
    helplinePhone: '07493-252114',
    weighbridgeCount: 3,
  },
  {
    id: 'MND-GWALIOR',
    name: 'Gwalior Laxmiganj APMC Mandi',
    hindiName: 'ग्वालियर लक्ष्मीगंज कृषि उपज मंडी',
    punjabiName: 'ਗਵਾਲੀਅਰ ਲਕਸ਼ਮੀਗੰਜ ਮੰਡੀ',
    district: 'Gwalior',
    state: 'Madhya Pradesh',
    lat: 26.2183,
    lon: 78.1828,
    commodities: ['Wheat', 'Mustard', 'Potato', 'Barley'],
    primaryCrop: 'Wheat',
    crowdLevel: 'moderate',
    currentQueueLengthTractors: 32,
    estimatedWaitMinutes: 50,
    gatePassClearanceRatePerHour: 26,
    yardCapacityPct: 72,
    operatingHours: '07:30 AM - 07:00 PM',
    gateStatus: 'open',
    topBidPrice: 3040,
    modalPrice: 2820,
    mspPrice: 2425,
    activeBiddersCount: 46,
    biddingTrend: 'surging',
    priceChangeToday: 90,
    lastBidTimestamp: '4 मिनट पहले',
    topBuyerName: 'Vikas Goyal',
    verifiedBuyerCompany: 'Goyal Mega Food Park',
    helplinePhone: '0751-2423180',
    weighbridgeCount: 5,
  },
  {
    id: 'MND-GUNA',
    name: 'Guna Krishi Upaj Mandi',
    hindiName: 'गुना कृषि उपज मंडी समिति',
    punjabiName: 'ਗੁਨਾ ਅਨਾਜ ਮੰਡੀ',
    district: 'Guna',
    state: 'Madhya Pradesh',
    lat: 24.6475,
    lon: 77.3111,
    commodities: ['Coriander', 'Soybean', 'Wheat', 'Mustard'],
    primaryCrop: 'Coriander',
    crowdLevel: 'congested',
    currentQueueLengthTractors: 84,
    estimatedWaitMinutes: 165,
    gatePassClearanceRatePerHour: 24,
    yardCapacityPct: 94,
    operatingHours: '08:00 AM - 06:00 PM',
    gateStatus: 'filling_fast',
    topBidPrice: 7650,
    modalPrice: 7200,
    mspPrice: 6500,
    activeBiddersCount: 38,
    biddingTrend: 'surging',
    priceChangeToday: 140,
    lastBidTimestamp: '3 मिनट पहले',
    topBuyerName: 'Deepak Jain',
    verifiedBuyerCompany: 'Guna Spice Traders & Exporters',
    helplinePhone: '07542-252410',
    weighbridgeCount: 4,
  },
  {
    id: 'MND-SHEOPUR',
    name: 'Sheopur Grain Mandi Yard',
    hindiName: 'श्योपुर कृषि उपज मंडी',
    punjabiName: 'ਸ਼ਿਓਪੁਰ ਅਨਾਜ ਮੰਡੀ',
    district: 'Sheopur',
    state: 'Madhya Pradesh',
    lat: 25.6653,
    lon: 76.6961,
    commodities: ['Mustard', 'Bajra', 'Wheat', 'Sesame'],
    primaryCrop: 'Mustard',
    crowdLevel: 'low',
    currentQueueLengthTractors: 8,
    estimatedWaitMinutes: 20,
    gatePassClearanceRatePerHour: 16,
    yardCapacityPct: 38,
    operatingHours: '09:00 AM - 05:30 PM',
    gateStatus: 'open',
    topBidPrice: 6220,
    modalPrice: 6080,
    mspPrice: 5950,
    activeBiddersCount: 18,
    biddingTrend: 'steady',
    priceChangeToday: 40,
    lastBidTimestamp: '12 मिनट पहले',
    topBuyerName: 'Kailash Meena',
    verifiedBuyerCompany: 'Chambal Agro Commodities',
    helplinePhone: '07530-222315',
    weighbridgeCount: 2,
  },
  {
    id: 'MND-KOTA',
    name: 'Bhamashah Mandi Kota',
    hindiName: 'भामाशाह कृषि उपज मंडी (कोटा)',
    punjabiName: 'ਭਾਮਾਸ਼ਾਹ ਮੰਡੀ ਕੋਟਾ',
    district: 'Kota',
    state: 'Rajasthan',
    lat: 25.1825,
    lon: 75.8398,
    commodities: ['Soybean', 'Coriander', 'Wheat', 'Mustard', 'Paddy'],
    primaryCrop: 'Coriander',
    crowdLevel: 'high',
    currentQueueLengthTractors: 74,
    estimatedWaitMinutes: 130,
    gatePassClearanceRatePerHour: 32,
    yardCapacityPct: 88,
    operatingHours: '07:00 AM - 07:00 PM',
    gateStatus: 'filling_fast',
    topBidPrice: 7920,
    modalPrice: 7400,
    mspPrice: 6500,
    activeBiddersCount: 62,
    biddingTrend: 'surging',
    priceChangeToday: 210,
    lastBidTimestamp: '2 मिनट पहले',
    topBuyerName: 'Manoj Khandelwal',
    verifiedBuyerCompany: 'Hadoti Agro Export Consortium',
    helplinePhone: '0744-2481020',
    weighbridgeCount: 6,
  },
  {
    id: 'MND-KHANNA',
    name: 'Khanna APMC Grain Market',
    hindiName: 'खन्ना अनाज मंडी (एशिया की सबसे बड़ी मंडी)',
    punjabiName: 'ਖੰਨਾ ਅਨਾਜ ਮੰਡੀ (ਏਸ਼ੀਆ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਮੰਡੀ)',
    district: 'Ludhiana',
    state: 'Punjab',
    lat: 30.7022,
    lon: 76.2173,
    commodities: ['Wheat', 'Paddy', 'Maize', 'Basmati'],
    primaryCrop: 'Wheat',
    crowdLevel: 'moderate',
    currentQueueLengthTractors: 42,
    estimatedWaitMinutes: 55,
    gatePassClearanceRatePerHour: 38,
    yardCapacityPct: 65,
    operatingHours: '07:00 AM - 08:00 PM',
    gateStatus: 'open',
    topBidPrice: 2620,
    modalPrice: 2520,
    mspPrice: 2425,
    activeBiddersCount: 78,
    biddingTrend: 'steady',
    priceChangeToday: 15,
    lastBidTimestamp: '1 मिनट पहले',
    topBuyerName: 'Harbhajan Singh & Sons',
    verifiedBuyerCompany: 'Punjab State Warehousing & Private Flour Mills',
    helplinePhone: '01628-220140',
    weighbridgeCount: 8,
  },
  {
    id: 'MND-AMRITSAR',
    name: 'Amritsar Bhagtanwala Grain Market',
    hindiName: 'अमृतसर भगतांवाला दाना मंडी',
    punjabiName: 'ਅੰਮ੍ਰਿਤਸਰ ਭਗਤਾਂਵਾਲਾ ਦਾਣਾ ਮੰਡੀ',
    district: 'Amritsar',
    state: 'Punjab',
    lat: 31.6340,
    lon: 74.8723,
    commodities: ['Basmati', 'Paddy', 'Wheat'],
    primaryCrop: 'Basmati',
    crowdLevel: 'low',
    currentQueueLengthTractors: 14,
    estimatedWaitMinutes: 25,
    gatePassClearanceRatePerHour: 22,
    yardCapacityPct: 40,
    operatingHours: '08:00 AM - 06:00 PM',
    gateStatus: 'open',
    topBidPrice: 4680,
    modalPrice: 4350,
    mspPrice: 3800,
    activeBiddersCount: 42,
    biddingTrend: 'surging',
    priceChangeToday: 180,
    lastBidTimestamp: '4 मिनट पहले',
    topBuyerName: 'Rajinder Rice Mills Ltd',
    verifiedBuyerCompany: 'Basmati Golden Export House',
    helplinePhone: '0183-2582190',
    weighbridgeCount: 4,
  },
];

// Calculate Haversine distance in KM
function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

interface MandiCrowdMapProps {
  language: SupportedLanguage;
  userDistrict?: DistrictLocation;
  onSelectMandiForSlot?: (mandiName: string, cropName: string) => void;
}

export const MandiCrowdMap: React.FC<MandiCrowdMapProps> = ({
  language,
  userDistrict = {
    name: 'शिवपुरी (Shivpuri)',
    state: 'Madhya Pradesh',
    lat: 25.4358,
    lon: 77.6635,
  },
  onSelectMandiForSlot,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);

  // Filters & State
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [crowdFilter, setCrowdFilter] = useState<'all' | 'low' | 'moderate' | 'high'>('all');
  const [activeMapLayer, setActiveMapLayer] = useState<'streets' | 'satellite'>('streets');
  const [selectedMandiId, setSelectedMandiId] = useState<string | null>('MND-KOLARAS');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadTonnage, setLoadTonnage] = useState<number>(50); // 50 Quintals tractor trolly standard
  const [viewMode, setViewMode] = useState<'split' | 'fullscreen'>('split');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // User coordinates
  const userLat = userDistrict?.lat || 25.4358;
  const userLon = userDistrict?.lon || 77.6635;

  // Process and rank Mandis by Smart Selling Efficiency
  const analyzedMandis = useMemo(() => {
    return REGIONAL_MANDIS.map((mandi) => {
      const distanceKm = calculateHaversineKm(userLat, userLon, mandi.lat, mandi.lon);
      
      // Rural Tractor Haulage Cost model: ~₹2.8 per Quintal per 10 KM (or ₹0.28/qtl/km)
      const transportCostPerQuintal = Math.round(distanceKm * 0.28);
      const totalTransportCost = transportCostPerQuintal * loadTonnage;

      // Gross value from highest bid
      const grossRevenue = mandi.topBidPrice * loadTonnage;

      // Net realized payout after deducting transport expenses
      const netRealizedRevenue = grossRevenue - totalTransportCost;

      // Opportunity cost penalty for wait time (idling tractor fuel + lost time)
      // 1 hour wait ~ ₹200 opportunity cost
      const waitTimeOpportunityCost = Math.round((mandi.estimatedWaitMinutes / 60) * 250);
      const effectiveNetProfit = netRealizedRevenue - waitTimeOpportunityCost;

      // Efficiency Score: 1 - 100
      // Factors: Price Premium above MSP (40%), Low Wait Time (35%), Distance / Low Haulage (25%)
      const pricePremium = Math.max(0, mandi.topBidPrice - mandi.mspPrice);
      const priceScore = Math.min(100, (pricePremium / 600) * 100);
      const waitScore = Math.max(0, 100 - mandi.estimatedWaitMinutes * 0.55);
      const distanceScore = Math.max(0, 100 - distanceKm * 0.5);

      const efficiencyScore = Math.round(priceScore * 0.45 + waitScore * 0.35 + distanceScore * 0.2);

      return {
        ...mandi,
        distanceKm,
        transportCostPerQuintal,
        totalTransportCost,
        grossRevenue,
        netRealizedRevenue,
        effectiveNetProfit,
        efficiencyScore,
        premiumAboveMsp: mandi.topBidPrice - mandi.mspPrice,
      };
    }).sort((a, b) => b.efficiencyScore - a.efficiencyScore);
  }, [userLat, userLon, loadTonnage]);

  // Filtered list
  const filteredMandis = useMemo(() => {
    return analyzedMandis.filter((m) => {
      const matchesCrop = selectedCrop === 'All' || m.commodities.includes(selectedCrop);
      const matchesCrowd =
        crowdFilter === 'all' ||
        (crowdFilter === 'low' && m.crowdLevel === 'low') ||
        (crowdFilter === 'moderate' && m.crowdLevel === 'moderate') ||
        (crowdFilter === 'high' && (m.crowdLevel === 'high' || m.crowdLevel === 'congested'));
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.hindiName.includes(searchQuery) ||
        m.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCrop && matchesCrowd && matchesSearch;
    });
  }, [analyzedMandis, selectedCrop, crowdFilter, searchQuery]);

  // Recommended #1 most efficient selling location
  const topRecommendedMandi = analyzedMandis[0];

  // Currently inspected mandi
  const activeMandi = analyzedMandis.find((m) => m.id === selectedMandiId) || topRecommendedMandi;

  // Initialize and Update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userLat, userLon],
        zoom: 9,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Base layers
      const osmStreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors | Agmarknet eNAM Intelligence',
      });

      const satellite = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{n}',
        {
          maxZoom: 18,
          attribution: 'Tiles &copy; Esri GIS',
        }
      );

      if (activeMapLayer === 'satellite') {
        satellite.addTo(map);
      } else {
        osmStreets.addTo(map);
      }

      // Marker group
      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;

      // Add user location marker with pulsing dot
      const userIcon = L.divIcon({
        className: 'custom-user-icon',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute w-8 h-8 rounded-full bg-emerald-500/30 animate-ping"></span>
            <div class="w-5 h-5 rounded-full bg-emerald-700 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-black">
              📍
            </div>
            <div class="absolute -top-7 whitespace-nowrap bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-md">
              आपका खेत (Your Location)
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker([userLat, userLon], { icon: userIcon })
        .addTo(map)
        .bindPopup(
          `<b>${language === 'hi' ? 'आपका वर्तमान क्षेत्र' : 'Current Farm Origin'}</b><br/>${userDistrict.name}`
        );

      // Coverage radius circle (50km)
      const circle = L.circle([userLat, userLon], {
        radius: 50000,
        color: '#059669',
        fillColor: '#10b981',
        fillOpacity: 0.05,
        weight: 1.5,
        dashArray: '4, 4',
      }).addTo(map);
      radiusCircleRef.current = circle;

      mapInstanceRef.current = map;
    }
  }, [userLat, userLon]);

  // Sync Base Layer Toggles
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (activeMapLayer === 'satellite') {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{n}',
        { maxZoom: 18, attribution: 'Tiles &copy; Esri' }
      ).addTo(map);
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap | Agmarknet eNAM',
      }).addTo(map);
    }
  }, [activeMapLayer]);

  // Update Mandi markers on the map
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    filteredMandis.forEach((mandi) => {
      const isSelected = mandi.id === selectedMandiId;
      const isRecommended = mandi.id === topRecommendedMandi.id;

      // Color coding by crowd level
      let crowdColorBg = 'bg-emerald-600';
      let crowdBorderColor = 'border-emerald-700';
      let crowdBadge = '🟢 15m';

      if (mandi.crowdLevel === 'low') {
        crowdColorBg = 'bg-emerald-600';
        crowdBorderColor = 'border-emerald-800';
        crowdBadge = `🟢 ${mandi.estimatedWaitMinutes}m`;
      } else if (mandi.crowdLevel === 'moderate') {
        crowdColorBg = 'bg-amber-500';
        crowdBorderColor = 'border-amber-700';
        crowdBadge = `🟡 ${mandi.estimatedWaitMinutes}m`;
      } else {
        crowdColorBg = 'bg-rose-600';
        crowdBorderColor = 'border-rose-800';
        crowdBadge = `🔴 ${mandi.estimatedWaitMinutes}m`;
      }

      // Marker HTML
      const markerHtml = `
        <div class="relative cursor-pointer transition-transform duration-200 transform ${
          isSelected ? 'scale-115 z-50' : 'hover:scale-105'
        }">
          ${
            isRecommended
              ? `<div class="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-400 border border-amber-500 text-stone-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-md whitespace-nowrap flex items-center gap-1 animate-bounce">
                  ⭐ सबसे अनुशंसित
                 </div>`
              : ''
          }
          <div class="flex flex-col items-center">
            <!-- Price Floating Tag -->
            <div class="bg-stone-900/95 text-white border ${
              isSelected ? 'border-amber-400 ring-2 ring-amber-300' : 'border-stone-700'
            } px-2 py-0.5 rounded-lg shadow-lg flex items-center gap-1 text-[10px] font-mono font-black whitespace-nowrap">
              <span class="text-emerald-400">₹${mandi.topBidPrice}</span>
              <span class="text-stone-400 text-[9px]">•</span>
              <span class="text-[9px] font-bold">${crowdBadge}</span>
            </div>

            <!-- Pin Stem & Head -->
            <div class="w-8 h-8 rounded-full ${crowdColorBg} border-2 border-white shadow-xl flex items-center justify-center text-white mt-0.5">
              <span class="text-xs font-black">${mandi.commodities[0] === 'Mustard' ? '🌻' : mandi.commodities[0] === 'Soybean' ? '🌱' : '🌾'}</span>
            </div>
            <div class="w-1.5 h-2 bg-stone-800 -mt-0.5"></div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-mandi-pin',
        html: markerHtml,
        iconSize: [80, 50],
        iconAnchor: [40, 48],
      });

      const marker = L.marker([mandi.lat, mandi.lon], { icon: customIcon });

      marker.on('click', () => {
        setSelectedMandiId(mandi.id);
        mapInstanceRef.current?.flyTo([mandi.lat, mandi.lon], 11, { duration: 1.2 });
      });

      markersGroupRef.current?.addLayer(marker);
    });
  }, [filteredMandis, selectedMandiId, topRecommendedMandi.id]);

  // Handle refresh action
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  // Fly map to active mandi
  const handleFocusMandi = (mandi: (typeof analyzedMandis)[0]) => {
    setSelectedMandiId(mandi.id);
    mapInstanceRef.current?.flyTo([mandi.lat, mandi.lon], 11, { duration: 1.2 });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2 shadow-2xs">
              <Navigation className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {language === 'hi'
                  ? 'लाइव मंडी मानचित्र व कतार गति • eNAM / Agmarknet'
                  : 'Live Mandi Geo-Grid & Weighbridge Queue Velocity'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2.5">
              <span>
                {language === 'hi'
                  ? 'क्षेत्रीय मंडी मानचित्र, लाइव भीड़ व सक्रिय बोली'
                  : 'Regional Mandi Map with Real-Time Crowds & Live Bids'}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
              {language === 'hi'
                ? 'तुलाई कांटों (Weighbridge) पर ट्रैक्टरों की वर्तमान कतार, प्रवेश प्रतीक्षा समय और मिलर्स की सक्रिय बोली देखकर तय करें कि उपज किस मंडी में बेचना सबसे अधिक लाभदायक होगा।'
                : 'Evaluate real-time gate pass wait times, tractor queues, and highest verified buyer bids to choose the most profitable selling terminal.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
            <button
              onClick={handleRefresh}
              className="px-3.5 py-2 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 rounded-xl transition flex items-center gap-1.5 text-xs font-bold border border-stone-200 cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{language === 'hi' ? 'ताज़ा करें' : 'Live Sync'}</span>
            </button>

            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo([userLat, userLon], 9, { duration: 1.2 });
                }
              }}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl transition flex items-center gap-1.5 text-xs font-bold border border-emerald-300 cursor-pointer shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'hi' ? 'मेरा खेत केंद्र' : 'Recenter Farm'}</span>
            </button>
          </div>
        </div>

        {/* AI Guide Recommendation Callout Box */}
        {topRecommendedMandi && (
          <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-stone-950 px-2.5 py-0.5 rounded-full text-xs font-black shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {language === 'hi'
                      ? 'AI किसान मार्गदर्शन: सर्वाधिक लाभदायक मंडी'
                      : 'AI Smart Seller Recommendation'}
                  </span>
                </span>
                <span className="text-xs font-bold text-emerald-900">
                  {topRecommendedMandi.hindiName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {language === 'hi' ? (
                  <>
                    <strong className="text-stone-900">{topRecommendedMandi.hindiName}</strong> में केवल{' '}
                    <strong className="text-emerald-800">{topRecommendedMandi.estimatedWaitMinutes} मिनट कतार</strong> है और
                    उच्चतम बोली <strong className="text-emerald-800">₹{topRecommendedMandi.topBidPrice}/कुंतल</strong> (MSP से +₹
                    {topRecommendedMandi.premiumAboveMsp} अधिक) चल रही है। {loadTonnage} कुंतल माल पर परिवहन खर्च काटकर शुद्ध बचत{' '}
                    <strong className="text-emerald-800 font-mono">
                      ₹{topRecommendedMandi.netRealizedRevenue.toLocaleString('en-IN')}
                    </strong>{' '}
                    होगी!
                  </>
                ) : (
                  <>
                    <strong className="text-stone-900">{topRecommendedMandi.name}</strong> offers the best net payout of{' '}
                    <strong className="text-emerald-800 font-mono">
                      ₹{topRecommendedMandi.netRealizedRevenue.toLocaleString('en-IN')}
                    </strong>{' '}
                    with merely a <strong className="text-emerald-800">{topRecommendedMandi.estimatedWaitMinutes}m queue</strong> and
                    top bid of ₹{topRecommendedMandi.topBidPrice}/Qtl.
                  </>
                )}
              </p>
            </div>

            <button
              onClick={() => handleFocusMandi(topRecommendedMandi)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer transition"
            >
              <span>{language === 'hi' ? 'यह मंडी चुनें व रूट देखें' : 'Focus Recommendation'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter Controls: Crop selector, Crowd Filter, Tractor Load Calibrator */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Crop Filter */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              {language === 'hi' ? 'फसल चयन' : 'Select Crop'}
            </span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full text-xs font-bold bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-800 cursor-pointer focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="All">{language === 'hi' ? '🌾 सभी फसलें (All Crops)' : 'All Crops'}</option>
              <option value="Wheat">गेहूं (Wheat)</option>
              <option value="Mustard">सरसों (Mustard)</option>
              <option value="Soybean">सोयाबीन (Soybean)</option>
              <option value="Basmati">बासमती (Basmati Paddy)</option>
              <option value="Coriander">धनिया (Coriander)</option>
              <option value="Groundnut">मूंगफली (Groundnut)</option>
            </select>
          </div>

          {/* Crowd Filter */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              {language === 'hi' ? 'भीड़ व कतार स्तर' : 'Crowd Congestion'}
            </span>
            <select
              value={crowdFilter}
              onChange={(e) => setCrowdFilter(e.target.value as any)}
              className="w-full text-xs font-bold bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-800 cursor-pointer focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="all">{language === 'hi' ? 'सभी कतारें (All Queues)' : 'All Queues'}</option>
              <option value="low">🟢 त्वरित प्रवेश (&lt; 30 मिनट)</option>
              <option value="moderate">🟡 मध्यम भीड़ (30-60 मिनट)</option>
              <option value="high">🔴 भारी भीड़ (&gt; 60 मिनट)</option>
            </select>
          </div>

          {/* Load Tonnage (Quintals) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              <span>{language === 'hi' ? 'ट्रॉली भार (क्विंटल)' : 'Tractor Load (Qtl)'}</span>
              <span className="text-emerald-800 font-mono font-black">{loadTonnage} Qtl</span>
            </div>
            <input
              type="range"
              min={20}
              max={120}
              step={5}
              value={loadTonnage}
              onChange={(e) => setLoadTonnage(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer mt-1"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-bold">
              <span>20 Qtl (छोटा)</span>
              <span>50 Qtl (मानक)</span>
              <span>120 Qtl (डबल)</span>
            </div>
          </div>

          {/* Map Layer Toggle & Search */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              {language === 'hi' ? 'मानचित्र शैली (Tiles)' : 'Map Layer'}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setActiveMapLayer('streets')}
                className={`py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                  activeMapLayer === 'streets'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>सड़क (Street)</span>
              </button>
              <button
                onClick={() => setActiveMapLayer('satellite')}
                className={`py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                  activeMapLayer === 'satellite'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>उपग्रह (Satellite)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Leaflet Map Container & Dynamic Mandi Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Leaflet Map Container (7 Cols on desktop) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm flex flex-col relative h-[520px] sm:h-[600px]">
          {/* Top Over-Map Live Status Bar */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none gap-2">
            <div className="bg-stone-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-stone-700 text-xs font-bold shadow-lg flex items-center gap-2 pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{filteredMandis.length} क्षेत्रीय मंडियां सक्रिय</span>
              <span className="text-stone-400">|</span>
              <span className="text-amber-300 text-[11px]">लाइव तुलाई व भाव चालू</span>
            </div>

            {/* Quick Legend Pills */}
            <div className="hidden sm:flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-stone-200 text-[10px] font-extrabold shadow-sm pointer-events-auto">
              <span className="flex items-center gap-1 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                &lt;30m
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                30-60m
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-rose-800">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                &gt;60m
              </span>
            </div>
          </div>

          {/* Leaflet Map Target Element */}
          <div ref={mapContainerRef} className="w-full h-full relative z-10" />

          {/* Bottom Floating Mandi Quick Scroll Cards */}
          <div className="absolute bottom-3 left-3 right-14 z-20 overflow-x-auto pb-1 flex items-center gap-2 pointer-events-auto no-scrollbar">
            {filteredMandis.slice(0, 5).map((m) => {
              const isSelected = m.id === selectedMandiId;
              return (
                <button
                  key={m.id}
                  onClick={() => handleFocusMandi(m)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition flex items-center gap-2 shadow-md cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-900 ring-2 ring-emerald-400'
                      : 'bg-white/95 backdrop-blur-md text-stone-800 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <span className="truncate max-w-[120px]">{m.hindiName.split(' ')[0]}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${isSelected ? 'bg-emerald-900 text-amber-300' : 'bg-emerald-100 text-emerald-900'}`}>
                    ₹{m.topBidPrice}
                  </span>
                  <span className="text-[10px]">
                    {m.crowdLevel === 'low' ? '🟢' : m.crowdLevel === 'moderate' ? '🟡' : '🔴'} {m.estimatedWaitMinutes}m
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Mandi Full Intelligence & Profit Breakdown (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {activeMandi ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-5 sm:p-6 shadow-sm space-y-5">
              {/* Card Header with Badges */}
              <div className="flex items-start justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    {activeMandi.id === topRecommendedMandi.id && (
                      <span className="bg-amber-400 text-stone-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-2xs">
                        ⭐ सबसे अनुशंसित मंडी
                      </span>
                    )}
                    <span className="bg-emerald-100 text-emerald-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-300">
                      {activeMandi.district} ({activeMandi.state})
                    </span>
                    <span className="bg-stone-100 text-stone-700 font-bold text-[10px] px-2 py-0.5 rounded-full">
                      दूरी: {activeMandi.distanceKm} km
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-stone-950 tracking-tight">
                    {language === 'hi' ? activeMandi.hindiName : activeMandi.name}
                  </h4>
                  <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>कार्य समय: {activeMandi.operatingHours}</span>
                  </div>
                </div>

                {/* Smart Efficiency Score Gauge */}
                <div className="text-right shrink-0 bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
                  <span className="text-[10px] font-bold text-stone-500 uppercase block">दक्षता स्कोर</span>
                  <div className="flex items-baseline justify-end gap-0.5">
                    <span className="text-2xl font-black text-emerald-800 font-mono">
                      {activeMandi.efficiencyScore}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400">/100</span>
                  </div>
                </div>
              </div>

              {/* Live Crowd & Weighbridge Queue Status */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-stone-800 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>तुलाई कांटा (Weighbridge) व कतार स्थिति</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                      activeMandi.crowdLevel === 'low'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : activeMandi.crowdLevel === 'moderate'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-rose-100 text-rose-900 border border-rose-300'
                    }`}
                  >
                    {activeMandi.crowdLevel === 'low'
                      ? '🟢 त्वरित (Low Wait)'
                      : activeMandi.crowdLevel === 'moderate'
                      ? '🟡 मध्यम कतार'
                      : '🔴 भारी भीड़ (High)'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-bold block">प्रतीक्षा समय</span>
                    <span className="text-lg font-black text-stone-900 font-mono">
                      {activeMandi.estimatedWaitMinutes}
                    </span>
                    <span className="text-[10px] text-stone-500 font-bold block">मिनट</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-bold block">कतार में ट्रैक्टर</span>
                    <span className="text-lg font-black text-stone-900 font-mono">
                      {activeMandi.currentQueueLengthTractors}
                    </span>
                    <span className="text-[10px] text-stone-500 font-bold block">वाहन</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-bold block">गेट पास रफ्तार</span>
                    <span className="text-lg font-black text-emerald-800 font-mono">
                      {activeMandi.gatePassClearanceRatePerHour}
                    </span>
                    <span className="text-[10px] text-stone-500 font-bold block">वाहन/घंटा</span>
                  </div>
                </div>

                {/* Yard Capacity Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-stone-600">
                    <span>प्रांगण भंडारण क्षमता (Yard Fill):</span>
                    <span className="font-mono">{activeMandi.yardCapacityPct}% भरा हुआ</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        activeMandi.yardCapacityPct > 80
                          ? 'bg-rose-500'
                          : activeMandi.yardCapacityPct > 55
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${activeMandi.yardCapacityPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Live Bidding & Price Signal */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>सक्रिय मंडी बोली व क्रेता संकेत (Live Bidding)</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded-full">
                    {activeMandi.activeBiddersCount} मिलर्स बोली लगा रहे हैं
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-emerald-900 uppercase block">उच्चतम सक्रिय बोली</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-black text-emerald-950 font-mono">
                        ₹{activeMandi.topBidPrice}
                      </span>
                      <span className="text-xs font-bold text-emerald-800">/कुंतल</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-1">
                      MSP से +₹{activeMandi.premiumAboveMsp} अधिक (+{Math.round((activeMandi.premiumAboveMsp / activeMandi.mspPrice) * 100)}%)
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">मॉडल भाव व ट्रेंड</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-black text-stone-800 font-mono">
                        ₹{activeMandi.modalPrice}
                      </span>
                      <span className="text-xs font-semibold text-stone-600">/कुंतल</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>आज +₹{activeMandi.priceChangeToday} बढ़ा</span>
                    </div>
                  </div>
                </div>

                {/* Top Bidder / Buyer Details */}
                <div className="bg-white/80 p-2.5 rounded-xl text-xs space-y-1 border border-emerald-100">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">शीर्ष क्रेता (Top Buyer):</span>
                    <span className="font-extrabold text-stone-900">{activeMandi.topBuyerName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">फर्म / कंपनी:</span>
                    <span className="font-bold text-emerald-900 truncate max-w-[180px]">
                      {activeMandi.verifiedBuyerCompany}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>अंतिम बोली का समय:</span>
                    <span className="font-bold text-stone-700">{activeMandi.lastBidTimestamp}</span>
                  </div>
                </div>
              </div>

              {/* Economic Calculation Breakdown: {loadTonnage} Quintals */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2.5 text-xs">
                <span className="font-extrabold text-stone-900 block">
                  💰 {loadTonnage} क्विंटल उपज पर वित्तीय गणना (Financial Net):
                </span>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-stone-600">
                    <span>सकल उपज मूल्य ({loadTonnage} Qtl × ₹{activeMandi.topBidPrice}):</span>
                    <span className="font-mono font-bold text-stone-900">
                      ₹{activeMandi.grossRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-amber-700">
                    <span>अनुमानित ट्रैक्टर भाड़ा ({activeMandi.distanceKm} किमी):</span>
                    <span className="font-mono font-bold">
                      -₹{activeMandi.totalTransportCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-stone-200 flex justify-between font-black text-emerald-950 text-sm">
                    <span>शुद्ध देय भुगतान (Net Payout):</span>
                    <span className="font-mono text-emerald-800">
                      ₹{activeMandi.netRealizedRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {onSelectMandiForSlot ? (
                  <button
                    onClick={() => onSelectMandiForSlot(activeMandi.name, activeMandi.primaryCrop)}
                    className="col-span-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>इस मंडी में डिजिटल गेट पास / स्लॉट बुक करें</span>
                  </button>
                ) : (
                  <a
                    href="#procurement"
                    className="col-span-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>इस मंडी में डिजिटल गेट पास स्लॉट बुक करें</span>
                  </a>
                )}

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${activeMandi.lat},${activeMandi.lon}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-stone-300 transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-stone-600" />
                  <span>गूगल मैप रूट</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>

                <a
                  href={`tel:${activeMandi.helplinePhone}`}
                  className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-stone-300 transition"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                  <span>कंट्रोल रूम कॉल</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 rounded-3xl p-8 text-center text-stone-500 border border-stone-200">
              मानचित्र पर किसी भी मंडी पर क्लिक करके कतार और भाव विवरण देखें।
            </div>
          )}
        </div>
      </div>

      {/* Comparative Mandi Efficiency Table */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div>
            <h4 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>
                {language === 'hi'
                  ? 'सभी क्षेत्रीय मंडियों का तुलनात्मक लाभ विश्लेषण'
                  : 'Comparative Regional Mandi Payout & Efficiency Matrix'}
              </span>
            </h4>
            <p className="text-xs text-stone-500">
              {language === 'hi'
                ? `आपके खेत से दूरी, भाड़ा खर्च, कतार प्रतीक्षा और शुद्ध मुनाफे के आधार पर रैंकिंग (${loadTonnage} क्विंटल भार)`
                : `Ranked by net realization factoring distance haulage, gate wait time, and live bidding prices.`}
            </p>
          </div>
          <span className="text-xs font-bold text-stone-500 self-start sm:self-auto">
            {filteredMandis.length} मंडियां उपलब्ध
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase bg-stone-50/70">
                <th className="p-3">मंडी का नाम</th>
                <th className="p-3">दूरी (किमी)</th>
                <th className="p-3">भीड़ / प्रतीक्षा</th>
                <th className="p-3">उच्चतम बोली</th>
                <th className="p-3">अनुमानित भाड़ा</th>
                <th className="p-3 text-emerald-900">शुद्ध भुगतान ({loadTonnage}Q)</th>
                <th className="p-3 text-center">दक्षता</th>
                <th className="p-3 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredMandis.map((m, idx) => {
                const isTop = m.id === topRecommendedMandi.id;
                const isSelected = m.id === selectedMandiId;
                return (
                  <tr
                    key={m.id}
                    onClick={() => handleFocusMandi(m)}
                    className={`cursor-pointer transition hover:bg-stone-50 ${
                      isSelected ? 'bg-emerald-50/70 font-semibold' : ''
                    }`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {isTop && <span className="text-amber-500 font-bold" title="सर्वाधिक अनुशंसित">⭐</span>}
                        <div>
                          <span className="font-extrabold text-stone-900 block">{m.hindiName}</span>
                          <span className="text-[10px] text-stone-400">{m.district}, {m.state}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono font-bold text-stone-700">{m.distanceKm} km</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          m.crowdLevel === 'low'
                            ? 'bg-emerald-100 text-emerald-900'
                            : m.crowdLevel === 'moderate'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {m.crowdLevel === 'low' ? '🟢' : m.crowdLevel === 'moderate' ? '🟡' : '🔴'}{' '}
                        {m.estimatedWaitMinutes}m ({m.currentQueueLengthTractors} वाहन)
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-mono font-black text-emerald-800 text-sm">₹{m.topBidPrice}</span>
                      <span className="text-[10px] text-stone-400 block">MSP: ₹{m.mspPrice}</span>
                    </td>
                    <td className="p-3 font-mono text-amber-700">₹{m.totalTransportCost}</td>
                    <td className="p-3 font-mono font-black text-emerald-950 text-sm">
                      ₹{m.netRealizedRevenue.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-center">
                      <span className="font-mono font-extrabold text-xs px-2 py-1 rounded-lg bg-stone-100 text-stone-800">
                        {m.efficiencyScore}/100
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFocusMandi(m);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-700 hover:text-white text-stone-700 font-bold text-xs transition cursor-pointer"
                      >
                        मैप पर देखें
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
