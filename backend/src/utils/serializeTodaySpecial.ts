import type { TodaySpecial } from "@prisma/client";
import type { TodaySpecialResponse } from "../types/todaySpecial.types";

export function serializeTodaySpecial(special: TodaySpecial): TodaySpecialResponse {
  return {
    id: special.id,
    title: special.title,
    dishName: special.dishName,
    price: Number(special.price),
    image: Buffer.from(special.image).toString("base64"),
    video: Buffer.from(special.video).toString("base64"),
    isActive: special.isActive,
    createdAt: special.createdAt,
    updatedAt: special.updatedAt,
  };
}
