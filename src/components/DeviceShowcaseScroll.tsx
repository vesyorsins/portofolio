"use client";

import ContainerScroll3D from "@/components/ContainerScroll3D";

export default function DeviceShowcaseScroll() {
  return (
    <section className="relative w-full px-4 md:px-8 max-w-7xl mx-auto bg-transparent">
      <ContainerScroll3D
        titleComponent={
          <div>
            <div className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-3 font-medium">
              [ LIVE PRODUCTION TELEMETRY // 3D CONTAINER SCROLL ]
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#1c1917] tracking-tight leading-tight">
              Real-Time Distributed Architecture
            </h2>
            <p className="text-stone-600 text-sm md:text-base mt-3 max-w-lg mx-auto font-normal">
              Gulir untuk melihat antarmuka telemetri sistem terbuka secara 3D penuh.
            </p>
          </div>
        }
      >
        {/* Inside the 3D Container */}
        <div className="space-y-6 select-none font-mono">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wider">CLUSTER_NODE // APEX-01 (ACTIVE)</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span>UPTIME: 99.98%</span>
              <span>MEMORY: 1.2GB / 8GB</span>
              <span>AVG LATENCY: 28ms</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <span className="text-[11px] text-zinc-500 block mb-1">INFERENCE TTFT</span>
              <span className="text-2xl font-bold text-white tracking-tight">340 ms</span>
              <span className="text-[10px] text-emerald-400 block mt-1">Groq LLaMA 3.1 Accelerated</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <span className="text-[11px] text-zinc-500 block mb-1">WEBGL GPU DRAW</span>
              <span className="text-2xl font-bold text-white tracking-tight">60.0 FPS</span>
              <span className="text-[10px] text-zinc-400 block mt-1">Rapier WASM Physics</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <span className="text-[11px] text-zinc-500 block mb-1">STREAMING THROUGHPUT</span>
              <span className="text-2xl font-bold text-white tracking-tight">52.4k req/s</span>
              <span className="text-[10px] text-emerald-400 block mt-1">Kafka Distributed Mesh</span>
            </div>
          </div>

          {/* Live Log Window */}
          <div className="p-4 rounded-xl bg-[#0c0c10] border border-zinc-800 text-xs text-zinc-300 space-y-1.5 overflow-x-auto">
            <p className="text-zinc-500">[22:28:01] System boot verified. All microservices healthy.</p>
            <p className="text-zinc-400">[22:28:02] Connected to PostgreSQL & TimescaleDB replica pool (4ms).</p>
            <p className="text-zinc-300">[22:28:03] R3F Canvas mounted with WebGL 2.0 context enabled.</p>
            <p className="text-emerald-400">[22:28:04] Ready for streaming connections on global edge nodes.</p>
          </div>
        </div>
      </ContainerScroll3D>
    </section>
  );
}
