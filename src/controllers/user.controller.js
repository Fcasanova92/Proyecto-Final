import { UserService } from '../services/user.service.js';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userData = await this.userService.getUserById(id);
      return res.status(200).json({ userData });
    } catch (error) {
      next(error);
    }
  };

  updateData = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const response = await this.userService.updateUser(id, updateData);
      return res.status(200).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.userService.delete(id);
      return res.status(200).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  };
}

const controller = new UserController();
export const { getById, deleteUser, updateData } = controller;
