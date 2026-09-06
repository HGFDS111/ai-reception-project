import { Router } from 'express';
import {
  createDialogueScript,
  getDialogueScripts,
} from '../controllers/dialogueScript.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createDialogueScript);

router.get('/', getDialogueScripts);

export default router;