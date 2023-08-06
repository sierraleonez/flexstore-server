import { body, validationResult } from "express-validator";
import { req, res } from "../../../types";

function createMessage(_: string, val: any) {
  return val.path + " is required";
}

export function createValidator(
  generateValidation: (method: string) => Array<any>
) {
  return (method: string) => {
    const validation = generateValidation(method);
    // Push handle validation error to validator middleware chain
    if (validation.length > 0) {
      validation.push(handleValidationError());
    }

    return validation;
  };
}

function handleValidationError() {
  return (req: req, res: res, next: any) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const response = {
        status: "failed",
        message: "Field not matched",
        errors: errors.array().map((err) => err.msg),
      };
      res.statusCode = 422;
      res.send(response);
      return;
    }
    next();
  };
}

export function createBucketSchema(method: string) {
  switch (method) {
    case "createBucket":
      return [
        body("name", createMessage).exists(),
        body("storageClass", "storage class invalid")
          .optional()
          .isIn(["STANDARD", "NEARLINE", "ARCHIVE", "COLDLINE"]),
      ];
    default:
      return [];
  }
}
