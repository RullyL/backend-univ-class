import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mahasiswaRoutes from './routes/mahasiswa.route';
import projectRoutes from './routes/project.route';
import anythingRoutes from './routes/anything.route';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://backend-univ-class-2eunw8suo-rully-lukmansyahs-projects.vercel.app',
    ],
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.status(200).send('API OK');
});

app.get('/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.use('/mahasiswa', mahasiswaRoutes);
app.use('/projects', projectRoutes);
app.use('/anything', anythingRoutes);

export default app;
