import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { serializeUser } from "../utils/serializeUser";
import { successResponse } from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { RegisterUserInput, LoginInput } from "../types/user.types";

interface AuthRequestBody {
  username: string;
  password: string;
}

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const body = req.body as AuthRequestBody;

  const input: LoginInput = {
    username: body.username,
    password: body.password,
  };

  const user = await authService.loginUser(input);

  res.status(200).json(successResponse("Login successful", serializeUser(user)));
});

export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const body = req.body as AuthRequestBody;

  const input: RegisterUserInput = {
    username: body.username,
    password: body.password,
  };

  const user = await authService.registerUser(input);

  res.status(201).json(successResponse("User registered successfully", serializeUser(user)));
});
