import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { SupportedLanguage, UserRole } from '../types';
import { KishanMitraLogo } from './KishanMitraLogo';
import {
  AnimatedWheatSymbol,
  AnimatedLeafSymbol,
  AnimatedTractorSymbol,
  AnimatedSunSymbol,
  AnimatedDropletSymbol,
  AnimatedBeeSymbol,
  AnimatedSproutSymbol,
  AnimatedRupeeCoinSymbol,
} from './AnimatedFarmingSymbols';

interface UserProfile {
  name: string;
  phoneOrEmail: string;
  role: UserRole;
  isLoggedIn: boolean;
  avatarUrl?: string;
  district?: string;
}

interface LoginPageProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  onLoginSuccess: (profile: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  isOpen,
  onClose,
  language,
  onLoginSuccess,
}) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeModal, setActiveModal] = useState<'about' | 'contact' | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError(language === 'hi' ? 'कृपया ईमेल और पासवर्ड दर्ज करें' : 'Please fill in both email and password');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const loggedUser: UserProfile = {
        name: isSignup && name ? name : email.split('@')[0] || 'Kishan Mitra',
        phoneOrEmail: email,
        role: role,
        isLoggedIn: true,
        district: 'Shivpuri',
      };
      setSuccessMsg(language === 'hi' ? 'सफलतापूर्वक लॉगिन हो गया!' : 'Logged in successfully!');
      setTimeout(() => {
        onLoginSuccess(loggedUser);
        onClose();
      }, 700);
    }, 600);
  };

  // One-click quick login for testing/demo
  const handleQuickLogin = (demoRole: UserRole | 'buyer' | 'transporter', demoName: string, demoEmail: string) => {
    setIsSubmitting(true);
    const resolvedRole: UserRole = demoRole === 'buyer' ? 'retailer' : demoRole === 'transporter' ? 'mandi_officer' : demoRole;
    setTimeout(() => {
      setIsSubmitting(false);
      const loggedUser: UserProfile = {
        name: demoName,
        phoneOrEmail: demoEmail,
        role: resolvedRole,
        isLoggedIn: true,
        district: resolvedRole === 'farmer' ? 'Shivpuri' : 'Indore',
      };
      onLoginSuccess(loggedUser);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950 flex flex-col justify-between select-none">
      {/* SCENIC TEA GARDEN & MISTY MOUNTAIN BACKGROUND (Matching screenshot) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Scenic photographic mountain gradient representation */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-xs scale-105"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.45), rgba(15, 23, 42, 0.85) 75%),
              linear-gradient(to bottom, #0369a1 0%, #0c4a6e 25%, #064e3b 55%, #022c22 85%, #0f172a 100%)
            `,
          }}
        />

        {/* Mountain ridge silhouettes */}
        <svg
          className="absolute bottom-0 inset-x-0 w-full h-[65vh] opacity-60 pointer-events-none"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Distant Blue Hills */}
          <path
            d="M0 240 C320 180 520 280 840 210 C1120 150 1320 230 1440 200 L1440 600 L0 600 Z"
            fill="#065f46"
            opacity="0.5"
          />
          {/* Lush Green Mid Hills */}
          <path
            d="M0 320 C240 260 480 340 760 280 C1060 210 1280 330 1440 300 L1440 600 L0 600 Z"
            fill="#047857"
            opacity="0.65"
          />
          {/* Forefront Terraced Tea Hills */}
          <path
            d="M0 420 C360 360 620 440 980 370 C1240 320 1380 410 1440 390 L1440 600 L0 600 Z"
            fill="#064e3b"
            opacity="0.9"
          />
        </svg>

        {/* Floating clouds */}
        <motion.div
          className="absolute top-12 -left-20 w-96 h-28 bg-white/20 rounded-full filter blur-2xl"
          animate={{ x: [0, 80, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-28 -right-20 w-80 h-32 bg-sky-200/20 rounded-full filter blur-3xl"
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ANIMATED FARMING SYMBOLS IN THE SCENERY (More than 5 animated symbols active) */}
        <div className="absolute top-24 left-10 hidden md:block">
          <AnimatedSunSymbol size={48} />
        </div>
        <div className="absolute top-40 right-14 hidden md:block">
          <AnimatedWheatSymbol size={40} />
        </div>
        <div className="absolute bottom-44 left-12 hidden lg:block">
          <AnimatedTractorSymbol size={44} />
        </div>
        <div className="absolute bottom-60 right-16 hidden lg:block">
          <AnimatedLeafSymbol size={36} />
        </div>
        <div className="absolute top-72 left-20 hidden xl:block">
          <AnimatedDropletSymbol size={34} />
        </div>
        <div className="absolute top-64 right-32 hidden xl:block">
          <AnimatedBeeSymbol size={36} />
        </div>
        <div className="absolute bottom-28 left-40 hidden xl:block">
          <AnimatedSproutSymbol size={36} />
        </div>
        <div className="absolute bottom-32 right-44 hidden xl:block">
          <AnimatedRupeeCoinSymbol size={36} />
        </div>
      </div>

      {/* TOP NAVBAR (Matching Screenshot: Logo left, Home/About/Contact center pills, Login pill right) */}
      <header className="relative z-20 px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <KishanMitraLogo size="sm" textColor="light" />
        </div>

        {/* Center: Pills (Home, About, Contact) */}
        <div className="hidden sm:flex items-center gap-1.5 bg-stone-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs text-stone-200 shadow-sm">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-full font-bold bg-white/20 text-white hover:bg-white/30 transition cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => setActiveModal('about')}
            className="px-3 py-1 rounded-full font-medium hover:text-white transition cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => setActiveModal('contact')}
            className="px-3 py-1 rounded-full font-medium hover:text-white transition cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Right: Close / Back to Dashboard Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{language === 'hi' ? 'डैशबोर्ड पर जाएँ' : 'Back to App'}</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* CENTER HERO & LOGIN CONTAINER */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-10">
        {/* HERO TEXT (Behind / Above Login, exactly as in screenshot) */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md"
          >
            Empowering Farmers and Buyers.
            <br />
            <span className="text-emerald-300">Transforming Agriculture.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-xs sm:text-sm text-stone-200/90 mt-2 max-w-xl mx-auto drop-shadow-xs"
          >
            Bridging the gap between farmers and markets with real-time data and predictive insights.
          </motion.p>
        </div>

        {/* THE FROSTED GLASS LOGIN CARD (Pixel-perfect to Screenshot_2026-09-13-13-10-35-00) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-md bg-stone-900/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left"
        >
          {/* Card Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {isSignup
                ? language === 'hi'
                  ? 'नया किसान खाता बनाएँ'
                  : 'Create Your Account'
                : 'Hello, Welcome Back'}
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              {isSignup
                ? language === 'hi'
                  ? 'Kishan Mitra परिवार से जुड़ें'
                  : 'Join Kishan Mitra to access real-time mandi prices & bidding.'
                : 'Login to manage your account.'}
            </p>
          </div>

          {/* Error / Success Feedback */}
          {error && (
            <div className="mb-4 p-2.5 rounded-xl bg-rose-950/80 border border-rose-600/60 text-rose-200 text-xs text-center font-medium">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs text-center font-semibold flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignup && (
              <>
                {/* Name */}
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'hi' ? 'पूरा नाम (Full Name)' : 'Full Name'}
                      className="w-full pl-10 pr-4 py-3 bg-stone-800/80 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                {/* Role selection for signup */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {[
                    { id: 'farmer', label: '🌿 किसान' },
                    { id: 'buyer', label: '🏢 खरीदार' },
                    { id: 'transporter', label: '🚚 ट्रांसपोर्ट' },
                  ].map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setRole(r.id as any)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        role === r.id
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-stone-800/60 text-stone-400 border-stone-700 hover:bg-stone-800'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Email Input (Dark translucent box matching screenshot) */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 bg-stone-800/80 border border-stone-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
              />
            </div>

            {/* Password Input (Dark translucent box matching screenshot) */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-4 pr-11 py-3 bg-stone-800/80 border border-stone-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-200 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Forgot password link */}
            {!isSignup && (
              <div className="text-left">
                <button
                  type="button"
                  onClick={() => alert(language === 'hi' ? 'पासवर्ड रीसेट लिंक आपके ईमेल/मोबाइल पर भेज दी जाएगी।' : 'Password reset link will be sent to your registered email or mobile.')}
                  className="text-xs text-stone-300 hover:text-white transition font-normal"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Login Button (Solid White rounded button with dark text matching screenshot) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-white hover:bg-stone-100 text-stone-900 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-98 disabled:opacity-75 cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <span>प्रमाणित हो रहा है...</span>
              ) : isSignup ? (
                <span>Sign Up</span>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          {/* Footer toggle: Don't have an account? Signup */}
          <div className="mt-5 text-center text-xs text-stone-300">
            {isSignup ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(false);
                    setError('');
                  }}
                  className="text-white font-bold hover:underline cursor-pointer ml-1"
                >
                  Login
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(true);
                    setError('');
                  }}
                  className="text-white font-bold hover:underline cursor-pointer ml-1"
                >
                  Signup
                </button>
              </span>
            )}
          </div>

          {/* Fast 1-Click Demo Login Options for Instant Evaluation */}
          <div className="mt-6 pt-5 border-t border-stone-800">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block text-center mb-2.5">
              ⚡ {language === 'hi' ? 'एक-क्लिक तुरंत डेमो लॉगिन:' : '1-Click Quick Demo Access:'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('farmer', 'रमेश कुमार (Ramesh)', 'farmer.ramesh@krishi.in')}
                className="p-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 text-left transition cursor-pointer"
              >
                <span className="text-xs block font-bold text-white">🌾 किसान</span>
                <span className="text-[10px] text-emerald-300 block truncate">रमेश कुमार</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('buyer', 'राज एग्रो मिलर्स (Raj Agro)', 'procurement@rajagro.com')}
                className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 border border-stone-600 text-left transition cursor-pointer"
              >
                <span className="text-xs block font-bold text-white">🏢 मिलर</span>
                <span className="text-[10px] text-stone-300 block truncate">राज एग्रो</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('transporter', 'किसान लॉजिस्टिक्स (Logistics)', 'express@kisanlogistics.in')}
                className="p-2 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-700/60 text-left transition cursor-pointer"
              >
                <span className="text-xs block font-bold text-white">🚚 वाहन</span>
                <span className="text-[10px] text-amber-300 block truncate">लॉजिस्टिक्स</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* BOTTOM SECTION: "For the Full AgroDeve Access Stage:" (Matching Screenshot_2026-09-13-13-10-27) */}
      <footer className="relative z-20 px-4 sm:px-8 pb-6 pt-2">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-xs sm:text-sm font-extrabold text-white mb-3 drop-shadow-sm">
            For the Full AgroDeve Access Stage:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1: Farmer */}
            <div
              onClick={() => handleQuickLogin('farmer', 'रमेश कुमार (Farmer)', 'ramesh.farmer@kishanmitra.in')}
              className="p-4 rounded-2xl bg-stone-900/70 backdrop-blur-md border border-white/15 text-center hover:border-emerald-400 transition cursor-pointer shadow-lg group"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-900/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <AnimatedSproutSymbol size={26} />
              </div>
              <h4 className="text-sm font-bold text-white">Farmer</h4>
              <p className="text-[11px] text-stone-300 mt-0.5">
                Manage and sell your crops.
              </p>
            </div>

            {/* Card 2: Buyer */}
            <div
              onClick={() => handleQuickLogin('buyer', 'राज एग्रो ट्रेडर्स', 'traders@rajagro.com')}
              className="p-4 rounded-2xl bg-stone-900/70 backdrop-blur-md border border-white/15 text-center hover:border-amber-400 transition cursor-pointer shadow-lg group"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-amber-900/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <AnimatedWheatSymbol size={26} />
              </div>
              <h4 className="text-sm font-bold text-white">Buyer</h4>
              <p className="text-[11px] text-stone-300 mt-0.5">
                Search and purchase fresh produce.
              </p>
            </div>

            {/* Card 3: Transporter */}
            <div
              onClick={() => handleQuickLogin('transporter', 'किसान लॉजिस्टिक्स एक्सप्रेस', 'haulage@kisanmitra.in')}
              className="p-4 rounded-2xl bg-stone-900/70 backdrop-blur-md border border-white/15 text-center hover:border-sky-400 transition cursor-pointer shadow-lg group"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-sky-900/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <AnimatedTractorSymbol size={28} />
              </div>
              <h4 className="text-sm font-bold text-white">Transporter</h4>
              <p className="text-[11px] text-stone-300 mt-0.5">
                Coordinate and deliver farm goods.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING "AI" CIRCLE BADGE (Bottom-Right matching screenshot) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-xl border-2 border-emerald-300 cursor-pointer"
        title="Open Kishan AI Advisor"
      >
        <span>AI</span>
      </motion.button>

      {/* ABOUT / CONTACT MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-700 text-white p-6 rounded-2xl max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'about' ? (
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <KishanMitraLogo size="sm" textColor="light" />
                </div>
                <h3 className="font-bold text-base text-white">About Kishan Mitra</h3>
                <p className="text-stone-300">
                  Kishan Mitra is an integrated smart agriculture platform uniting farmers, APMC Mandis, millers, and logistics under a unified digital gateway.
                </p>
                <p className="text-stone-300">
                  Built for Smart India Hackathon (SIH26033), supporting eNAM, Agmarknet, and real-time weighbridge slot reservations.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm">
                <h3 className="font-bold text-base text-white">Contact & Helpline</h3>
                <p className="text-stone-300">
                  Kisan Call Centre Toll-Free: <span className="font-bold text-amber-300">1800-180-1551</span>
                </p>
                <p className="text-stone-300">
                  Email: <span className="text-emerald-400">support@kishanmitra.org</span>
                </p>
                <p className="text-stone-300">
                  Headquarters: Krishi Bhawan, New Delhi & APMC Mandi Shivpuri, MP.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
