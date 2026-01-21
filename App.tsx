
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GeneratorCard } from './components/GeneratorCard';
import { ResultArea } from './components/ResultArea';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isPro, setIsPro] = useState(true);

  const handleGenerate = useCallback(async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;
    
    setLoading(true);
    setGeneratedText('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: isPro ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
        contents: `اكتب موضوعاً مفصلاً أو بحثاً عن: ${prompt}`,
        config: {
          systemInstruction: "أنت عبقرينو، مساعد ذكي متخصص في صياغة الأبحاث والمقالات العربية بأسلوب بليغ ومنظم. استخدم التنسيق المناسب والعناوين.",
          temperature: 0.8,
          thinkingConfig: isPro ? { thinkingBudget: 2000 } : undefined
        }
      });

      const text = response.text;
      if (text) {
        setGeneratedText(text);
        setHistory(prev => {
          if (prev.includes(prompt)) return prev;
          return [prompt, ...prev.slice(0, 14)];
        });
      } else {
        alert("تنبيه من عبقرينو: لم يتم إنشاء محتوى، جرب صياغة مختلفة.");
      }
    } catch (error: any) {
      console.error("Critical Generation Error:", error);
      alert("حدث خطأ في الاتصال بخوادم عبقرينو. تأكد من جودة الإنترنت.");
    } finally {
      setLoading(false);
    }
  }, [input, loading, isPro]);

  const handleHistoryClick = (item: string) => {
    setInput(item);
    // يمكن تفعيل التوليد التلقائي هنا إذا رغبت
  };

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden font-['Tajawal']" dir="rtl">
      <div className="hidden md:block">
        <Sidebar history={history} onHistoryItemClick={handleHistoryClick} />
      </div>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black">
        <Header />
        
        <div className="max-w-4xl mx-auto w-full px-6 py-8 space-y-8 flex-1">
          <div className="flex justify-center gap-4">
            <div className="bg-zinc-900 p-1 rounded-full border border-orange-900/30 flex items-center shadow-xl">
              <button 
                onClick={() => setIsPro(false)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${!isPro ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                النسخة السريعة
              </button>
              <button 
                onClick={() => setIsPro(true)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${isPro ? 'bg-gradient-to-r from-red-700 to-orange-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <i className="fa-solid fa-brain text-[10px]"></i>
                عبقرينو برو
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              </button>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter flex items-center justify-center gap-4">
              <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">عبقر</span>
              <span className="gold-gradient">ـينـو</span>
              <div className="relative flex">
                <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_15px_#10B981]"></div>
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-500 animate-ping opacity-75"></div>
              </div>
            </h1>
            <p className="text-orange-400 text-sm font-bold tracking-[0.3em] opacity-80 uppercase">The Art of Smart Writing</p>
          </div>

          <GeneratorCard 
            value={input} 
            onChange={setInput} 
            onGenerate={handleGenerate} 
            loading={loading} 
            isPro={isPro}
          />

          <ResultArea content={generatedText} loading={loading} />
        </div>

        <footer className="p-4 text-center text-zinc-800 text-[10px] flex items-center justify-center gap-2">
          <span>&copy; {new Date().getFullYear()} عبقرينو</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-900 shadow-sm"></div>
          <span className="text-green-900 font-bold uppercase tracking-widest">جميع الأنظمة تعمل بكفاءة عالية</span>
        </footer>
      </main>
    </div>
  );
};

export default App;
