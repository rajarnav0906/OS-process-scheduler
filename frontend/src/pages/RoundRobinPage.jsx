import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Play, Trash2, ActivitySquare, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500",
  "bg-yellow-500", "bg-orange-500", "bg-teal-500", "bg-red-500"
];

export default function RoundRobinPage() {
  const [processes, setProcesses] = useState([{ pid: "P1", arrival: 0, burst: 5 }]);
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [result, setResult] = useState(null);
  const [animIndex, setAnimIndex] = useState(-1);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = value === "" ? "" : Number(value);
    setProcesses(updated);
  };

  const addProcess = () => {
    setProcesses((prev) => [
      ...prev,
      { pid: `P${prev.length + 1}`, arrival: 0, burst: 1 },
    ]);
  };

  const removeProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setResult(null);
    setAnimIndex(-1);

    const payload = {
      processes: processes.map((p) => ({
        pid: p.pid,
        AT: Number(p.arrival),
        BT: Number(p.burst),
      })),
      timeQuantum: Number(timeQuantum),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/schedule/roundrobin`,
        payload
      );
      setResult(res.data);
      setAnimating(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!result || !animating) return;
    let i = 0;
    const interval = setInterval(() => {
      setAnimIndex(i);
      i++;
      if (i >= result.ganttChart.length) {
        clearInterval(interval);
        setAnimating(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [result, animating]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1117] to-[#1a1f2b] text-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
            <ActivitySquare className="w-6 h-6" /> Round Robin Scheduling Visualizer
          </h1>

          {/* Actions spaced apart */}
          <div className="flex w-full sm:w-auto justify-between sm:justify-end items-center gap-3">
            {/* Run Simulation */}
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all text-sm md:text-base shadow"
            >
              <Play className="w-4 h-4" /> Run Simulation
            </button>

            {/* Home Button */}
            <button
              onClick={() => navigate("/")}
              aria-label="Go to Home"
              title="Home"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all shadow outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Home className="w-5 h-5 text-gray-200" />
            </button>
          </div>
        </div>

        {/* Time Quantum Input */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 shadow-xl mb-6">
          <label className="text-blue-300 font-semibold block mb-2">Time Quantum</label>
          <input
            type="number"
            value={timeQuantum}
            onChange={(e) => setTimeQuantum(e.target.value)}
            className="w-24 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {/* Process Table */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-blue-300">Processes</h2>
            <button
              onClick={addProcess}
              className="flex items-center gap-1 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm"
            >
              <Plus className="w-4 h-4" /> Add Process
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#111827] text-gray-300">
                  <th className="p-2">PID</th>
                  <th className="p-2">Arrival</th>
                  <th className="p-2">Burst</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="p-2">{p.pid}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={p.arrival}
                        onChange={(e) => handleChange(i, "arrival", e.target.value)}
                        className="w-20 px-2 py-1 rounded bg-gray-800 border border-gray-600"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={p.burst}
                        onChange={(e) => handleChange(i, "burst", e.target.value)}
                        className="w-20 px-2 py-1 rounded bg-gray-800 border border-gray-600"
                      />
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => removeProcess(i)}
                        className="p-1 hover:bg-red-600/60 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visualization */}
        {result && (
          <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-blue-300 mb-6">Gantt Chart</h2>

            <div className="relative flex items-center gap-3 p-6 bg-[#0f172a] rounded-lg overflow-x-auto mb-8 h-40">
              {result.ganttChart.map((g, i) => {
                const colorClass = COLORS[i % COLORS.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ width: 0, opacity: 0, scale: 0.8 }}
                    animate={
                      i <= animIndex
                        ? { width: (g.end - g.start) * 50, opacity: 1, scale: 1 }
                        : {}
                    }
                    transition={{ duration: 1, type: "spring" }}
                    className={`h-24 flex flex-col justify-center items-center text-sm font-medium rounded-md shadow-md ${colorClass}`}
                    style={{ minWidth: (g.end - g.start) * 50 }}
                  >
                    <span>{g.pid}</span>
                    <span className="absolute bottom-2 text-xs text-gray-200">{g.end}</span>
                  </motion.div>
                );
              })}
            </div>

            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="bg-[#111827] text-gray-300">
                  <th className="p-2">PID</th>
                  <th className="p-2">CT</th>
                  <th className="p-2">TAT</th>
                  <th className="p-2">WT</th>
                </tr>
              </thead>
              <tbody>
                {result.metrics.map((p, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="p-2">{p.pid}</td>
                    <td className="p-2">{p.CT}</td>
                    <td className="p-2">{p.TAT}</td>
                    <td className="p-2">{p.WT}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-2 text-sm text-gray-300 flex flex-wrap gap-6">
              <span>
                Avg WT: <span className="text-blue-300">{result.avgWT}</span>
              </span>
              <span>
                Avg TAT: <span className="text-blue-300">{result.avgTAT}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
