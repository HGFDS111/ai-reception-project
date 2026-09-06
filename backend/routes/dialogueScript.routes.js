import { Router } from 'express';
import {
  createDialogueScript,
  getDialogueScripts,
  updateDialogueScript,
  deleteDialogueScript,
} from '../controllers/dialogueScript.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createDialogueScript);

router.get('/', getDialogueScripts);

router.put('/:id', updateDialogueScript);

router.delete('/:id', deleteDialogueScript);

export default router;