import type { TodaySpecialDoc } from "../models/TodaySpecial.model";
import type { TodaySpecialResponse } from "../types/todaySpecial.types";

export function serializeTodaySpecial(special: TodaySpecialDoc): TodaySpecialResponse {
  return {
    id: special._id.toString(),
    title: special.title,
    dishName: special.dishName,
    price: special.price,
    image: special.image ? Buffer.from(special.image).toString("base64") : null,
    video: special.video ? Buffer.from(special.video).toString("base64") : null,
    isActive: special.isActive,
    createdAt: special.createdAt,
    updatedAt: special.updatedAt,
  };
}
