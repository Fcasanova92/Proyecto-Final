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
      throw new InternalServerError(error.message);
    }
  }

  async readByCode(code) {
    try {
      const user = await userModel.findOne({ verifyCode: code }).lean();
      return user;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}

export const {
  readByEmail,
  read,
  readById,
  destroy,
  update,
  create,
  readByCode,
} = new UserManager();
