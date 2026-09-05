import { Router } from 'express';
import { createServiceTemplate } from '../controllers/serviceTemplate.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createServiceTemplate);

export default router;