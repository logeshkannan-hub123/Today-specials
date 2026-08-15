import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

const todaySpecialSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    dishName: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: Buffer, default: null },
    video: { type: Buffer, default: null },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, collection: "today_specials" }
);

export type TodaySpecialDoc = HydratedDocument<InferSchemaType<typeof todaySpecialSchema>>;

const TodaySpecial = model("TodaySpecial", todaySpecialSchema);

export default TodaySpecial;
