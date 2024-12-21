import {
  create,
  readById,
  readByEmail,
  destroy,
  update,
  readByCode,
} from '../data/mongo/managers/userManager.js';

export class UserService {
  createService = async (data) => {
    try {
      return await create(data);
    } catch (error) {
      throw error;
    }
  };
  readUserByIdService = async (id) => {
    try {
      return await readById(id);
    } catch (error) {
      throw error;
    }
  };

  readUserByEmailService = async (email) => {
    try {
      return await readByEmail(email);
    } catch (error) {
      throw error;
    }
  };

  readUserByCodeService = async (code) => {
    try {
      return await readByCode(code);
    } catch (error) {
      throw error;
    }
  };
  updateUserService = async (id, updateData) => {
    try {
      return await update(id, updateData);
    } catch (error) {
      throw error;
    }
  };
  destroyUserService = async (id) => {
    try {
      return await destroy(id);
    } catch (error) {
      throw error;
    }
  };
}

export const {
  readUserByEmailService,
  readUserByIdService,
  readUserByCodeService,
  destroyUserService,
  createService,
  updateUserService,
} = new UserService();
