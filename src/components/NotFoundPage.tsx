import React from "react";
import { motion } from "motion/react";
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react";
import { cn } from "../lib/utils";

interface NotFoundPageProps {
  darkMode?: boolean;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ darkMode = false }) => {
  const goHome = () => {
    window.location.href = "/";
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      goHome();
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-6 transition-colors relative overflow-hidden",
        darkMode ? "bg-[#121214] text-white" : "bg-slate-50 text-slate-900"
      )}
    >
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md w-full relative"
      >
        {/* Icon */}
        <div
          className={cn(
            "w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border",
            darkMode
              ? "bg-slate-900 border-slate-800 text-slate-500"
              : "bg-white border-slate-200 text-slate-400 shadow-sm"
          )}
        >
          <FileQuestion size={44} strokeWidth={1.5} />
        </div>

        {/* 404 */}
        <p className="text-7xl font-black tracking-tighter text-primary mb-2 font-mono">404</p>
        <h1 className="text-lg font-black uppercase tracking-widest mb-3">Page Not Found</h1>
        <p
          className={cn(
            "text-sm leading-relaxed mb-10",
            darkMode ? "text-zinc-400" : "text-slate-500"
          )}
        >
          The page{" "}
          <code
            className={cn(
              "px-1.5 py-0.5 rounded text-xs font-mono font-bold break-all",
              darkMode ? "bg-slate-800 text-rose-400" : "bg-slate-100 text-rose-600"
            )}
          >
            {window.location.pathname}
          </code>{" "}
          doesn't exist in the St. Andrew's eRequisitions Portal. It may have been moved, or the
          link you followed is incorrect.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={goHome}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home size={14} />
            Back to Dashboard
          </button>
          <button
            onClick={goBack}
            className={cn(
              "w-full sm:w-auto px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border cursor-pointer",
              darkMode
                ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
            )}
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        </div>

        {/* Hint */}
        <div
          className={cn(
            "mt-10 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest",
            darkMode ? "text-zinc-600" : "text-slate-400"
          )}
        >
          <Search size={12} />
          <span>Looking for a requisition? Use the global search on the dashboard.</span>
        </div>
      </motion.div>

      {/* Footer branding */}
      <p
        className={cn(
          "absolute bottom-6 text-[9px] font-black uppercase tracking-[0.25em]",
          darkMode ? "text-zinc-700" : "text-slate-300"
        )}
      >
        St. Andrew's PCEA eRequisitions Portal
      </p>
    </div>
  );
};
