import { useState } from "react";
import { motion } from "framer-motion";
import {
  Timer,
  ListOrdered,
  Layers,
  Shuffle,
  Info,
  X,
  ArrowRightCircle,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const algorithms = [
  {
    name: "First Come First Serve (FCFS)",
    path: "/simulation/fcfs",
    description:
      "Processes are executed in the order they arrive. The simplest scheduling algorithm.",
    icon: <ListOrdered className="w-10 h-10 text-cyan-400" />,
  },
  {
    name: "Shortest Job First (SJF)",
    path: "/simulation/sjf",
    description:
      "Executes processes with the shortest burst time first. Can be preemptive or non-preemptive.",
    icon: <Timer className="w-10 h-10 text-cyan-400" />,
    hasPreemptive: true,
  },
  {
    name: "Priority Scheduling",
    path: "/simulation/priority",
    description:
      "Executes processes based on priority values. Lower value means higher priority. Can be preemptive or non-preemptive.",
    icon: <Layers className="w-10 h-10 text-cyan-400" />,
    hasPreemptive: true,
  },
  {
    name: "Round Robin (RR)",
    path: "/simulation/rr",
    description:
      "Each process is assigned a fixed time quantum and processes are executed in cyclic order.",
    icon: <Shuffle className="w-10 h-10 text-cyan-400" />,
  },
];

export default function Simulation() {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (algo) => {
    if (algo.hasPreemptive) {
      setModal(algo);
    } else {
      navigate(algo.path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-mono 
      bg-gradient-to-br from-[#050d1a] via-[#0d1117] to-[#050d1a] 
      text-gray-100 px-4 sm:px-6 py-12 relative overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 
        bg-[linear-gradient(90deg,rgba(0,255,200,0.08)_1px,transparent_1px),linear-gradient(rgba(0,255,200,0.08)_1px,transparent_1px)]
        bg-[size:50px_50px] opacity-10"
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-10">
        {/* Top bar with Home Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg 
              bg-[#0f172a] border border-cyan-700/50 
              text-cyan-400 hover:text-white hover:bg-cyan-600/20 
              transition-all duration-200 shadow-md"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>

        {/* Page Heading */}
        <h1 className="text-2xl sm:text-4xl font-bold text-cyan-400 text-center drop-shadow-md relative">
          Choose a Scheduling Algorithm
          <span className="block mx-auto mt-2 w-24 h-1 bg-cyan-500 rounded-full"></span>
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {algorithms.map((algo, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#101827]/90 backdrop-blur border border-gray-700 rounded-xl 
                p-6 shadow-lg hover:shadow-cyan-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {algo.icon}
                  <h2 className="text-lg sm:text-xl font-semibold text-cyan-300">
                    {algo.name}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                  {algo.description}
                </p>
              </div>

              {/* Select Button */}
              <button
                onClick={() => handleSelect(algo)}
                className="flex items-center justify-center gap-2 w-full py-2 
                  rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium 
                  shadow-md hover:shadow-cyan-400/30 transition-all duration-200"
              >
                <span>Select</span>
                <ArrowRightCircle className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Preemptive/Non-preemptive selection */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#101827] border border-gray-700 rounded-xl p-6 w-full max-w-md relative"
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={() => setModal(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-300" /> {modal.name}
            </h2>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              {modal.name.includes("SJF") ? (
                <>
                  <span className="text-cyan-300">Non-preemptive SJF:</span>{" "}
                  Executes the process with the smallest burst time that has arrived.
                  <br />
                  <span className="text-cyan-300">Preemptive SJF:</span>{" "}
                  Also called Shortest Remaining Time First, can interrupt a running process
                  if a new one arrives with a shorter burst.
                </>
              ) : (
                <>
                  <span className="text-cyan-300">Non-preemptive Priority:</span>{" "}
                  Once a process starts, it runs to completion.
                  <br />
                  <span className="text-cyan-300">Preemptive Priority:</span>{" "}
                  A higher priority process can preempt a lower priority one.
                </>
              )}
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  navigate(
                    modal.name.includes("SJF")
                      ? "/simulation/sjf"
                      : "/simulation/priority"
                  );
                  window.scrollTo(0, 0);
                }}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium"
              >
                Non-Preemptive
              </button>
              <button
                onClick={() => {
                  navigate(
                    modal.name.includes("SJF")
                      ? "/simulation/sjf-preemptive"
                      : "/simulation/priority-preemptive"
                  );
                  window.scrollTo(0, 0);
                }}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium"
              >
                Preemptive
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
