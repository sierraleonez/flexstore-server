import { Prisma, PrismaClient } from "@prisma/client";
import express, { Router } from "express";
import { wrapAsync } from "../utils/wrapper";
import { iUserController } from "../../types";

export function UserRoute(userController: iUserController): Router {
  const prisma = new PrismaClient();
  const router = express.Router();

  router.post(
    "/create",
    wrapAsync(userController.register)
  );

  router.post(
    "/login",
    wrapAsync(userController.login)
  )

  return router;
}
