import { cors } from "hono/cors";
import { Hono } from "hono";
import { logger } from "hono/logger";

import { authRoutes } from "./routes/auth.js";
import { studentRoutes } from "./routes/students.js";
import { historyRoutes } from "./routes/history.js";

type Env = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
};

const app = new Hono<{ Bindings: Env }>().basePath("/api");

// Middleware
app.use("*", cors());
app.use("*", logger());

// Health check
app.get("/", (c) => {
  return c.json({ message: "StuProf API is running! 🚀" });
});

// API routes
app.route("/auth", authRoutes);
app.route("/students", studentRoutes);
app.route("/history", historyRoutes);

export default app;
