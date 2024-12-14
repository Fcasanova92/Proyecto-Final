import { InternalServerError } from '../../../utils/errors';

export class Manager {
  constructor(model) {
    this.model = model;
  }
  create = async (data) => {
    try {
      const record = await this.model.create(data);
      return record;
    } catch (error) {
      InternalServerError(error.message);
    }
  };

  read = async () => {
    try {
      const record = this.model.findAll();
      return record;
    } catch (error) {
      InternalServerError(error.message);
    }
  };
  readById = async (id) => {
    try {
      const record = this.model.findOne({ _id: id });
      return record;
    } catch (error) {
      InternalServerError(error.message);
    }
  };
  destroy = async (id) => {
    try {
      const deleteRecord = this.model.deleteOne({ _id: id });
      return deleteRecord;
    } catch (error) {
      InternalServerError(error.message);
    }
  };
  update = async (id, data) => {
    try {
      const updateRecord = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updateRecord;
    } catch (error) {
      InternalServerError(error.message);
    }
  };
}
