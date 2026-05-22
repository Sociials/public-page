// StaticThemes.js
export const staticThemes = [
  {
    id: 0,
    title: "Socialls",
    fontClass: "font-sans text-[2.5rem] font-bold",
    color: "text-black",
    bgClass: "bg-white border border-gray-600",
    buttonClass:
      "bg-[#15F5BA] text-black rounded-md border border-black font-semibold flex items-center justify-center",
    // Matches button but simpler
    highlightClass: "bg-[#15F5BA] text-black rounded-md border border-black",
    faqClass: "bg-[#f0fdf9] text-black rounded-md border border-black",
  },
  {
    id: 1,
    title: "Gradient",
    fontClass: "font-sans text-[2.5rem] font-bold",
    color: "text-black",
    bgClass: "bg-gradient-to-b from-pink-500 via-pink-400 to-pink-200",
    buttonClass:
      "backdrop-blur-xs bg-white/30 text-black rounded-full border border-white font-normal flex items-center justify-center",
    highlightClass:
      "bg-white/30 backdrop-blur-md rounded-full border border-white text-black",
    faqClass:
      "bg-white/40 backdrop-blur-md rounded-xl border border-white text-black",
  },
  {
    id: 2,
    title: "Charcoal",
    fontClass: "font-mono text-[2.2rem] font-normal tracking-wide",
    bgClass: "bg-[#BBBBBB]",
    color: "text-black",
    buttonClass:
      "shadow-[0px_2px_0px_#000] bg-[#BBBBBB] text-black rounded-[3px] border-[2px] border-black font-mono flex items-center justify-center",
    highlightClass:
      "bg-[#BBBBBB] border-[2px] border-black rounded-[3px] shadow-[2px_2px_0px_#000]",
    faqClass: "bg-[#cccccc] border-[2px] border-black rounded-[3px] text-black",
  },
  {
    id: 3,
    title: "Neon",
    fontClass: "font-sans text-[2.2rem] font-semibold text-white",
    color: "text-white",
    bgClass: "bg-gradient-to-br from-black via-blue-900 via-pink-700 to-black",
    buttonClass:
      "bg-white/30 backdrop-blur-xs text-white border border-white rounded-xl flex items-center justify-center",
    highlightClass:
      "bg-white/10 backdrop-blur-md border border-white/50 rounded-full text-white",
    faqClass:
      "bg-black/40 backdrop-blur-md border border-white/30 rounded-xl text-white",
  },
  {
    id: 4,
    title: "Aesthetic",
    fontClass: "font-sans text-[2.5rem] font-extrabold",
    bgClass: "bg-[#a077ff]",
    color: "text-black",
    buttonClass:
      "shadow-[0px_2px_0px_#000] bg-[#D9D9D9] text-black border border-black rounded-[10px] font-bold flex items-center justify-center",
    highlightClass:
      "bg-[#D9D9D9] border border-black rounded-[10px] shadow-[2px_2px_0px_#000]",
    faqClass: "bg-[#eeeeee] border border-black rounded-[10px] text-black",
  },
  {
    id: 5,
    title: "Cyber",
    fontClass:
      "font-mono text-[2.2rem] font-bold tracking-tighter text-[#00FF41]",
    bgClass: "bg-black",
    color: "text-[#00FF41]",

    buttonClass:
      "bg-black text-[#00FF41] border border-[#00FF41] rounded-none hover:bg-[#00FF41] hover:text-black transition-all duration-300 font-mono flex items-center justify-center uppercase tracking-widest",
    highlightClass:
      "bg-black border border-[#00FF41] rounded-none text-[#00FF41]",
    faqClass: "bg-black border border-[#00FF41] rounded-none text-[#00FF41]",
  },
  {
    id: 6,
    title: "Paper",
    fontClass: "font-serif text-[2.5rem] italic font-medium text-[#2d2d2d]",
    bgClass: "bg-[#fdfbf7]",
    color: "text-[#2d2d2d]",
    buttonClass:
      "bg-white text-black border-b-[3px] border-r-[3px] border-t border-l border-black rounded-sm active:border-b active:border-r active:translate-y-[2px] active:translate-x-[2px] transition-all font-serif flex items-center justify-center",
    highlightClass:
      "bg-white border border-black rounded-sm shadow-[2px_2px_0px_#000]",
    faqClass: "bg-white border border-black rounded-sm text-black",
  },
  {
    id: 7,
    title: "Bubbly",
    fontClass: "font-sans text-[2.5rem] font-black text-white drop-shadow-md",
    bgClass: "bg-[#FF6B6B]",
    color: "text-white",
    buttonClass:
      "bg-[#FFD93D] text-[#FF6B6B] rounded-[2rem] border-4 border-white shadow-[0px_4px_0px_rgba(255,255,255,0.5)] font-black flex items-center justify-center text-lg",
    highlightClass: "bg-[#FFD93D] border-4 border-white rounded-full shadow-sm",
    faqClass:
      "bg-white text-[#FF6B6B] border-4 border-[#FFD93D] rounded-[1.5rem]",
  },
  {
    id: 8,
    title: "Blueprint",
    fontClass: "font-mono text-[2.2rem] font-normal text-white",
    color: "text-white",
    bgClass:
      "bg-[#1E3A8A] bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]",
    buttonClass:
      "bg-transparent text-white border-2 border-dashed border-white rounded-md hover:bg-white/10 font-mono flex items-center justify-center",
    highlightClass:
      "bg-[#1E3A8A] border-2 border-dashed border-white rounded-md",
    faqClass:
      "bg-[#172554] border-2 border-dashed border-white/50 rounded-md text-white",
  },
  {
    id: 9,
    title: "Brutal",
    fontClass:
      "font-sans text-[3rem] font-black uppercase leading-none text-black",
    bgClass: "bg-[#E0E722]",
    color: "text-black",
    buttonClass:
      "bg-[#FF00A8] text-white border-4 border-black shadow-[8px_8px_0px_#000] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_#000] active:translate-y-[8px] active:shadow-none transition-all rounded-none font-bold flex items-center justify-center",
    highlightClass:
      "bg-[#FF00A8] border-4 border-black shadow-[4px_4px_0px_#000] rounded-none",
    faqClass:
      "bg-white border-4 border-black shadow-[6px_6px_0px_#000] rounded-none text-black",
  },
  {
    id: 10,
    title: "Retro 95",
    fontClass: "font-mono text-[2.2rem] font-bold text-white tracking-tight",
    color: "text-white",
    bgClass: "bg-[#008080]",
    buttonClass:
      "bg-[#c0c0c0] text-black border-t-[3px] border-l-[3px] border-t-white border-l-white border-b-[3px] border-r-[3px] border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white flex items-center justify-center font-bold",
    highlightClass:
      "bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black rounded-none",
    faqClass: "bg-[#c0c0c0] border border-black text-black rounded-none p-1",
  },
  {
    id: 11,
    title: "Noir",
    fontClass: "font-serif text-[2.5rem] italic text-white",
    color: "text-white",
    bgClass: "bg-black",
    buttonClass:
      "bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors duration-500 rounded-none uppercase tracking-widest text-sm flex items-center justify-center",
    highlightClass: "bg-black border border-white rounded-full text-white",
    faqClass: "bg-black border border-gray-800 rounded-none text-white",
  },
  {
    id: 12,
    title: "Frosted",
    fontClass: "font-sans text-[2.5rem] font-bold text-white drop-shadow-md",
    color: "text-white",

    bgClass: "bg-gradient-to-tr from-violet-500 via-orange-300 to-red-500",
    buttonClass:
      "bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl shadow-lg hover:bg-white/30 transition-all flex items-center justify-center",
    highlightClass:
      "bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm",
    faqClass:
      "bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white",
  },
  {
    id: 13,
    title: "Glow",
    fontClass: "font-sans text-[2.2rem] font-bold text-cyan-400",
    color: "text-cyan-400",
    bgClass: "bg-[#0f172a]",
    buttonClass:
      "bg-[#1e293b] text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:border-cyan-400 rounded-lg transition-all flex items-center justify-center",
    highlightClass:
      "bg-[#1e293b] border border-cyan-500/50 rounded-lg shadow-[0_0_10px_rgba(34,211,238,0.2)]",
    faqClass: "bg-[#1e293b] border border-cyan-900 rounded-lg text-cyan-200",
  },
  {
    id: 14,
    title: "Sketch",
    fontClass: "font-sans text-[2.5rem] font-black text-gray-800",
    color: "text-gray-800",

    bgClass: "bg-[#fffef0]",
    buttonClass:
      "bg-white text-black border-2 border-black rounded-[255px_15px_225px_15px/15px_225px_15px_255px] hover:rounded-[15px_225px_15px_255px/255px_15px_225px_15px] transition-all shadow-sm flex items-center justify-center",
    highlightClass:
      "bg-white border-2 border-black rounded-[255px_15px_225px_15px/15px_225px_15px_255px]",
    faqClass:
      "bg-white border-2 border-black rounded-[5px_25px_5px_25px/25px_5px_25px_5px] text-black",
  },

  {
    id: 16,
    title: "Mint Breeze",
    fontClass: "font-sans text-[2.4rem] font-extrabold text-emerald-700",
    color: "text-emerald-700",
    bgClass: "bg-gradient-to-br from-emerald-100 via-teal-100 to-white",
    buttonClass:
      "bg-white text-emerald-700 border border-emerald-300 shadow-sm hover:bg-emerald-50 rounded-2xl transition-all flex items-center justify-center",
    highlightClass: "bg-white border border-emerald-200 rounded-2xl shadow-sm",
    faqClass:
      "bg-white/80 border border-emerald-100 rounded-xl text-emerald-800",
  },
  {
    id: 17,
    title: "Retro Sunset",
    fontClass:
      "font-sans text-[2.4rem] font-bold text-yellow-200 drop-shadow-md",
    color: "text-yellow-200",
    bgClass: "bg-gradient-to-tr from-purple-700 via-pink-500 to-orange-400",
    buttonClass:
      "bg-white/20 text-yellow-200 border border-yellow-200/50 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,150,0.4)] hover:bg-white/30 rounded-xl transition-all flex items-center justify-center",
    highlightClass:
      "bg-white/10 border border-yellow-200/30 rounded-full backdrop-blur-sm",
    faqClass:
      "bg-purple-900/40 border border-pink-500/30 rounded-xl text-yellow-100",
  },
  {
    id: 18,
    title: "Carbon Minimal",
    fontClass: "font-sans text-[2.3rem] font-semibold text-gray-100",
    color: "text-gray-100",
    bgClass: "bg-gradient-to-b from-[#1a1a1a] to-black",
    buttonClass:
      "bg-[#2a2a2a] text-gray-200 border border-gray-600/50 hover:bg-[#3a3a3a] rounded-lg shadow-sm transition-all flex items-center justify-center",
    highlightClass: "bg-[#2a2a2a] border border-gray-700 rounded-full",
    faqClass: "bg-[#1f1f1f] border border-gray-800 rounded-lg text-gray-300",
  },
  {
    id: 19,
    title: "Candy Pop",
    fontClass: "font-sans text-[2.5rem] font-black text-pink-700",
    bgClass: "bg-gradient-to-br from-pink-200 via-yellow-200 to-blue-200",
    color: "text-pink-700",
    buttonClass:
      "bg-white text-pink-700 border border-pink-300 shadow-md hover:bg-pink-50 rounded-3xl transition-all flex items-center justify-center",
    highlightClass: "bg-white border border-pink-200 rounded-full shadow-sm",
    faqClass: "bg-white/90 border border-white rounded-2xl text-pink-800",
  },
  {
    id: 20,
    title: "Sakura Dream",
    fontClass:
      "font-sans text-[2.5rem] font-black text-pink-600 drop-shadow-[0_0_6px_rgba(255,182,193,0.6)]",
    color: "text-pink-600",
    bgClass: "bg-gradient-to-br from-pink-200 via-rose-100 to-white",
    buttonClass:
      "bg-white/70 text-pink-600 border border-pink-300 backdrop-blur-sm shadow-sm hover:bg-pink-50 rounded-2xl transition-all flex items-center justify-center",
    highlightClass: "bg-white/60 border border-pink-200 rounded-2xl",
    faqClass: "bg-white/80 border border-pink-100 rounded-xl text-pink-700",
  },

  {
    id: 22,
    title: "Magic Girl Aura",
    fontClass:
      "font-sans text-[2.5rem] font-bold text-purple-600 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
    bgClass: "bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100",
    color: "text-purple-600",
    buttonClass:
      "bg-white/70 text-purple-600 border border-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)] hover:bg-purple-50 rounded-3xl transition-all flex items-center justify-center",
    highlightClass: "bg-white/60 border border-purple-200 rounded-3xl",
    faqClass:
      "bg-white/80 border border-purple-100 rounded-2xl text-purple-700",
  },

  {
    id: 24,
    title: "Sky Studio Ghibli",
    color: "text-sky-700",
    fontClass: "font-sans text-[2.5rem] font-bold text-sky-700 drop-shadow-sm",
    bgClass: "bg-gradient-to-b from-sky-200 via-blue-100 to-white",
    buttonClass:
      "bg-white text-sky-700 border border-sky-300 shadow-sm hover:bg-sky-50 rounded-2xl transition-all flex items-center justify-center",
    highlightClass: "bg-white/80 border border-sky-200 rounded-2xl",
    faqClass: "bg-white/90 border border-sky-100 rounded-xl text-sky-800",
  },
  {
    id: 25,
    title: "Midnight Pro",
    fontClass: "font-sans text-[2.2rem] font-semibold text-white tracking-wide",
    color: "text-white",
    bgClass: "bg-[#050505]", // Pure soft black
    buttonClass:
      "bg-[#1A1A1A] text-gray-200 border border-[#333333] hover:border-gray-500 rounded-lg transition-all flex items-center justify-center",
    highlightClass: "bg-[#1A1A1A] border border-[#333333] rounded-lg",
    faqClass: "bg-[#0f0f0f] border border-[#222] rounded-lg text-gray-300",
  },
  {
    id: 26,
    title: "Swiss Red",
    fontClass:
      "font-sans text-[3rem] font-black tracking-tighter text-white leading-none",
    color: "text-white",
    bgClass: "bg-[#EE4444]", // Bold solid red
    buttonClass:
      "bg-transparent text-white border-[3px] border-white rounded-none hover:bg-white hover:text-[#EE4444] font-bold uppercase transition-all flex items-center justify-center",
    highlightClass: "bg-white/20 border-[3px] border-white rounded-none",
    faqClass:
      "bg-white/10 border-[2px] border-white/50 text-white rounded-none",
  },
  {
    id: 27,
    title: "Matcha Latte",
    fontClass: "font-serif text-[2.4rem] font-medium text-[#3f4d38] italic",
    color: "text-[#3f4d38]",
    bgClass: "bg-[#d4e4bc]", // Soft sage green
    buttonClass:
      "bg-[#95b86b] text-[#2c3e23] border border-[#7a9c54] rounded-[20px] shadow-[4px_4px_0px_#5c7a3d] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#5c7a3d] transition-all flex items-center justify-center font-semibold",
    highlightClass:
      "bg-[#95b86b] border border-[#7a9c54] rounded-[20px] shadow-[2px_2px_0px_#5c7a3d]",
    faqClass: "bg-[#e2edd3] border border-[#95b86b] text-[#3f4d38] rounded-xl",
  },
  {
    id: 28,
    title: "Coffee House",
    fontClass: "font-sans text-[2.3rem] font-bold text-[#4E342E]",
    color: "text-[#4E342E]",
    bgClass: "bg-[#F5E6CA]", // Creamy latte
    buttonClass:
      "bg-[#3E2723] text-[#F5E6CA] border border-[#3E2723] rounded-sm hover:bg-[#5D4037] transition-all uppercase tracking-widest text-sm flex items-center justify-center",
    highlightClass:
      "bg-[#3E2723] border border-[#3E2723] rounded-sm text-[#F5E6CA]",
    faqClass: "bg-[#e6d0a8] border border-[#3E2723] text-[#3E2723] rounded-sm",
  },
  {
    id: 29,
    title: "Wireframe",
    fontClass: "font-mono text-[2.2rem] font-normal text-black",
    color: "text-black",
    // CSS Grid Pattern
    bgClass:
      "bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px]",
    buttonClass:
      "bg-white text-black border border-black hover:bg-gray-50 rounded-none shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center",
    highlightClass: "bg-white border border-black rounded-none shadow-sm",
    faqClass: "bg-white border border-black rounded-none text-black",
  },
  {
    id: 30,
    title: "Luxury",
    fontClass: "font-serif text-[2.5rem] font-normal text-[#D4AF37]",
    color: "text-[#D4AF37]",
    bgClass: "bg-[#121212]", // Rich dark
    buttonClass:
      "bg-transparent text-[#D4AF37] border border-[#D4AF37] rounded-sm hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-500 font-serif flex items-center justify-center",
    highlightClass:
      "bg-[#121212] border border-[#D4AF37] rounded-sm text-[#D4AF37]",
    faqClass: "bg-[#1c1c1c] border border-[#D4AF37] text-[#D4AF37] rounded-sm",
  },
  {
    id: 31,
    title: "Gameboy",
    fontClass:
      "font-mono text-[2.0rem] font-bold text-[#0f380f] tracking-tight uppercase",
    color: "text-[#0f380f]",
    bgClass: "bg-[#8bac0f]", // The classic green screen color
    buttonClass:
      "bg-[#9bbc0f] text-[#0f380f] border-[3px] border-[#0f380f] rounded-md hover:bg-[#8bac0f] shadow-[3px_3px_0px_#306230] active:shadow-none active:translate-y-[3px] active:translate-x-[3px] transition-all flex items-center justify-center",
    highlightClass:
      "bg-[#9bbc0f] border-[3px] border-[#0f380f] rounded-md shadow-sm",
    faqClass:
      "bg-[#9bbc0f] border-[2px] border-[#0f380f] text-[#0f380f] rounded-md",
  },
  {
    id: 32,
    title: "Lavender Haze",
    fontClass: "font-sans text-[2.4rem] font-bold text-[#4c1d95]",
    color: "text-[#4c1d95]",
    bgClass: "bg-[#ede9fe]", // Very light purple solid
    buttonClass:
      "bg-white text-[#5b21b6] border-2 border-[#ddd6fe] rounded-full hover:border-[#8b5cf6] hover:text-[#4c1d95] transition-all shadow-sm flex items-center justify-center",
    highlightClass: "bg-white border-2 border-[#ddd6fe] rounded-full",
    faqClass: "bg-[#f5f3ff] border border-[#ddd6fe] text-[#5b21b6] rounded-xl",
  },
  {
    id: 41,
    title: "Eco Retro",
    fontClass:
      "font-sans text-[2.5rem] font-bold text-[#3E2723] tracking-tight",
    color: "text-[#3E2723]",
    bgClass: "bg-[#fcfcd4]", // The pale cream/yellow from your image
    buttonClass:
      "bg-[#8ab69b] text-[#3E2723] border-[3px] border-[#3E2723] rounded-md shadow-[4px_4px_0px_#3E2723] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center font-bold",
    highlightClass:
      "bg-[#8ab69b] border-[3px] border-[#3E2723] rounded-md shadow-[2px_2px_0px_#3E2723]",
    faqClass:
      "bg-[#e8e8c0] border-[2px] border-[#3E2723] rounded-md text-[#3E2723]",
  },

  // 2. Based on Old CRT TVs (Static noise grey BG, Phosphor Green Buttons)
  {
    id: 42,
    title: "CRT Terminal",
    fontClass: "font-mono text-[2.2rem] font-medium text-[#33ff00]",
    color: "text-[#33ff00]",
    bgClass: "bg-[#1a1a1a]", // Dark TV screen off color
    buttonClass:
      "bg-[#000000] text-[#33ff00] border-2 border-[#33ff00] rounded-none hover:bg-[#33ff00] hover:text-black transition-colors shadow-[0_0_10px_rgba(51,255,0,0.5)] flex items-center justify-center uppercase tracking-widest",
    highlightClass:
      "bg-[#000000] border-2 border-[#33ff00] rounded-none shadow-[0_0_5px_rgba(51,255,0,0.5)]",
    faqClass:
      "bg-[#0f0f0f] border border-[#33ff00] rounded-none text-[#33ff00]",
  },

  // 3. Based on 1970s TV Sets (Woodgrain & Beige Plastic)
  {
    id: 43,
    title: "70s Television",
    fontClass: "font-serif text-[2.4rem] font-bold text-[#3f2e18] italic",
    color: "text-[#3f2e18]",
    bgClass: "bg-[#dcbfa3]", // Beige plastic casing
    buttonClass:
      "bg-[#5c4033] text-[#eaddcf] border-4 border-[#2b1d12] rounded-xl hover:bg-[#4a332a] transition-all flex items-center justify-center shadow-md",
    highlightClass:
      "bg-[#5c4033] border-4 border-[#2b1d12] rounded-xl text-[#eaddcf]",
    faqClass:
      "bg-[#cbb094] border-2 border-[#5c4033] rounded-lg text-[#3f2e18]",
  },

  // 4. Unique Color Block: Purple & Lime (The "Joker" or "Evangelion" palette)
  {
    id: 44,
    title: "Toxic Pop",
    fontClass: "font-sans text-[2.6rem] font-black text-[#ccff00]",
    color: "text-[#ccff00]",
    bgClass: "bg-[#4b0082]", // Indigo/Deep Purple
    buttonClass:
      "bg-[#ccff00] text-[#4b0082] border-none rounded-full hover:scale-105 transition-transform shadow-[0px_0px_20px_rgba(204,255,0,0.4)] flex items-center justify-center font-bold",
    highlightClass: "bg-[#ccff00] rounded-full text-[#4b0082]",
    faqClass:
      "bg-[#5c1099] border-2 border-[#ccff00] rounded-2xl text-[#ccff00]",
  },

  // 5. Unique Color Block: Terra Cotta & Baby Blue (Southwest Vibe)
  {
    id: 45,
    title: "Santa Fe",
    fontClass: "font-sans text-[2.4rem] font-bold text-[#7c2d12]",
    color: "text-[#7c2d12]",
    bgClass: "bg-[#fdba74]", // Orange-ish peach
    buttonClass:
      "bg-[#bae6fd] text-[#0c4a6e] border-2 border-[#0c4a6e] rounded-md shadow-[4px_4px_0px_#0c4a6e] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center font-bold",
    highlightClass:
      "bg-[#bae6fd] border-2 border-[#0c4a6e] rounded-md shadow-sm",
    faqClass: "bg-[#ffedd5] border border-[#7c2d12] rounded-md text-[#7c2d12]",
  },

  // 6. High Contrast: Blue & Red (Primary Mismatch)
  {
    id: 46,
    title: "Stereo 3D",
    fontClass:
      "font-sans text-[2.5rem] font-black text-white italic tracking-tighter",
    color: "text-white",
    bgClass: "bg-[#0000ff]", // Pure Blue
    buttonClass:
      "bg-[#ff0000] text-white border-[4px] border-white rounded-none hover:bg-white hover:text-[#ff0000] hover:border-[#ff0000] transition-colors flex items-center justify-center uppercase",
    highlightClass: "bg-[#ff0000] border-[4px] border-white rounded-none",
    faqClass: "bg-[#0000cc] border-[2px] border-white rounded-none text-white",
  },

  // 7. Dark Mode: Charcoal & Mustard (Industrial)
  {
    id: 47,
    title: "Caution",
    fontClass: "font-mono text-[2.2rem] font-bold text-[#fbbf24]",
    color: "text-[#fbbf24]",
    bgClass: "bg-[#262626]", // Dark Grey
    buttonClass:
      "bg-[#fbbf24] text-black border border-[#fbbf24] rounded-sm bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.1)_25%,rgba(0,0,0,0.1)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.1)_100%)] [background-size:10px_10px] hover:bg-[#d97706] transition-colors flex items-center justify-center",
    highlightClass:
      "bg-[#fbbf24] border border-[#fbbf24] rounded-sm text-black",
    faqClass: "bg-[#333] border border-[#fbbf24] rounded-sm text-[#fbbf24]",
  },

  // 8. Soft Pastel Mismatch: Lilac & Yellow
  {
    id: 48,
    title: "Spring Picnic",
    fontClass: "font-serif text-[2.5rem] font-medium text-[#5b21b6] italic",
    color: "text-[#5b21b6]",
    bgClass: "bg-[#e9d5ff]", // Lilac
    buttonClass:
      "bg-[#fef08a] text-[#854d0e] border-2 border-white rounded-[2rem] shadow-sm hover:scale-105 transition-transform flex items-center justify-center",
    highlightClass: "bg-[#fef08a] border-2 border-white rounded-[2rem]",
    faqClass: "bg-white/50 border border-white rounded-xl text-[#5b21b6]",
  },
];
