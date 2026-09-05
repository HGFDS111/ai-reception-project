import { Router } from 'express';
import { createCallSession } from '../controllers/callSession.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createCallSession);

export default router;