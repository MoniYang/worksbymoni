import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="flex items-center justify-center space-x-4">
      <span><Link to="/Demo1" >Selected Works</Link></span>
      <span><Link to="/Demo1" >Side Project</Link></span>
    </div>
  );
}