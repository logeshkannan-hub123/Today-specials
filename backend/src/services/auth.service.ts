import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";
import prisma from "../config/prisma";
import ApiError from "../utils/ApiError";
import { RegisterUserInput, LoginInput } from "../types/user.types";

const SALT_ROUNDS = 10;

export async function registerUser(input: RegisterUserInput): Promise<User> {
  const existingUser = await prisma.user.findUnique({
    where: { username: input.username },
  });

  if (existingUser) {
    throw new ApiError(409, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  return prisma.user.create({
    data: {
      username: input.username,
      password: hashedPassword,
    },
  });
}

export async function loginUser(input: LoginInput): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { username: input.username },
  });

  if (!user) {
    throw new ApiError(401, "Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid username or password");
  }

  return user;
}
