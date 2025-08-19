export function priorityPreemptive(processes) {
  const n = processes.length;
  let time = 0;
  let completed = 0;

  let remaining = processes.map(p => ({ ...p }));
  let remainingBT = processes.map(p => p.BT);

  let ganttChart = [];
  let lastPid = null;
  let startTime = 0;

  let isCompleted = Array(n).fill(false);
  let metricsMap = {};
  let totalWT = 0, totalTAT = 0;

  while (completed < n) {
    const candidates = remaining
      .map((p, i) => ({ ...p, index: i }))
      .filter((p, i) => p.AT <= time && remainingBT[i] > 0);

    if (candidates.length === 0) {
      time++;
      continue;
    }

    // Pick process with highest priority (lowest number), break ties by arrival time
    candidates.sort((a, b) => a.priority - b.priority || a.AT - b.AT);
    const current = candidates[0];
    const idx = current.index;

    if (lastPid !== current.pid) {
      if (lastPid !== null) {
        ganttChart.push({ pid: lastPid, start: startTime, end: time });
      }
      lastPid = current.pid;
      startTime = time;
    }

    // Execute current process for 1 unit
    remainingBT[idx]--;
    time++;

    // If process completed
    if (remainingBT[idx] === 0) {
      completed++;

      const CT = time;
      const TAT = CT - current.AT;
      const WT = TAT - current.BT;

      ganttChart.push({ pid: current.pid, start: startTime, end: time });

      metricsMap[current.pid] = {
        pid: current.pid,
        AT: current.AT,
        BT: current.BT,
        priority: current.priority,
        CT,
        TAT,
        WT
      };

      totalWT += WT;
      totalTAT += TAT;

      lastPid = null;

      console.log(`[DEBUG] Priority Preemptive: ${current.pid} | CT: ${CT}, TAT: ${TAT}, WT: ${WT}`);
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
