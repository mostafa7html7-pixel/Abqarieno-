
import React, { useState } from 'react';

interface ResultAreaProps {
  content: string;
  loading: boolean;
}

export const ResultArea: React.FC<ResultAreaProps> = ({ content, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!content) return;
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `بحث-عبقرينو-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (!content) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'مقال من عبقرينو الذكي',
          text: content.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopy();
      alert("تم نسخ النص لمشاركته يدوياً (متصفحك لا يدعم المشاركة المباشرة)");
    }
  };

  if (!content && !loading) return null;

  return (
    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center gap-3 px-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
        <div className="flex items-center gap-2">
           <div className="relative flex">
             <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_#10B981]"></div>
             <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-50"></div>
           </div>
           <span className="text-gold-gradient font-black tracking-[0.3em] text-[11px] uppercase">Masterpiece Output</span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
      </div>

      <div className="bg-zinc-950/80 backdrop-blur-sm border border-orange-900/10 rounded-3xl p-6 relative min-h-[400px] flex flex-col overflow-hidden shadow-2xl">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-24 space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-t-red-600 border-r-orange-500 border-b-yellow-500 border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#10B981]"></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gold-gradient text-lg font-black mb-1 animate-pulse">عبقرينو يصيغ الكلمات...</p>
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">تحليل البيانات الضخمة مستمر</p>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#10B981]"></div>
                  <span className="text-[10px] text-green-500 font-black uppercase tracking-widest">النص جاهز للاستخدام</span>
               </div>
               <button 
                  onClick={handleCopy}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border border-zinc-800"
               >
                  <i className={`fa-solid ${copied ? 'fa-check text-green-500' : 'fa-copy'}`}></i>
                  {copied ? 'تم النسخ' : 'نسخ النص'}
               </button>
            </div>

            <div className="prose prose-invert max-w-none prose-orange text-zinc-300 leading-relaxed text-right whitespace-pre-wrap font-medium min-h-[200px]">
              {content}
            </div>

            <div className="flex justify-center pt-8">
              <div className="flex gap-4">
                <button 
                  onClick={handleDownload}
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900 text-zinc-400 group-hover:text-red-500 group-hover:bg-red-500/10 border border-zinc-800 transition-all shadow-lg">
                    <i className="fa-solid fa-file-arrow-down text-xl"></i>
                  </div>
                  <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400 font-bold">تحميل TXT</span>
                </button>

                <button 
                  onClick={handleShare}
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900 text-zinc-400 group-hover:text-orange-500 group-hover:bg-orange-500/10 border border-zinc-800 transition-all shadow-lg">
                    <i className="fa-solid fa-share-nodes text-xl"></i>
                  </div>
                  <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400 font-bold">مشاركة</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-2 right-1/2 translate-x-1/2 flex items-center gap-2 opacity-30">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#10B981]"></div>
           <span className="text-[8px] text-green-500 font-black tracking-widest uppercase">Verified Knowledge Output</span>
        </div>
      </div>
    </div>
  );
};
