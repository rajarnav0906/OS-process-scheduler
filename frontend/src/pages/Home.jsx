import TypingBackground from "../components/TypingBackground";
import BgVector from "../assets/bg-vector.jpg"; // background image

export default function Home() {
  return (
    <div
      className="
        relative
        w-full
        min-h-[100svh]
        flex flex-col md:flex-row
        items-center justify-center
        px-6 md:px-16
        pt-20 md:pt-0
        pb-16 md:pb-20   /* spacing so footer never overlaps */
        text-gray-100
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
      <div className="relative z-10 flex-1 text-center md:text-left mb-8 md:mb-0 md:pr-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-400 drop-shadow-lg">
          OS Process Scheduler
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-300 max-w-lg leading-relaxed">
          Visualize how operating systems handle{" "}
          <span className="text-white font-medium">process scheduling</span> — 
          explore algorithms like{" "}
          <span className="text-blue-300">First Come First Serve</span>,{" "}
          <span className="text-blue-300">Shortest Job First</span>,{" "}
          <span className="text-blue-300">Priority Scheduling</span>, and{" "}
          <span className="text-blue-300">Round Robin</span>.
        </p>
        <button className="mt-10 px-8 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-all shadow-lg">
          Start Simulation
        </button>
      </div>

      {/* Right Code Editor */}
      <div
        className="
          relative z-10 flex-1
          w-full
          h-[280px] sm:h-[340px] md:h-[420px] lg:h-[480px]
          mt-6 md:mt-0
        "
      >
        <TypingBackground />
      </div>
    </div>
  );
}
