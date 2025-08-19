export function roundRobinScheduling(processes, timeQuantum) {
  const n = processes.length;
  let time = 0;
  let queue = [];
  let ganttChart = [];
  let remainingBT = processes.map(p => p.BT);
  let isCompleted = Array(n).fill(false);
  let visited = Array(n).fill(false);

  let completed = 0;
  let totalWT = 0, totalTAT = 0;
  let metricsMap = {};

  // Sort by arrival time initially
  processes.sort((a, b) => a.AT - b.AT);

  // Add first process(es)
  for (let i = 0; i < n; i++) {
    if (processes[i].AT === time) {
      queue.push(i);
      visited[i] = true;
    }
  }

  while (completed < n) {
    if (queue.length === 0) {
      time++;
      for (let i = 0; i < n; i++) {
        if (!visited[i] && processes[i].AT <= time) {
          queue.push(i);
          visited[i] = true;
        }
      }
      continue;
    }

    const i = queue.shift();
    const p = processes[i];
    const start = time;
    const execTime = Math.min(timeQuantum, remainingBT[i]);

    time += execTime;
    remainingBT[i] -= execTime;

    ganttChart.push({ pid: p.pid, start, end: time });

    // Add any new arrivals during this slice
    for (let j = 0; j < n; j++) {
      if (!visited[j] && processes[j].AT <= time) {
        queue.push(j);
        visited[j] = true;
      }
    }

    if (remainingBT[i] > 0) {
      queue.push(i); // Re-add to the end
    } else {
      completed++;
      const CT = time;
      const TAT = CT - p.AT;
      const WT = TAT - p.BT;

      metricsMap[p.pid] = {
        pid: p.pid,
        AT: p.AT,
        BT: p.BT,
        CT,
        TAT,
        WT
      };

      totalWT += WT;
      totalTAT += TAT;

      console.log(`[DEBUG] RR: ${p.pid} | CT: ${CT}, TAT: ${TAT}, WT: ${WT}`);
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
