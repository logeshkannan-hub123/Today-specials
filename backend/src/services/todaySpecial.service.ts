import TodaySpecial, { type TodaySpecialDoc } from "../models/TodaySpecial.model";
import ApiError from "../utils/ApiError";
import { CreateTodaySpecialInput, UpdateTodaySpecialInput } from "../types/todaySpecial.types";

export async function getAllTodaySpecials(): Promise<TodaySpecialDoc[]> {
  return TodaySpecial.find().sort({ createdAt: -1 });
}

export async function getActiveTodaySpecials(): Promise<TodaySpecialDoc[]> {
  return TodaySpecial.find({ isActive: true }).sort({ createdAt: -1 });
}

export async function getTodaySpecialById(id: string): Promise<TodaySpecialDoc> {
  const special = await TodaySpecial.findById(id);

  if (!special) {
    throw new ApiError(404, "Dish not found");
  }

  return special;
}

export async function createTodaySpecial(
  input: CreateTodaySpecialInput
): Promise<TodaySpecialDoc> {
  return TodaySpecial.create({
    title: input.title,
    dishName: input.dishName,
    price: input.price,
    image: input.image,
    video: input.video,
    isActive: input.isActive,
  });
}

export async function updateTodaySpecial(
  id: string,
  input: UpdateTodaySpecialInput
): Promise<TodaySpecialDoc> {
  const special = await TodaySpecial.findByIdAndUpdate(
    id,
    {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.dishName !== undefined && { dishName: input.dishName }),
      ...(input.price !== undefined && { price: input.price }),
      ...(input.image !== undefined && { image: input.image }),
      ...(input.video !== undefined && { video: input.video }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
    { new: true }
  );

  if (!special) {
    throw new ApiError(404, "Dish not found");
  }

  return special;
}

export async function deleteTodaySpecial(id: string): Promise<TodaySpecialDoc> {
  const special = await TodaySpecial.findByIdAndDelete(id);

  if (!special) {
    throw new ApiError(404, "Dish not found");
  }

  return special;
}
