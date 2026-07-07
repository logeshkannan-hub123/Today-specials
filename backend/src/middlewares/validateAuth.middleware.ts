import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateAuthCredentials(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { username, password } = req.body as Record<string, unknown>;

  const missingFields: string[] = [];

  if (!isNonEmptyString(username)) missingFields.push("username");
  if (!isNonEmptyString(password)) missingFields.push("password");

  if (missingFields.length > 0) {
    next(
      new ApiError(400, `Invalid or missing required field(s): ${missingFields.join(", ")}`)
    );
    return;
  }

  next();
}
