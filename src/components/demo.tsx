import { GlowCard } from "./ui/spotlight-card";

export function Default() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-10 p-10">
      <h1 className="text-white text-4xl font-bold mb-10">Spotlight Cards Demo</h1>
      <div className="flex flex-wrap items-center justify-center gap-10">
        <GlowCard glowColor="blue">
          <div className="flex flex-col items-center justify-center h-full text-white">
            <h3 className="text-xl font-bold">Blue Glow</h3>
            <p className="text-slate-400 text-sm mt-2">Interactive spotlight effect</p>
          </div>
        </GlowCard>
        
        <GlowCard glowColor="orange">
          <div className="flex flex-col items-center justify-center h-full text-white">
            <h3 className="text-xl font-bold">Orange Glow</h3>
            <p className="text-slate-400 text-sm mt-2">Perfect for highlights</p>
          </div>
        </GlowCard>
        
        <GlowCard glowColor="purple">
          <div className="flex flex-col items-center justify-center h-full text-white">
            <h3 className="text-xl font-bold">Purple Glow</h3>
            <p className="text-slate-400 text-sm mt-2">Premium aesthetic</p>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
