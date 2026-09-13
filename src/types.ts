export type SupportedLanguage = 'en' | 'hi' | 'pa';

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  condition: string;
  conditionHi?: string;
  cloudCover: number;
  visibility: number;
  rainfallProbability: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  locationName: string;
  source: string;
  provider: string;
  apiKeyStatus?: string;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  agriAdvisory?: {
    sprayWindow: {
      status: string;
      badgeColor: string;
      text: string;
      textHi?: string;
    };
    irrigationAdvisory: {
      needed: boolean;
      badgeColor: string;
      text: string;
      textHi?: string;
    };
    thermalStress: {
      level: string;
      text: string;
      textHi?: string;
    };
  };
}

export interface HourlyForecast {
  time: string;
  temp: number;
  rainProb: number;
  windSpeed: number;
  condition: string;
  icon: string;
}

export interface DailyForecast {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  rainProb: number;
  humidity?: number;
  windSpeed: number;
  condition: string;
  conditionHi?: string;
  icon: string;
}

export interface DiseaseDiagnosis {
  diseaseName: string;
  cropAffected: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High';
  symptoms: string[];
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventionTips: string[];
  summary: string;
  analyzedAt?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
  isFallback?: boolean;
}

export interface StateExchangeItem {
  stateCode: string;
  stateName: string;
  primaryCrop: string;
  totalCultivatedAreaHectares: number;
  surplusStatus: string;
  statusType: 'surplus' | 'deficit';
  dataSharingStatus: string;
  lastTelemetrySync: string;
  satelliteSensor: string;
  soilHealthScore: number;
  openDataEndpoint: string;
}

export interface BuyerItem {
  id: string;
  buyerName: string;
  verified: boolean;
  rating: number;
  cropRequested: string;
  quantityDemanded: string;
  bidPricePerQuintal: number;
  governmentMsp: number;
  premiumAboveMsp: string;
  location: string;
  distanceKm: number;
  paymentTerms: string;
  contactPhone: string;
}

export interface LedgerEntry {
  id: string;
  date: string;
  type: 'expense' | 'income';
  category: string;
  amount: number;
  cropSeason?: string;
  notes: string;
}

// User Roles according to Krishi Setu & Kishan Mitra
export type UserRole = 'farmer' | 'retailer' | 'official' | 'mandi_officer' | 'buyer' | 'transporter';

// SIH26032: Procurement & Slot Booking
export interface ProcurementSchedule {
  id: string;
  mandiName: string;
  district: string;
  state: string;
  crop: string;
  date: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  totalCapacityQuintals: number;
  availableCapacityQuintals: number;
  mspRate: number;
  status: 'active' | 'full' | 'completed';
}

export interface ProcurementSlot {
  id: string;
  scheduleId: string;
  timeWindow: string; // e.g., '09:00 AM - 10:30 AM'
  capacityQuintals: number;
  bookedQuintals: number;
  remainingQuintals: number;
  status: 'available' | 'filling_fast' | 'booked';
}

export interface ProcurementBooking {
  id: string;
  bookingCode: string; // e.g. "KS-PB-9421"
  farmerName: string;
  farmerPhone: string;
  crop: string;
  mandiName: string;
  date: string;
  timeSlot: string;
  quantityQuintals: number;
  status: 'booked' | 'arrived' | 'completed' | 'missed';
  tokenQrUrl?: string;
  bookedAt: string;
  estimatedPayout: number;
}

// SIH26033: Marketplace Listings & Direct Bidding
export interface MarketplaceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  farmerPhone: string;
  cropName: string;
  variety: string;
  quantityQuintals: number;
  minBasePricePerQuintal: number;
  mandiMspReference: number;
  harvestDate: string;
  qualityGrade: 'A+' | 'A' | 'B';
  images: string[];
  status: 'active' | 'sold' | 'deactivated';
  createdAt: string;
  bidsCount: number;
  highestBidPrice?: number;
}

export interface MarketplaceBid {
  id: string;
  listingId: string;
  retailerId: string;
  retailerName: string;
  retailerCompany: string;
  retailerPhone: string;
  bidPricePerQuintal: number;
  offeredQuantityQuintals: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  distanceKm: number;
  paymentMode: 'Direct DBT' | 'Escrow' | 'Mandi Weighbridge';
}

export interface MarketplaceOrder {
  id: string;
  orderNumber: string;
  listingId: string;
  cropName: string;
  quantityQuintals: number;
  agreedPricePerQuintal: number;
  totalAmount: number;
  farmerName: string;
  farmerPhone: string;
  retailerName: string;
  retailerCompany: string;
  status: 'confirmed' | 'paid' | 'completed' | 'cancelled';
  paidAt?: string;
  paymentReference?: string;
  createdDate: string;
}

// Agmarknet / data.gov.in Mandi Price Item
export interface MandiPriceItem {
  id: string;
  state: string;
  district: string;
  marketName: string;
  commodity: string;
  variety: string;
  arrivalDate: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  mspRate: number;
  trend: 'up' | 'down' | 'stable';
  changeAmount: number;
}

// Ratings & Reviews
export interface OrderReview {
  id: string;
  orderId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: UserRole;
  revieweeName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  verifiedTransaction: boolean;
}

export interface DistrictLocation {
  name: string;
  state: string;
  lat: number;
  lon: number;
}

