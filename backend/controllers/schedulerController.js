import { fcfsScheduling } from '../utils/algorithms/fcfs.js';
import { sjfNonPreemptive } from '../utils/algorithms/sjf.js';
import { sjfPreemptive } from '../utils/algorithms/sjfPreemptive.js';
import { priorityScheduling } from '../utils/algorithms/priority.js';
import { priorityPreemptive } from '../utils/algorithms/priorityPreemptive.js';
import { roundRobinScheduling } from '../utils/algorithms/roundRobin.js';








// Fisrt Come First Serve (FCFS) Scheduling Handler
export const handleFCFS = (req, res) => {
  try {
    const processes = req.body.processes;

    if (!Array.isArray(processes) || processes.length === 0) {
      return res.status(400).json({ error: 'Invalid input: No processes provided' });
    }

    console.log(`[DEBUG] FCFS: Received ${processes.length} processes`);
    processes.forEach((p, i) => {
      console.log(`[DEBUG] Process ${i + 1}:`, p);
    });

    const result = fcfsScheduling(processes);

    console.log(`[DEBUG] FCFS: Computed avgWT=${result.avgWT}, avgTAT=${result.avgTAT}`);
    res.status(200).json(result);
  } catch (error) {
    console.error(`[ERROR] FCFS scheduling failed:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Shortest Job First (SJF) Non-Preemptive Scheduling Handler
export const handleSJF = (req, res) => {
  try {
    const processes = req.body.processes;

    if (!Array.isArray(processes) || processes.length === 0) {
      return res.status(400).json({ error: 'Invalid input: No processes provided' });
    }

    console.log(`[DEBUG] SJF: Received ${processes.length} processes`);
    processes.forEach((p, i) => {
      console.log(`[DEBUG] Process ${i + 1}:`, p);
    });

    const result = sjfNonPreemptive(processes);

    console.log(`[DEBUG] SJF: Computed avgWT=${result.avgWT}, avgTAT=${result.avgTAT}`);
    res.status(200).json(result);
  } catch (error) {
    console.error(`[ERROR] SJF scheduling failed:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Shortest Job First (SJF) Preemptive Scheduling Handler
export const handleSJFPreemptive = (req, res) => {
  try {
    const processes = req.body.processes;

    if (!Array.isArray(processes) || processes.length === 0) {
      return res.status(400).json({ error: 'Invalid input: No processes provided' });
    }

    console.log(`[DEBUG] SJF Preemptive: Received ${processes.length} processes`);
    processes.forEach((p, i) => {
      console.log(`[DEBUG] Process ${i + 1}:`, p);
    });

    const result = sjfPreemptive(processes);

    console.log(`[DEBUG] SJF Preemptive: avgWT=${result.avgWT}, avgTAT=${result.avgTAT}`);
    res.status(200).json(result);
  } catch (error) {
    console.error(`[ERROR] SJF Preemptive scheduling failed:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Priority Scheduling Non- Preemptive Handler
export const handlePriority = (req, res) => {
  try {
    const processes = req.body.processes;

    if (!Array.isArray(processes) || processes.length === 0) {
      return res.status(400).json({ error: 'Invalid input: No processes provided' });
    }

    // Priority check
    const hasPriority = processes.every(p => p.hasOwnProperty('priority'));
    if (!hasPriority) {
      return res.status(400).json({ error: 'Each process must include a "priority" field' });
    }

    console.log(`[DEBUG] Priority Scheduling: Received ${processes.length} processes`);
    processes.forEach((p, i) => {
      console.log(`[DEBUG] Process ${i + 1}:`, p);
    });

    const result = priorityScheduling(processes);

    console.log(`[DEBUG] Priority Scheduling: avgWT=${result.avgWT}, avgTAT=${result.avgTAT}`);
    res.status(200).json(result);
  } catch (error) {
    console.error(`[ERROR] Priority scheduling failed:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Priority Scheduling Preemptive Handler
export const handlePriorityPreemptive = (req, res) => {
  try {
    const processes = req.body.processes;

    if (!Array.isArray(processes) || processes.length === 0) {
      return res.status(400).json({ error: 'Invalid input: No processes provided' });
    }

    const hasPriority = processes.every(p => p.hasOwnProperty('priority'));
    if (!hasPriority) {
      return res.status(400).json({ error: 'Each process must include a "priority" field' });
    }

    console.log(`[DEBUG] Priority Preemptive: Received ${processes.length} processes`);
    processes.forEach((p, i) => {
      console.log(`[DEBUG] Process ${i + 1}:`, p);
    });

    const result = priorityPreemptive(processes);

    console.log(`[DEBUG] Priority Preemptive: avgWT=${result.avgWT}, avgTAT=${result.avgTAT}`);
    res.status(200).json(result);
  } catch (error) {
    console.error(`[ERROR] Priority Preemptive scheduling failed:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Round Robin Scheduling Handler
export const handleRoundRobin = (req, res) => {
  try {
    const { processes, timeQuantum } = req.body;

    if (!Array.isArray(processes) || processes.length === 0) {
      return res.status(400).json({ error: 'Invalid input: No processes provided' });
    }

    if (!timeQuantum || typeof timeQuantum !== 'number' || timeQuantum <= 0) {
      return res.status(400).json({ error: 'Invalid input: timeQuantum must be a positive number' });
    }

    console.log(`[DEBUG] Round Robin: Received ${processes.length} processes`);
    console.log(`[DEBUG] Time Quantum: ${timeQuantum}`);
    processes.forEach((p, i) => {
      console.log(`[DEBUG] Process ${i + 1}:`, p);
    });

    const result = roundRobinScheduling(processes, timeQuantum);

    console.log(`[DEBUG] Round Robin: avgWT=${result.avgWT}, avgTAT=${result.avgTAT}`);
    res.status(200).json(result);
  } catch (error) {
    console.error(`[ERROR] Round Robin scheduling failed:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





