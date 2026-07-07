import express, { Application } from "express";
import cors from "cors";
import todaySpecialRoutes from "./routes/todaySpecial.routes";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/today-specials", todaySpecialRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
