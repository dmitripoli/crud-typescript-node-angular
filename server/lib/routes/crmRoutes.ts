import { Request, Response } from "express";
// import { ContactController } from "../controllers/crm.controller";
import { APICRMController } from "../api/api.crm.controller";
import * as path from "path";
import bodyParser = require("body-parser");

export class Routes {
  public apiCRMController: APICRMController = new APICRMController();
  public routes(app): void {
    // support application/json type post data
    app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: false }));

    app
      .route("/contact")
      .get(this.apiCRMController.getContacts)
      .post(this.apiCRMController.addNewContact);
    app
      .route("/contact/:contactId")
      .get(this.apiCRMController.getContactWithID)
      .put(this.apiCRMController.updateContact)
      .delete(this.apiCRMController.deleteContact);
  }
}
