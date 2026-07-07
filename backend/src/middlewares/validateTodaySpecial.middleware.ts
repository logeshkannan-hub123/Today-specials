import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidPrice(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isValidBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isValidBase64(value: unknown): value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    return false;
  }
  return Buffer.from(value, "base64").toString("base64").length > 0;
}

export function validateCreateTodaySpecial(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { title, dishName, price, image, video, isActive } = req.body as Record<
    string,
    unknown
  >;

  const missingFields: string[] = [];

  if (!isNonEmptyString(title)) missingFields.push("title");
  if (!isNonEmptyString(dishName)) missingFields.push("dishName");
  if (!isValidPrice(price)) missingFields.push("price");
  if (!isValidBoolean(isActive)) missingFields.push("isActive");

  if (image !== undefined && image !== null && !isValidBase64(image)) {
    missingFields.push("image");
  }
  if (video !== undefined && video !== null && !isValidBase64(video)) {
    missingFields.push("video");
  }

  if (missingFields.length > 0) {
    next(
      new ApiError(
        400,
        `Invalid or missing required field(s): ${missingFields.join(", ")}`
      )
    );
    return;
  }

  const hasImage = isValidBase64(image);
  const hasVideo = isValidBase64(video);

  if (!hasImage && !hasVideo) {
    next(new ApiError(400, "At least one of image or video is required"));
    return;
  }

  next();
}

export function validateUpdateTodaySpecial(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { title, dishName, price, image, video, isActive } = req.body as Record<
    string,
    unknown
  >;

  if (
    title === undefined &&
    dishName === undefined &&
    price === undefined &&
    image === undefined &&
    video === undefined &&
    isActive === undefined
  ) {
    next(new ApiError(400, "At least one field must be provided to update"));
    return;
  }

  const invalidFields: string[] = [];

  if (title !== undefined && !isNonEmptyString(title)) invalidFields.push("title");
  if (dishName !== undefined && !isNonEmptyString(dishName)) invalidFields.push("dishName");
  if (price !== undefined && !isValidPrice(price)) invalidFields.push("price");
  if (image !== undefined && !isValidBase64(image)) invalidFields.push("image");
  if (video !== undefined && !isValidBase64(video)) invalidFields.push("video");
  if (isActive !== undefined && !isValidBoolean(isActive)) invalidFields.push("isActive");

  if (invalidFields.length > 0) {
    next(new ApiError(400, `Invalid field(s): ${invalidFields.join(", ")}`));
    return;
  }

  next();
}

export function validateIdParam(req: Request, _res: Response, next: NextFunction): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    next(new ApiError(400, "Invalid id parameter"));
    return;
  }

  next();
}
