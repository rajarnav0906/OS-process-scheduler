import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import schedulerRoutes from './routes/schedulerRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/schedule', schedulerRoutes);

app.listen(PORT, () => {
  console.log(`[DEBUG] Server running on port ${PORT}`);
});
