import { InternalServerError } from '../../../utils/errors.js';

export class Manager {
  constructor(model) {
    this.model = model;
  }
  create = async (data) => {
    try {
      const record = await this.model.create(data);
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };

  read = async () => {
    try {
      const record = await this.model.find();
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
  readById = async (id) => {
    try {
      const record = await this.model.findOne({ _id: id });
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
  destroy = async (id) => {
    try {
      const deleteRecord = await this.model.deleteOne({ _id: id });
      return deleteRecord;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
  update = async (id, data) => {
    try {
      const updateRecord = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updateRecord;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
}
