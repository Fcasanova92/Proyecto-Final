// endpoints que se dedican a actualiza, o leer informacion del usuario

import {
  getById,
  updateData,
  deleteUser,
} from '../../../controllers/user.controller.js';

import { Router } from 'express';

export const router = Router();

router.get('/:id', getById);

router.patch('/:id', updateData);

router.delete('/:id', deleteUser);
