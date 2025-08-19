import { Link } from "react-router-dom";
import TypingBackground from "../components/TypingBackground";
import { Cpu, Timer, Gauge, Share2 } from "lucide-react";
import BgVector from "../assets/bg-vector.jpg"; // background image

export default function Home() {
  return (
    <div className="w-full flex flex-col text-gray-100">
      {/* Hero Section */}
      <section
        className="
          relative
          flex flex-col md:flex-row
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
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-400 drop-shadow-lg">
            OS Process Scheduler
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-300 max-w-lg leading-relaxed mx-auto md:mx-0">
            Visualize how operating systems handle{" "}
            <span className="text-white font-medium">process scheduling</span> — 
            explore algorithms like{" "}
            <span className="text-blue-300">First Come First Serve</span>,{" "}
            <span className="text-blue-300">Shortest Job First</span>,{" "}
            <span className="text-blue-300">Priority Scheduling</span>, and{" "}
            <span className="text-blue-300">Round Robin</span>.
          </p>

          {/* Navigation button */}
          <Link
            to="/simulation"
            className="inline-block mt-10 px-8 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-all shadow-lg"
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
            {/* Why Scheduling Matters Section */}
      <section className="bg-[#0D1117] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-16">
            Why Scheduling Matters
          </h2>

          <div className="space-y-12">
            {/* Efficiency */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Cpu className="w-8 h-8 text-blue-400" /> Efficiency of CPU Usage
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
                overall system performance. For example, in data centers and cloud platforms, 
                CPU utilization directly translates to cost savings and energy efficiency.
              </p>
            </div>

            {/* Performance */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Timer className="w-8 h-8 text-blue-400" /> Performance and Responsiveness
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-3">
                Scheduling policies directly influence two critical performance metrics: 
                <span className="text-blue-300"> Waiting Time</span> (how long a process waits 
                before execution) and <span className="text-blue-300">Turnaround Time</span> 
                (total time from arrival to completion). Well-chosen algorithms minimize these 
                delays, making systems more responsive for users.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                For instance, in a desktop operating system, interactive tasks like typing or 
                browsing should respond instantly, while background tasks like file indexing 
                can wait. Scheduling ensures a balance between short, interactive jobs and long, 
                CPU-intensive ones, improving the user experience without compromising throughput.
              </p>
            </div>

            {/* Fairness */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Gauge className="w-8 h-8 text-blue-400" /> Fairness and Avoiding Starvation
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-3">
                Fairness is a fundamental requirement of scheduling. Each process should receive 
                a reasonable share of CPU time, regardless of its priority or length. Without 
                fairness, low-priority processes might never execute, a condition known as 
                <span className="text-blue-300"> starvation</span>.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Many algorithms incorporate techniques such as <span className="text-blue-300">
                aging</span>, where the priority of a waiting process increases over time, 
                guaranteeing it will eventually be executed. This ensures long-term system stability, 
                prevents lock-ups, and maintains trust in multi-user or multi-application systems.
              </p>
            </div>

            {/* Real-World Relevance */}
            <div className="bg-black/40 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Share2 className="w-8 h-8 text-blue-400" /> Real-World Applications
              </h3>
              <p className="text-gray-300 text-base leading-relaxed mb-3">
                CPU scheduling is not just an academic concept—it is the foundation of real-world 
                computing. Modern operating systems like Linux, Windows, and macOS implement 
                sophisticated scheduling strategies to balance interactive responsiveness with 
                system throughput.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Beyond PCs, scheduling is crucial in embedded systems (such as automotive 
                controllers), real-time systems (like medical devices), and cloud platforms 
                (where thousands of processes share hardware). Understanding these principles 
                equips you to reason about system design, performance trade-offs, and the way 
                technology supports daily life.
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
