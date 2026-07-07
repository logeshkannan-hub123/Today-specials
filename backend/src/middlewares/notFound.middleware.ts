import { Request, Response } from "express";
import { errorResponse } from "../utils/apiResponse";

export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json(errorResponse(`Route ${req.method} ${req.originalUrl} not found`));
}
