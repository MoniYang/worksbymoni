import polarisImg from "../assets/img/polaris.png"
import busImg from "../assets/img/bus.png"
import marsImg from "../assets/img/mars.png"

export default function WorksEntrance() {
  return (
    <div className="flex items-center justify-center bg-zinc-50">
      <img src={polarisImg} />
      <img src={busImg} />
      <img src={marsImg} />
    </div>
  );
}
