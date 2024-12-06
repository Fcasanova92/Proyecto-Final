// endpoints que se dedican a actualiza, o leer informacion del usuario

import { UserManager } from '../../../data/mongo/managers/userManager.js';

import { Router } from 'express';

export const router = Router();

const user = new UserManager();

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = await user.getDataUserById(id);
    return res.status(200).json({ userData });
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const response = await user.updateDataUser(id, updateData);
    return res.status(200).json({ message: response.message });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await user.deleteUser(id);
    return res.status(200).json({ message: response.message });
  } catch (error) {
    next(error);
  }
});
