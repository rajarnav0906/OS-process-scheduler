import express from 'express';
import {
  handleFCFS,
  handleSJF,
  handleSJFPreemptive,
  handlePriority,
  handlePriorityPreemptive,
  handleRoundRobin
} from '../controllers/schedulerController.js';

const router = express.Router();

// FCFS
router.post('/fcfs', handleFCFS);

// SJF Non-Preemptive
router.post('/sjf', handleSJF);

// SJF Preemptive 
router.post('/sjf-preemptive', handleSJFPreemptive);

// Priority Scheduling Non-Preemptive
router.post('/priority', handlePriority);

// Priority Scheduling Preemptive
router.post('/priority-preemptive', handlePriorityPreemptive);

// Round Robin Scheduling
router.post('/roundrobin', handleRoundRobin);

export default router;
