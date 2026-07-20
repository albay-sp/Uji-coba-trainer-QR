import React, { useState } from "react";
import { 
  ArrowLeft, Share2, ZoomIn, ZoomOut, RotateCw, Play, 
  Award, RefreshCw, CheckCircle, XCircle, QrCode, Download, Copy, Check, Sparkles 
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

interface ComponentPageProps {
  component: ComponentData;
  onBack: () => void;
}

export default function ComponentPage({ component, onBack }: ComponentPageProps) {
  // Zoom States
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // General States
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // Direct Page URL calculation
  const getFullUrl = () => {
    const origin = window.location.origin;
    return `${origin}/?p=${component.slug}`;
  };

  const handleShare = async () => {
    const url = getFullUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `EduKomponen - ${component.name}`,
          text: `Ayo pelajari komponen teknik "${component.name}" interaktif beserta kuis singkatnya!`,
          url: url,
        });
      } catch (e) {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Magnifier Drag and Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Bounds limit for pan
    const limit = (zoomScale - 1) * 150;
    setPanOffset({
      x: Math.max(-limit, Math.min(limit, newX)),
      y: Math.max(-limit, Math.min(limit, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset Zoom
  const resetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Quiz evaluation
  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIndex]: optIndex
    });
  };

  const handleQuizSubmit = () => {
    if (Object.keys(selectedAnswers).length < component.quiz.length) {
      alert("Harap jawab semua soal terlebih dahulu!");
      return;
    }

    let score = 0;
    component.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        score++;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleQuizReset = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const getMotivationMessage = (score: number, total: number) => {
    const percent = (score / total) * 100;
    if (percent === 100) {
      return {
        title: "Sempurna! Luar Biasa!",
        text: "Anda memahami seluruh materi komponen ini dengan sempurna! Pertahankan prestasi belajar Anda!",
        color: "text-emerald-600 dark:text-emerald-400"
      };
    } else if (percent >= 80) {
      return {
        title: "Hebat sekali!",
        text: "Hampir sempurna! Anda sudah sangat menguasai prinsip kerja komponen ini.",
        color: "text-blue-600 dark:text-blue-400"
      };
    } else if (percent >= 60) {
      return {
        title: "Bagus! Teruskan belajar!",
        text: "Pemahaman Anda sudah baik. Review kembali beberapa langkah yang salah untuk menguasai materi.",
        color: "text-amber-600 dark:text-amber-400"
      };
    } else {
      return {
        title: "Jangan menyerah, coba lagi!",
        text: "Silakan baca kembali cara kerja dan tonton videonya, lalu ujilah kemampuan Anda sekali lagi!",
        color: "text-rose-600 dark:text-rose-400"
      };
    }
  };

  const motivation = getMotivationMessage(quizScore, component.quiz.length);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(getFullUrl())}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-16">
      
      {/* Header bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-30 shadow-sm transition-all">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            id="back-to-home-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>

          <span className="text-xs bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
            {component.category}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQRModal(true)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-600 dark:text-slate-300"
              title="Tampilkan QR Code Komponen"
            >
              <QrCode className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
              title="Bagikan halaman ini"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? "Tersalin!" : "Bagikan"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Content (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                  {component.name}
                </h1>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                  {component.category}
                </p>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-850 px-2.5 py-1 rounded-md mt-2 inline-block">
                  ID: {component.slug.toUpperCase()}
                </span>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Share2 className="w-4 h-4 text-slate-500" />
                {copied ? "Tersalin!" : "Bagikan"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Gallery Area */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm">
                <div 
                  className="aspect-square w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center cursor-zoom-in relative"
                  onClick={() => {
                    setIsZoomed(true);
                    setZoomScale(1.5);
                  }}
                >
                  {getSvgMarkup(component.imageUrl) ? (
                    <div 
                      className="w-full h-full p-4 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: getSvgMarkup(component.imageUrl) }}
                    />
                  ) : (
                    <img
                      src={component.imageUrl}
                      alt={component.name}
                      className="object-contain w-full h-full max-h-[220px] transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <span className="absolute bottom-2 right-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded cursor-pointer">Klik untuk Zoom</span>
                </div>
                <div className="mt-3 flex gap-2 justify-center">
                  <div className="w-10 h-10 border-2 border-blue-500 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="w-10 h-10 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-100 dark:bg-slate-800" />
                  <div className="w-10 h-10 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>

              {/* Descriptive Info */}
              <div className="space-y-6">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Fungsi</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    {component.functionDescription}
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Jenis-jenis</h3>
                  <div className="flex flex-wrap gap-2">
                    {component.types.map((type, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs text-slate-600 dark:text-slate-300 shadow-sm">
                        {type}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Steps & Cara Kerja */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Prinsip &amp; Cara Kerja</h3>
              <ul className="space-y-3">
                {component.workingPrinciple.map((step, idx) => (
                  <li key={idx} className="flex gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Lab QR card inside left panel for neat layout */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800 w-28 h-28 flex-shrink-0 flex items-center justify-center">
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-2 flex-1">
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Sistem Scan QR Kode Lab</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Cetak QR Code ini dan tempelkan pada kotak komponen di laboratorium. Siswa cukup memindai dengan kamera HP untuk membaca panduan ini secara cepat.
                </p>
                <div className="flex gap-2 pt-1">
                  <a href={qrCodeUrl} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1">
                    <Download className="w-3 h-3" /> Unduh QR
                  </a>
                  <button onClick={() => copyToClipboard(getFullUrl())} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1">
                    <Copy className="w-3 h-3" /> Salin Tautan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Multimedia & Quiz (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-slate-100/40 dark:bg-slate-900/30 border-l border-slate-200/50 dark:border-slate-800/50 p-6 rounded-2xl md:p-8 space-y-6">
            
            {/* Video Learning Section */}
            <section className="shrink-0 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
                Video Pembelajaran
              </h3>
              
              {component.youtubeUrl ? (
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border-4 border-white dark:border-slate-800 shadow-sm relative">
                  <iframe
                    src={component.youtubeUrl}
                    title={`Video Pembelajaran ${component.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full absolute inset-0"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-xl bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center text-center p-4 space-y-1.5 border border-dashed border-slate-300 dark:border-slate-800">
                  <Play className="w-5 h-5 text-slate-400" />
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-xs">Video belum tersedia</h4>
                  <p className="text-[10px] text-slate-400 max-w-xs">
                    Materi video pembelajaran tambahan akan ditambahkan oleh instruktur.
                  </p>
                </div>
              )}
            </section>

            {/* Quiz Section */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Kuis Singkat: {component.name}</h3>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded-full uppercase">
                  {component.quiz.length} Soal
                </span>
              </div>

              {/* Quiz Results Banner */}
              {quizSubmitted && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-slate-850 dark:to-slate-800 rounded-xl border border-blue-100 dark:border-slate-700 flex flex-col items-center gap-3 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex flex-col items-center justify-center text-white font-mono shadow-md">
                    <span className="text-2xl font-extrabold">{quizScore}</span>
                    <span className="text-[10px] opacity-80 border-t border-white/20 w-10 text-center pt-0.5">/{component.quiz.length}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className={`text-sm font-bold ${motivation.color}`}>
                      {motivation.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {motivation.text}
                    </p>
                  </div>

                  <button
                    onClick={handleQuizReset}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg shadow-md transition-all flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Ulangi Kuis
                  </button>
                </div>
              )}

              {/* Quiz Questions List */}
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-1">
                {component.quiz.map((q, qIdx) => {
                  const isCorrect = selectedAnswers[qIdx] === q.correctAnswerIndex;
                  const isAnswered = selectedAnswers[qIdx] !== undefined;

                  return (
                    <div key={qIdx} className="space-y-2 border-b border-slate-50 dark:border-slate-850 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
                        <span className="text-blue-600 dark:text-blue-400 font-mono font-black mr-1.5">
                          {qIdx + 1}.
                        </span>
                        {q.question}
                      </h4>

                      <div className="space-y-1.5 pl-3">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedAnswers[qIdx] === oIdx;
                          const isCorrectOption = oIdx === q.correctAnswerIndex;

                          let buttonClass = "bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-850/40 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800/80";
                          let icon = null;

                          if (quizSubmitted) {
                            if (isCorrectOption) {
                              buttonClass = "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/80 font-semibold";
                              icon = <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />;
                            } else if (isSelected) {
                              buttonClass = "bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800/80";
                              icon = <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 flex-shrink-0" />;
                            } else {
                              buttonClass = "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800 opacity-60";
                            }
                          } else if (isSelected) {
                            buttonClass = "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-400 dark:border-blue-900 font-semibold";
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleSelectAnswer(qIdx, oIdx)}
                              className={`w-full p-2.5 rounded-lg border text-left text-xs flex items-center justify-between gap-2 transition-all ${buttonClass}`}
                            >
                              <span className="flex-1">
                                <span className="font-bold text-[10px] uppercase mr-1.5 opacity-60">
                                  {String.fromCharCode(97 + oIdx)}.
                                </span>
                                {opt}
                              </span>
                              {icon}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quiz Submit Bar */}
              {!quizSubmitted && (
                <div className="border-t border-slate-100 dark:border-slate-850 pt-4 flex flex-col gap-2">
                  <p className="text-[10px] text-slate-400 italic">
                    "Teruslah belajar, masa depan ada di tanganmu!"
                  </p>
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(selectedAnswers).length < component.quiz.length}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Kirim Jawaban Anda
                  </button>
                </div>
              )}
            </section>
          </div>

        </div>

      </div>

      {/* ZOOM MODAL LIGHTBOX */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          {/* Header zoom controls */}
          <div 
            className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight">{component.name}</span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded font-mono">
                Zoom {Math.round(zoomScale * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoomScale(prev => Math.max(1, prev - 0.25))}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoomScale(prev => Math.min(3, prev + 0.25))}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={resetZoom}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-xs font-mono font-bold"
                title="Reset Zoom"
              >
                1:1
              </button>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-2 bg-white/15 hover:bg-white/25 rounded-lg transition-colors ml-2"
                title="Tutup Zoom"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Interactive Image Display Area */}
          <div 
            className="w-full max-w-3xl aspect-square flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div 
              className="w-full h-full p-6 flex items-center justify-center transition-transform duration-100 ease-out select-none"
              style={{ 
                transform: `scale(${zoomScale}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                cursor: zoomScale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-out"
              }}
              onClick={() => {
                if (zoomScale > 1) {
                  resetZoom();
                } else {
                  setIsZoomed(false);
                }
              }}
            >
              {getSvgMarkup(component.imageUrl) ? (
                <div 
                  className="w-full h-full max-w-[500px]"
                  dangerouslySetInnerHTML={{ __html: getSvgMarkup(component.imageUrl) }}
                />
              ) : (
                <img
                  src={component.imageUrl}
                  alt={component.name}
                  className="object-contain max-h-[80vh] pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </div>

          <div className="absolute bottom-6 text-center text-slate-400 text-xs">
            {zoomScale > 1 ? "Seret gambar untuk menggeser detail skematik" : "Gunakan tombol di pojok kanan atas untuk memperbesar"}
          </div>
        </div>
      )}

      {/* QUICK INDIVIDUAL QR MODAL */}
      {showQRModal && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowQRModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800 p-6 max-w-sm w-full space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Kode QR Lab: {component.name}</h3>
              <button 
                onClick={() => setShowQRModal(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850 w-48 h-48 flex items-center justify-center">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                Pindai kode QR ini langsung dari layar untuk membuka materi komponen {component.name} di perangkat pintar Anda!
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={qrCodeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl text-center shadow-sm"
              >
                Unduh Gambar
              </a>
              <button
                onClick={() => copyToClipboard(getFullUrl())}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl"
              >
                Salin Tautan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Admin Bar */}
      <div className="h-10 bg-slate-850 dark:bg-slate-900 text-slate-400 border-t border-slate-750 flex items-center justify-between px-8 text-[10px] shrink-0 font-sans mt-12">
        <div className="flex gap-4">
          <span>Copyright © 2026 EDU-Tech SMK</span>
          <span className="text-slate-500">•</span>
          <button onClick={onBack} className="hover:text-white transition-colors">Kembali ke Beranda</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Sistem Online: Siap Pindai Barcode</span>
        </div>
      </div>

    </div>
  );
}
