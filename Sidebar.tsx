
import React from 'react';

interface SidebarProps {
  history: string[];
  onHistoryItemClick: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ history, onHistoryItemClick }) => {
  return (
    <aside className="p-3 flex flex-col h-full bg-[#050505] w-52 border-l border-orange-900/20">
      <div className="flex items-center justify-between mb-8 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
          <h2 className="text-[11px] font-black gold-gradient uppercase tracking-widest">السجل الذكي</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#10B981] animate-pulse"></div>
          <span className="text-[9px] text-green-500 font-bold">LIVE</span>
        </div>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar">
        {history.length === 0 ? (
          <div className="text-center py-10 opacity-20">
            <i className="fa-solid fa-layer-group text-2xl mb-2 block"></i>
            <p className="text-[10px] italic">فارغ...</p>
          </div>
        ) : (
          history.map((item, index) => (
            <button
              key={index}
              onClick={() => onHistoryItemClick(item)}
              className="w-full text-right p-2 rounded-lg border border-orange-900/10 bg-zinc-900/20 hover:bg-orange-900/10 hover:border-orange-500/30 transition-all text-zinc-500 text-[10px] truncate group flex items-center gap-2"
            >
              <div className="w-1 h-1 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors shadow-green-500/50"></div>
              <span className="truncate flex-1">{item}</span>
            </button>
          ))
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-orange-900/10">
        <div className="p-2 rounded-lg bg-green-500/5 border border-green-500/10">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[9px] text-zinc-600">النظام</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_#10B981]"></div>
          </div>
          <div className="text-[9px] text-green-600 font-black">البيانات مؤمنة</div>
        </div>
      </div>
    </aside>
  );
};
