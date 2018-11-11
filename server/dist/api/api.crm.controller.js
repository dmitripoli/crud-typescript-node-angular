"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmModel_1 = require("../models/crmModel");
const mongoose = require("mongoose");
const Contact = mongoose.model("Contact", crmModel_1.ContactSchema);
const crm_controller_1 = require("../controllers/crm.controller");
class APICRMController {
    constructor() {
        this.contactController = new crm_controller_1.ContactController();
    }
    async addNewContact(req, res) {
        let newContact = new Contact(req.body);
        try {
            let contactController = new crm_controller_1.ContactController();
            const resContact = await contactController.create(newContact);
            return res.json(resContact);
        }
        catch (err) {
            res.send(err);
        }
    }
    async getContacts(req, res) {
        try {
            let contactController = new crm_controller_1.ContactController();
            const resContact = await contactController.get({});
            return res.json(resContact);
        }
        catch (err) {
            res.send(err);
        }
    }
    async getContactWithID(req, res) {
        const filter = { _id: req.params.contactId };
        try {
            let contactController = new crm_controller_1.ContactController();
            const resContact = await contactController.get(filter);
            return res.json(resContact);
        }
        catch (err) {
            res.send(err);
        }
    }
    async updateContact(req, res) {
        try {
            const filter = { _id: req.params.contactId };
            const data = req.body;
            let contactController = new crm_controller_1.ContactController();
            const resContact = await contactController.update(filter, data);
            console.log(resContact);
            return res.json(resContact);
        }
        catch (err) {
            res.send(err);
        }
    }
    async deleteContact(req, res) {
        const filter = { _id: req.params.contactId };
        try {
            let contactController = new crm_controller_1.ContactController();
            const resContact = await contactController.delete(filter);
            return res.json(resContact);
        }
        catch (err) {
            res.send(err);
        }
    }
}
exports.APICRMController = APICRMController;
//# sourceMappingURL=api.crm.controller.js.map