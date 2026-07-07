import { Request, Response } from "express";
import * as todaySpecialService from "../services/todaySpecial.service";
import { serializeTodaySpecial } from "../utils/serializeTodaySpecial";
import { successResponse } from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { CreateTodaySpecialInput, UpdateTodaySpecialInput } from "../types/todaySpecial.types";

interface TodaySpecialRequestBody {
  title?: string;
  dishName?: string;
  price?: number;
  image?: string;
  video?: string;
  isActive?: boolean;
}

export const getAllTodaySpecials = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const specials = await todaySpecialService.getAllTodaySpecials();
    const data = specials.map(serializeTodaySpecial);

    res.status(200).json(successResponse("Today's specials fetched successfully", data));
  }
);

export const getTodaySpecialById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const special = await todaySpecialService.getTodaySpecialById(id);

    res
      .status(200)
      .json(successResponse("Today's special fetched successfully", serializeTodaySpecial(special)));
  }
);

export const createTodaySpecial = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body as Required<TodaySpecialRequestBody>;

    const input: CreateTodaySpecialInput = {
      title: body.title,
      dishName: body.dishName,
      price: body.price,
      image: Buffer.from(body.image, "base64"),
      video: Buffer.from(body.video, "base64"),
      isActive: body.isActive,
    };

    const special = await todaySpecialService.createTodaySpecial(input);

    res
      .status(201)
      .json(successResponse("Today's special created successfully", serializeTodaySpecial(special)));
  }
);

export const updateTodaySpecial = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const body = req.body as TodaySpecialRequestBody;

    const input: UpdateTodaySpecialInput = {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.dishName !== undefined && { dishName: body.dishName }),
      ...(body.price !== undefined && { price: body.price }),
      ...(body.image !== undefined && { image: Buffer.from(body.image, "base64") }),
      ...(body.video !== undefined && { video: Buffer.from(body.video, "base64") }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
    };

    const special = await todaySpecialService.updateTodaySpecial(id, input);

    res
      .status(200)
      .json(successResponse("Today's special updated successfully", serializeTodaySpecial(special)));
  }
);

export const deleteTodaySpecial = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    await todaySpecialService.deleteTodaySpecial(id);

    res.status(200).json(successResponse("Today's special deleted successfully", {}));
  }
);
