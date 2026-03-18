import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="flex items-center justify-center bg-zinc-50">
      <span><Link to="/Demo1" >Side Project</Link></span>
    </div>
  );
}
