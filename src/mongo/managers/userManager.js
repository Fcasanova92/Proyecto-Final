// estarian los metodos relacionados al login, registro y lo

import {
  deleteUserFromDb,
  getAllUserFromDb,
  getUserByEmail,
  getUserById,
  saveUserInDb,
  updateUserInDb,
} from '../../mongo/querys/userQuerys.js';
import { hashPassword } from '../../utils/byScript.js';
import { uidGenerator } from '../../utils/uidGenerator.js';
import { __dirname } from '../../utils/mongoose.js';

export class UserManager {
  constructor() {
    this.path = __dirname;
  }

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
    const { password, email, ...userData } = data;
    try {
      const hashPassowrd = hashPassword(password);

      const uid = uidGenerator();

      const userRegister = { ...userData, password: hashPassowrd, uid };

      return await saveUserInDb(userRegister);
    } catch (error) {
      throw error;
    }
  }
}
