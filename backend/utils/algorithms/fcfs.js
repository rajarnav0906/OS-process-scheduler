export function fcfsScheduling(processes) {
  // Sort by Arrival Time (AT)
  processes.sort((a, b) => a.AT - b.AT);

  let currentTime = 0;
  let ganttChart = [];
  let metrics = [];
  let totalWT = 0, totalTAT = 0;

  for (const p of processes) {
    const start = Math.max(currentTime, p.AT);
    const end = start + p.BT;

    currentTime = end;

    const CT = end;
    const TAT = CT - p.AT;
    const WT = TAT - p.BT;

    ganttChart.push({ pid: p.pid, start, end });
    metrics.push({ ...p, CT, TAT, WT });

    totalWT += WT;
    totalTAT += TAT;

    console.log(`[DEBUG] FCFS: ${p.pid} | Start: ${start}, End: ${end}, CT: ${CT}, TAT: ${TAT}, WT: ${WT}`);
  }

  return {
    ganttChart,
    metrics,
    avgWT: parseFloat((totalWT / processes.length).toFixed(2)),
    avgTAT: parseFloat((totalTAT / processes.length).toFixed(2))
  };
}
