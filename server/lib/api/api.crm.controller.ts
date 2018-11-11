import { ContactSchema } from "../models/crmModel";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
const Contact = mongoose.model("Contact", ContactSchema);
import { ContactController } from "../controllers/crm.controller";

export class APICRMController {
  private contactController: ContactController;
  constructor() {
    this.contactController = new ContactController();
  }

  public async addNewContact(req: Request, res: Response) {
    let newContact = new Contact(req.body);
    try {
      let contactController = new ContactController();
      const resContact = await contactController.create(newContact);
      return res.json(resContact);
    } catch (err) {
      res.send(err);
    }
  }

  public async getContacts(req: Request, res: Response) {
    try {
      let contactController = new ContactController();
      const resContact = await contactController.get({});
      return res.json(resContact);
    } catch (err) {
      res.send(err);
    }
  }

  public async getContactWithID(req: Request, res: Response) {
    const filter = { _id: req.params.contactId };
    try {
      let contactController = new ContactController();
      const resContact = await contactController.get(filter);
      return res.json(resContact);
    } catch (err) {
      res.send(err);
    }
  }

  public async updateContact(req: Request, res: Response) {
    try {
      const filter = { _id: req.params.contactId };
      const data = req.body;
      let contactController = new ContactController();
      const resContact = await contactController.update(filter, data);
      console.log(resContact);
      return res.json(resContact);
    } catch (err) {
      res.send(err);
    }
  }

  public async deleteContact(req: Request, res: Response) {
    const filter = { _id: req.params.contactId };
    try {
      let contactController = new ContactController();
      const resContact = await contactController.delete(filter);
      return res.json(resContact);
    } catch (err) {
      res.send(err);
    }
  }
}
