import { Router } from 'express';

import { userRoutes } from '../users/user-routes.ts';
import { bookRoutes } from '../books/book-routes.ts';

export const router = Router();

router.use('/biblioteca', userRoutes);
router.use('/biblioteca', bookRoutes);
