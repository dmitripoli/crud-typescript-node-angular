import * as mongoose from "mongoose";

//Basic CRUD operations

class BaseController {
  private model;

  constructor(model) {
    this.model = model;
  }

  public async create(data) {
    return this.model.create(data);
  }

  public async read(filter) {
    return this.model.find(filter);
  }

  public async update(filter, data) {
    return this.model.findByIdAndUpdate(filter._id, data, {
      new: true
    });
  }

  public async delete(filter) {
    return this.model.remove(filter);
  }

  public async get(filter) {
    return this.model.find(filter);
  }
}

export { BaseController };
