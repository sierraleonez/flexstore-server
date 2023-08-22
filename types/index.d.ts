import { File, Storage } from "@google-cloud/storage";
import { ServiceObject } from "@google-cloud/storage/build/src/nodejs-common";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime";
import { Request, Response } from "express";

export type storageClass = "STANDARD" | "NEARLINE" | "COLDLINE" | "ARCHIVE";

type Prism = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
  DefaultArgs
>;

export interface iAuthService {
  _prisma: Prism

  generateAccessToken(): void
  generateRefreshToken(): void
  revokeAccessToken(): void
}

export interface iGCloudService {
  storage: Storage;
  createBucket(
    bucketName: string,
    storageClass?: storageClass | string
  ): Promise<void>;
  uploadObject(
    bucketName: string,
    filePath: string,
    fileName: string
  ): Promise<void>;
  renameObject(
    bucketName: string,
    objectName: string,
    newName: string
  ): Promise<void>;
  objectList(bucketName: string): Promise<ServiceObject<File>[]>;
  downloadObject(bucketName: string, objectName: string): Promise<void>;
  deleteObject(bucketName: string, objectName: string): Promise<void>;
  makeObjectPublic(bucketName: string, objectName: string): Promise<void>;
  createFolder(bucketName: string, folderName: string): void;
  getPublicObjectUrl(bucketName: string, objectName: string): Promise<string>;
}

export type createUserPayload = {
  email: string;
  username: string;
  password: string;
  role: string;
};

export type authenticateUserPayload = {
  email: string;
  password: string;
};

export interface iUsersService {
  _prisma: Prism;
  createUser({
    email,
    username,
    password,
    role,
  }: createUserPayload): Promise<any>;
  authenticateUser({ email, password }: authenticateUserPayload): Promise<any>;

}

export type controllerFunc = (req: req, res: res) => Promise<void>
export type req = Request<any, any, any, any, Record<string, any>>;
export type res = Response<any, Record<string, any>>;
export interface iBucketController {
  gcloudService: iGCloudService;
  create(req: req, res: res, next?: any): Promise<void>;
  renameObject(req: req, res: res): Promise<void>;
  list(req: req, res: res): Promise<void>;
  uploadObject(req: req, res: res): Promise<void>;
  downloadObject(req: req, res: res): Promise<void>;
  deleteObject(req: req, res: res): Promise<void>;
  makeObjectPublic(req: req, res: res): Promise<void>;
  getObjectUrl(req: req, res: res): Promise<void>;
}

export interface iUserController {
  _service: iUsersService
  register: controllerFunc
  login: controllerFunc
}
