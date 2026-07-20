import React, { useState } from "react";
import { 
  ArrowLeft, Plus, Trash2, Save, RotateCcw, AlertCircle, CheckCircle2, 
  HelpCircle, Sparkles, FileDown, FileUp, Edit2, Play, BookOpen 
} from "lucide-react";
import { ComponentData, QuizQuestion } from "../types";

interface AdminPageProps {
  components: ComponentData[];
  onSave: (updatedComponents: ComponentData[]) => void;
  onResetToDefault: () => void;
  onBack: () => void;
}

const CATEGORIES = ["Elektronika", "Kelistrikan", "Otomotif", "Mekatronika", "Robotika", "Telekomunikasi"];

export default function AdminPage({
  components,
  onSave,
  onResetToDefault,
  onBack,
}: AdminPageProps) {
  const [activeComponent, setActiveComponent] = useState<ComponentData | null>(null);
  const [isNew, setIsNew] = useState(false);
  
  // Form States
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Elektronika");
  const [imageUrl, setImageUrl] = useState("");
  const [functionDescription, setFunctionDescription] = useState("");
  const [workingPrinciple, setWorkingPrinciple] = useState<string[]>([""]);
  const [types, setTypes] = useState<string[]>([""]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>(
    Array(5).fill(null).map(() => ({
      question: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0
    }))
  );

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSelectComponent = (comp: ComponentData) => {
    setActiveComponent(comp);
    setIsNew(false);
    setSlug(comp.slug);
    setName(comp.name);
    setCategory(comp.category);
    setImageUrl(comp.imageUrl);
    setFunctionDescription(comp.functionDescription);
    setWorkingPrinciple([...comp.workingPrinciple]);
    setTypes([...comp.types]);
    setYoutubeUrl(comp.youtubeUrl);
    setQuiz(comp.quiz.map(q => ({
      question: q.question,
      options: [...q.options],
      correctAnswerIndex: q.correctAnswerIndex
    })));
  };

  const handleCreateNew = () => {
    setActiveComponent(null);
    setIsNew(true);
    setSlug("");
    setName("");
    setCategory("Elektronika");
    setImageUrl("");
    setFunctionDescription("");
    setWorkingPrinciple([""]);
    setTypes([""]);
    setYoutubeUrl("");
    setQuiz(
      Array(5).fill(null).map(() => ({
        question: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0
      }))
    );
  };

  // Working Principle Handlers
  const handleAddStep = () => {
    setWorkingPrinciple([...workingPrinciple, ""]);
  };

  const handleRemoveStep = (index: number) => {
    if (workingPrinciple.length > 1) {
      setWorkingPrinciple(workingPrinciple.filter((_, i) => i !== index));
    }
  };

  const handleStepChange = (index: number, val: string) => {
    const updated = [...workingPrinciple];
    updated[index] = val;
    setWorkingPrinciple(updated);
  };

  // Component Types Handlers
  const handleAddType = () => {
    setTypes([...types, ""]);
  };

  const handleRemoveType = (index: number) => {
    if (types.length > 1) {
      setTypes(types.filter((_, i) => i !== index));
    }
  };

  const handleTypeChange = (index: number, val: string) => {
    const updated = [...types];
    updated[index] = val;
    setTypes(updated);
  };

  // Quiz Handlers
  const handleQuizQuestionChange = (qIndex: number, val: string) => {
    const updated = [...quiz];
    updated[qIndex].question = val;
    setQuiz(updated);
  };

  const handleQuizOptionChange = (qIndex: number, oIndex: number, val: string) => {
    const updated = [...quiz];
    updated[qIndex].options[oIndex] = val;
    setQuiz(updated);
  };

  const handleQuizAnswerChange = (qIndex: number, val: number) => {
    const updated = [...quiz];
    updated[qIndex].correctAnswerIndex = val;
    setQuiz(updated);
  };

  // Validation & Save
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      triggerNotification("error", "Nama Komponen wajib diisi!");
      return;
    }

    const calculatedSlug = slug.trim() 
      ? slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-")
      : name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "-");

    if (!calculatedSlug) {
      triggerNotification("error", "Slug tidak valid atau tidak bisa di-generate!");
      return;
    }

    // Check for duplicates
    if (isNew && components.some(c => c.slug === calculatedSlug)) {
      triggerNotification("error", `Komponen dengan slug '/${calculatedSlug}' sudah terdaftar!`);
      return;
    }

    // Format YouTube Embed URL if necessary
    let formattedYoutube = youtubeUrl.trim();
    if (formattedYoutube) {
      // Convert standard watch links to embed links
      if (formattedYoutube.includes("youtube.com/watch?v=")) {
        const id = formattedYoutube.split("v=")[1]?.split("&")[0];
        if (id) formattedYoutube = `https://www.youtube.com/embed/${id}`;
      } else if (formattedYoutube.includes("youtu.be/")) {
        const id = formattedYoutube.split("youtu.be/")[1]?.split("?")[0];
        if (id) formattedYoutube = `https://www.youtube.com/embed/${id}`;
      }
    }

    // Default SVG if empty
    const finalImageUrl = imageUrl.trim() || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%230f172a" rx="12"/><g stroke="%2338bdf8" stroke-width="3" fill="none" stroke-linecap="round"><circle cx="200" cy="150" r="50" stroke="%2338bdf8"/><path d="M150 150 h100" stroke="%2360a5fa"/><text x="200" y="80" fill="%2360a5fa" font-family="monospace" font-size="16" text-anchor="middle">${name.toUpperCase()}</text></g><text x="200" y="240" fill="%2394a3b8" font-family="sans-serif" font-size="14" text-anchor="middle">Ilustrasi Komponen Otomatis</text></svg>`;

    const cleanedWorkingPrinciple = workingPrinciple.filter(step => step.trim() !== "");
    const cleanedTypes = types.filter(type => type.trim() !== "");

    const newComponent: ComponentData = {
      slug: calculatedSlug,
      name: name.trim(),
      category,
      imageUrl: finalImageUrl,
      functionDescription: functionDescription.trim() || "Fungsi komponen belum ditambahkan.",
      workingPrinciple: cleanedWorkingPrinciple.length > 0 ? cleanedWorkingPrinciple : ["Prinsip kerja belum ditambahkan."],
      types: cleanedTypes.length > 0 ? cleanedTypes : ["Jenis tidak terperinci."],
      youtubeUrl: formattedYoutube,
      quiz: quiz.map(q => ({
        question: q.question.trim() || "Pertanyaan kuis kosong?",
        options: q.options.map(opt => opt.trim() || "Pilihan Kosong"),
        correctAnswerIndex: q.correctAnswerIndex
      }))
    };

    let updatedComponents: ComponentData[];
    if (isNew) {
      updatedComponents = [...components, newComponent];
    } else {
      updatedComponents = components.map(c => c.slug === activeComponent?.slug ? newComponent : c);
    }

    onSave(updatedComponents);
    triggerNotification("success", `Komponen '${name}' berhasil disimpan!`);
    
    // Select the saved component
    setActiveComponent(newComponent);
    setIsNew(false);
  };

  const handleDeleteComponent = (slugToDelete: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus komponen ini secara permanen?")) {
      const updated = components.filter(c => c.slug !== slugToDelete);
      onSave(updated);
      triggerNotification("success", "Komponen berhasil dihapus!");
      setActiveComponent(null);
      setIsNew(false);
    }
  };

  // Export & Import
  const handleExportData = () => {
    try {
      const jsonStr = JSON.stringify(components, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `edukasi-komponen-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerNotification("success", "Data berhasil di-ekspor sebagai file JSON!");
    } catch (e) {
      triggerNotification("error", "Gagal meng-ekspor data.");
    }
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].slug && parsed[0].name) {
          onSave(parsed);
          triggerNotification("success", `Berhasil meng-impor ${parsed.length} data komponen!`);
        } else {
          triggerNotification("error", "Format file JSON tidak sesuai spesifikasi!");
        }
      } catch (err) {
        triggerNotification("error", "Gagal membaca berkas JSON. Periksa sintaks file!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/15 rounded-xl transition-all"
              title="Kembali ke Dashboard Utama"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Dashboard Admin</h1>
              <p className="text-blue-100 text-sm mt-1">Kelola data komponen edukasi interaktif teknik SMK/Mahasiswa</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onResetToDefault}
              className="px-3.5 py-1.5 bg-blue-800/80 hover:bg-blue-800 text-white hover:text-blue-50 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 border border-blue-500/30"
              title="Reset Database ke default bawaan sistem"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Bawaan
            </button>
            <button
              onClick={handleExportData}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              title="Ekspor seluruh komponen ke JSON"
            >
              <FileDown className="w-3.5 h-3.5" />
              Ekspor JSON
            </button>
            <label className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
              <FileUp className="w-3.5 h-3.5" />
              Impor JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Main Panel Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        
        {/* Toast Notification */}
        {notification && (
          <div className={`p-4 mb-6 rounded-2xl flex items-center gap-3 border ${
            notification.type === "success" 
              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/50" 
              : "bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border-rose-100 dark:border-rose-900/50"
          } transition-all`}>
            {notification.type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar - Component List (4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 shadow-sm flex flex-col h-[calc(100vh-200px)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Daftar Komponen ({components.length})
              </h2>
              <button
                onClick={handleCreateNew}
                className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                title="Tambah Komponen Baru"
              >
                <Plus className="w-4 h-4" />
                Baru
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {components.map((comp) => (
                <div 
                  key={comp.slug}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between group transition-all cursor-pointer ${
                    activeComponent?.slug === comp.slug && !isNew
                      ? "bg-blue-50/80 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50"
                      : "bg-slate-50/50 dark:bg-slate-800/30 border-slate-150 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/70"
                  }`}
                  onClick={() => handleSelectComponent(comp)}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {comp.name}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-mono truncate">
                      ?p={comp.slug}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full mr-2">
                      {comp.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteComponent(comp.slug);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded"
                      title="Hapus Komponen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor Area (8 cols) */}
          <div className="lg:col-span-8">
            {activeComponent || isNew ? (
              <form 
                onSubmit={handleSaveForm}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                      {isNew ? "Tambah Komponen Baru" : `Edit Komponen: ${activeComponent?.name}`}
                    </h2>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Komponen
                  </button>
                </div>

                {/* Section 1: Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-l-2 border-blue-500 pl-2">
                    1. Informasi Utama
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                        Nama Komponen <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (isNew) {
                            setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, ""));
                          }
                        }}
                        placeholder="Contoh: Transistor"
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                        Kategori Komponen
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                        Slug URL Unik (Biarkan kosong untuk otomatis)
                      </label>
                      <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <span className="bg-slate-100 dark:bg-slate-850 px-3 py-2.5 text-xs text-slate-400 font-mono border-r border-slate-200 dark:border-slate-700 flex items-center">
                          ?p=
                        </span>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "-"))}
                          placeholder="transistor-npn"
                          className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 outline-none text-sm font-mono dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                        URL Gambar / Kode Base64 (Kosongkan untuk SVG Otomatis)
                      </label>
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Mendukung https://... atau data:image/..."
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                      Fungsi Komponen (Ringkasan)
                    </label>
                    <textarea
                      rows={3}
                      value={functionDescription}
                      onChange={(e) => setFunctionDescription(e.target.value)}
                      placeholder="Jelaskan fungsi komponen ini dalam beberapa kalimat..."
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white resize-y"
                    />
                  </div>
                </div>

                {/* Section 2: Steps / Working Principles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-l-2 border-blue-500 pl-2">
                      2. Cara Kerja (Langkah-demi-Langkah)
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddStep}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Langkah
                    </button>
                  </div>

                  <div className="space-y-3">
                    {workingPrinciple.map((step, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-7 h-7 flex-shrink-0 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center font-mono font-bold text-xs">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          required
                          value={step}
                          onChange={(e) => handleStepChange(index, e.target.value)}
                          placeholder={`Langkah ke-${index + 1}`}
                          className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(index)}
                          disabled={workingPrinciple.length <= 1}
                          className="p-2 text-slate-400 hover:text-rose-500 disabled:opacity-30 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Component Types & YouTube Video */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Types */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-l-2 border-blue-500 pl-2">
                        3. Jenis-Jenis Komponen
                      </h3>
                      <button
                        type="button"
                        onClick={handleAddType}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Tambah Jenis
                      </button>
                    </div>

                    <div className="space-y-2">
                      {types.map((type, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            required
                            value={type}
                            onChange={(e) => handleTypeChange(index, e.target.value)}
                            placeholder={`Contoh: NPN, PNP, MOSFET`}
                            className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs dark:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveType(index)}
                            disabled={types.length <= 1}
                            className="p-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-30 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* YouTube Embed */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-l-2 border-blue-500 pl-2">
                      4. Video Pembelajaran (YouTube)
                    </h3>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                        Link Video YouTube (Biasa / Share / Embed)
                      </label>
                      <input
                        type="text"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="Contoh: https://www.youtube.com/watch?v=..."
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white font-mono"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Sistem akan mengonversi link menjadi format embed yang didukung secara otomatis.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Quiz Section (5 MCQ Questions) */}
                <div className="space-y-6 pt-2">
                  <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-l-2 border-blue-500 pl-2">
                    5. Kuis Pilihan Ganda (Minimal 5 Soal)
                  </h3>

                  <div className="space-y-6">
                    {quiz.map((q, qIndex) => (
                      <div 
                        key={qIndex} 
                        className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4"
                      >
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-600 text-white font-bold text-xs px-2.5 py-1 rounded-full">
                            Soal {qIndex + 1}
                          </span>
                          <input
                            type="text"
                            required
                            value={q.question}
                            onChange={(e) => handleQuizQuestionChange(qIndex, e.target.value)}
                            placeholder={`Pertanyaan untuk Soal ${qIndex + 1}`}
                            className="flex-1 px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-white font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                          {q.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-400 uppercase">
                                {String.fromCharCode(97 + oIndex)}.
                              </span>
                              <input
                                type="text"
                                required
                                value={option}
                                onChange={(e) => handleQuizOptionChange(qIndex, oIndex, e.target.value)}
                                placeholder={`Pilihan jawaban ${String.fromCharCode(97 + oIndex).toUpperCase()}`}
                                className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs dark:text-white"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pl-4">
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Jawaban yang Benar:
                          </span>
                          <select
                            value={q.correctAnswerIndex}
                            onChange={(e) => handleQuizAnswerChange(qIndex, parseInt(e.target.value))}
                            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 dark:text-white font-medium"
                          >
                            <option value={0}>Pilihan A</option>
                            <option value={1}>Pilihan B</option>
                            <option value={2}>Pilihan C</option>
                            <option value={3}>Pilihan D</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Footer */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (isNew) {
                        setIsNew(false);
                      } else {
                        setActiveComponent(null);
                      }
                    }}
                    className="px-5 py-2.5 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-xl transition-all"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Simpan Komponen
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-12 text-center shadow-sm flex flex-col items-center justify-center space-y-4 h-[calc(100vh-200px)]">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-full text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Selamat datang di Panel Editor!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-sm">
                    Pilih salah satu komponen dari menu di sebelah kiri untuk mulai mengedit data, atau klik tombol <strong>Baru</strong> untuk menambahkan materi baru.
                  </p>
                </div>
                <button
                  onClick={handleCreateNew}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Buat Komponen Baru
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
