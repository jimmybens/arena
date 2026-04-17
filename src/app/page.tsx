import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

const MODE_STYLES: Record<string, { color: string; bg: string; emoji: string }> = {
  'Classic':       { color: 'text-blue-400',   bg: 'bg-blue-400/10 border-blue-400/30',   emoji: '⚽' },
  'Battle Royale': { color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/30', emoji: '🔥' },
  'Duel Express':  { color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/30', emoji: '⚡' },
  'Custom':        { color: 'text-green-400',  bg: 'bg-green-400/10 border-green-400/30',   emoji: '🎯' },
};

export default async function Home() {
  let currentSchema = 'unknown';
  let rooms: { id: string; name: string; mode: string; playerCount: number }[] = [];
  let dbError: string | null = null;

  try {
    const result = await prisma.$queryRaw<{ schema: string }[]>`SELECT current_schema() as schema`;
    currentSchema = result[0]?.schema || 'unknown';
    rooms = await prisma.room.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (e: any) {
    dbError = e.message;
  }

  const envName = process.env.VERCEL_ENV || process.env.NODE_ENV || 'local';
  const isProduction = envName === 'production';

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-white/2 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tighter">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">ARENA</span>
          </h1>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
              isProduction
                ? 'bg-green-400/10 border-green-400/30 text-green-400'
                : 'bg-blue-400/10 border-blue-400/30 text-blue-400'
            }`}>
              {envName.toUpperCase()}
            </span>
            <span className="text-xs text-white/30 font-mono">schema: {currentSchema}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-2">Tournois disponibles</p>
          <h2 className="text-5xl font-black tracking-tight">
            Join the Game.
          </h2>
          <p className="mt-3 text-white/50 text-lg">
            {rooms.length} room{rooms.length > 1 ? 's' : ''} en attente de joueurs
          </p>
        </div>

        {/* Error state */}
        {dbError && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-red-400 text-sm">
            ❌ Erreur BDD : {dbError}
          </div>
        )}

        {/* Rooms Grid */}
        {!dbError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => {
              const style = MODE_STYLES[room.mode] ?? { color: 'text-white/60', bg: 'bg-white/5 border-white/10', emoji: '🎮' };
              return (
                <div
                  key={room.id}
                  className="group relative rounded-2xl border border-white/8 bg-white/3 p-6 hover:bg-white/6 hover:border-white/15 transition-all duration-200 cursor-pointer"
                >
                  {/* Mode badge */}
                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${style.bg} ${style.color} mb-4`}>
                    <span>{style.emoji}</span>
                    <span>{room.mode}</span>
                  </div>

                  {/* Room name */}
                  <h3 className="text-lg font-bold text-white/90 mb-1 group-hover:text-white transition-colors">
                    {room.name}
                  </h3>

                  {/* Players */}
                  <div className="flex items-center gap-1.5 mt-4">
                    <div className="flex -space-x-1">
                      {Array.from({ length: Math.min(room.playerCount, 5) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 border border-[#0a0a0f]"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/40 ml-1">
                      {room.playerCount} joueur{room.playerCount > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* CTA */}
                  <button className="mt-4 w-full py-2 rounded-lg text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20 transition-all duration-150">
                    Rejoindre →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
