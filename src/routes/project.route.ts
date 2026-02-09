import { Router } from 'express';
import upload from '../middlewares/upload.middleware';
import projectController from '../controllers/project.controller';

const router = Router();

router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/', upload.single('fotoProject'), projectController.create);
router.put('/:id', upload.single('fotoProject'), projectController.update);
router.delete('/:id', projectController.remove);

export default router;
