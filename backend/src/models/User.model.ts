import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true, collection: "users" }
);

export type UserDoc = HydratedDocument<InferSchemaType<typeof userSchema>>;

const User = model("User", userSchema);

export default User;
