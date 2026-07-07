import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import prisma from "./config/prisma";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Hotel Today Specials backend running on port ${PORT}`);
});

async function shutdown(): Promise<void> {
  await prisma.$disconnect();
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
