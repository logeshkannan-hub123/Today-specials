import type { CorsOptions } from "cors";
import ApiError from "../utils/ApiError";

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://localhost:4174",
];

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : DEFAULT_ALLOWED_ORIGINS;

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    // eslint-disable-next-line no-console
    console.warn(
      `[CORS] Blocked request from origin "${origin}". Allowed origins: ${allowedOrigins.join(", ")}`
    );

    callback(new ApiError(403, `Origin ${origin} is not allowed by CORS`));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
