"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Basic CRUD operations
class BaseController {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async read(filter) {
        return this.model.find(filter);
    }
    async update(filter, data) {
        return this.model.findByIdAndUpdate(filter._id, data, {
            new: true
        });
    }
    async delete(filter) {
        return this.model.remove(filter);
    }
    async get(filter) {
        return this.model.find(filter);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map