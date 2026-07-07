import type { TodaySpecial } from "@prisma/client";
import prisma from "../config/prisma";
import ApiError from "../utils/ApiError";
import { CreateTodaySpecialInput, UpdateTodaySpecialInput } from "../types/todaySpecial.types";

export async function getAllTodaySpecials(): Promise<TodaySpecial[]> {
  return prisma.todaySpecial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTodaySpecialById(id: number): Promise<TodaySpecial> {
  const special = await prisma.todaySpecial.findUnique({ where: { id } });

  if (!special) {
    throw new ApiError(404, "Dish not found");
  }

  return special;
}

export async function createTodaySpecial(
  input: CreateTodaySpecialInput
): Promise<TodaySpecial> {
  return prisma.todaySpecial.create({
    data: {
      title: input.title,
      dishName: input.dishName,
      price: input.price,
      image: input.image,
      video: input.video,
      isActive: input.isActive,
    },
  });
}

export async function updateTodaySpecial(
  id: number,
  input: UpdateTodaySpecialInput
): Promise<TodaySpecial> {
  await getTodaySpecialById(id);

  return prisma.todaySpecial.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.dishName !== undefined && { dishName: input.dishName }),
      ...(input.price !== undefined && { price: input.price }),
      ...(input.image !== undefined && { image: input.image }),
      ...(input.video !== undefined && { video: input.video }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  });
}

export async function deleteTodaySpecial(id: number): Promise<TodaySpecial> {
  await getTodaySpecialById(id);

  return prisma.todaySpecial.delete({ where: { id } });
}
