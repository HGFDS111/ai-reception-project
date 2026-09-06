import { Router } from 'express';
import {
  createCallSession,
  getCallSessions,
} from '../controllers/callSession.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createCallSession);

router.get('/', getCallSessions);

export default router;