import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  PlusCircle,
  TrendingDown,
  TrendingUp,
  Trash2,
  Receipt,
  Download,
  IndianRupee,
  Sparkles
} from 'lucide-react';
import { LedgerEntry, SupportedLanguage } from '../types';
import { PageWorkflowExplainer } from './PageWorkflowExplainer';

interface FarmLedgerProps {
  language: SupportedLanguage;
}

const DEFAULT_ENTRIES: LedgerEntry[] = [
  {
    id: '1',
    date: '2026-09-02',
    type: 'expense',
    category: 'Seeds & Sowing',
    amount: 3200,
    cropSeason: 'Rabi 2026',
    notes: 'प्रमाणित शरबती गेहूं बीज (40 kg)',
  },
  {
    id: '2',
    date: '2026-09-04',
    type: 'expense',
    category: 'Fertilizers & Nutrients',
    amount: 2750,
    cropSeason: 'Rabi 2026',
    notes: 'डीएपी (2 बोरी) + जिंक सल्फेट',
  },
  {
    id: '3',
    date: '2026-09-08',
    type: 'expense',
    category: 'Diesel & Tractor Tillage',
    amount: 1800,
    cropSeason: 'Rabi 2026',
    notes: 'रोटावेटर द्वारा खेत जुताई',
  },
  {
    id: '4',
    date: '2026-09-09',
    type: 'income',
    category: 'Harvest / Mandi Sale',
    amount: 14500,
    cropSeason: 'Kharif 2026',
    notes: 'सोयाबीन लॉट बिक्री (सीधा भुगतान)',
  },
];

