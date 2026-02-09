import { Router } from 'express';
import upload from '../middlewares/upload.middleware';
import anythingController from '../controllers/anything.controller';

const router = Router();

router.get('/', anythingController.getAll);
router.get('/:id', anythingController.getById);
router.post('/', upload.single('image'), anythingController.create);
router.put('/:id', upload.single('image'), anythingController.update);
router.delete('/:id', anythingController.remove);

export default router;
