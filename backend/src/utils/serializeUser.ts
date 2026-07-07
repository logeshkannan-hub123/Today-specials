import type { User } from "@prisma/client";
import type { UserResponse } from "../types/user.types";

export function serializeUser(user: User): UserResponse {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
