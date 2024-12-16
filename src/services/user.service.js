import {
  create,
  readById,
  readByEmail,
  destroy,
  update,
} from '../data/mongo/managers/userManager.js';

export class UserService {
  createService = async (data) => {
    try {
      await create(data);
    } catch (error) {
      throw error;
    }
  };
  readUserByIdService = async (id) => {
    try {
      await readById(id);
    } catch (error) {
      throw error;
    }
  };

  readUserByEmailService = async (email) => {
    try {
      await readByEmail(email);
    } catch (error) {
      throw error;
    }
  };
  updateUserService = async (id, updateData) => {
    try {
      await update(id, updateData);
    } catch (error) {
      throw error;
    }
  };
  destroyUserService = async (id) => {
    try {
      await destroy(id);
    } catch (error) {
      throw error;
    }
  };
}

export const {
  readUserByEmailService,
  readUserByIdService,
  destroyUserService,
  createService,
  updateUserService,
} = new UserService();
