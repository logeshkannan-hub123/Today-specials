import express, { Application } from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import todaySpecialRoutes from "./routes/todaySpecial.routes";
import authRoutes from "./routes/auth.routes";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";

const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/today-specials", todaySpecialRoutes);
app.use("/api/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
