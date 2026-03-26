import Intro from "./components/Intro";
import { WorksEntrance, SideProject } from "./components/WorksEntrance";
import About from "./components/About";
import bgImg from "./assets/img/dot-grid.png"
import Nav from "./components/Nav"
import ToDoList from "./components/side-project/TodoList"
import Topic from "./components/Topic"
import Section from "./components/Section"
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import WheelGame from "./components/side-project/WheelGame";

function App() {
  return (
     <HashRouter>
    <div className="flex   min-h-screen ">
     
      <main className="flex w-full flex-col  container mx-auto my-20 bg-white px-20 shadow-2xl/30">
      
        <Routes>
          <Route path="/" element={
            <>
            {/* <Nav/> */}
            <Section>
            <Intro />
            </Section>
            <hr className="border-slate-200"/>
            <Section>
            <About />
            </Section>
            <hr className="border-slate-200"/>

            <Section>
              <Topic text="SideProject" />
               <SideProject />
            </Section>

            <hr className="border-slate-200"/>
           
            <Section>
               <Topic text="Selected Works" />
                <WorksEntrance />
            </Section>
            </>
          } />
          <Route path="/TodoList" element={<ToDoList />} />
          <Route path="/WheelGame" element={<WheelGame />} />
        </Routes>
       
      
        {/* <WorksEntrance /> */}
      </main>
      <div className="flex fixed -left-2 top-0 h-full self-center">
        <p className="my-auto text-center text-slate-800 font-bold text-4xl [writing-mode:vertical-rl]"><Link to="/">Works by Moni</Link></p>
      </div>
    
    </div>
     </HashRouter>
  );
}

export default App;
