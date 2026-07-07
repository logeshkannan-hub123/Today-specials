import type { TodaySpecial } from "@prisma/client";
import type { TodaySpecialResponse } from "../types/todaySpecial.types";

export function serializeTodaySpecial(special: TodaySpecial): TodaySpecialResponse {
  return {
    id: special.id,
    title: special.title,
    dishName: special.dishName,
    price: Number(special.price),
    image: special.image ? Buffer.from(special.image).toString("base64") : null,
    video: special.video ? Buffer.from(special.video).toString("base64") : null,
    isActive: special.isActive,
    createdAt: special.createdAt,
    updatedAt: special.updatedAt,
  };
}
