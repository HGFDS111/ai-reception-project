import { Router } from 'express';
import {
  createCallSession,
  getCallSessions,
  startSimulation,
  sendMessage,
  getCallMessages,
} from '../controllers/callSession.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createCallSession);

router.get('/', getCallSessions);

router.post('/simulate', startSimulation);

router.get('/:id/messages', getCallMessages);

router.post('/:id/messages', sendMessage);

export default router;