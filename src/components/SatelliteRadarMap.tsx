import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, MapPin, Radio, Compass, Droplets, Sun, Wind } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface SatelliteRadarMapProps {
  lat: number;
  lon: number;
  locationName: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  language: SupportedLanguage;
}

export const SatelliteRadarMap: React.FC<SatelliteRadarMapProps> = ({
  lat,
  lon,
  locationName,
  temperature,
  humidity,
  windSpeed,
  language,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [activeLayer, setActiveLayer] = useState<'satellite' | 'precipitation' | 'moisture'>('precipitation');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [lat, lon],
      zoom: 9,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // OpenStreetMap standard base
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    });

    // Satellite imagery base
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{n}',
      {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      }
    );

    // Precipitation Radar Layer (RainViewer or Open-Meteo tile simulation)
    const precipitationOverlay = L.tileLayer(
      'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=a58ac22116d9ec6162c22e0f8203be9e',
      {
        opacity: 0.7,
        attribution: '&copy; OpenWeather Radar',
      }
    );

    if (activeLayer === 'satellite') {
      satelliteLayer.addTo(map);
    } else {
      osmLayer.addTo(map);
      if (activeLayer === 'precipitation') {
        precipitationOverlay.addTo(map);
      }
    }

    // Custom Icon for Farm Telemetry
    const customIcon = L.divIcon({
      className: 'custom-farm-pin',
      html: `
        <div style="
          background: #047857;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          font-weight: bold;
          font-size: 14px;
        ">
          🌾
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; padding: 4px;">
        <strong style="color: #047857; font-size: 14px;">${locationName} Agro-Hub</strong><br/>
        <span style="color: #475569;">Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}</span><br/>
        <hr style="margin: 6px 0; border: none; border-top: 1px solid #e2e8f0;"/>
        <div>🌡️ <b>${temperature}°C</b> • 💧 <b>${humidity}% RH</b></div>
        <div>💨 <b>${windSpeed} km/h</b> (Optimal Spray Conditions)</div>
      </div>
    `);

    markerRef.current = marker;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lon, activeLayer, locationName, temperature, humidity, windSpeed]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {language === 'hi'
                ? 'उपग्रह राडार एवं कृषि मौसम मानचित्र'
                : language === 'pa'
                ? 'ਸੈਟੇਲਾਈਟ ਰਾਡਾਰ ਅਤੇ ਮੌਸਮ ਨਕਸ਼ਾ'
                : 'Satellite Radar & Agromet Weather Grid'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {locationName} • Lat: {lat.toFixed(4)}, Lon: {lon.toFixed(4)}
          </p>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveLayer('precipitation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeLayer === 'precipitation'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'वर्षा राडार' : 'Rain Radar'}
          </button>
          <button
            onClick={() => setActiveLayer('satellite')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeLayer === 'satellite'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'उपग्रह दृश्य' : 'Satellite'}
          </button>
          <button
            onClick={() => setActiveLayer('moisture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeLayer === 'moisture'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'मानक मानचित्र' : 'Standard'}
          </button>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden border border-slate-200">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Telemetry Badge */}
        <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-xs border border-slate-200/80 rounded-xl p-3 shadow-md text-xs pointer-events-auto">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-slate-800">
              {language === 'hi' ? 'लाइव स्टेशन डेटा' : 'Live Station Feed'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-[11px] text-slate-600">
            <div>
              <span className="text-slate-400 block">Temp</span>
              <span className="font-bold text-slate-900">{temperature}°C</span>
            </div>
            <div>
              <span className="text-slate-400 block">Humidity</span>
              <span className="font-bold text-slate-900">{humidity}%</span>
            </div>
            <div>
              <span className="text-slate-400 block">Wind</span>
              <span className="font-bold text-slate-900">{windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
