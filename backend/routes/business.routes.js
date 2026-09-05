import { Router } from 'express';
import {
  createBusiness,
  getMyBusinesses,
  updateBusiness,
  deleteBusiness,
} from '../controllers/business.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', createBusiness);
router.get('/', getMyBusinesses);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

export default router;