import { Storage, UploadOptions } from "@google-cloud/storage";
import { iGCloudService } from "../../types";


export class GCloud implements iGCloudService {
  private _storage: Storage;
  constructor(credentialPath: string) {
    this._storage = new Storage({ keyFilename: credentialPath });
     
    this.createBucket = this.createBucket.bind(this)
    this.createFolder = this.createFolder.bind(this)
    this.deleteObject = this.deleteObject.bind(this)
    this.downloadObject = this.downloadObject.bind(this)
    this.getPublicObjectUrl = this.getPublicObjectUrl.bind(this)
    this.makeObjectPublic = this.makeObjectPublic.bind(this)
    this.objectList = this.objectList.bind(this)
    this.renameObject = this.renameObject.bind(this)
    this.uploadObject = this.uploadObject.bind(this)
  }

  set storage(st: Storage) {
    this._storage = st;
  }

  async createBucket(bucketName: string, storageClass: string = "STANDARD") {
    const [bucket] = await this._storage.createBucket(bucketName, {
      location: "ASIA-SOUTHEAST2",
      storageClass,
    });
    console.log(bucket);
    console.log(`success creating bucket ${bucketName}!`);
  }

  async uploadObject(bucketName: string, filePath: string, fileName: string) {
    const options: UploadOptions = {
      destination: fileName,
    };
    await this._storage.bucket(bucketName).upload(filePath, options);
    console.log("Success uploading file");
  }

  async renameObject(bucketName: string, objectName: string, newName: string) {
    try {
      await this._storage.bucket(bucketName).file(objectName).move(newName);
      console.log("file modified");
    } catch (err) {
      console.log(err);
      throw new Error("Something is wrong happened");
    }
  }

  async objectList(bucketName: string) {
    try {
      const [list] = await this._storage.bucket(bucketName).getFiles({});

      const mappedResponse = list.map((res) => res.metadata);
      return mappedResponse;
    } catch (err) {
      console.log(err);
      throw new Error("something is happened");
    }
  }

  async downloadObject(bucketName: string, objectName: string) {
    await this._storage
      .bucket(bucketName)
      .file(objectName)
      .download({ destination: `tmp/downloads/${objectName}` });
  }

  async deleteObject(bucketName: string, objectName: string) {
    await this._storage.bucket(bucketName).file(objectName).delete();
  }

  async createFolder(bucketName: string, folderName: string) {}

  async makeObjectPublic(bucketName: string, objectName: string) {
    const t = await this._storage
      .bucket(bucketName)
      .file(objectName)
      .makePublic();
  }

  async getPublicObjectUrl(bucketName: string, objectName: string) {
    const url = await this._storage
      .bucket(bucketName)
      .file(objectName)
      .publicUrl();
    return url;
  }
}
