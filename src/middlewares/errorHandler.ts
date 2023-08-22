import { req, res } from "../../types";

export const ErrorHandler = (err: any, req: req, res: res, next: any) => {
  console.log("Middleware Error Handling", err);
  const errStatus = err.code || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).send({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};
