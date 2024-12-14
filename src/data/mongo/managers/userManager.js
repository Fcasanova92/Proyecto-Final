import { InternalServerError } from '../../../utils/errors.js';
import { userModel } from '../models/user.js';
import { Manager } from './manager.js';

export class UserManager extends Manager {
  constructor() {
    super(userModel);
  }
  async readByEmail(email) {
    try {
      const user = await userModel.findOne({ email: email }).lean();
      return user;
    } catch (error) {
      throw InternalServerError(error.message);
    }
  }
}

export const { readByEmail, read, readById, destroy, update } =
  new UserManager();
