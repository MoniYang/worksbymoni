import Intro from "./feature/introl";

export default function Home() {
  return (
    <div className="flex  items-center justify-center bg-zinc-50">
      <main className="flex w-full flex-col items-center justify-between py-32 px-20 sm:items-start">
        <Intro />
      </main>
    </div>
  );
}
