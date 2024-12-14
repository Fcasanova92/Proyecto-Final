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
  readUserById = async (id) => {
    try {
      await readById(id);
    } catch (error) {
      throw error;
    }
  };

  readUserByEmail = async (email) => {
    try {
      await readByEmail(email);
    } catch (error) {
      throw error;
    }
  };
  updateUser = async (id, updateData) => {
    try {
      await update(id, updateData);
    } catch (error) {
      throw error;
    }
  };
  destroyUser = async (id) => {
    try {
      await destroy(id);
    } catch (error) {
      throw error;
    }
  };
}
