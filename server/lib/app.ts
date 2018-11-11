import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/crmRoutes";
import * as path from "path";
import { Request, Response } from "express";
import * as mime from "mime";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = "mongodb://localhost:27017/CRMdb";
  constructor() {
    this.app = express();
    this.routePrv.routes(this.app);
    this.config();
    this.mongoSetup();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    /**
     * Restricting only methods currently supported
     */
    this.app.use(function(req, res, next) {
      if (
        !["POST", "GET", "PUT", "DELETE", "COPY", "PATCH"].find(
          method => method.toLowerCase() == req.method.toLowerCase()
        )
      ) {
        res.header(
          "Access-Control-Allow-Methods",
          "POST,GET,PUT,DELETE,COPY,PATCH"
        );
      }
      next();
    });

    //Point static path to dist
    this.app.use(
      express.static(path.join(__dirname, "../build"), {
        setHeaders: (res, path) => {
          if (mime.getType(path) !== "text/html") {
            res.setHeader("Cache-Control", "public, max-age=86400, immutable");
          }
        }
      })
    );

    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../build/index.html"));
    });
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      this.mongoUrl,
      { useNewUrlParser: true }
    );
  }
}
export default new App().app;

//tsc - all the ts files in the lib folder will be compiled //to js files in the dist folder
