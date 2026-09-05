import { Router } from 'express';
import {
  createClient,
  getClients,
} from '../controllers/client.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createClient);

router.get('/', getClients);

export default router;