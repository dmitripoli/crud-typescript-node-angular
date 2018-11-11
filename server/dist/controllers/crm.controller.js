"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const crmModel_1 = require("../models/crmModel");
const base_controller_1 = require("./base.controller");
class ContactController extends base_controller_1.BaseController {
    constructor() {
        super(mongoose.model("Contact", crmModel_1.ContactSchema));
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crm.controller.js.map