import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { connectDB, disconnectDB } from "./config/db";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

async function start(): Promise<void> {
  await connectDB();

  const server = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Hotel Today Specials backend running on port ${PORT}`);
  });

  async function shutdown(): Promise<void> {
    await disconnectDB();
    server.close(() => {
      process.exit(0);
    });
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", error);
  process.exit(1);
});