export const FarmLedger: React.FC<FarmLedgerProps> = ({ language }) => {
  const [entries, setEntries] = useState<LedgerEntry[]>(() => {
    try {
      const saved = localStorage.getItem('kisan_mitra_ledger');
      return saved ? JSON.parse(saved) : DEFAULT_ENTRIES;
    } catch {
      return DEFAULT_ENTRIES;
    }
  });

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [category, setCategory] = useState('Seeds & Sowing');
  const [amount, setAmount] = useState('');
  const [cropSeason, setCropSeason] = useState('Rabi 2026');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('kisan_mitra_ledger', JSON.stringify(entries));
    } catch (e) {
      console.warn('Failed to persist ledger to localStorage', e);
    }
  }, [entries]);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newEntry: LedgerEntry = {
      id: String(Date.now()),
      date,
      type,
      category,
      amount: parsedAmount,
      cropSeason,
      notes,
    };

    setEntries([newEntry, ...entries]);
    setAmount('');
    setNotes('');
  };

  const handleQuickAdd = (qType: 'expense' | 'income', qCat: string, qAmt: number, qNote: string) => {
    const newEntry: LedgerEntry = {
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      type: qType,
      category: qCat,
      amount: qAmt,
      cropSeason,
      notes: qNote,
    };
    setEntries([newEntry, ...entries]);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((item) => item.id !== id));
  };

  const totalIncome = entries
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const exportLedgerCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Date,Type,Category,Amount,Season,Notes\n' +
      entries
        .map((e) => `"${e.date}","${e.type}","${e.category}",${e.amount},"${e.cropSeason}","${e.notes}"`)
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kisan_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Explainer */}
      <PageWorkflowExplainer pageType="farm_ledger" language={language} />

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'खेत बहीखाता (डिजिटल डायरी)' : 'Digital Farm Ledger'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'hi' ? 'खेत आय-व्यय व शुद्ध मुनाफा' : 'Farm Income, Expense & Net Margin'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl">
              {language === 'hi'
                ? 'बीज, खाद, डीजल, मजदूरी और फसल बिक्री का पाई-पाई का हिसाब रखें। यह बहीखाता पूरी तरह सुरक्षित और ऑफलाइन भी उपलब्ध है।'
                : 'Seasonal seed, fertilizer, machinery, and crop sales accounting with real-time net margin.'}
            </p>
          </div>

          <button
            onClick={exportLedgerCSV}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-stone-200"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'hi' ? 'हिसाब डाउनलोड करें' : 'Export CSV'}</span>
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5 pt-4 border-t border-stone-100">
          <div className="bg-stone-50 border border-emerald-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                {language === 'hi' ? 'कुल आय (Total Income)' : 'Total Income'}
              </span>
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-emerald-800 mt-2">
              ₹{totalIncome.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-stone-50 border border-rose-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                {language === 'hi' ? 'कुल लागत (Expenses)' : 'Total Expenses'}
              </span>
              <div className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-rose-800 mt-2">
              ₹{totalExpense.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                {language === 'hi' ? 'शुद्ध बचत / मुनाफा' : 'Net Farm Profit'}
              </span>
              <div className={`p-1.5 rounded-lg ${netProfit >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <p className={`text-2xl font-black mt-2 ${netProfit >= 0 ? 'text-emerald-800' : 'text-rose-800'}`}>
              ₹{netProfit.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Farmer Preset Buttons */}
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-extrabold text-emerald-900">
            {language === 'hi' ? 'त्वरित प्रविष्टि (1-क्लिक से जोड़ें):' : 'Quick Presets (1-Click Record):'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickAdd('expense', 'Fertilizers & Nutrients', 270, 'यूरिया खाद 1 बोरी')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-rose-50 text-rose-800 border border-rose-200 shadow-xs"
          >
            -₹270 यूरिया खाद
          </button>
          <button
            onClick={() => handleQuickAdd('expense', 'Diesel & Tractor Tillage', 1200, 'ट्रैक्टर डीजल')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-rose-50 text-rose-800 border border-rose-200 shadow-xs"
          >
            -₹1,200 ट्रैक्टर डीजल
          </button>
          <button
            onClick={() => handleQuickAdd('expense', 'Labor & Harvesting', 800, 'दैनिक मजदूर भुगतान')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-rose-50 text-rose-800 border border-rose-200 shadow-xs"
          >
            -₹800 मजदूरी
          </button>
          <button
            onClick={() => handleQuickAdd('income', 'Direct Buyer Procurement', 25000, 'किसान बाज़ार उपज बिक्री')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs"
          >
            +₹25,000 फसल बिक्री (DBT)
          </button>
        </div>
      </div>

      {/* Form & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>{language === 'hi' ? 'नया लेन-देन जोड़ें' : 'Add New Transaction'}</span>
          </h3>

          <form onSubmit={handleAddEntry} className="space-y-3.5 text-xs">
            {/* Type selector */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 rounded-xl font-bold transition text-xs ${
                  type === 'expense'
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {language === 'hi' ? 'लागत / खर्च (Expense)' : 'Expense'}
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-2 rounded-xl font-bold transition text-xs ${
                  type === 'income'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {language === 'hi' ? 'उपज आय (Income)' : 'Income'}
              </button>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">
                {language === 'hi' ? 'तारीख' : 'Date'}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">
                {language === 'hi' ? 'श्रेणी (Category)' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-medium"
              >
                {type === 'expense' ? (
                  <>
                    <option value="Seeds & Sowing">बीज (Seeds & Sowing)</option>
                    <option value="Fertilizers & Nutrients">उर्वरक / खाद (Fertilizers & DAP)</option>
                    <option value="Pesticides & Sprays">कीटनाशक / छिड़काव (Sprays)</option>
                    <option value="Diesel & Tractor Tillage">डीजल / ट्रैक्टर जुताई (Diesel)</option>
                    <option value="Labor & Harvesting">खेत मजदूरी व कटाई (Labor)</option>
                    <option value="Irrigation & Electricity">सिंचाई व बिजली (Irrigation)</option>
                    <option value="Transport & Mandi Cess">परिवहन व भाड़ा (Transport)</option>
                  </>
                ) : (
                  <>
                    <option value="Harvest / Mandi Sale">मंडी उपज बिक्री (Mandi Sale)</option>
                    <option value="Direct Buyer Procurement">किसान बाज़ार सीधा सौदा (Direct Trade)</option>
                    <option value="PM-Kisan DBT Subsidy">सरकारी सब्सिडी / सम्मान निधि (DBT)</option>
                    <option value="Crop Insurance Claim">फसल बीमा दावा (Insurance)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">
                {language === 'hi' ? 'राशि (₹)' : 'Amount (₹)'}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ 0"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-extrabold text-sm text-stone-900"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">
                {language === 'hi' ? 'विवरण (Notes)' : 'Description'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="उदा. 2 बोरी खाद या 10 क्विंटल गेहूं"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold transition shadow-sm mt-2"
            >
              {language === 'hi' ? 'खाते में दर्ज करें' : 'Record Entry'}
            </motion.button>
          </form>
        </div>

        {/* Entries Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-700" />
              <span>{language === 'hi' ? 'लेन-देन इतिहास' : 'Transaction History'}</span>
            </h3>

            {entries.length === 0 ? (
              <p className="text-stone-500 text-xs py-8 text-center">
                {language === 'hi' ? 'कोई लेन-देन दर्ज नहीं है।' : 'No records yet. Add an expense or income entry above.'}
              </p>
            ) : (
              <div className="divide-y divide-stone-100 max-h-[480px] overflow-y-auto">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            entry.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        <span className="font-bold text-stone-900">{entry.category}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                          {entry.cropSeason}
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px] mt-0.5 ml-4">
                        {entry.date} {entry.notes && `• ${entry.notes}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`font-black text-sm ${
                          entry.type === 'income' ? 'text-emerald-800' : 'text-rose-800'
                        }`}
                      >
                        {entry.type === 'income' ? '+' : '-'}₹{entry.amount.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
