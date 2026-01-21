
import React from 'react';

export const Header: React.FC = () => {
  const openSettings = () => {
    alert("سيتم إضافة ميزة تخصيص النمط قريباً في تحديث عبقرينو القادم!");
  };

  return (
    <header className="w-full h-16 border-b border-orange-900/20 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
        <span className="text-xl font-bold gold-gradient tracking-tighter">ABQAREENO</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={openSettings}
          className="text-orange-500 hover:text-red-500 transition-colors p-2 hover:bg-zinc-900 rounded-full"
          title="الإعدادات"
        >
          <i className="fa-solid fa-sliders text-xl"></i>
        </button>
        <button className="bg-gradient-to-r from-red-700 to-orange-600 px-4 py-1.5 rounded-full text-xs font-black border border-orange-400/30 hover:scale-105 transition-transform text-white shadow-lg">
          إصدار V4.1
        </button>
      </div>
    </header>
  );
};
