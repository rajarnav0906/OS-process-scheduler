import { Link } from "react-router-dom";
import TypingBackground from "../components/TypingBackground";
import { Cpu, Timer, Gauge, Share2 } from "lucide-react";
import BgVector from "../assets/bg-vector.jpg"; // background image

export default function Home() {
  return (
    <div className="w-full flex flex-col text-gray-100 font-mono">
      {/* Hero Section */}
      <section
        className="
          relative flex flex-col md:flex-row
          items-center justify-center
          px-6 md:px-16
          min-h-screen
          pt-28 md:pt-0
        "
        style={{
          backgroundImage: `url(${BgVector})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/85" />

        {/* Left Content */}
        <div className="relative z-10 flex-1 text-center md:text-left mb-12 md:mb-0 md:pr-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-cyan-400 drop-shadow-lg relative font-mono">
            OS Process Scheduler
            <span className="block mx-auto md:mx-0 mt-3 w-28 h-1 bg-cyan-500 rounded-full"></span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-300 max-w-lg leading-relaxed mx-auto md:mx-0">
            Visualize how operating systems handle{" "}
            <span className="text-white font-medium">process scheduling</span> — 
            explore algorithms like{" "}
            <span className="text-cyan-300">First Come First Serve</span>,{" "}
            <span className="text-cyan-300">Shortest Job First</span>,{" "}
            <span className="text-cyan-300">Priority Scheduling</span>, and{" "}
            <span className="text-cyan-300">Round Robin</span>.
          </p>

          {/* Navigation button */}
          <Link
            to="/simulation"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block mt-10 px-8 py-3 rounded-lg bg-cyan-600 text-white font-semibold 
              hover:bg-cyan-500 transition-all shadow-lg hover:shadow-cyan-400/30"
          >
            Start Simulation
          </Link>
        </div>

        {/* Right Code Editor */}
        <div
          className="
            relative z-10 flex-1
            w-full
            h-[300px] sm:h-[360px] md:h-[440px] lg:h-[500px]
            mt-6 md:mt-0
            mb-16 md:mb-0
          "
        >
          <TypingBackground />
        </div>
      </section>

      {/* Why Scheduling Matters Section */}
      <section className="bg-[#0D1117] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-400 mb-16 relative font-mono">
            Why Scheduling Matters
            <span className="block mx-auto mt-3 w-24 h-1 bg-cyan-500 rounded-full"></span>
          </h2>

          <div className="space-y-12">
            {/* Efficiency */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4 flex items-center gap-3 font-mono">
                <Cpu className="w-8 h-8 text-cyan-400" /> Efficiency of CPU Usage
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-3">
                At the heart of every computer system lies the CPU, the component responsible 
                for executing instructions. However, CPUs are limited resources shared by many 
                processes. Without scheduling, one process could monopolize the CPU, leaving others 
                waiting indefinitely. Scheduling ensures the processor is never left idle while 
                work remains, maximizing throughput and keeping the system responsive.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                In practice, efficient scheduling minimizes wasted CPU cycles. This means faster 
                program execution, reduced response times in interactive systems, and better 
                overall system performance.
              </p>
            </div>

            {/* Performance */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4 flex items-center gap-3 font-mono">
                <Timer className="w-8 h-8 text-cyan-400" /> Performance and Responsiveness
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-3">
                Scheduling policies directly influence metrics like{" "}
                <span className="text-cyan-300">Waiting Time</span> and{" "}
                <span className="text-cyan-300">Turnaround Time</span>. 
                Well-chosen algorithms minimize these delays, making systems more responsive.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                For example, in desktop systems, interactive tasks like typing or browsing 
                should respond instantly, while background tasks can wait.
              </p>
            </div>

            {/* Fairness */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4 flex items-center gap-3 font-mono">
                <Gauge className="w-8 h-8 text-cyan-400" /> Fairness and Avoiding Starvation
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-3">
                Fairness ensures every process receives a fair share of CPU time. Without it, 
                low-priority processes could suffer from{" "}
                <span className="text-cyan-300">starvation</span>.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Techniques like <span className="text-cyan-300">aging</span> gradually increase 
                the priority of waiting processes, guaranteeing execution and stability.
              </p>
            </div>

            {/* Real-World Relevance */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4 flex items-center gap-3 font-mono">
                <Share2 className="w-8 h-8 text-cyan-400" /> Real-World Applications
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-3">
                CPU scheduling is the foundation of modern OS. From Linux to macOS, 
                sophisticated strategies balance responsiveness with throughput.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Beyond PCs, scheduling is crucial in embedded systems, real-time devices, 
                and cloud platforms where thousands of processes share hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer before footer */}
      <div className="bg-[#0D1117] h-12"></div>
    </div>
  );
}
