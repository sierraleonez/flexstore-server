import express from "express";
import multer from "multer";
import { GCloud } from "./src/services/gcloud";
import Dotenv from "dotenv";
import { ErrorHandler } from "./src/middlewares/errorHandler";
import { Bucket } from "./src/controllers/bucket.controller";
import { BucketRoute } from "./src/routes/bucket.route";
import { ExpressValidator } from "express-validator";
import { EventsRoute } from "./src/routes/events.route";
import { UserRoute } from "./src/routes/user.route";
import User from "./src/controllers/users.controller";
import UserService from "./src/services/users.service";
import { PrismaClient } from "@prisma/client";

Dotenv.config();

function init() {
  const app = express();
  const prisma = new PrismaClient()
  // const GcloudService = new GCloud(process.env.GCLOUD_SERVICE_ACCOUNT || "");
  const userService = new UserService(prisma)

  // const BucketController = new Bucket(GcloudService);
  const UserController = new User(userService)

  const storage = multer.diskStorage({
    destination: "tmp/uploads",
    filename(req, file, callback) {
      callback(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  const port = 3001;

  app.use(express.urlencoded({ extended: true })); // support encoded bodies

  // app.use("/bucket", BucketRoute(upload, BucketController));

  app.use("/events", EventsRoute());

  app.use("/users", UserRoute(UserController))

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
