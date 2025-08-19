export function priorityScheduling(processes) {
  const n = processes.length;
  let time = 0;
  let completed = 0;
  let ganttChart = [];
  let metrics = [];
  let isVisited = Array(n).fill(false);
  let totalWT = 0, totalTAT = 0;

  while (completed < n) {
    let candidates = processes
      .map((p, i) => ({ ...p, index: i }))
      .filter((p, i) => p.AT <= time && !isVisited[i]);

    if (candidates.length === 0) {
      time++;
      continue;
    }

    // Select process with highest priority (lowest number)
    candidates.sort((a, b) => a.priority - b.priority || a.AT - b.AT);
    const chosen = candidates[0];
    const i = chosen.index;

    const start = time;
    const end = time + chosen.BT;
    time = end;

    const CT = end;
    const TAT = CT - chosen.AT;
    const WT = TAT - chosen.BT;

    ganttChart.push({ pid: chosen.pid, start, end });
    metrics.push({ ...chosen, CT, TAT, WT });

    totalWT += WT;
    totalTAT += TAT;

    isVisited[i] = true;
    completed++;

    console.log(`[DEBUG] Priority: ${chosen.pid} | CT: ${CT}, TAT: ${TAT}, WT: ${WT}`);
  }

  return {
    ganttChart,
    metrics,
    avgWT: parseFloat((totalWT / n).toFixed(2)),
    avgTAT: parseFloat((totalTAT / n).toFixed(2))
  };
}
