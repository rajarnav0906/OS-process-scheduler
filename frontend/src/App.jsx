import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Simulation from "./pages/Simulation";
import Footer from "./components/Footer";
import DevInProgress from "./pages/DevInProgress";
import FcfsPage from "./pages/FcfsPage";
import SjfPage from "./pages/SjfPage";
import SjfPreemptivePage from "./pages/SjfPreemptivePage";
import PriorityPage from "./pages/PriorityPage";
import PriorityPreemptivePage from "./pages/PriorityPreemptivePage";
import RoundRobinPage from "./pages/RoundRobinPage";

function App() {
  return (
    <div className="flex flex-col min-h-[100svh]">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/simulation/fcfs" element={<FcfsPage />} />
          <Route path="/simulation/sjf" element={<SjfPage />} />
          <Route path="/simulation/sjf-preemptive" element={<SjfPreemptivePage />} />
          <Route path="/simulation/:algo" element={<DevInProgress />} />
          <Route path="/simulation/priority" element={<PriorityPage />} />
          <Route path="/simulation/priority-preemptive" element={<PriorityPreemptivePage />} />
          <Route path="/simulation/rr" element={<RoundRobinPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
