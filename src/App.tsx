import Intro from "./components/Intro";
import WorksEntrance from "./components/worksEntrance";
import About from "./components/About";
import bgImg from "./assets/img/dot-grid.png"
import Nav from "./components/Nav"
import ToDoList from "./components/Demo1"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
     <BrowserRouter>
    <div className="flex   min-h-screen ">
     
      <main className="flex w-full flex-col  container mx-auto my-20 bg-white px-20 shadow-2xl/30">
      
        <Routes>
          <Route path="/" element={
            <>
            <Nav/>
            <Intro />
            <About />
            </>
          } />
          <Route path="/Demo1" element={<ToDoList />} />
        </Routes>
       
      
        {/* <WorksEntrance /> */}
      </main>
      <div className="flex fixed -left-2 top-0 h-full self-center">
        <p className="my-auto text-center text-slate-800 font-bold text-4xl [writing-mode:vertical-rl]"><Link to="/">Works by Moni</Link></p>
      </div>
    
    </div>
     </BrowserRouter>
  );
}

export default App;
