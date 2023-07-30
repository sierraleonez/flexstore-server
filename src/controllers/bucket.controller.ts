import { iBucketController, iGCloudService, req, res } from "../../types";

export class Bucket implements iBucketController {
  gcloudService: iGCloudService;
  constructor(gcloud: iGCloudService) {
    this.gcloudService = gcloud;

    this.create = this.create.bind(this);
    this.deleteObject = this.deleteObject.bind(this);
    this.uploadObject = this.uploadObject.bind(this);
    this.downloadObject = this.downloadObject.bind(this);
    this.getObjectUrl = this.getObjectUrl.bind(this);
    this.list = this.list.bind(this);
    this.makeObjectPublic = this.makeObjectPublic.bind(this);
    this.renameObject = this.renameObject.bind(this)
  }

  async create(req: req, res: res, next: any) {
      const { name } = req.body;
      await this.gcloudService.createBucket(name);
      res.send("bucket created");
    
  }

  async list(req: req, res: res) {
    const bucketName = req.params.name;
    const list = await this.gcloudService.objectList(bucketName);
    res.send({
      status: "success",
      data: list,
    });
  }

  async renameObject(req: req, res: res) {
    const { bucketName, fileName, newName } = req.body;
    await this.gcloudService.renameObject(bucketName, fileName, newName);
    res.send({
      message: "object updated",
      status: "success",
    });
  }

  async uploadObject(req: req, res: res) {
    const { bucketName } = req.body;
    await this.gcloudService.uploadObject(
      bucketName,
      req.file?.path || "",
      req.file?.originalname || ""
    );
    res.send("File uploaded!");
  }

  async downloadObject(req: req, res: res) {
    const { bucketName, objectName } = req.body;
    await this.gcloudService.downloadObject(bucketName, objectName);
    res.sendFile(
      `/Users/almerandhika/almer/flexstore/server/tmp/downloads/${objectName}`
    );
  }

  async deleteObject(req: req, res: res) {
    const { bucketName, objectName } = req.body;
    await this.gcloudService.deleteObject(bucketName, objectName);
    res.send({
      status: "success",
      message: "Object deleted",
    });
  }

  async getObjectUrl(req: req, res: res) {
    const { bucketName, objectName } = req.query;
    const publicUrl = await this.gcloudService.getPublicObjectUrl(
      String(bucketName),
      String(objectName)
    );
    res.send({
      status: "success",
      message: "ok",
      publicUrl,
      bucketName,
      objectName,
    });
  }

  async makeObjectPublic(req: req, res: res) {
    const { bucketName, objectName } = req.body;
    await this.gcloudService.makeObjectPublic(bucketName, objectName);
    const publicUrl = await this.gcloudService.getPublicObjectUrl(
      bucketName,
      objectName
    );

    res.send({
      status: "success",
      message: "Object is now public",
      data: {
        publicUrl,
      },
    });
  }
}
