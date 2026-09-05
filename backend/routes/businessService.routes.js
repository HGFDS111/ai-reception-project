import { Router } from 'express';
import {
  addServiceToBusiness,
  getBusinessServices,
} from '../controllers/businessService.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/:businessId/services', addServiceToBusiness);
router.get('/:businessId/services', getBusinessServices);

export default router;