import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-foreground">Welcome to THE ARENA</h1>
        <p className="mt-4 text-muted-foreground">The P2P Betting Platform.</p>
      </div>
    </main>
  );
}
