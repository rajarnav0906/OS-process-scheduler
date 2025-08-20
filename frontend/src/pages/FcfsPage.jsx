import { useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function FcfsPage() {
  const [processes, setProcesses] = useState([
    { pid: "P1", arrival: "", burst: "" },
  ]);
  const [result, setResult] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = value;
    setProcesses(updated);
  };

  const addProcess = () => {
    setProcesses([
      ...processes,
      { pid: `P${processes.length + 1}`, arrival: "", burst: "" },
    ]);
  };

  const removeProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/fcfs`,
        { processes }
      );
      setResult(res.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-[100vh] bg-[#0D1117] text-gray-100 px-6 md:px-16 py-16">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-300 text-center mb-12">
        First Come First Serve (FCFS)
      </h1>

      {/* Input Section */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-6 text-blue-200">
          Enter Processes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-[#111827] text-gray-300">
                <th className="p-3 text-left">PID</th>
                <th className="p-3 text-left">Arrival Time</th>
                <th className="p-3 text-left">Burst Time</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((p, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-700 hover:bg-[#2d3748] transition"
                >
                  <td className="p-3 font-medium">{p.pid}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      placeholder="0"
                      value={p.arrival}
                      onChange={(e) =>
                        handleChange(i, "arrival", Number(e.target.value))
                      }
                      className="w-24 px-2 py-1 rounded bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      placeholder="5"
                      value={p.burst}
                      onChange={(e) =>
                        handleChange(i, "burst", Number(e.target.value))
                      }
                      className="w-24 px-2 py-1 rounded bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => removeProcess(i)}
                      className="p-2 rounded hover:bg-red-600/70 transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-400 hover:text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={addProcess}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm md:text-base"
          >
            + Add Process
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-500 text-sm md:text-base"
          >
            Run FCFS
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-blue-200">
            Results
          </h2>

          {/* Process Table */}
          {result?.processes && (
            <table className="w-full border-collapse text-sm md:text-base mb-6">
              <thead>
                <tr className="bg-[#111827] text-gray-300">
                  <th className="p-3">PID</th>
                  <th className="p-3">Waiting Time</th>
                  <th className="p-3">Turnaround Time</th>
                  <th className="p-3">Completion Time</th>
                </tr>
              </thead>
              <tbody>
                {result.processes.map((p, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-700 hover:bg-[#2d3748] transition text-center"
                  >
                    <td className="p-3">{p.pid}</td>
                    <td className="p-3">{p.waitingTime}</td>
                    <td className="p-3">{p.turnaroundTime}</td>
                    <td className="p-3">{p.completionTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Averages */}
          <div className="text-sm text-gray-300 mb-6">
            <p>
              <span className="font-semibold text-blue-300">
                Avg Waiting Time:
              </span>{" "}
              {result?.avgWT ?? "-"}
            </p>
            <p>
              <span className="font-semibold text-blue-300">
                Avg Turnaround Time:
              </span>{" "}
              {result?.avgTAT ?? "-"}
            </p>
          </div>

          {/* Gantt Chart */}
          {result?.ganttChart && (
            <div className="flex gap-3 justify-center flex-wrap">
              {result.ganttChart.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-blue-700/80 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  <span className="font-medium">{p.pid}</span>
                  <span className="text-xs">
                    {p.start} → {p.end}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
