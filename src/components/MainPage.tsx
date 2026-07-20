import React, { useState } from "react";
import { 
  Search, QrCode, Shield, Sun, Moon, Info, Sparkles, BookOpen, 
  HelpCircle, ChevronRight, Layers, ArrowRight, Printer, Share2 
} from "lucide-react";
import { ComponentData } from "../types";

// Safely parses and decodes SVG markup from a data URI, preventing URI malformed errors
function getSvgMarkup(imageUrl: string): string {
  if (!imageUrl || !imageUrl.startsWith("data:image/svg+xml")) return "";
  
  try {
    // Handle base64 encoded SVG
    if (imageUrl.includes(";base64,")) {
      const parts = imageUrl.split(";base64,");
      if (parts[1]) {
        return atob(parts[1].trim());
      }
    }
    
    // Extract raw SVG part from text/utf8 data URIs
    let rawSvg = imageUrl;
    if (imageUrl.includes("utf8,")) {
      rawSvg = imageUrl.split("utf8,")[1];
    } else if (imageUrl.includes("data:image/svg+xml,")) {
      rawSvg = imageUrl.split("data:image/svg+xml,")[1];
    } else {
      const commaIndex = imageUrl.indexOf(",");
      if (commaIndex !== -1) {
        rawSvg = imageUrl.slice(commaIndex + 1);
      }
    }
    
    if (!rawSvg) return "";

    // Try standard decodeURIComponent
    try {
      return decodeURIComponent(rawSvg);
    } catch (e) {
      // Fallback for raw/unencoded SVGs with hex characters or percents that break decodeURIComponent
      return rawSvg.replace(/%23/g, "#");
    }
  } catch (err) {
    console.error("Error parsing SVG markup:", err);
    return "";
  }
}


