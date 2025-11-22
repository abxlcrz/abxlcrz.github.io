"use client";

import dynamic from "next/dynamic"

const Terminal = dynamic(() => import("@/components/terminal"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl h-[600px] bg-card border-border shadow-2xl overflow-hidden flex flex-col scanline rounded-lg">
      <div className="bg-secondary border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-muted" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <div className="text-sm text-muted-foreground font-mono flex-1 text-center">
          Terminal - 100x80
        </div>
        <div className="w-16"></div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm flex items-center justify-center">
        <div className="text-primary animate-pulse">Initializing terminal...</div>
      </div>
    </div>
  )
})

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Terminal />
    </main>
  )
}
