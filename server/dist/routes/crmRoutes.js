"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { ContactController } from "../controllers/crm.controller";
const api_crm_controller_1 = require("../api/api.crm.controller");
const bodyParser = require("body-parser");
class Routes {
    constructor() {
        this.apiCRMController = new api_crm_controller_1.APICRMController();
    }
    routes(app) {
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
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map