interface MainPageProps {
  components: ComponentData[];
  onSelectComponent: (slug: string) => void;
  onOpenScanner: () => void;
  onOpenAdmin: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function MainPage({
  components,
  onSelectComponent,
  onOpenScanner,
  onOpenAdmin,
  darkMode,
  onToggleDarkMode,
}: MainPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", ...Array.from(new Set(components.map((c) => c.category)))];

  const filteredComponents = components.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.functionDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.slug.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "Semua" || comp.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onDoubleClick={onOpenAdmin}
            title="EduKomponen Lab"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/20">
              <QrCode className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-700 to-sky-500 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent">
                EduKomponen QR
              </span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded font-mono font-semibold ml-2">
                SMK / TEKNIK
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Scan button */}
            <button
              onClick={onOpenScanner}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20"
              id="open-scanner-btn"
            >
              <QrCode className="w-4 h-4" />
              Scan QR Code
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 rounded-xl transition-all text-slate-600 dark:text-slate-300"
              id="theme-toggle-btn"
              title={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner Area */}
      <header className="bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900/30 dark:via-slate-950 dark:to-slate-950 border-b border-slate-150 dark:border-slate-850/80">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-900/40">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold font-mono tracking-wide uppercase">Metode Belajar Baru</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Belajar Komponen Teknik <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Langsung Dari QR Code</span>
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Platform edukasi interaktif teknik SMK &amp; Kuliah. Pindai QR Code yang tertempel pada perangkat keras di bengkel praktikum, atau cari manual melalui daftar di bawah untuk mempelajari cara kerja dan menguji pemahaman dengan kuis interaktif.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenScanner}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 group"
              >
                <QrCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Mulai Pindai QR Lab
              </button>
              <a
                href="#daftar-komponen"
                className="px-5 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 font-bold text-sm rounded-xl transition-all flex items-center gap-1.5"
              >
                Lihat Semua Materi
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            {/* Visual Schematic Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div className="w-3.5 h-3.5 bg-green-500 rounded-full animate-ping" />
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Diagram Alir Interaktif QR
                </span>
              </div>

              {/* Steps graphic */}
              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                  <div className="w-6 h-6 rounded bg-blue-600 text-white font-mono font-black flex items-center justify-center">1</div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-250">Gantung QR Code</h4>
                    <p className="text-[10px] text-slate-400">Tempel QR di modul mesin / alat bengkel</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                  <div className="w-6 h-6 rounded bg-blue-600 text-white font-mono font-black flex items-center justify-center">2</div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-250">Siswa Memindai</h4>
                    <p className="text-[10px] text-slate-400">Scan via kamera HP mengarah ke materi khusus</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
                  <div className="w-6 h-6 rounded bg-blue-600 text-white font-mono font-black flex items-center justify-center">3</div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-250">Uji Mandiri (Kuis)</h4>
                    <p className="text-[10px] text-slate-400">Menjawab kuis pilihan ganda &amp; terima skor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Search & Category Filter Section */}
      <section id="daftar-komponen" className="max-w-7xl mx-auto px-4 mt-12 space-y-6 scroll-mt-20">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-850 pb-5">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Materi Pembelajaran Komponen
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilih dari {components.length} komponen teknik berkualitas tinggi yang tersedia di database.
            </p>
          </div>

          {/* Search box input */}
          <div className="relative w-full md:max-w-xs" id="search-box-container">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari saklar, resistor, relay..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white shadow-sm"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                selectedCategory === cat
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Components Grid (All Components) */}
        {filteredComponents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((comp) => {
              const previewUrl = `${window.location.origin}/?p=${comp.slug}`;
              const quickQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(previewUrl)}`;

              return (
                <div 
                  key={comp.slug}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group hover:border-blue-200 dark:hover:border-blue-900/30"
                >
                  {/* Schematic/Image Container */}
                  <div 
                    className="aspect-[4/3] bg-slate-950 flex items-center justify-center p-6 relative cursor-pointer"
                    onClick={() => onSelectComponent(comp.slug)}
                  >
                    {getSvgMarkup(comp.imageUrl) ? (
                      <div 
                        className="w-full h-full max-h-[140px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        dangerouslySetInnerHTML={{ __html: getSvgMarkup(comp.imageUrl) }}
                      />
                    ) : (
                      <img
                        src={comp.imageUrl}
                        alt={comp.name}
                        className="object-contain w-full h-full max-h-[140px] transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Category Label */}
                    <span className="absolute top-3 left-3 bg-blue-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {comp.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 
                        onClick={() => onSelectComponent(comp.slug)}
                        className="font-bold text-lg text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        {comp.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {comp.functionDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 gap-2">
                      {/* Left direct printable mini QR visualizer */}
                      <div className="flex items-center gap-2 group/qr">
                        <div className="relative">
                          <img 
                            src={quickQrUrl} 
                            alt="Mini QR" 
                            className="w-8 h-8 object-contain bg-slate-50 dark:bg-slate-950 rounded border border-slate-150 dark:border-slate-800"
                            referrerPolicy="no-referrer"
                          />
                          {/* Floating interactive tooltip preview on hover */}
                          <div className="absolute bottom-10 left-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-2xl invisible group-hover/qr:visible w-40 flex flex-col items-center gap-2 z-20">
                            <img src={quickQrUrl} alt="Quick QR preview" className="w-28 h-28" />
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 text-center uppercase tracking-wider">
                              Scan QR Langsung
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          QR Lab
                        </span>
                      </div>

                      {/* Learn button */}
                      <button
                        onClick={() => onSelectComponent(comp.slug)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 group/btn"
                      >
                        Materi
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-0.5 group-hover/btn:text-white transition-all" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-12 text-center shadow-sm flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-full text-amber-500">
              <Info className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Komponen tidak ditemukan</h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Coba gunakan kata kunci pencarian yang lain atau pilih kategori yang sesuai.
            </p>
          </div>
        )}

      </section>

      {/* Info Help Section for students */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="bg-blue-600 rounded-3xl text-white p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
          
          <div className="space-y-3 relative z-10 max-w-xl">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">Siap Melakukan Praktikum Mandiri?</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Gunakan perangkat kamera ponsel Anda untuk memindai kode QR fisik yang ditempel pada alat-alat laboratorium, atau klik tombol pemindaian di atas untuk memulai simulasi interaktif.
            </p>
          </div>

          <div className="flex gap-3 relative z-10">
            <button
              onClick={onOpenScanner}
              className="px-5 py-3 bg-white hover:bg-blue-50 text-blue-600 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              Mulai Pindai Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Footer credits */}
      <footer className="mt-20 border-t border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-900 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left text-xs text-slate-400 dark:text-slate-500">
          <div>
            <p className="font-bold text-slate-600 dark:text-slate-400">EduKomponen QR Code - Website Pembelajaran Interaktif Teknik</p>
            <p className="mt-1">Dirancang khusus untuk SMK Teknik Kelistrikan, Mekatronika, Elektronika, &amp; Teknik Mesin.</p>
          </div>
          <div className="select-none cursor-pointer" onDoubleClick={onOpenAdmin} title="EduKomponen Lab">
            <p className="font-mono">Pindai • Pelajari • Kuasai Materi</p>
            <p className="mt-1">&copy; 2026 EduKomponen QR Lab</p>
          </div>
        </div>
      </footer>

      {/* Bottom Status Bar */}
      <div className="h-10 bg-slate-850 dark:bg-slate-900 text-slate-400 border-t border-slate-750 flex items-center justify-between px-8 text-[10px] shrink-0 font-sans">
        <div className="flex gap-4">
          <span>Copyright © 2026 EDU-Tech SMK</span>
          <span className="text-slate-500">•</span>
          <span>Sistem Pembelajaran Digital</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Sistem Online: Siap Pindai Barcode</span>
        </div>
      </div>

    </div>
  );
}
