import bcrypt from "bcryptjs";
import User, { type UserDoc } from "../models/User.model";
import ApiError from "../utils/ApiError";
import { LoginInput } from "../types/user.types";

const SALT_ROUNDS = 10;

export async function isFirstTimeSetup(): Promise<boolean> {
  const userCount = await User.countDocuments();
  return userCount === 0;
}

export async function loginUser(input: LoginInput): Promise<UserDoc> {
  const userCount = await User.countDocuments();

  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

    return User.create({
      username: input.username,
      password: hashedPassword,
    });
  }

  const user = await User.findOne({ username: input.username });

  if (!user) {
    throw new ApiError(401, "Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid username or password");
  }

  return user;
}
