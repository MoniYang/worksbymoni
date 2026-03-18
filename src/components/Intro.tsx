

import introImg from "../assets/img/intro_2.jpg"

export default function Intro() {
  return (
    <div className=" flex flex-none py-10">
        <div className="container flex justify-center items-center space-y-4 text-slate-400 mx-auto my-auto text-slate-600">
          <div className="w-3/5">
            <img src={introImg} alt="" />
          </div>
          <div className="flex flex-col  w-auto mx-auto bg-white/80  py-10 space-y-2">
            <p className="text-2xl leading-10">
              我不追求顯眼的設計
            </p>
            <p className="text-xl">
              我在意的是<br />使用者在畫面前<br />
              能不能安心地把事情做完<br />
            </p>
            <p className="text-xl ">
              商業需求我會完成<br />
              但我會選擇不做多餘的事<br />
            </p>
            <p className="text-md">Front-end × Web Design</p>
          </div>
        </div>
        
     
    </div>
  );
}
