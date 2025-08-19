import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Simulation from "./pages/Simulation";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-[100svh]">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/simulation" element={<Simulation />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
