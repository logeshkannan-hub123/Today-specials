import type { CorsOptions } from "cors";
import ApiError from "../utils/ApiError";

const LOCAL_DEV_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://localhost:4174",
];

const configuredOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [];

// Local dev origins are always allowed, in addition to whatever is
// configured for production (e.g. the deployed Vercel URL), so this
// list doesn't need to be edited back and forth between environments.
const allowedOrigins = [...LOCAL_DEV_ORIGINS, ...configuredOrigins];

function patternToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escaped.replace(/\*/g, ".*")}$`);
}

function isOriginAllowed(origin: string): boolean {
  return allowedOrigins.some((allowed) =>
    allowed.includes("*") ? patternToRegex(allowed).test(origin) : allowed === origin
  );
}

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || isOriginAllowed(origin)) {
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
