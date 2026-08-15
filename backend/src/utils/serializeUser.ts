import type { UserDoc } from "../models/User.model";
import type { UserResponse } from "../types/user.types";

export function serializeUser(user: UserDoc): UserResponse {
  return {
    id: user._id.toString(),
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
