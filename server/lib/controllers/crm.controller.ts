import * as mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";
import { Request, Response } from "express";
import { BaseController } from "./base.controller";

export class ContactController extends BaseController {
  constructor() {
    super(mongoose.model("Contact", ContactSchema));
  }
}
