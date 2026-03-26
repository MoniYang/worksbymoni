import { Link } from "react-router-dom";

export default function Topic({text}: {text: string}) {
  return (
    <div className="flex items-center justify-center  mb-10">
      <h2 className="text-2xl font-bold text-slate-400">{text}</h2>
    </div>
  );
}
