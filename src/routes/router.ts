import { Router } from 'express';

import { userRoutes } from '../users/user-routes.js';

export const router = Router();

router.use('/biblioteca', userRoutes);
