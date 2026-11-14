import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { WifiOff, RefreshCw, Signal, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

interface OfflinePageProps {
  darkMode?: boolean;
  /** Called when connectivity is restored and the user clicks continue (defaults to reload). */
  onRetry?: () => void;
}

export const OfflinePage: React.FC<OfflinePageProps> = ({ darkMode = false, onRetry }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [backOnline, setBackOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setBackOnline(true);
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  const handleRetry = async () => {
    if (backOnline) {
      if (onRetry) onRetry();
      else window.location.reload();
      return;
    }
    setIsChecking(true);
    try {
      // Active reachability probe — navigator.onLine can report false positives
      await fetch("/api/health", { cache: "no-store", signal: AbortSignal.timeout(5000) });
      setBackOnline(true);
    } catch {
      // Still offline
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-6 transition-colors relative overflow-hidden",
        darkMode ? "bg-[#121214] text-white" : "bg-slate-50 text-slate-900"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md w-full"
      >
        {/* Animated icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div
            className={cn(
              "absolute inset-0 rounded-[2rem] border flex items-center justify-center",
              backOnline
                ? "bg-emerald-50 border-emerald-200 text-emerald-500 dark:bg-emerald-950/40 dark:border-emerald-900"
                : darkMode
                ? "bg-slate-900 border-slate-800 text-amber-500"
                : "bg-white border-slate-200 text-amber-500 shadow-sm"
            )}
          >
            {backOnline ? (
              <CheckCircle2 size={44} strokeWidth={1.5} />
            ) : (
              <WifiOff size={44} strokeWidth={1.5} />
            )}
          </div>
          {!backOnline && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 animate-pulse border-2 border-white dark:border-[#121214]" />
          )}
        </div>

        <h1 className="text-lg font-black uppercase tracking-widest mb-3">
          {backOnline ? "Connection Restored" : "You're Offline"}
        </h1>
        <p
          className={cn(
            "text-sm leading-relaxed mb-10",
            darkMode ? "text-zinc-400" : "text-slate-500"
          )}
        >
          {backOnline
            ? "Your internet connection is back. Continue to reload the portal with live financial data."
            : "The St. Andrew's eRequisitions Portal can't reach the network. Check your Wi-Fi or mobile data connection — we'll detect automatically when you're back online."}
        </p>

        {/* Retry button */}
        <button
          onClick={handleRetry}
          disabled={isChecking}
          className={cn(
            "w-full sm:w-auto px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-60",
            backOnline
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20"
              : "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
          )}
        >
          {isChecking ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              Checking Connection…
            </>
          ) : backOnline ? (
            <>
              <CheckCircle2 size={14} />
              Continue to Portal
            </>
          ) : (
            <>
              <Signal size={14} />
              Retry Connection
            </>
          )}
        </button>

        {/* Tips */}
        {!backOnline && (
          <div
            className={cn(
              "mt-10 text-left rounded-2xl border p-5 space-y-2.5",
              darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
            )}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              Troubleshooting Tips
            </p>
            {[
              "Check that Wi-Fi or mobile data is turned on",
              "Move closer to your router or try another network",
              "Previously loaded financial data stays available in read-only mode",
            ].map((tip) => (
              <div
                key={tip}
                className={cn(
                  "flex items-start gap-2 text-xs",
                  darkMode ? "text-zinc-400" : "text-slate-500"
                )}
              >
                <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                {tip}
              </div>
            ))}
          </div>
        )}
      </motion.div>

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
