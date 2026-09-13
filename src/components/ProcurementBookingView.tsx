import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  QrCode,
  Truck,
  Plus,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  Printer,
  X,
  Volume2
} from 'lucide-react';
import {
  ProcurementSchedule,
  ProcurementSlot,
  ProcurementBooking,
  SupportedLanguage,
  UserRole
} from '../types';
import { INITIAL_SCHEDULES, INITIAL_SLOTS, INITIAL_BOOKINGS } from '../mockData';
import { PageWorkflowExplainer } from './PageWorkflowExplainer';
import { FarmLoader } from './FarmLoader';
import {
  AnimatedWheatSymbol,
  AnimatedTractorSymbol,
  AnimatedSproutSymbol,
} from './AnimatedFarmingSymbols';

interface ProcurementBookingViewProps {
  language: SupportedLanguage;
  currentDistrict: string;
  userRole: UserRole;
}

export const ProcurementBookingView: React.FC<ProcurementBookingViewProps> = ({
  language,
  currentDistrict,
  userRole
}) => {
  const [schedules] = useState<ProcurementSchedule[]>(INITIAL_SCHEDULES);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('SCH-1');
  const [slots, setSlots] = useState<Record<string, ProcurementSlot[]>>(INITIAL_SLOTS);
  
  // Local storage for bookings so farmer actions persist
  const [bookings, setBookings] = useState<ProcurementBooking[]>(() => {
    const saved = localStorage.getItem('krishi_setu_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BOOKINGS;
      }
    }
    return INITIAL_BOOKINGS;
  });

  // Modal / Booking flow states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ProcurementSlot | null>(null);
  const [farmerName, setFarmerName] = useState('Rameshwar Singh Patel');
  const [farmerPhone, setFarmerPhone] = useState('9826144520');
  const [cropQuantity, setCropQuantity] = useState<number>(40);
  const [activePass, setActivePass] = useState<ProcurementBooking | null>(null);
  const [bookingSuccessNotice, setBookingSuccessNotice] = useState<string | null>(null);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('krishi_setu_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const activeSchedule = schedules.find((s) => s.id === selectedScheduleId) || schedules[0];
  const activeSlots = slots[activeSchedule.id] || [];

  const handleOpenBookingModal = (slot: ProcurementSlot) => {
    setSelectedSlot(slot);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !activeSchedule || isBookingSubmitting) return;

    setIsBookingSubmitting(true);

    setTimeout(() => {
      const estimatedPayout = cropQuantity * activeSchedule.mspRate;
      const randomCode = `KS-${activeSchedule.state === 'Punjab' ? 'PB' : 'MP'}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newBooking: ProcurementBooking = {
        id: `BK-${Date.now()}`,
        bookingCode: randomCode,
        farmerName: farmerName.trim() || 'किसान भाई',
        farmerPhone: `+91 ${farmerPhone.trim()}`,
        crop: activeSchedule.crop,
        mandiName: activeSchedule.mandiName,
        date: activeSchedule.date,
        timeSlot: selectedSlot.timeWindow,
        quantityQuintals: Number(cropQuantity),
        status: 'booked',
        bookedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        estimatedPayout,
      };

      // Update slot remaining capacity
      setSlots((prev) => {
        const currentList = prev[activeSchedule.id] || [];
        return {
          ...prev,
          [activeSchedule.id]: currentList.map((sl) => {
            if (sl.id === selectedSlot.id) {
              const updatedBooked = sl.bookedQuintals + Number(cropQuantity);
              const updatedRemaining = Math.max(0, sl.capacityQuintals - updatedBooked);
              return {
                ...sl,
                bookedQuintals: updatedBooked,
                remainingQuintals: updatedRemaining,
                status: updatedRemaining === 0 ? 'booked' : updatedRemaining < 100 ? 'filling_fast' : 'available',
              };
            }
            return sl;
          }),
        };
      });

      setBookings([newBooking, ...bookings]);
      setIsBookingSubmitting(false);
      setIsBookingModalOpen(false);
      setActivePass(newBooking);
      setBookingSuccessNotice(
        language === 'hi'
          ? `स्लॉट सफलतापूर्वक बुक हो गया! आपका टोकन नंबर ${randomCode} है।`
          : `Slot booked successfully! Your digital gate token is ${randomCode}.`
      );

      // Auto clear notification after 6 seconds
      setTimeout(() => setBookingSuccessNotice(null), 6000);
    }, 1200);
  };

  // Official role actions (e.g. mark arrived, complete weighment)
  const handleUpdateStatus = (bookingId: string, newStatus: 'arrived' | 'completed') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const speakTokenDetails = (b: ProcurementBooking) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const text = language === 'hi'
      ? `आपका टोकन नंबर है ${b.bookingCode}। मंडी: ${b.mandiName}। फसल: ${b.crop}, ${b.quantityQuintals} क्विंटल। समय: ${b.date}, ${b.timeSlot}। कृपया समय पर मंडी गेट पर पहुंचें।`
      : `Your token number is ${b.bookingCode}. Mandi: ${b.mandiName}. Crop: ${b.crop}, ${b.quantityQuintals} quintals. Slot: ${b.date}, ${b.timeSlot}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Visual Workflow Diagram Explainer */}
      <PageWorkflowExplainer pageType="procurement" language={language} />

      {/* Success Banner */}
      <AnimatePresence>
        {bookingSuccessNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-emerald-700 text-white shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-200 shrink-0" />
              <p className="font-bold text-sm sm:text-base">{bookingSuccessNotice}</p>
            </div>
            <button
              onClick={() => setBookingSuccessNotice(null)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mandi & Crop Selection Carousel */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-20 pointer-events-none hidden md:block">
          <AnimatedTractorSymbol size={48} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <AnimatedWheatSymbol size={24} />
              <span>
                {language === 'hi' ? 'सक्रिय सरकारी खरीद केंद्र (Mandis)' : 'Active Procurement Centers'}
              </span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'hi'
                ? 'अपनी मंडी और फसल चुनें और बिना लाइन में लगे अपनी सुविधानुसार समय स्लॉट बुक करें'
                : 'Select mandi and crop to book direct procurement time slot'}
            </p>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
            {schedules.length} {language === 'hi' ? 'मंडियां खुली हैं' : 'Active Yards'}
          </span>
        </div>

        {/* Schedule Selector Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {schedules.map((schedule) => {
            const isSelected = schedule.id === selectedScheduleId;
            return (
              <motion.button
                key={schedule.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedScheduleId(schedule.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-stone-200 hover:border-emerald-300 bg-white hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {schedule.crop}
                    </span>
                    <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      MSP: ₹{schedule.mspRate}/Qtl
                    </span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm line-clamp-1">{schedule.mandiName}</h4>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{schedule.district}, {schedule.state}</span>
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">
                    {language === 'hi' ? 'उपलब्ध कोटा:' : 'Available:'}
                  </span>
                  <span className="font-extrabold text-emerald-700">
                    {schedule.availableCapacityQuintals} / {schedule.totalCapacityQuintals} Qtl
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Grid for Active Schedule */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
          <div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
              {activeSchedule.crop} • {activeSchedule.mandiName}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-700" />
              <span>
                {language === 'hi' ? 'तारीख व समय स्लॉट का चयन करें' : 'Available Procurement Slots'}
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span className="text-stone-600">{language === 'hi' ? 'खुला है' : 'Available'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="text-stone-600">{language === 'hi' ? 'जल्द भर रहा है' : 'Filling Fast'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-stone-300 inline-block"></span>
              <span className="text-stone-600">{language === 'hi' ? 'पूर्ण' : 'Booked'}</span>
            </div>
          </div>
        </div>

        {/* Slot Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {activeSlots.map((slot) => {
            const isFull = slot.remainingQuintals <= 0;
            return (
              <motion.div
                key={slot.id}
                whileHover={!isFull ? { y: -3 } : {}}
                className={`rounded-xl p-4 border transition-all flex flex-col justify-between ${
                  isFull
                    ? 'bg-stone-100 border-stone-200 opacity-60 cursor-not-allowed'
                    : slot.status === 'filling_fast'
                    ? 'bg-amber-50/70 border-amber-300 hover:shadow-md'
                    : 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-500 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-stone-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      {slot.timeWindow}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600">
                    {language === 'hi' ? 'शेष क्षमता:' : 'Remaining:'}{' '}
                    <span className="font-bold text-stone-900">{slot.remainingQuintals} Qtl</span>
                  </p>
                  <p className="text-[11px] text-stone-400">
                    {language === 'hi' ? 'कुल क्षमता:' : 'Total:'} {slot.capacityQuintals} Qtl
                  </p>
                </div>

                <div className="mt-4">
                  {isFull ? (
                    <button
                      disabled
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-stone-200 text-stone-500 cursor-not-allowed text-center"
                    >
                      {language === 'hi' ? 'स्लॉट फुल' : 'Fully Booked'}
                    </button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOpenBookingModal(slot)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors ${
                        slot.status === 'filling_fast'
                          ? 'bg-amber-700 hover:bg-amber-800'
                          : 'bg-emerald-700 hover:bg-emerald-800'
                      }`}
                    >
                      <span>{language === 'hi' ? 'स्लॉट बुक करें' : 'Book Appointment'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Farmer's Bookings List & Digital Passes */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <span>
                {language === 'hi' ? 'मेरे बुक किए गए टोकन व पास' : 'My Mandi Appointments & Passes'}
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'hi'
                ? 'मंडी गेट पर डिजिटल क्यूआर कोड दिखाएं और बिना रुके सीधे तौल कांटा पर जाएं'
                : 'Show QR code token at the Mandi weighbridge gate for express entry'}
            </p>
          </div>

          <span className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
            {bookings.length} {language === 'hi' ? 'कुल नियुक्तियां' : 'Bookings'}
          </span>
        </div>

        <div className="space-y-3">
          {bookings.map((b) => {
            const statusConfig = {
              booked: {
                label: language === 'hi' ? 'बुक (पुष्ट)' : 'Confirmed / Booked',
                bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
              },
              arrived: {
                label: language === 'hi' ? 'गेट पर पहुंचा' : 'Arrived at Gate',
                bg: 'bg-blue-100 text-blue-800 border-blue-300',
              },
              completed: {
                label: language === 'hi' ? 'तुलाई पूर्ण (भुगतान जारी)' : 'Completed & Paid',
                bg: 'bg-green-100 text-green-900 border-green-400',
              },
              missed: {
                label: language === 'hi' ? 'छूटा हुआ' : 'Missed',
                bg: 'bg-stone-200 text-stone-700 border-stone-300',
              },
            }[b.status] || { label: b.status, bg: 'bg-stone-100 text-stone-700' };

            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl border border-stone-200 hover:border-emerald-300 bg-stone-50/50 hover:bg-white transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                    <QrCode className="w-6 h-6" />
                    <span className="text-[9px] font-bold tracking-tighter uppercase">TOKEN</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm text-stone-900 font-mono bg-white px-2 py-0.5 rounded border border-stone-200">
                        {b.bookingCode}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${statusConfig.bg}`}>
                        {statusConfig.label}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-800 mt-1">
                      {b.crop} • {b.quantityQuintals} {language === 'hi' ? 'क्विंटल' : 'Quintals'}
                    </h4>

                    <p className="text-xs text-stone-500 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {b.mandiName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {b.date} ({b.timeSlot})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-stone-200">
                  <div className="text-right mr-2">
                    <div className="text-[11px] text-stone-500 font-medium">
                      {language === 'hi' ? 'अनुमानित भुगतान:' : 'Estimated Payout:'}
                    </div>
                    <div className="text-sm font-extrabold text-emerald-800">
                      ₹{b.estimatedPayout.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActivePass(b)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 shadow-sm flex items-center gap-1"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'पास देखें' : 'View Pass'}</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => speakTokenDetails(b)}
                    className="p-1.5 rounded-lg text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 border border-stone-200"
                    title="Speak details"
                  >
                    <Volume2 className="w-4 h-4" />
                  </motion.button>

                  {/* Mandi Official verification buttons */}
                  {userRole === 'official' && b.status === 'booked' && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, 'arrived')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      मंडी आगमन दर्ज करें
                    </button>
                  )}
                  {userRole === 'official' && b.status === 'arrived' && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, 'completed')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      तुलाई व भुगतान सत्यापित करें
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {isBookingModalOpen && selectedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">
                      {language === 'hi' ? 'मंडी स्लॉट बुकिंग फॉर्म' : 'Procurement Booking Form'}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {activeSchedule.mandiName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isBookingSubmitting ? (
                <div className="py-6">
                  <FarmLoader
                    variant="both"
                    size="md"
                    language={language}
                    message={
                      language === 'hi'
                        ? 'डिजिटल गेट पास व टोकन जनरेट हो रहा है...'
                        : language === 'pa'
                        ? 'ਡਿਜੀਟਲ ਗੇਟ ਪਾਸ ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ...'
                        : 'Generating verified digital gate pass token...'
                    }
                    subMessage={
                      language === 'hi'
                        ? 'मंडी तौल कांटा स्लॉट ब्लॉक कर बारकोड व डीबीटी खाता सत्यापित किया जा रहा है'
                        : 'Allocating weighbridge bay & syncing Aadhaar-linked DBT records'
                    }
                  />
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="mt-4 space-y-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <div className="flex justify-between font-bold text-emerald-900">
                    <span>{activeSchedule.crop}</span>
                    <span>MSP: ₹{activeSchedule.mspRate}/Qtl</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 mt-1">
                    <span>तारीख: {activeSchedule.date}</span>
                    <span>समय: {selectedSlot.timeWindow}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'hi' ? 'किसान का नाम' : 'Farmer Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                    placeholder="उदा. रामेश्वर सिंह पटेल"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'hi' ? 'मोबाइल नंबर (SMS टोकन हेतु)' : 'Mobile Number for SMS Token'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-stone-500 text-sm font-bold">+91</span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium"
                      placeholder="9826144520"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-stone-700">
                      {language === 'hi' ? 'फसल की मात्रा (क्विंटल में)' : 'Crop Quantity in Quintals'}
                    </label>
                    <span className="text-xs font-semibold text-emerald-700">
                      अधिकतम: {selectedSlot.remainingQuintals} Qtl
                    </span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max={selectedSlot.remainingQuintals}
                    required
                    value={cropQuantity}
                    onChange={(e) => setCropQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-stone-900"
                  />
                </div>

                {/* Estimated payout calculation */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-600 block">
                      {language === 'hi' ? 'सीधे बैंक खाते में कुल राशि:' : 'Total Direct DBT Payout:'}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {cropQuantity} Qtl × ₹{activeSchedule.mspRate}/Qtl
                    </span>
                  </div>
                  <span className="text-base font-extrabold text-amber-900">
                    ₹{(cropQuantity * activeSchedule.mspRate).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
                  >
                    {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{language === 'hi' ? 'पुष्टि करें व टोकन लें' : 'Confirm & Generate Pass'}</span>
                  </motion.button>
                </div>
              </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Digital Gate Pass Modal */}
      <AnimatePresence>
        {activePass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-200 relative overflow-hidden"
            >
              {/* Header Ribbon */}
              <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-emerald-600 via-amber-500 to-green-600"></div>

              <div className="flex items-center justify-between mt-2 mb-4 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-base">
                      {language === 'hi' ? 'सरकारी डिजिटल गेट पास' : 'Govt Mandi Gate Pass'}
                    </h3>
                    <p className="text-[11px] text-stone-500">Krishi Setu National Procurement Grid</p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePass(null)}
                  className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* QR Code Card */}
              <div className="p-4 bg-stone-50 rounded-2xl border-2 border-dashed border-emerald-300 text-center flex flex-col items-center">
                <div className="w-36 h-36 bg-white p-2.5 rounded-2xl shadow-sm border border-stone-200 flex flex-col items-center justify-center">
                  <div className="grid grid-cols-6 gap-1 w-28 h-28 bg-emerald-950 p-2 rounded-xl">
                    <div className="col-span-2 row-span-2 bg-white rounded-xs"></div>
                    <div className="col-span-2 row-span-2 bg-emerald-500 rounded-xs"></div>
                    <div className="col-span-2 row-span-2 bg-white rounded-xs"></div>
                    <div className="col-span-3 bg-amber-400 rounded-xs"></div>
                    <div className="col-span-3 bg-white rounded-xs"></div>
                    <div className="col-span-2 row-span-2 bg-white rounded-xs"></div>
                    <div className="col-span-2 row-span-2 bg-emerald-300 rounded-xs"></div>
                    <div className="col-span-2 row-span-2 bg-white rounded-xs"></div>
                  </div>
                </div>
                <div className="mt-2.5">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                    {language === 'hi' ? 'टोकन कोड' : 'Token Code'}
                  </span>
                  <span className="text-xl font-black font-mono text-emerald-900 tracking-wider">
                    {activePass.bookingCode}
                  </span>
                </div>
              </div>

              {/* Pass details */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">{language === 'hi' ? 'किसान का नाम:' : 'Farmer Name:'}</span>
                  <span className="font-bold text-stone-900">{activePass.farmerName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">{language === 'hi' ? 'मंडी केंद्र:' : 'Mandi Center:'}</span>
                  <span className="font-bold text-stone-900 text-right">{activePass.mandiName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">{language === 'hi' ? 'फसल व मात्रा:' : 'Crop & Qty:'}</span>
                  <span className="font-bold text-emerald-800">
                    {activePass.crop} ({activePass.quantityQuintals} Quintals)
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">{language === 'hi' ? 'तारीख व समय:' : 'Scheduled Window:'}</span>
                  <span className="font-bold text-stone-900">
                    {activePass.date} ({activePass.timeSlot})
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-stone-500">{language === 'hi' ? 'अनुमानित DBT राशि:' : 'Estimated DBT Payout:'}</span>
                  <span className="font-extrabold text-amber-700 text-sm">
                    ₹{activePass.estimatedPayout.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => speakTokenDetails(activePass)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{language === 'hi' ? 'आवाज़ में सुनें' : 'Listen'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'hi' ? 'प्रिंट / सेव पर्ची' : 'Print Slip'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
