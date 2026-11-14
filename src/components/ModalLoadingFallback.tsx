import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Suspense fallback for user-triggered lazy-loaded modals.
 * Shows immediate visual feedback (dim overlay + spinner) while the
 * modal's code chunk is being downloaded, instead of rendering nothing.
 */
export const ModalLoadingFallback: React.FC = () => (
  <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[200] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <Loader2 size={28} className="animate-spin text-white" />
      <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Loading…</p>
    </div>
  </div>
);
