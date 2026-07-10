import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { serializeUser } from "../utils/serializeUser";
import { successResponse } from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { LoginInput } from "../types/user.types";

interface AuthRequestBody {
  username: string;
  password: string;
}

export const getAuthStatus = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const isFirstTimeSetup = await authService.isFirstTimeSetup();

  res
    .status(200)
    .json(successResponse("Auth status fetched successfully", { isFirstTimeSetup }));
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const body = req.body as AuthRequestBody;

  const input: LoginInput = {
    username: body.username,
    password: body.password,
  };

  const user = await authService.loginUser(input);

  res.status(200).json(successResponse("Login successful", serializeUser(user)));
});
