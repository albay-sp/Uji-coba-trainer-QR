import React, { useState, useEffect } from "react";
import { ComponentData } from "./types";
import { DEFAULT_COMPONENTS } from "./data/components";
import MainPage from "./components/MainPage";
import ComponentPage from "./components/ComponentPage";
import AdminPage from "./components/AdminPage";
import QRScannerModal from "./components/QRScannerModal";

const STORAGE_KEY = "edu_components_v1";
const THEME_KEY = "edu_theme_v1";

export default function App() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [activeComponentSlug, setActiveComponentSlug] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 1. Initialise Components from LocalStorage or Defaults
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setComponents(parsed);
        } else {
          setComponents(DEFAULT_COMPONENTS);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMPONENTS));
        }
      } catch (e) {
        setComponents(DEFAULT_COMPONENTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMPONENTS));
      }
    } else {
      setComponents(DEFAULT_COMPONENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMPONENTS));
    }

    // 2. Initialise Theme
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (storedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Default to light theme as requested, or check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      // Let's stick with comfortable light theme default
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 3. Simple Client-Side Router
  const parseUrlRoute = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(window.location.search);
    const pParam = searchParams.get("p");

    // Check pathname: /komponen/slug
    if (path.startsWith("/komponen/")) {
      const slug = path.split("/komponen/")[1]?.toLowerCase().trim();
      if (slug) {
        setActiveComponentSlug(slug);
        setIsAdminOpen(false);
        return;
      }
    }

    // Check hash: #/komponen/slug
    if (hash.startsWith("#/komponen/")) {
      const slug = hash.split("#/komponen/")[1]?.toLowerCase().trim();
      if (slug) {
        setActiveComponentSlug(slug);
        setIsAdminOpen(false);
        return;
      }
    }

    // Check query parameter: ?p=slug
    if (pParam) {
      const cleanParam = pParam.toLowerCase().trim();
      if (cleanParam === "admin") {
        setIsAdminOpen(true);
        setActiveComponentSlug(null);
      } else {
        setActiveComponentSlug(cleanParam);
        setIsAdminOpen(false);
      }
      return;
    }

    // Check admin hash: #/admin or pathname /admin
    if (hash === "#/admin" || path === "/admin") {
      setIsAdminOpen(true);
      setActiveComponentSlug(null);
      return;
    }

    // Default home state
    setActiveComponentSlug(null);
    setIsAdminOpen(false);
  };

  useEffect(() => {
    parseUrlRoute();
    window.addEventListener("popstate", parseUrlRoute);
    window.addEventListener("hashchange", parseUrlRoute);
    return () => {
      window.removeEventListener("popstate", parseUrlRoute);
      window.removeEventListener("hashchange", parseUrlRoute);
    };
  }, []);

  // 4. Custom Navigation Wrappers
  const navigateToComponent = (slug: string) => {
    window.history.pushState(null, "", `/?p=${slug}`);
    setActiveComponentSlug(slug);
    setIsAdminOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    window.history.pushState(null, "", "/");
    setActiveComponentSlug(null);
    setIsAdminOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAdmin = () => {
    window.history.pushState(null, "", "/?p=admin");
    setIsAdminOpen(true);
    setActiveComponentSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 5. Admin and State operations
  const handleSaveComponents = (updated: ComponentData[]) => {
    setComponents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleResetToDefault = () => {
    if (window.confirm("Apakah Anda yakin ingin menyetel ulang data komponen ke bawaan default sistem? Semua data buatan Anda akan terhapus.")) {
      setComponents(DEFAULT_COMPONENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COMPONENTS));
    }
  };

  const handleToggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
  };

  const activeComponent = components.find((c) => c.slug === activeComponentSlug);

  return (
    <>
      {/* Route Views switcher */}
      {isAdminOpen ? (
        <AdminPage
          components={components}
          onSave={handleSaveComponents}
          onResetToDefault={handleResetToDefault}
          onBack={navigateToHome}
        />
      ) : activeComponentSlug && activeComponent ? (
        <ComponentPage
          component={activeComponent}
          onBack={navigateToHome}
        />
      ) : activeComponentSlug && !activeComponent ? (
        // 404 View
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/40 text-rose-600 rounded-full flex items-center justify-center font-extrabold text-2xl">
            !
          </div>
          <div>
            <h2 className="text-xl font-bold">Materi Komponen Tidak Ditemukan</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-sm">
              Komponen dengan alamat <strong>/komponen/{activeComponentSlug}</strong> belum terdaftar di database laboratorium.
            </p>
          </div>
          <button
            onClick={navigateToHome}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      ) : (
        <MainPage
          components={components}
          onSelectComponent={navigateToComponent}
          onOpenScanner={() => setIsScannerOpen(true)}
          onOpenAdmin={navigateToAdmin}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}

      {/* QR Scanner Global Modal Overlay */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        components={components}
        onScanSuccess={(slug) => {
          setIsScannerOpen(false);
          navigateToComponent(slug);
        }}
      />
    </>
  );
}
