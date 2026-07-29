import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";

import indexRoutes from "./routes/indexRoutes.mjs";
import notFound from "./middleware/notFound.mjs";
import errorMiddleware from "./middleware/errorMiddleware.mjs";
import authRoutes from "./routes/auth.routes.mjs";

const app = express();

// Security
app.use(helmet());

// Compression
app.use(compression());

// Logging
app.use(morgan("dev"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Routes
app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorMiddleware);

export default app;
