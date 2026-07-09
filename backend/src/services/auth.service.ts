import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";
import prisma from "../config/prisma";
import ApiError from "../utils/ApiError";
import { LoginInput } from "../types/user.types";

const SALT_ROUNDS = 10;

export async function loginUser(input: LoginInput): Promise<User> {
  const userCount = await prisma.user.count();

  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

    return prisma.user.create({
      data: {
        username: input.username,
        password: hashedPassword,
      },
    });
  }

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
