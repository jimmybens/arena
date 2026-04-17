import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let dbStatus = "Connecting...";
  let currentSchema = "unknown";

  try {
    const testCount = await prisma.test.count();
    const result = await prisma.$queryRaw<{ schema: string }[]>`SELECT current_schema() as schema`;
    currentSchema = result[0]?.schema || "unknown";
    dbStatus = `Connecté à Supabase ✅✅`;
  } catch (e: any) {
    dbStatus = `Erreur BDD: ${e.message}`;
  }

  const envName = process.env.VERCEL_ENV || process.env.NODE_ENV || "local";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center">
        <h1 className="text-6xl font-black text-foreground tracking-tighter">
          Hello World ! 🚀
        </h1>
        <p className="mt-8 text-2xl font-semibold">
          ARENA - TEST DE STACK COMPLET
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left p-6 border border-border rounded-xl bg-muted/30">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Environnement</span>
            <span className="text-xl font-bold text-primary">{envName.toUpperCase()}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Schéma BDD actif</span>
            <span className="text-xl font-mono text-blue-500 font-bold">{currentSchema}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Connexion à la BDD</span>
            <span className="text-xl font-bold text-green-500">{dbStatus}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
