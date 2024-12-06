import {
  getDataUserById,
  updateDataUser,
  deleteUser,
} from '../data/mongo/managers/userManager.js';

export class UserService {
  getUserById = async (id) => await getDataUserById(id);
  updateUser = async (id, updateData) => await updateDataUser(id, updateData);
  delete = async (id) => await deleteUser(id);
}
