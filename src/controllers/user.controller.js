import { USER_MESSAGES } from '../constant/userMessage.js';
import {
  readUserByEmailService,
  readUserByIdService,
  updateUserService,
  destroyUserService,
} from '../services/user.service.js';
class UserController {
  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userData = await readUserByIdService(id);
      return res.status(200).json({ data: userData, message: null });
    } catch (error) {
      next(error);
    }
  };

  getByEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const userData = await readUserByEmailService(email);
      return res.status(200).json({ data: userData, message: null });
    } catch (error) {
      next(error);
    }
  };

  updateData = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      await updateUserService(id, updateData);
      return res
        .status(200)
        .json({ data: null, message: USER_MESSAGES.USER_UPDATE });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      await destroyUserService(id);
      return res
        .status(200)
        .json({ data: null, message: USER_MESSAGES.USER_DELETE });
    } catch (error) {
      next(error);
    }
  };
}

const controller = new UserController();
export const { getById, deleteUser, updateData } = controller;
