import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import { errorResponse } from "../utils/apiResponse";

export function errorHandlerMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(errorResponse(err.message));
    return;
  }

  const message = err instanceof Error ? err.message : "Internal server error";

  // eslint-disable-next-line no-console
  console.error(err);

  res.status(500).json(errorResponse(message || "Internal server error"));
}
