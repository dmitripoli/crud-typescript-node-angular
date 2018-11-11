"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crmRoutes_1 = require("./routes/crmRoutes");
const path = require("path");
var mime = require("mime-types");
class App {
    constructor() {
        this.routePrv = new crmRoutes_1.Routes();
        this.mongoUrl = "mongodb://localhost:27017/CRMdb";
        this.app = express();
        this.routePrv.routes(this.app);
        this.config();
        this.mongoSetup();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        /**
         * Restricting only methods currently supported
         */
        this.app.use(function (req, res, next) {
            if (!["POST", "GET", "PUT", "DELETE", "COPY", "PATCH"].find(method => method.toLowerCase() == req.method.toLowerCase())) {
                res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,COPY,PATCH");
            }
            next();
        });
        //Point static path to dist
        this.app.use(express.static(path.join(__dirname, "../build"), {
            setHeaders: (res, path) => {
                if (mime.lookup(path) !== "text/html") {
                    res.setHeader("Cache-Control", "public, max-age=86400, immutable");
                }
            }
        }));
        this.app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../build/index.html"));
        });
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.default = new App().app;
//tsc - all the ts files in the lib folder will be compiled //to js files in the dist folder
//# sourceMappingURL=app.js.map