import polarisImg from "../assets/img/polaris.png"
import busImg from "../assets/img/bus.png"
import marsImg from "../assets/img/mars.png"
import { Link } from "react-router-dom";

const WorksEntrance = () => {
  return (
    <div className="flex items-center justify-center bg-zinc-50">
      <div className="w-1/3"><img src={polarisImg} /></div>
      <div className="w-1/3"><img src={busImg} /></div>
      <div className="w-1/3"><img src={marsImg} /></div>
    </div>
  );
}


const SideProject = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-1/3"><Link to="/WheelGame">Wheel Game</Link></div>
      <div className="w-1/3"> <Link to="/TodoList">ToDo List</Link></div>
     
    </div>
  );
}

export {WorksEntrance, SideProject}