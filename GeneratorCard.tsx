
import React from 'react';

interface GeneratorCardProps {
  value: string;
  onChange: (val: string) => void;
  onGenerate: () => void;
  loading: boolean;
  isPro: boolean;
}

export const GeneratorCard: React.FC<GeneratorCardProps> = ({ value, onChange, onGenerate, loading, isPro }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className={`gold-border rounded-2xl p-0.5 bg-black overflow-hidden transition-all duration-500 ${isPro ? 'orange-red-glow shadow-red-900/20' : ''}`}>
      <div className="bg-zinc-950 p-5 space-y-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-red-500 font-bold text-sm flex items-center gap-2">
            <i className="fa-solid fa-pen-nib text-xs"></i>
            ماذا تريد أن يكتب عبقرينو اليوم؟
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-green-500 font-medium tracking-tighter">النظام نشط</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#10B981]"></div>
          </div>
        </div>
        
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب عنوان البحث، المقال، أو موضوع التعبير... (مثال: أثر الذكاء الاصطناعي في التعليم الحديث)"
          className="w-full h-32 bg-zinc-900/50 border border-orange-900/20 rounded-xl p-4 text-orange-100 placeholder-zinc-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all resize-none text-md leading-relaxed"
        />

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center gap-1 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
               <div className="w-1 h-1 rounded-full bg-green-500"></div>
               <span className="text-[10px] text-zinc-400">محرك الكتابة v4.1</span>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onGenerate();
            }}
            disabled={loading || !value.trim()}
            className={`success-green text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed z-10 relative overflow-hidden group`}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-microchip animate-spin"></i>
                <span className="text-sm">عبقرينو يفكر...</span>
              </>
            ) : (
              <>
                <span className="text-sm font-black">توليد النص الآن</span>
                <i className="fa-solid fa-bolt-lightning text-xs group-hover:animate-bounce"></i>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
