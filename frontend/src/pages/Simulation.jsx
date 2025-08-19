import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, Clock, Layers, Repeat, X } from "lucide-react";

const algorithms = [
  {
    id: "fcfs",
    name: "First Come First Serve (FCFS)",
    desc: "Executes processes in the order they arrive in the ready queue. Simple and fair but can lead to the 'convoy effect' where short processes wait for long ones.",
    icon: Cpu,
  },
  {
    id: "sjf",
    name: "Shortest Job First (SJF)",
    desc: "Selects the process with the smallest burst time. Minimizes average waiting time but requires knowing execution times in advance. Can be implemented as Preemptive (SRTF) or Non-Preemptive.",
    icon: Clock,
  },
  {
    id: "priority",
    name: "Priority Scheduling",
    desc: "Executes processes based on assigned priority values. Flexible but lower-priority tasks may suffer starvation unless aging is applied. Available in Preemptive and Non-Preemptive versions.",
    icon: Layers,
  },
  {
    id: "rr",
    name: "Round Robin (RR)",
    desc: "Each process gets a fixed time quantum in cyclic order. Ensures fairness across tasks but performance depends on the chosen quantum size.",
    icon: Repeat,
  },
];

export default function Simulation() {
  const [openModal, setOpenModal] = useState(null); // 'sjf' or 'priority'
  const navigate = useNavigate();

  const handleSelect = (algo) => {
    if (algo === "sjf" || algo === "priority") {
      setOpenModal(algo);
    } else {
      navigate(`/simulation/${algo}`);
    }
  };

  const handleChoice = (algo, type) => {
    setOpenModal(null);
    navigate(`/simulation/${algo}?type=${type}`);
  };

  return (
    <div className="min-h-[100svh] bg-[#0D1117] text-gray-100 px-6 md:px-16 py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-blue-400 mb-12">
        Choose a Scheduling Algorithm
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {algorithms.map((algo) => (
          <div
            key={algo.id}
            className="bg-black/40 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-blue-500/30 transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <algo.icon className="w-10 h-10 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">{algo.name}</h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base mb-6">{algo.desc}</p>
            <button
              onClick={() => handleSelect(algo.id)}
              className="px-5 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-400 transition"
            >
              Select
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
          <div className="relative bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-8 rounded-2xl w-[90%] max-w-lg shadow-2xl border border-gray-700">
            {/* Close Icon */}
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-blue-400 text-center mb-6">
              {openModal === "sjf"
                ? "Shortest Job First (SJF)"
                : "Priority Scheduling"}
            </h2>
            <p className="text-gray-300 text-sm text-center mb-8">
              Choose between{" "}
              <span className="text-blue-300">Preemptive</span> and{" "}
              <span className="text-blue-300">Non-Preemptive</span> variants to
              see how scheduling changes process execution.
            </p>

            {/* Options */}
            <div className="flex flex-col gap-6">
              {/* Preemptive */}
              <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-500/20 transition">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Preemptive
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  A running process can be interrupted if a higher-priority task
                  (or shorter job) arrives. Useful for real-time responsiveness.
                </p>
                <button
                  onClick={() => handleChoice(openModal, "preemptive")}
                  className="w-full px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-medium transition"
                >
                  Select Preemptive
                </button>
              </div>

              {/* Non-Preemptive */}
              <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-5 hover:shadow-lg hover:shadow-blue-500/20 transition">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Non-Preemptive
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Once a process starts execution, it cannot be interrupted
                  until completion. Simpler, but may cause longer wait times.
                </p>
                <button
                  onClick={() => handleChoice(openModal, "non-preemptive")}
                  className="w-full px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-medium transition"
                >
                  Select Non-Preemptive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
