import express from "express";
import multer from "multer";
import { GCloud } from "./src/services/gcloud";
import Dotenv from "dotenv";
import { ErrorHandler } from "./src/middlewares/errorHandler";
import { Bucket } from "./src/controllers/bucket.controller";
import { BucketRoute } from "./src/routes/bucket.route";
import { ExpressValidator } from "express-validator";

Dotenv.config();

function init() {
  const app = express();
  const GcloudService = new GCloud(process.env.GCLOUD_SERVICE_ACCOUNT || "");
  const BucketController = new Bucket(GcloudService);
  const storage = multer.diskStorage({
    destination: "tmp/uploads",
    filename(req, file, callback) {
      callback(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  const port = 3001;

  app.use(express.urlencoded({ extended: true })); // support encoded bodies

  app.use("/bucket", BucketRoute(upload, BucketController));

  app.get("/", (_, res) => {
    console.log("hello world");
    res.send("Everything OK");
  });

  app.use(ErrorHandler);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
