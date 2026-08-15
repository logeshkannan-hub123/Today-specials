import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set in the environment");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri);

  // eslint-disable-next-line no-console
  console.log("Connected to MongoDB");
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}
