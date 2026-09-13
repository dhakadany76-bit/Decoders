import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Plus,
  Scale,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  Star,
  DollarSign,
  Truck,
  MessageSquare,
  ArrowRight,
  Filter,
  Eye,
  Check,
  X
} from 'lucide-react';
import {
  MarketplaceListing,
  MarketplaceBid,
  MarketplaceOrder,
  OrderReview,
  SupportedLanguage,
  UserRole
} from '../types';
import {
  INITIAL_MARKETPLACE_LISTINGS,
  INITIAL_MARKETPLACE_BIDS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS
} from '../mockData';
import { PageWorkflowExplainer } from './PageWorkflowExplainer';
import {
  AnimatedRupeeSymbol,
  AnimatedWheatSymbol,
  AnimatedTractorSymbol,
} from './AnimatedFarmingSymbols';

interface DirectMarketplaceViewProps {
  language: SupportedLanguage;
  userRole: UserRole;
  currentDistrict: string;
}

export const DirectMarketplaceView: React.FC<DirectMarketplaceViewProps> = ({
  language,
  userRole,
  currentDistrict
}) => {
  // Local persistence for listings, bids, orders, reviews
  const [listings, setListings] = useState<MarketplaceListing[]>(() => {
    const saved = localStorage.getItem('krishi_setu_listings');
    return saved ? JSON.parse(saved) : INITIAL_MARKETPLACE_LISTINGS;
  });

  const [bids, setBids] = useState<MarketplaceBid[]>(() => {
    const saved = localStorage.getItem('krishi_setu_bids');
    return saved ? JSON.parse(saved) : INITIAL_MARKETPLACE_BIDS;
  });

  const [orders, setOrders] = useState<MarketplaceOrder[]>(() => {
    const saved = localStorage.getItem('krishi_setu_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<OrderReview[]>(() => {
    const saved = localStorage.getItem('krishi_setu_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'listings' | 'my_bids' | 'orders' | 'reviews'>('listings');

  // New listing modal
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState(false);
  const [newCropName, setNewCropName] = useState('Sharbati Wheat');
  const [newVariety, setNewVariety] = useState('Organic Grade-A');
  const [newQuantity, setNewQuantity] = useState<number>(60);
  const [newBasePrice, setNewBasePrice] = useState<number>(2800);
  const [newGrade, setNewGrade] = useState<'A+' | 'A' | 'B'>('A+');

  // Place bid modal (for retailer mode or testing)
  const [isPlaceBidModalOpen, setIsPlaceBidModalOpen] = useState(false);
  const [selectedListingForBid, setSelectedListingForBid] = useState<MarketplaceListing | null>(null);
  const [retailerName, setRetailerName] = useState('Kisan Shakti Agri Trading');
  const [bidPrice, setBidPrice] = useState<number>(2950);
  const [bidQuantity, setBidQuantity] = useState<number>(50);

  // Review modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<MarketplaceOrder | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Save to local storage on state change
  useEffect(() => {
    localStorage.setItem('krishi_setu_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('krishi_setu_bids', JSON.stringify(bids));
  }, [bids]);

  useEffect(() => {
    localStorage.setItem('krishi_setu_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('krishi_setu_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  // Farmer creates listing
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: MarketplaceListing = {
      id: `LIST-${Date.now()}`,
      farmerId: 'F-101',
      farmerName: 'Rameshwar Singh Patel (आप)',
      farmerLocation: `${currentDistrict || 'Shivpuri'}, MP`,
      farmerPhone: '+91 98261 44520',
      cropName: newCropName,
      variety: newVariety,
      quantityQuintals: Number(newQuantity),
      minBasePricePerQuintal: Number(newBasePrice),
      mandiMspReference: newCropName.toLowerCase().includes('mustard') ? 5950 : 2425,
      harvestDate: new Date().toISOString().split('T')[0],
      qualityGrade: newGrade,
      images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'],
      status: 'active',
      createdAt: 'Today',
      bidsCount: 0,
    };

    setListings([newListing, ...listings]);
    setIsNewListingModalOpen(false);
    showNotification(
      language === 'hi'
        ? 'फसल सफलतापूर्वक किसान बाज़ार में लिस्ट हो गई! खरीदार जल्द बोली लगाएंगे।'
        : 'Harvest listed on Direct Marketplace! Buyers can now place live bids.'
    );
  };

  // Retailer places bid
  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListingForBid) return;

    const newBid: MarketplaceBid = {
      id: `BID-${Date.now()}`,
      listingId: selectedListingForBid.id,
      retailerId: 'RET-09',
      retailerName: retailerName,
      retailerCompany: retailerName,
      retailerPhone: '+91 7512 889100',
      bidPricePerQuintal: Number(bidPrice),
      offeredQuantityQuintals: Number(bidQuantity),
      status: 'pending',
      createdAt: 'Just now',
      distanceKm: 24,
      paymentMode: 'Direct DBT',
    };

    // Update listing bid count and highest bid
    setListings((prev) =>
      prev.map((l) => {
        if (l.id === selectedListingForBid.id) {
          const currentHigh = l.highestBidPrice || l.minBasePricePerQuintal;
          return {
            ...l,
            bidsCount: l.bidsCount + 1,
            highestBidPrice: Math.max(currentHigh, Number(bidPrice)),
          };
        }
        return l;
      })
    );

    setBids([newBid, ...bids]);
    setIsPlaceBidModalOpen(false);
    showNotification(
      language === 'hi'
        ? `बोली ₹${bidPrice}/क्विंटल सफलतापूर्वक दर्ज कर दी गई!`
        : `Bid of ₹${bidPrice}/Qtl placed successfully!`
    );
  };

  // Farmer accepts bid
  const handleAcceptBid = (bid: MarketplaceBid) => {
    const listing = listings.find((l) => l.id === bid.listingId);
    if (!listing) return;

    // 1. Mark bid as accepted
    setBids((prev) =>
      prev.map((b) => (b.id === bid.id ? { ...b, status: 'accepted' } : b))
    );

    // 2. Mark listing as sold
    setListings((prev) =>
      prev.map((l) => (l.id === listing.id ? { ...l, status: 'sold' } : l))
    );

    // 3. Create confirmed order
    const totalAmount = bid.bidPricePerQuintal * bid.offeredQuantityQuintals;
    const newOrder: MarketplaceOrder = {
      id: `ORD-${Date.now()}`,
      orderNumber: `KS-ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
      listingId: listing.id,
      cropName: listing.cropName,
      quantityQuintals: bid.offeredQuantityQuintals,
      agreedPricePerQuintal: bid.bidPricePerQuintal,
      totalAmount,
      farmerName: listing.farmerName,
      farmerPhone: listing.farmerPhone,
      retailerName: bid.retailerName,
      retailerCompany: bid.retailerCompany,
      status: 'paid', // Instant mock DBT payment
      paidAt: 'Just now',
      paymentReference: `DBT/UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      createdDate: 'Today',
    };

    setOrders([newOrder, ...orders]);
    setActiveTab('orders');
    showNotification(
      language === 'hi'
        ? `सौदा पक्का हुआ! ₹${totalAmount.toLocaleString('en-IN')} का भुगतान सीधे बैंक खाते में प्रेषित कर दिया गया है।`
        : `Bid accepted! Direct payment of ₹${totalAmount.toLocaleString('en-IN')} processed to farmer account.`
    );
  };

  // Reject bid
  const handleRejectBid = (bidId: string) => {
    setBids((prev) =>
      prev.map((b) => (b.id === bidId ? { ...b, status: 'rejected' } : b))
    );
    showNotification(
      language === 'hi' ? 'बोली अस्वीकार कर दी गई।' : 'Bid rejected.'
    );
  };

  // Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForReview) return;

    const newRev: OrderReview = {
      id: `REV-${Date.now()}`,
      orderId: selectedOrderForReview.id,
      reviewerId: userRole === 'farmer' ? 'F-101' : 'RET-01',
      reviewerName: userRole === 'farmer' ? 'Rameshwar Singh (Farmer)' : 'Amit Aggarwal (Buyer)',
      reviewerRole: userRole,
      revieweeName: userRole === 'farmer' ? selectedOrderForReview.retailerName : selectedOrderForReview.farmerName,
      rating: reviewRating,
      comment: reviewComment || (language === 'hi' ? 'बहुत अच्छा अनुभव, सही तौल और समय पर भुगतान।' : 'Smooth deal, fair weighment and fast payment.'),
      createdAt: 'Today',
      verifiedTransaction: true,
    };

    setReviews([newRev, ...reviews]);
    setIsReviewModalOpen(false);
    setReviewComment('');
    showNotification(
      language === 'hi' ? 'आपकी समीक्षा और रेटिंग दर्ज कर ली गई है!' : 'Review and trust rating submitted!'
    );
  };

  return (
    <div className="space-y-6">
      {/* Workflow Explainer */}
      <PageWorkflowExplainer pageType="marketplace" language={language} />

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-amber-700 text-white shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-amber-200 shrink-0" />
              <p className="font-bold text-sm">{notification}</p>
            </div>
            <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Header & Tabs */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full uppercase border border-amber-300 inline-flex items-center gap-1.5">
            <AnimatedRupeeSymbol size={16} />
            <span>{language === 'hi' ? '0% बिचौलिया कमीशन' : 'Zero Middleman Commission'}</span>
          </span>
          <h3 className="text-lg font-bold text-stone-900 mt-1 flex items-center gap-2">
            <AnimatedWheatSymbol size={24} />
            <span>{language === 'hi' ? 'किसान-खरीदार सीधा व्यापार' : 'Direct Farmer-Buyer Exchange'}</span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Post harvest button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsNewListingModalOpen(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 shadow-md flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'hi' ? 'अपनी फसल लिस्ट करें' : 'Post Your Harvest'}</span>
          </motion.button>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {[
          { id: 'listings', label: language === 'hi' ? 'उपलब्ध फसलें (Market Listings)' : 'Active Harvests', count: listings.length },
          { id: 'my_bids', label: language === 'hi' ? 'लाइव बोलियां (Live Bids)' : 'Active Bids', count: bids.filter((b) => b.status === 'pending').length },
          { id: 'orders', label: language === 'hi' ? 'पक्के सौदे (Orders & Payments)' : 'Orders & Payouts', count: orders.length },
          { id: 'reviews', label: language === 'hi' ? 'समीक्षाएं व रेटिंग (Trust Reviews)' : 'Ratings & Reviews', count: reviews.length },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-amber-50 hover:text-amber-900 border border-stone-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-amber-900 text-white' : 'bg-stone-100 text-stone-700'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: LISTINGS */}
      {activeTab === 'listings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((item) => {
            const isFarmerOwner = item.farmerId === 'F-101';
            const listingBids = bids.filter((b) => b.listingId === item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Image banner */}
                  <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.images[0]}
                      alt={item.cropName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                      <span className="text-[11px] font-extrabold uppercase bg-amber-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                        Grade {item.qualityGrade}
                      </span>
                      {item.status === 'sold' && (
                        <span className="text-[11px] font-extrabold uppercase bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-sm">
                          {language === 'hi' ? 'बिका हुआ' : 'Sold'}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-bold">
                      {item.quantityQuintals} {language === 'hi' ? 'क्विंटल उपलब्ध' : 'Qtl Available'}
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-stone-900 text-base leading-tight">
                          {item.cropName}
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5">{item.variety}</p>
                      </div>
                      <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {item.farmerLocation}
                      </span>
                    </div>

                    {/* Price and Bids box */}
                    <div className="mt-3 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-stone-500 block">
                          {language === 'hi' ? 'आधार मूल्य (Base Rate):' : 'Reserve Base Rate:'}
                        </span>
                        <span className="text-sm font-extrabold text-stone-900">
                          ₹{item.minBasePricePerQuintal}/Qtl
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-amber-800 font-medium block">
                          {language === 'hi' ? 'सर्वोच्च बोली:' : 'Highest Live Bid:'}
                        </span>
                        <span className="text-sm font-extrabold text-amber-900">
                          {item.highestBidPrice ? `₹${item.highestBidPrice}/Qtl` : 'कोई बोली नहीं'}
                        </span>
                      </div>
                    </div>

                    {/* Bids Counter */}
                    <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500">
                      <span>
                        {language === 'hi' ? 'सरकारी MSP:' : 'Govt MSP:'} ₹{item.mandiMspReference}/Qtl
                      </span>
                      <span className="font-bold text-amber-800">
                        {listingBids.length} {language === 'hi' ? 'सक्रिय बोलियां' : 'Active Bids'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card footer actions */}
                <div className="p-4 pt-0">
                  {item.status === 'sold' ? (
                    <div className="w-full py-2 bg-stone-100 text-stone-500 text-xs font-bold text-center rounded-xl">
                      {language === 'hi' ? 'सौदा पूर्ण' : 'Deal Completed'}
                    </div>
                  ) : isFarmerOwner ? (
                    <button
                      onClick={() => setActiveTab('my_bids')}
                      className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{language === 'hi' ? 'खरीदारों की बोलियां देखें' : 'View Buyer Bids'} ({listingBids.length})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedListingForBid(item);
                        setBidPrice(item.highestBidPrice ? item.highestBidPrice + 50 : item.minBasePricePerQuintal + 50);
                        setBidQuantity(item.quantityQuintals);
                        setIsPlaceBidModalOpen(true);
                      }}
                      className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Scale className="w-4 h-4" />
                      <span>{language === 'hi' ? 'लाइव बोली लगाएं' : 'Place Competing Bid'}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB 2: LIVE BIDS */}
      {activeTab === 'my_bids' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-700" />
              <span>{language === 'hi' ? 'खरीदारों द्वारा लगाई गई लाइव बोलियां' : 'Live Competitive Buyer Bids'}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'hi'
                ? 'अपनी पसंद की सर्वोच्च बोली स्वीकार करें और बिना कमीशन के सीधे बैंक में भुगतान पाएं'
                : 'Accept the highest offer with verified instant payment directly to your bank'}
            </p>
          </div>

          <div className="space-y-3">
            {bids.map((bid) => {
              const matchedListing = listings.find((l) => l.id === bid.listingId);
              const isPending = bid.status === 'pending';

              return (
                <div
                  key={bid.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    bid.status === 'accepted'
                      ? 'bg-emerald-50/80 border-emerald-300'
                      : bid.status === 'rejected'
                      ? 'bg-stone-50 border-stone-200 opacity-60'
                      : 'bg-white border-amber-200 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm text-stone-900">
                        {bid.retailerName}
                      </span>
                      <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {bid.retailerCompany}
                      </span>
                      <span className="text-[11px] text-stone-500 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        {bid.distanceKm} km दूरी
                      </span>
                    </div>

                    <div className="mt-1 text-xs text-stone-600">
                      <span className="font-bold text-stone-800">{matchedListing?.cropName || 'फसल'}</span>
                      {' • '}
                      <span>मांग: {bid.offeredQuantityQuintals} क्विंटल</span>
                      {' • '}
                      <span className="text-emerald-700 font-semibold">{bid.paymentMode}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <span className="text-[11px] text-stone-500 block">बोली दर (Offered Rate):</span>
                      <span className="text-base font-black text-amber-900">
                        ₹{bid.bidPricePerQuintal}/Qtl
                      </span>
                    </div>

                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAcceptBid(bid)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>{language === 'hi' ? 'स्वीकारें' : 'Accept'}</span>
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRejectBid(bid.id)}
                          className="px-3 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700"
                        >
                          <X className="w-4 h-4" />
                          <span>{language === 'hi' ? 'अस्वीकार' : 'Reject'}</span>
                        </motion.button>
                      </div>
                    ) : (
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          bid.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {bid.status === 'accepted' ? 'स्वीकृत (सौदा पूर्ण)' : 'अस्वीकृत'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS & DIRECT PAYMENTS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-700" />
              <span>{language === 'hi' ? 'पक्के सौदे व डायरेक्ट DBT भुगतान' : 'Completed Deals & Direct DBT Transfers'}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'hi'
                ? '100% पारदर्शी तुलाई और सीधे बैंक में प्राप्त भुगतान का विवरण'
                : 'Direct digital transactions with zero commission and instant bank credit verification'}
            </p>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 hover:bg-white transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-white px-2.5 py-1 rounded border border-emerald-300 text-emerald-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {language === 'hi' ? 'भुगतान पूर्ण (Paid)' : 'Paid & Settled'}
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-900 text-sm mt-1.5">
                    {order.cropName} • {order.quantityQuintals} {language === 'hi' ? 'क्विंटल' : 'Qtl'} @ ₹{order.agreedPricePerQuintal}/Qtl
                  </h4>

                  <p className="text-xs text-stone-600 mt-0.5">
                    खरीदार: <span className="font-bold text-stone-800">{order.retailerName}</span> ({order.retailerCompany})
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    यूटीआर संदर्भ: {order.paymentReference}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 block">कुल भुगतान राशि:</span>
                    <span className="text-lg font-black text-emerald-900">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedOrderForReview(order);
                      setIsReviewModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-stone-800 border border-stone-300 hover:border-amber-500 hover:bg-amber-50 shadow-sm flex items-center gap-1.5"
                  >
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{language === 'hi' ? 'रेटिंग दें' : 'Rate Trade'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REVIEWS & TRUST */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <span>{language === 'hi' ? 'सत्यापित व्यापार समीक्षाएं व विश्वास नेटवर्क' : 'Verified Trade Reviews & Trust Score'}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'hi'
                ? 'पारदर्शी रेटिंग से खरीदारों और किसानों का भरोसा बनता है'
                : 'Mutual feedback builds transparency and secure trade reputation'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Verified Trade
                    </span>
                  </div>

                  <p className="text-xs text-stone-800 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-bold text-stone-700">{rev.reviewerName}</span>
                  <span>{rev.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: POST HARVEST LISTING */}
      <AnimatePresence>
        {isNewListingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-700" />
                  <span>{language === 'hi' ? 'किसान बाज़ार में फसल लिस्ट करें' : 'Post Your Harvest Listing'}</span>
                </h3>
                <button onClick={() => setIsNewListingModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateListing} className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'hi' ? 'फसल का नाम' : 'Crop Name'}
                    </label>
                    <select
                      value={newCropName}
                      onChange={(e) => setNewCropName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
                    >
                      <option value="Sharbati Wheat">गेहूं (Sharbati Wheat)</option>
                      <option value="Pusa Bold Mustard">सरसों (Pusa Mustard)</option>
                      <option value="Yellow Soybean">सोयाबीन (Yellow Soybean)</option>
                      <option value="Pusa 1121 Basmati">बासमती धान (Basmati Rice)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'hi' ? 'क्वालिटी ग्रेड' : 'Quality Grade'}
                    </label>
                    <select
                      value={newGrade}
                      onChange={(e) => setNewGrade(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
                    >
                      <option value="A+">Grade A+ (सर्वोत्तम)</option>
                      <option value="A">Grade A (उत्तम)</option>
                      <option value="B">Grade B (सामान्य)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'hi' ? 'किस्म / विवरण (Variety Details)' : 'Variety Details'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                    placeholder="उदा. जैविक प्रमाणित, दाना मोटा व चमकदार"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'hi' ? 'मात्रा (क्विंटल में)' : 'Quantity (Quintals)'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'hi' ? 'न्यूनतम आधार भाव (₹/Qtl)' : 'Reserve Base Price (₹/Qtl)'}
                    </label>
                    <input
                      type="number"
                      min="500"
                      required
                      value={newBasePrice}
                      onChange={(e) => setNewBasePrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold text-amber-900"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-stone-700">
                  <p className="font-semibold">
                    💡 सुझाव: आपका आधार भाव सरकारी समर्थन मूल्य (MSP) से ऊपर रखें ताकि खरीदारों के बीच प्रतिस्पर्धा से अधिक दाम मिले।
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNewListingModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 shadow-md"
                  >
                    लिस्टिंग लाइव करें
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: PLACE BID (BUYER) */}
      <AnimatePresence>
        {isPlaceBidModalOpen && selectedListingForBid && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-bold text-stone-900 text-base">
                  {selectedListingForBid.cropName} पर लाइव बोली लगाएं
                </h3>
                <button onClick={() => setIsPlaceBidModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePlaceBid} className="mt-4 space-y-4">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <div className="flex justify-between font-bold text-stone-800">
                    <span>किसान आधार भाव:</span>
                    <span>₹{selectedListingForBid.minBasePricePerQuintal}/Qtl</span>
                  </div>
                  <div className="flex justify-between text-amber-800 mt-1">
                    <span>वर्तमान सर्वोच्च बोली:</span>
                    <span className="font-bold">₹{selectedListingForBid.highestBidPrice || selectedListingForBid.minBasePricePerQuintal}/Qtl</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    खरीदार फर्म / कंपनी का नाम
                  </label>
                  <input
                    type="text"
                    required
                    value={retailerName}
                    onChange={(e) => setRetailerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      आपकी बोली भाव (₹/Qtl)
                    </label>
                    <input
                      type="number"
                      min={selectedListingForBid.minBasePricePerQuintal}
                      required
                      value={bidPrice}
                      onChange={(e) => setBidPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-black text-amber-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      वांछित मात्रा (क्विंटल)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={selectedListingForBid.quantityQuintals}
                      required
                      value={bidQuantity}
                      onChange={(e) => setBidQuantity(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaceBidModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md"
                  >
                    बोली दर्ज करें
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: SUBMIT REVIEW */}
      <AnimatePresence>
        {isReviewModalOpen && selectedOrderForReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span>व्यापार समीक्षा व रेटिंग</span>
                </h3>
                <button onClick={() => setIsReviewModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    स्टार रेटिंग चुनें (1 से 5 स्टार)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${star <= reviewRating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    टिप्पणी / अनुभव साझा करें
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-300 text-xs"
                    placeholder="तुलाई, अनाज की शुद्धता और भुगतान गति के बारे में अपना अनुभव लिखें..."
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 shadow-md"
                  >
                    समीक्षा पोस्ट करें
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
