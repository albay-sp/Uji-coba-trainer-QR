import React, { useState, useEffect } from "react";
import { QrCode, X, Search, Camera, Sparkles, Volume2, VolumeX } from "lucide-react";
import { ComponentData } from "../types";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: ComponentData[];
  onScanSuccess: (slug: string) => void;
}

export default function QRScannerModal({
  isOpen,
  onClose,
  components,
  onScanSuccess,
}: QRScannerModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Simulated scan success
            clearInterval(interval);
            setIsScanning(false);
            // Select a random component to simulate scan or a default one
            if (components.length > 0) {
              const randomIndex = Math.floor(Math.random() * components.length);
              const targetSlug = components[randomIndex].slug;
              triggerBeep();
              onScanSuccess(targetSlug);
            }
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  if (!isOpen) return null;

  // Sound generator using Web Audio API (Futuristic Scanner Beep)
  const triggerBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by browser policy");
    }
  };

  const filteredComponents = components.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startSimulatedScan = () => {
    setIsScanning(true);
    setProgress(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div 
        id="qr-scanner-card"
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-blue-600 text-white">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 height-5 text-blue-100 animate-pulse" />
            <span className="font-semibold text-lg tracking-tight">Simulasi QR Code & Scanner</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1 rounded-md hover:bg-white/10 text-white/80 transition-colors"
              title={soundEnabled ? "Nonaktifkan Suara" : "Aktifkan Suara"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-white/10 text-white transition-colors"
              id="close-scanner-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Scan Simulation View */}
          <div className="relative aspect-square max-w-[280px] mx-auto bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center text-center p-4 group">
            {isScanning ? (
              <>
                {/* Laser scan animation line */}
                <div 
                  className="absolute left-0 w-full h-1 bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-bounce z-10"
                  style={{ top: `${progress}%` }}
                />
                
                {/* HUD scan overlay */}
                <div className="absolute inset-4 border border-green-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 border-t-2 border-l-2 border-green-500 absolute top-0 left-0 rounded-tl"></div>
                  <div className="w-12 h-12 border-t-2 border-r-2 border-green-500 absolute top-0 right-0 rounded-tr"></div>
                  <div className="w-12 h-12 border-b-2 border-l-2 border-green-500 absolute bottom-0 left-0 rounded-bl"></div>
                  <div className="w-12 h-12 border-b-2 border-r-2 border-green-500 absolute bottom-0 right-0 rounded-br"></div>
                </div>

                <Camera className="w-12 h-12 text-green-500 animate-pulse mb-3" />
                <p className="text-green-400 font-mono text-xs tracking-widest uppercase">Memindai...</p>
                <div className="w-40 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                  <div className="bg-green-500 h-full transition-all duration-100" style={{ width: `${progress}%` }} />
                </div>
              </>
            ) : (
              <>
                {/* Corner highlights */}
                <div className="absolute inset-4 border border-blue-500/10 rounded-lg">
                  <div className="w-8 h-8 border-t-2 border-l-2 border-blue-500/40 absolute top-0 left-0 rounded-tl"></div>
                  <div className="w-8 h-8 border-t-2 border-r-2 border-blue-500/40 absolute top-0 right-0 rounded-tr"></div>
                  <div className="w-8 h-8 border-b-2 border-l-2 border-blue-500/40 absolute bottom-0 left-0 rounded-bl"></div>
                  <div className="w-8 h-8 border-b-2 border-r-2 border-blue-500/40 absolute bottom-0 right-0 rounded-br"></div>
                </div>

                <QrCode className="w-16 h-16 text-slate-700 dark:text-slate-500 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-slate-400 dark:text-slate-400 text-xs mt-3 px-2">
                  Gunakan kamera ponsel Anda untuk memindai QR fisik, atau klik tombol di bawah untuk mensimulasikan pemindaian QR di browser.
                </p>

                <button
                  onClick={startSimulatedScan}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
                  id="start-sim-scan-btn"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Mulai Simulasi Scan
                </button>
              </>
            )}
          </div>

          {/* Quick Select Search Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Atau Pilih Langsung Komponen:
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari komponen untuk diarahkan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>

            <div className="max-h-[180px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl">
              {filteredComponents.length > 0 ? (
                filteredComponents.map((component) => (
                  <button
                    key={component.slug}
                    onClick={() => {
                      triggerBeep();
                      onScanSuccess(component.slug);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 dark:hover:bg-slate-800/50 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {component.name}
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                        /#/komponen/{component.slug}
                      </div>
                    </div>
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-medium">
                      {component.category}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-slate-400 text-xs">
                  Komponen tidak ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono text-center w-full">
            EduKomponen QR System v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
