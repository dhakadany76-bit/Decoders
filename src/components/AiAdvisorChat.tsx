import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Wheat,
  Droplets,
  AlertCircle
} from 'lucide-react';
import { ChatMessage, SupportedLanguage } from '../types';
import { PageWorkflowExplainer } from './PageWorkflowExplainer';
import { FarmLoader } from './FarmLoader';

interface AiAdvisorChatProps {
  language: SupportedLanguage;
  district: string;
}

const QUICK_PROMPTS = [
  {
    en: 'Critical irrigation stages for Wheat crop?',
    hi: 'गेहूं में पहली सिंचाई (CRI अवस्था) कब करें?',
    pa: 'ਕਣਕ ਨੂੰ ਪਹਿਲਾ ਪਾਣੀ ਕਦੋਂ ਲਾਉਣਾ ਚਾਹੀਦਾ ਹੈ?',
  },
  {
    en: 'How to control Mustard aphids using Neem oil?',
    hi: 'सरसों में माहू (चेपा) कीट के लिए नीम तेल का सही उपयोग क्या है?',
    pa: 'ਸਰ੍ਹੋਂ ਦੇ ਤੇਲੇ ਦੀ ਰੋਕਥਾਮ ਲਈ ਨਿੰਮ ਦੇ ਤੇਲ ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ?',
  },
  {
    en: 'Balanced NPK and Zinc fertilizer doses for 1 acre?',
    hi: '1 एकड़ खेत के लिए यूरिया, डीएपी और जिंक का सही संतुलन क्या है?',
    pa: '1 ਏਕੜ ਲਈ ਯੂਰੀਆ, ਡੀਏਪੀ ਅਤੇ ਜ਼ਿੰਕ ਦੀ ਸੰਤੁਲਿਤ ਖੁਰਾਕ?',
  },
  {
    en: 'What is current MSP rate for Wheat & Mustard?',
    hi: 'वर्तमान में गेहूं और सरसों का सरकारी समर्थन मूल्य (MSP) क्या है?',
    pa: 'ਕਣਕ ਅਤੇ ਸਰ੍ਹੋਂ ਦਾ ਮੌਜੂਦਾ ਸਰਕਾਰੀ ਭਾਅ (ਐਮ.ਐਸ.ਪੀ.) ਕੀ ਹੈ?',
  },
];

export const AiAdvisorChat: React.FC<AiAdvisorChatProps> = ({ language, district }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text:
        language === 'hi'
          ? `नमस्ते किसान भाई! मैं किसान मित्र एआई सलाहकार हूँ। आप ${district} क्षेत्र के लिए फसल, रोग, खाद या मौसम पर कुछ भी पूछ सकते हैं।`
          : language === 'pa'
          ? `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਮੈਂ ਕਿਸਾਨ ਮਿੱਤਰ ਏਆਈ ਸਲਾਹਕਾਰ ਹਾਂ। ਤੁਸੀਂ ${district} ਇਲਾਕੇ ਦੀਆਂ ਫ਼ਸਲਾਂ, ਖਾਦਾਂ ਅਤੇ ਬਿਮਾਰੀਆਂ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛ ਸਕਦੇ ਹੋ।`
          : `Hello Farmer Friend! I am your Kisan Mitra AI Agronomy Advisor. Ask me anything about crop cycles, pest control, balanced fertilizer dosage, or market access in ${district}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Voice speech synthesis
  const toggleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown bold/bullets for clean audio
    const cleanText = text.replace(/[*#•-]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Voice speech recognition
  const handleToggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(language === 'hi' ? 'आपके ब्राउज़र में वॉइस टाइपिंग उपलब्ध नहीं है।' : 'Speech recognition not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          language,
          district,
        }),
      });

      if (!res.ok) throw new Error('Chat service responded with an error');
      const data = await res.json();

      const botMessage: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'model',
        text: data.reply || 'Advisory rendered.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
        isFallback: data.isFallback,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const fallbackMessage: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'model',
        text:
          language === 'hi'
            ? 'फसल की नियमित देखभाल करें। खेत में संतुलित यूरिया और 5% नीम तेल का उपयोग करें।'
            : 'Maintain regular irrigation and integrated pest management.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: true,
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Workflow Explainer */}
      <PageWorkflowExplainer pageType="ai_advisor" language={language} />

      <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm flex flex-col h-[680px] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-emerald-100 bg-emerald-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                <span>{language === 'hi' ? 'किसान मित्र AI कृषि सलाहकार' : 'Kisan Mitra AI Agronomist'}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              </h3>
              <p className="text-xs text-stone-500">
                {district} • {language === 'hi' ? 'हिंदी सहायता' : language === 'pa' ? 'ਪੰਜਾਬੀ ਸਹਾਇਤਾ' : 'English Assistant'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              setMessages([
                {
                  id: 'reset',
                  role: 'model',
                  text:
                    language === 'hi'
                      ? 'संवाद रीसेट किया गया। आप नया प्रश्न पूछ सकते हैं।'
                      : 'Chat history cleared. How may I assist your farm today?',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ]);
            }}
            className="text-xs text-stone-500 hover:text-stone-800 p-2 hover:bg-stone-200/60 rounded-xl transition"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isSpeaking = speakingMessageId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    isUser ? 'bg-stone-800 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs whitespace-pre-line ${
                    isUser
                      ? 'bg-stone-900 text-white rounded-tr-none'
                      : 'bg-stone-50 border border-emerald-100 text-stone-900 rounded-tl-none font-normal'
                  }`}
                >
                  {msg.text}

                  {/* Message footer with voice speaker button */}
                  <div className="mt-2 pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-400">
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSpeak(msg.id, msg.text)}
                        className={`p-1 rounded flex items-center gap-1 text-[11px] font-bold ${
                          isSpeaking
                            ? 'text-rose-600 bg-rose-50'
                            : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50'
                        }`}
                        title="Listen to this advice"
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>बंद करें</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>सुनें</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-stone-50 border border-emerald-100 rounded-2xl rounded-tl-none p-3 shadow-2xs">
                <FarmLoader
                  variant="plant"
                  size="sm"
                  language={language}
                  showTips={false}
                  message={
                    language === 'hi'
                      ? 'कृषि मित्र वैज्ञानिक सलाह व मृदा आंकड़े तैयार कर रहा है...'
                      : language === 'pa'
                      ? 'ਖੇਤੀ ਸਲਾਹਕਾਰ ਜਵਾਬ ਤਿਆਰ ਕਰ ਰਿਹਾ ਹੈ...'
                      : 'Consulting ICAR agro-telemetry models...'
                  }
                />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 flex gap-2 overflow-x-auto scrollbar-none">
          {QUICK_PROMPTS.map((prompt, idx) => {
            const label = language === 'hi' ? prompt.hi : language === 'pa' ? prompt.pa : prompt.en;
            return (
              <button
                key={idx}
                onClick={() => handleSend(label)}
                className="shrink-0 text-[11px] font-semibold bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 rounded-xl px-3 py-1.5 text-stone-700 transition"
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Input Bar with Voice Mic */}
        <div className="p-3 border-t border-stone-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'फसल, खाद, रोग या मंडी भाव के बारे में पूछें...'
                  : 'Ask about crop issues, fertilizer doses, spray timings...'
              }
              className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />

            {/* Voice microphone button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={handleToggleVoiceInput}
              className={`p-2.5 rounded-xl transition flex items-center justify-center shrink-0 border ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse border-rose-700'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
              title="Voice Typing / बोलकर पूछें"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </motion.button>

            {/* Send button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              disabled={!input.trim() || loading}
              className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl transition shadow-sm shrink-0"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};
