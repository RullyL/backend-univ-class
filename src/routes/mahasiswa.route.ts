import { Router } from 'express';
import upload from '../middlewares/upload.middleware';
import mahasiswaController from '../controllers/mahasiswa.controller';

const router = Router();

router.get('/', mahasiswaController.getAll);
router.get('/:id', mahasiswaController.getById);
router.post('/', upload.single('foto'), mahasiswaController.create);
router.put('/:id', upload.single('foto'), mahasiswaController.update);
router.delete('/:id', mahasiswaController.remove);

export default router;
