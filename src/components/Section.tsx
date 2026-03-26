import { Link } from "react-router-dom";

export default function Section({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col  py-20">
      {children}
    </div>
  );
}


