"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-smoke text-stone hover:text-coal hover:border-coal text-sm transition-colors duration-150 shrink-0"
    >
      🖨 Tisknout
    </button>
  );
}
