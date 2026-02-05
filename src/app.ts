import express from 'express';
import dotenv from 'dotenv';
import mahasiswaRoutes from './routes/mahasiswa.route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.status(200).send('API OK');
});

app.get('/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.use('/mahasiswa', mahasiswaRoutes);

export default app;
