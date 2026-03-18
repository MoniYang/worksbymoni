

export default function Intro() {
  return (
    <div className="flex  items-center justify-center bg-zinc-50">
      <main className="flex w-full flex-col items-center justify-between py-32 px-20 sm:items-start">
        <div className="space-y-4 text-slate-400">
          <p className="text-2xl   leading-10">
            我不追求顯眼的設計。
          </p>
          <p className="text-xl">
            我在意的是，<br />使用者在畫面前，<br />
            能不能安心地把事情做完。<br />
          </p>
          <p className="text-xl ">
            商業需求我會完成，<br />
            但我會選擇不做多餘的事。<br />
          </p>
          <p className="text-md">Front-end × Web Design</p>
        </div>
      </main>
    </div>
  );
}
