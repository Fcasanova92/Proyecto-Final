import {
  deleteUserFromDb,
  getAllUserFromDb,
  getUserByEmail,
  getUserById,
  saveUserInDb,
  updateUserInDb,
} from '../querys/userQuerys.js';

export class UserManager {
  async getDataAllUser() {
    try {
      const user = await getAllUserFromDb();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getDataUserById(id) {
    try {
      const user = await getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getDataUserByEmail(id) {
    try {
      const user = await getUserByEmail(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const response = await deleteUserFromDb(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateDataUser(id, updateData) {
    try {
      const userById = await getUserById(id);
      const userByIdUpdate = { ...userById, ...updateData };
      return await updateUserInDb(id, userByIdUpdate);
    } catch (error) {
      throw error;
    }
  }

  async createUser(data) {
    try {
      return await saveUserInDb(data);
    } catch (error) {
      throw error;
    }
  }
}

export const {
  createUser,
  updateDataUser,
  deleteUser,
  getDataUserById,
  getDataAllUser,
  getDataUserByEmail,
} = new UserManager();
