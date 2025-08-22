import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import schedulerRoutes from './routes/schedulerRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_DEPLOYMENT_URL,
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/schedule', schedulerRoutes);

app.listen(PORT, () => {
  console.log(`[DEBUG] Server running on port ${PORT}`);
});
