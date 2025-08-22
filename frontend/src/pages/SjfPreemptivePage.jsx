import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Play, Trash2, Timer, Home, Loader2, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-indigo-600",
  "from-teal-400 to-emerald-500",
  "from-pink-500 to-rose-600",
  "from-yellow-400 to-amber-500",
];

export default function SjfPreemptivePage() {
  const [processes, setProcesses] = useState([{ pid: "P1", arrival: 0, burst: 5 }]);
  const [result, setResult] = useState(null);
  const [animIndex, setAnimIndex] = useState(-1);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState(20);
  const navigate = useNavigate();

  // Clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fake CPU usage
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 40) + 20);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = value === "" ? "" : Number(value);
    setProcesses(updated);
  };

  const addProcess = () => {
    setProcesses((prev) => [...prev, { pid: `P${prev.length + 1}`, arrival: 0, burst: 1 }]);
  };

  const removeProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setResult(null);
    setAnimIndex(-1);
    setLoading(true);

    const payload = {
      processes: processes.map((p) => ({
        pid: p.pid,
        AT: Number(p.arrival),
        BT: Number(p.burst),
      })),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/schedule/sjfpreemptive`,
        payload
      );
      setResult(res.data);
      setAnimating(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Animate Gantt chart
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
    }, 1200);
    return () => clearInterval(interval);
  }, [result, animating]);

  return (
    <div
      className="min-h-screen flex flex-col font-mono
      bg-gradient-to-br from-[#050d1a] via-[#0d1117] to-[#050d1a] 
      text-gray-100 px-3 sm:px-6 py-6 sm:py-10 relative overflow-hidden"
    >
      {/* Grid BG */}
      <div className="absolute inset-0 
        bg-[linear-gradient(90deg,rgba(0,255,200,0.08)_1px,transparent_1px),linear-gradient(rgba(0,255,200,0.08)_1px,transparent_1px)]
        bg-[size:50px_50px] opacity-10"></div>

      <div className="relative z-10 w-full space-y-6 sm:space-y-10 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-3xl font-bold text-cyan-400 flex items-center gap-2 drop-shadow-md">
            <Timer className="w-6 sm:w-7 h-6 sm:h-7" />
            SJF (Preemptive) Scheduling Visualizer
          </h1>

          <div className="flex w-full sm:w-auto items-center gap-2">
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-2 
                rounded-lg shadow-lg font-medium text-sm sm:text-base
                ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-500"}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin text-cyan-300" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Run Simulation
                </>
              )}
            </motion.button>

            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg flex justify-center"
            >
              <Home className="w-5 h-5 text-gray-200" />
            </button>
          </div>
        </div>

        {/* Process Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#101827]/90 backdrop-blur border border-gray-700 rounded-xl p-4 sm:p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-cyan-300">Processes</h2>
            <button
              onClick={addProcess}
              className="flex items-center gap-1 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4" /> Add Process
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[400px]">
              <thead>
                <tr className="bg-[#0a0f1a] text-gray-300 uppercase text-[10px] sm:text-xs">
                  <th className="p-2 text-center">PID</th>
                  <th className="p-2 text-center">Arrival</th>
                  <th className="p-2 text-center">Burst</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p, i) => (
                  <tr key={i} className="border-t border-gray-700 text-center">
                    <td className="p-2">{p.pid}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={p.arrival}
                        onChange={(e) => handleChange(i, "arrival", e.target.value)}
                        className="w-16 sm:w-20 px-2 py-1 rounded bg-gray-900 border border-gray-600 text-xs sm:text-sm text-center"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={p.burst}
                        onChange={(e) => handleChange(i, "burst", e.target.value)}
                        className="w-16 sm:w-20 px-2 py-1 rounded bg-gray-900 border border-gray-600 text-xs sm:text-sm text-center"
                      />
                    </td>
                    <td className="p-2">
                      <button onClick={() => removeProcess(i)} className="p-1 hover:bg-red-600/60 rounded">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Visualization + Loader */}
        <div className="bg-[#101827]/90 backdrop-blur border border-gray-700 rounded-xl p-6 shadow-xl min-h-[200px] flex items-center justify-center">
          {loading && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
              <span className="text-cyan-300 font-medium">Running Simulation...</span>
            </div>
          )}

          {!loading && result && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
              <h2 className="text-base sm:text-lg font-semibold text-cyan-300 mb-4 sm:mb-6 text-center">Gantt Chart</h2>

              <div className="relative flex items-center gap-2 sm:gap-4 p-3 sm:p-6 
                bg-[#0f172a] rounded-lg overflow-x-auto mb-4 sm:mb-8 
                h-24 sm:h-44 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-gray-800">
                {result.ganttChart.map((g, i) => {
                  const colorClass = COLORS[i % COLORS.length];
                  const duration = g.end - g.start;
                  return (
                    <motion.div
                      key={i}
                      initial={{ width: 0, opacity: 0 }}
                      animate={i <= animIndex ? { width: duration * 60, opacity: 1 } : {}}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-16 sm:h-28 flex flex-col justify-center items-center 
                        text-[10px] sm:text-sm font-medium rounded-md shadow-lg 
                        bg-gradient-to-br ${colorClass}`}
                      style={{ minWidth: duration * 50 }}
                    >
                      <span>{g.pid}</span>
                      <span className="absolute bottom-1 sm:bottom-2 text-[9px] sm:text-xs">
                        {g.start}–{g.end}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Metrics */}
              <table className="w-full text-xs sm:text-sm mb-4 min-w-[400px]">
                <thead>
                  <tr className="bg-[#0a0f1a] text-gray-300 uppercase text-[10px] sm:text-xs">
                    <th className="p-2 text-center">PID</th>
                    <th className="p-2 text-center">CT</th>
                    <th className="p-2 text-center">TAT</th>
                    <th className="p-2 text-center">WT</th>
                  </tr>
                </thead>
                <tbody>
                  {result.metrics.map((p, i) => (
                    <tr key={i} className="border-t border-gray-700 text-center">
                      <td className="p-2">{p.pid}</td>
                      <td className="p-2">{p.CT}</td>
                      <td className="p-2">{p.TAT}</td>
                      <td className="p-2">{p.WT}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-2 text-xs sm:text-sm text-gray-300 flex flex-wrap justify-center gap-6">
                <span>Avg WT: <span className="text-cyan-300">{result.avgWT}</span></span>
                <span>Avg TAT: <span className="text-cyan-300">{result.avgTAT}</span></span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 sm:mt-10">
        <div className="w-full bg-[#0f172a]/90 backdrop-blur-md border-t border-gray-700 
          px-3 sm:px-6 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-between 
          text-[11px] sm:text-sm text-gray-300 shadow-inner gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-green-400" />
            <span>CPU Usage: <span className="text-green-300">{cpuUsage}%</span></span>
          </div>
          <span className="text-cyan-300">{time.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
