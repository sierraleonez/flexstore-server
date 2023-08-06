import express, { Router } from "express";
import multer from "multer";
import { iBucketController } from "../../types";
import { wrapAsync } from "../utils/wrapper";
import { createBucketSchema, createValidator } from "../validators/bucket/bucket.schema";

export function BucketRoute(
  upload: multer.Multer,
  BucketController: iBucketController
): Router {
  const router = express.Router();
	const BucketValidator = createValidator(createBucketSchema)
  router.post(
    "/upload",
    upload.single("file"),
    wrapAsync(BucketController.uploadObject)
  );

  router.post("/create", BucketValidator('createBucket'), wrapAsync(BucketController.create));

  router.post("/object/rename", wrapAsync(BucketController.renameObject));

  router.get("/:name/list", wrapAsync(BucketController.list));

  router.post("/object/download", wrapAsync(BucketController.downloadObject));

  router.delete("/object/delete", wrapAsync(BucketController.deleteObject));

  router.post(
    "/object/make-public",
    wrapAsync(BucketController.makeObjectPublic)
  );

  router.get("/object/public-url", wrapAsync(BucketController.getObjectUrl));

  return router;
}
