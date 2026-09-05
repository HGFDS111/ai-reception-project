import { Router } from 'express';
import {
  createServiceTemplate,
  getServiceTemplates,
} from '../controllers/serviceTemplate.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createServiceTemplate);

router.get('/', getServiceTemplates);

export default router;