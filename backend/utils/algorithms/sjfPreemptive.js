export function sjfPreemptive(processes) {
  const n = processes.length;
  let time = 0;
  let completed = 0;
  let remaining = processes.map(p => ({ ...p })); // Clone array
  let remainingTime = processes.map(p => p.BT); // Remaining BT per process

  let ganttChart = [];
  let lastProcess = null;
  let startTime = 0;

  let isCompleted = Array(n).fill(false);
  let metricsMap = {};
  let totalWT = 0, totalTAT = 0;

  while (completed < n) {
    // Filter available processes
    let candidates = remaining
      .map((p, i) => ({ ...p, index: i }))
      .filter((p, i) => p.AT <= time && remainingTime[i] > 0);

    if (candidates.length === 0) {
      time++;
      continue;
    }

    // Choose process with shortest remaining time
    candidates.sort((a, b) => remainingTime[a.index] - remainingTime[b.index]);
    const current = candidates[0];
    const idx = current.index;

    // If new process is selected or first time, update Gantt chart
    if (lastProcess !== current.pid) {
      if (lastProcess !== null) {
        ganttChart.push({ pid: lastProcess, start: startTime, end: time });
      }
      lastProcess = current.pid;
      startTime = time;
    }

    remainingTime[idx]--;
    time++;

    // If process completes
    if (remainingTime[idx] === 0) {
      completed++;
      const CT = time;
      const TAT = CT - current.AT;
      const WT = TAT - current.BT;

      ganttChart.push({ pid: current.pid, start: startTime, end: time });

      metricsMap[current.pid] = {
        pid: current.pid,
        AT: current.AT,
        BT: current.BT,
        CT,
        TAT,
        WT
      };

      totalWT += WT;
      totalTAT += TAT;

      isCompleted[idx] = true;
      lastProcess = null;

      console.log(`[DEBUG] SRTF: ${current.pid} | CT: ${CT}, TAT: ${TAT}, WT: ${WT}`);
    }
  }

  const metrics = processes.map(p => metricsMap[p.pid]);

  return {
    ganttChart,
    metrics,
    avgWT: parseFloat((totalWT / n).toFixed(2)),
    avgTAT: parseFloat((totalTAT / n).toFixed(2))
  };
}
