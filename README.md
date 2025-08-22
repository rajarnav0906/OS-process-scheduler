# ⚙️ OS Process Scheduler – Interactive Visualizer

🔗 Live Link: [https://os-process-scheduler.onrender.com](https://os-process-scheduler.onrender.com)

---

## 📌 About this project

This is a web app I made to **visualize CPU scheduling algorithms**.  
It shows how different scheduling works with a proper **Gantt chart and metrics**. The main idea is to make OS concepts easier to understand by running them in a simulator instead of just theory.

---

## ✨ Features

- Supported algorithms:
  - FCFS (First Come First Serve)  
  - SJF (Shortest Job First) – Preemptive & Non-preemptive  
  - Priority Scheduling – Preemptive & Non-preemptive  
  - Round Robin (with custom time quantum)  
- Shows **Gantt chart** with processes highlighted  
- Shows metrics:
  - Completion Time (CT)  
  - Turnaround Time (TAT)  
  - Waiting Time (WT)  
  - Average values  
- Fully responsive (works well on mobile also)  
- Clean UI with icons and fallback message when no result  

---

## 🛠 Tech Stack

**Frontend:** React + Vite, Axios, Tailwind CSS, Framer Motion, Lucide Icons  
**Backend:** Node.js, Express.js, MongoDB Atlas  
**Deployment:** Render  

---

## 🚀 How to run locally

```bash
# Clone repo
git clone https://github.com/rajarnav0906/OS-process-scheduler

# Backend setup
cd backend
npm install
npm start

# Frontend setup
cd ../frontend
npm install
npm run dev
