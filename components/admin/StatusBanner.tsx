"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, X } from "lucide-react";

export default function StatusBanner({
  kind = "success",
  children,
  className = "",
}: {
  kind?: "success" | "error";
  children: React.ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);

  // Auto-dismiss after 4s
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const styles =
    kind === "success"
      ? "border-brand-300/60 bg-brand-50 text-brand-900"
      : "border-rose-300/60 bg-rose-50 text-rose-900";

  const Icon = kind === "success" ? Check : AlertCircle;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${styles} ${className}`}
        >
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4 flex-none" strokeWidth={2.4} />
            {children}
          </span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setVisible(false)}
            className="opacity-60 hover:opacity-100"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
