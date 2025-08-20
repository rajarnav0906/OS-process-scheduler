import { Construction } from "lucide-react";

export default function DevInProgress({ title = "Feature" }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0D1117] via-[#111827] to-[#1e293b] px-4">
      <div className="bg-[#1e293b] shadow-2xl border border-gray-700 rounded-2xl p-10 max-w-xl text-center animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600/20 p-5 rounded-full">
            <Construction className="w-14 h-14 text-blue-400 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-400 mb-4">
          {title} – Development in Progress
        </h1>

        {/* Text */}
        <p className="text-gray-300 leading-relaxed mb-8">
          This feature is not ready yet. We’re actively working on {title} scheduling 
          with real-time Gantt charts, metrics, and interactive UI. Stay tuned!
        </p>

        {/* Pulsing loader dots */}
        <div className="flex justify-center gap-2 mb-8">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></span>
        </div>

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-500 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
