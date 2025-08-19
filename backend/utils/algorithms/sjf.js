export function sjfNonPreemptive(processes) {
  const n = processes.length;
  let time = 0;
  let completed = 0;
  let ganttChart = [];
  let metrics = [];
  let totalWT = 0, totalTAT = 0;

  let isVisited = Array(n).fill(false);

  while (completed < n) {
    // Get available processes at current time
    let candidates = processes
      .map((p, i) => ({ ...p, index: i }))
      .filter((p, i) => p.AT <= time && !isVisited[i]);

    if (candidates.length === 0) {
      // No process has arrived yet
      time += 1;
      continue;
    }

    // Choose process with minimum BT among available ones
    candidates.sort((a, b) => a.BT - b.BT);
    const chosen = candidates[0];
    const i = chosen.index;

    const start = time;
    const end = time + chosen.BT;

    time = end;
    isVisited[i] = true;
    completed++;

    const CT = end;
    const TAT = CT - chosen.AT;
    const WT = TAT - chosen.BT;

    ganttChart.push({ pid: chosen.pid, start, end });
    metrics.push({ ...chosen, CT, TAT, WT });

    totalWT += WT;
    totalTAT += TAT;

    console.log(`[DEBUG] SJF: ${chosen.pid} | Start: ${start}, End: ${end}, CT: ${CT}, TAT: ${TAT}, WT: ${WT}`);
  }

  return {
    ganttChart,
    metrics,
    avgWT: parseFloat((totalWT / n).toFixed(2)),
    avgTAT: parseFloat((totalTAT / n).toFixed(2))
  };
}
